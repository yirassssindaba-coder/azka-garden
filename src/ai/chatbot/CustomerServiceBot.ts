export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'quick_reply' | 'card' | 'image';
  metadata?: any;
}

export interface ChatSession {
  id: string;
  userId?: string;
  messages: ChatMessage[];
  context: ChatContext;
  status: 'active' | 'resolved' | 'escalated';
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatContext {
  intent?: string;
  entities: { [key: string]: any };
  currentFlow?: string;
  userProfile?: any;
  orderContext?: any;
}

export class CustomerServiceBot {
  private sessions: Map<string, ChatSession> = new Map();
  private intents: Map<string, any> = new Map();

  constructor() {
    this.initializeIntents();
  }

  private initializeIntents(): void {
    this.intents.set('greeting', {
      patterns: ['halo', 'hai', 'hello', 'selamat'],
      responses: [
        'Halo! Selamat datang di Azka Garden 🌱',
        'Hai! Ada yang bisa saya bantu hari ini?',
        'Selamat datang! Saya siap membantu Anda dengan tanaman hias.'
      ]
    });

    this.intents.set('plant_care', {
      patterns: ['perawatan', 'cara merawat', 'tips', 'penyiraman'],
      responses: [
        'Saya bisa membantu dengan tips perawatan tanaman! Tanaman apa yang ingin Anda tanyakan?',
        'Perawatan tanaman memang penting. Ceritakan tentang tanaman Anda.'
      ]
    });

    this.intents.set('order_status', {
      patterns: ['pesanan', 'order', 'status', 'pengiriman'],
      responses: [
        'Saya bisa membantu cek status pesanan Anda. Berikan nomor pesanan atau email yang digunakan.',
        'Untuk mengecek pesanan, saya butuh nomor pesanan Anda.'
      ]
    });

    this.intents.set('product_recommendation', {
      patterns: ['rekomendasi', 'saran', 'tanaman untuk', 'cocok untuk'],
      responses: [
        'Saya senang bisa memberikan rekomendasi! Ceritakan kondisi ruangan dan pengalaman Anda dengan tanaman.',
        'Untuk rekomendasi yang tepat, bisa ceritakan preferensi Anda?'
      ]
    });
  }

  async startChat(userId?: string): Promise<string> {
    const sessionId = this.generateSessionId();
    const session: ChatSession = {
      id: sessionId,
      userId,
      messages: [],
      context: { entities: {} },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.sessions.set(sessionId, session);

    // Send welcome message
    await this.sendMessage(sessionId, {
      id: this.generateMessageId(),
      message: 'Halo! Saya adalah asisten virtual Azka Garden 🌱\n\nSaya bisa membantu Anda dengan:\n• Rekomendasi tanaman\n• Tips perawatan\n• Status pesanan\n• Informasi produk\n\nAda yang bisa saya bantu?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    });

    return sessionId;
  }

  async processMessage(sessionId: string, userMessage: string): Promise<ChatMessage[]> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: this.generateMessageId(),
      message: userMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    session.messages.push(userMsg);

    // Process with NLP
    const intent = this.detectIntent(userMessage);
    const entities = this.extractEntities(userMessage);

    // Update context
    session.context.intent = intent;
    session.context.entities = { ...session.context.entities, ...entities };

    // Generate response
    const botResponses = await this.generateResponse(session, intent, entities);

    // Add bot messages
    botResponses.forEach(response => {
      session.messages.push(response);
    });

    session.updatedAt = new Date();

    return botResponses;
  }

  private detectIntent(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    for (const [intent, config] of this.intents.entries()) {
      for (const pattern of config.patterns) {
        if (lowerMessage.includes(pattern)) {
          return intent;
        }
      }
    }

    return 'unknown';
  }

  private extractEntities(message: string): { [key: string]: any } {
    const entities: { [key: string]: any } = {};
    
    // Extract plant names
    const plantNames = ['monstera', 'snake plant', 'pothos', 'philodendron', 'sansevieria'];
    plantNames.forEach(plant => {
      if (message.toLowerCase().includes(plant)) {
        entities.plant = plant;
      }
    });

    // Extract order numbers (format: ORD-YYYY-XXX)
    const orderMatch = message.match(/ORD-\d{4}-\d{3}/i);
    if (orderMatch) {
      entities.orderNumber = orderMatch[0];
    }

    // Extract locations
    const locations = ['indoor', 'outdoor', 'kamar', 'ruang tamu', 'balkon', 'teras'];
    locations.forEach(location => {
      if (message.toLowerCase().includes(location)) {
        entities.location = location;
      }
    });

    return entities;
  }

  private async generateResponse(session: ChatSession, intent: string, entities: any): Promise<ChatMessage[]> {
    const responses: ChatMessage[] = [];

    switch (intent) {
      case 'greeting':
        responses.push(this.createBotMessage(
          this.getRandomResponse('greeting')
        ));
        break;

      case 'plant_care':
        if (entities.plant) {
          responses.push(this.createBotMessage(
            await this.getPlantCareAdvice(entities.plant)
          ));
        } else {
          responses.push(this.createBotMessage(
            'Tanaman apa yang ingin Anda tanyakan perawatannya? Saya punya tips untuk Monstera, Snake Plant, Pothos, dan banyak lagi!'
          ));
        }
        break;

      case 'order_status':
        if (entities.orderNumber) {
          responses.push(this.createBotMessage(
            await this.getOrderStatus(entities.orderNumber)
          ));
        } else {
          responses.push(this.createBotMessage(
            'Untuk mengecek status pesanan, mohon berikan nomor pesanan Anda (format: ORD-YYYY-XXX)'
          ));
        }
        break;

      case 'product_recommendation':
        responses.push(this.createBotMessage(
          await this.getProductRecommendation(entities)
        ));
        break;

      default:
        responses.push(this.createBotMessage(
          'Maaf, saya belum memahami pertanyaan Anda. Bisa dijelaskan lebih detail? Atau Anda bisa menanyakan tentang:\n• Perawatan tanaman\n• Rekomendasi produk\n• Status pesanan'
        ));
        
        // Offer to escalate to human
        responses.push(this.createBotMessage(
          'Jika Anda memerlukan bantuan lebih lanjut, saya bisa menghubungkan Anda dengan tim customer service kami.',
          'quick_reply',
          {
            quickReplies: [
              { text: 'Hubungkan ke CS', payload: 'escalate_to_human' },
              { text: 'Tidak, terima kasih', payload: 'continue_bot' }
            ]
          }
        ));
    }

    return responses;
  }

  private getRandomResponse(intent: string): string {
    const config = this.intents.get(intent);
    if (!config || !config.responses) return 'Halo!';
    
    const responses = config.responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private async getPlantCareAdvice(plantName: string): Promise<string> {
    const careAdvice: { [key: string]: string } = {
      'monstera': 'Monstera menyukai cahaya terang tidak langsung. Siram ketika tanah mulai kering (biasanya 1-2 minggu sekali). Bersihkan daun secara berkala dan berikan pupuk cair sebulan sekali.',
      'snake plant': 'Snake Plant sangat mudah dirawat! Letakkan di tempat dengan cahaya sedang, siram 2-3 minggu sekali atau ketika tanah benar-benar kering. Hindari overwatering.',
      'pothos': 'Pothos sangat adaptif! Bisa di cahaya terang atau teduh. Siram ketika tanah mulai kering. Potong ujung yang panjang untuk pertumbuhan lebih lebat.',
      'philodendron': 'Philodendron suka kelembapan tinggi dan cahaya tidak langsung. Siram ketika permukaan tanah kering. Semprot daun sesekali untuk menjaga kelembapan.'
    };

    return careAdvice[plantName.toLowerCase()] || 
           `Untuk perawatan ${plantName}, pastikan memberikan cahaya yang cukup, penyiraman yang tepat, dan pupuk berkala. Apakah ada aspek perawatan khusus yang ingin Anda tanyakan?`;
  }

  private async getOrderStatus(orderNumber: string): Promise<string> {
    // Simulate order lookup
    const mockStatuses = [
      'Pesanan Anda sedang diproses dan akan dikirim dalam 1-2 hari kerja.',
      'Pesanan Anda sudah dikirim dengan nomor resi: JNE123456789. Estimasi tiba besok.',
      'Pesanan Anda sudah sampai di kota tujuan dan akan segera diantar kurir.'
    ];

    return `Status pesanan ${orderNumber}: ${mockStatuses[Math.floor(Math.random() * mockStatuses.length)]}`;
  }

  private async getProductRecommendation(entities: any): Promise<string> {
    if (entities.location === 'indoor' || entities.location === 'kamar') {
      return 'Untuk indoor, saya rekomendasikan:\n• Snake Plant - sangat mudah, tahan kondisi minim cahaya\n• Pothos - cepat tumbuh, bisa digantung\n• ZZ Plant - hampir tidak perlu perawatan\n• Peace Lily - cantik dan bisa berbunga\n\nApakah ada preferensi ukuran atau budget tertentu?';
    }

    return 'Untuk memberikan rekomendasi yang tepat, bisa ceritakan:\n• Lokasi penempatan (indoor/outdoor)\n• Pengalaman dengan tanaman\n• Budget yang diinginkan\n• Preferensi ukuran';
  }

  private createBotMessage(message: string, type: 'text' | 'quick_reply' | 'card' = 'text', metadata?: any): ChatMessage {
    return {
      id: this.generateMessageId(),
      message,
      sender: 'bot',
      timestamp: new Date(),
      type,
      metadata
    };
  }

  private async sendMessage(sessionId: string, message: ChatMessage): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messages.push(message);
    }
  }

  private generateSessionId(): string {
    return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private generateMessageId(): string {
    return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  async escalateToHuman(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.status = 'escalated';
      session.updatedAt = new Date();
      
      // In real implementation, this would notify human agents
      console.log(`Chat session ${sessionId} escalated to human agent`);
    }
  }
}

export const customerServiceBot = new CustomerServiceBot();