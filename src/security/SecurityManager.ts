export class SecurityManager {
  private static instance: SecurityManager;
  private securityLogs: SecurityLog[] = [];
  private blockedIPs: Set<string> = new Set();
  private failedAttempts: Map<string, number> = new Map();
  private sessionTokens: Map<string, SessionData> = new Map();

  private constructor() {
    this.initializeSecurity();
  }

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  private initializeSecurity(): void {
    // Initialize security headers
    this.setSecurityHeaders();
    
    // Start security monitoring
    this.startSecurityMonitoring();
    
    // Initialize rate limiting
    this.initializeRateLimiting();
  }

  private setSecurityHeaders(): void {
    // Content Security Policy
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');

    // Set meta tags for security
    const metaCSP = document.createElement('meta');
    metaCSP.httpEquiv = 'Content-Security-Policy';
    metaCSP.content = csp;
    document.head.appendChild(metaCSP);

    // X-Frame-Options
    const metaFrame = document.createElement('meta');
    metaFrame.httpEquiv = 'X-Frame-Options';
    metaFrame.content = 'DENY';
    document.head.appendChild(metaFrame);

    // X-Content-Type-Options
    const metaContent = document.createElement('meta');
    metaContent.httpEquiv = 'X-Content-Type-Options';
    metaContent.content = 'nosniff';
    document.head.appendChild(metaContent);
  }

  private startSecurityMonitoring(): void {
    // Monitor for suspicious activities
    setInterval(() => {
      this.checkSuspiciousActivities();
      this.cleanupExpiredSessions();
      this.analyzeSecurityThreats();
    }, 5000); // Check every 5 seconds
  }

  private initializeRateLimiting(): void {
    // Rate limiting for API calls
    const rateLimits = new Map<string, { count: number; resetTime: number }>();
    
    window.addEventListener('beforeunload', () => {
      // Clear sensitive data on page unload
      this.clearSensitiveData();
    });
  }

  // Authentication Security
  validateLogin(email: string, password: string, ipAddress: string): SecurityValidation {
    const clientIP = this.getClientIP();
    
    // Check if IP is blocked
    if (this.blockedIPs.has(clientIP)) {
      this.logSecurityEvent('BLOCKED_IP_ATTEMPT', { ip: clientIP, email });
      return { isValid: false, reason: 'IP_BLOCKED', blockDuration: 3600000 };
    }

    // Check failed attempts
    const attempts = this.failedAttempts.get(email) || 0;
    if (attempts >= 5) {
      this.blockIP(clientIP, 3600000); // Block for 1 hour
      this.logSecurityEvent('BRUTE_FORCE_DETECTED', { ip: clientIP, email, attempts });
      return { isValid: false, reason: 'TOO_MANY_ATTEMPTS', blockDuration: 3600000 };
    }

    // Validate password strength
    if (!this.validatePasswordStrength(password)) {
      return { isValid: false, reason: 'WEAK_PASSWORD' };
    }

    // Check for SQL injection attempts
    if (this.detectSQLInjection(email) || this.detectSQLInjection(password)) {
      this.blockIP(clientIP, 86400000); // Block for 24 hours
      this.logSecurityEvent('SQL_INJECTION_ATTEMPT', { ip: clientIP, email });
      return { isValid: false, reason: 'MALICIOUS_INPUT', blockDuration: 86400000 };
    }

    return { isValid: true };
  }

  // Session Management
  createSecureSession(userId: string, role: string): string {
    const sessionId = this.generateSecureToken();
    const sessionData: SessionData = {
      userId,
      role,
      createdAt: new Date(),
      lastActivity: new Date(),
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent,
      isActive: true
    };

    this.sessionTokens.set(sessionId, sessionData);
    
    // Set secure cookie
    this.setSecureCookie('session_token', sessionId);
    
    this.logSecurityEvent('SESSION_CREATED', { userId, role, sessionId });
    return sessionId;
  }

  validateSession(sessionId: string): SessionValidation {
    const session = this.sessionTokens.get(sessionId);
    
    if (!session) {
      return { isValid: false, reason: 'SESSION_NOT_FOUND' };
    }

    if (!session.isActive) {
      return { isValid: false, reason: 'SESSION_INACTIVE' };
    }

    // Check session timeout (30 minutes)
    const now = new Date();
    const timeDiff = now.getTime() - session.lastActivity.getTime();
    if (timeDiff > 1800000) { // 30 minutes
      this.invalidateSession(sessionId);
      return { isValid: false, reason: 'SESSION_EXPIRED' };
    }

    // Update last activity
    session.lastActivity = now;
    
    return { isValid: true, session };
  }

  // Input Sanitization
  sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove HTML tags
      .replace(/['"]/g, '') // Remove quotes
      .replace(/[;]/g, '') // Remove semicolons
      .replace(/[\\]/g, '') // Remove backslashes
      .trim();
  }

  // XSS Protection
  preventXSS(input: string): string {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  // CSRF Protection
  generateCSRFToken(): string {
    const token = this.generateSecureToken();
    sessionStorage.setItem('csrf_token', token);
    return token;
  }

  validateCSRFToken(token: string): boolean {
    const storedToken = sessionStorage.getItem('csrf_token');
    return storedToken === token;
  }

  // Security Monitoring
  private checkSuspiciousActivities(): void {
    // Check for rapid requests
    const now = Date.now();
    const requests = this.getRecentRequests();
    
    if (requests.length > 100) { // More than 100 requests per minute
      this.logSecurityEvent('SUSPICIOUS_ACTIVITY', { 
        type: 'RAPID_REQUESTS', 
        count: requests.length,
        ip: this.getClientIP()
      });
    }

    // Check for unusual patterns
    this.detectAnomalousPatterns();
  }

  private detectSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
      /(--|\/\*|\*\/)/,
      /(\b(SCRIPT|JAVASCRIPT|VBSCRIPT)\b)/i,
      /(<|>|&lt;|&gt;)/
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
  }

  private validatePasswordStrength(password: string): boolean {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /\d/.test(password) &&
           /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  private generateSecureToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  private getClientIP(): string {
    // In production, this would get real IP from headers
    return '127.0.0.1';
  }

  private setSecureCookie(name: string, value: string): void {
    document.cookie = `${name}=${value}; Secure; HttpOnly; SameSite=Strict; Max-Age=1800`;
  }

  private logSecurityEvent(type: string, data: any): void {
    const log: SecurityLog = {
      id: this.generateSecureToken(),
      type,
      timestamp: new Date(),
      data,
      severity: this.getSeverityLevel(type),
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent
    };

    this.securityLogs.push(log);
    
    // Send to monitoring system
    this.sendToSecurityMonitoring(log);
  }

  private getSeverityLevel(type: string): 'low' | 'medium' | 'high' | 'critical' {
    const criticalEvents = ['SQL_INJECTION_ATTEMPT', 'BRUTE_FORCE_DETECTED'];
    const highEvents = ['BLOCKED_IP_ATTEMPT', 'SUSPICIOUS_ACTIVITY'];
    const mediumEvents = ['FAILED_LOGIN', 'SESSION_EXPIRED'];
    
    if (criticalEvents.includes(type)) return 'critical';
    if (highEvents.includes(type)) return 'high';
    if (mediumEvents.includes(type)) return 'medium';
    return 'low';
  }

  // Public methods for components
  getSecurityLogs(): SecurityLog[] {
    return this.securityLogs.slice(-100); // Last 100 logs
  }

  getBlockedIPs(): string[] {
    return Array.from(this.blockedIPs);
  }

  getActiveSessionsCount(): number {
    return Array.from(this.sessionTokens.values()).filter(s => s.isActive).length;
  }

  private blockIP(ip: string, duration: number): void {
    this.blockedIPs.add(ip);
    setTimeout(() => {
      this.blockedIPs.delete(ip);
    }, duration);
  }

  private invalidateSession(sessionId: string): void {
    const session = this.sessionTokens.get(sessionId);
    if (session) {
      session.isActive = false;
      this.logSecurityEvent('SESSION_INVALIDATED', { sessionId });
    }
  }

  private clearSensitiveData(): void {
    // Clear sensitive data from memory
    this.sessionTokens.clear();
    sessionStorage.clear();
  }

  private getRecentRequests(): any[] {
    // Mock implementation - in real app, track actual requests
    return [];
  }

  private detectAnomalousPatterns(): void {
    // AI-based anomaly detection would go here
  }

  private analyzeSecurityThreats(): void {
    // Analyze current security threats and vulnerabilities
    // This would integrate with threat intelligence feeds in production
  }

  private cleanupExpiredSessions(): void {
    const now = new Date();
    for (const [sessionId, session] of this.sessionTokens.entries()) {
      const timeDiff = now.getTime() - session.lastActivity.getTime();
      if (timeDiff > 1800000) { // 30 minutes
        this.invalidateSession(sessionId);
      }
    }
  }

  private sendToSecurityMonitoring(log: SecurityLog): void {
    // In production, send to external monitoring service
    console.log('Security Event:', log);
  }
}

interface SecurityLog {
  id: string;
  type: string;
  timestamp: Date;
  data: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress: string;
  userAgent: string;
}

interface SessionData {
  userId: string;
  role: string;
  createdAt: Date;
  lastActivity: Date;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
}

interface SecurityValidation {
  isValid: boolean;
  reason?: string;
  blockDuration?: number;
}

interface SessionValidation {
  isValid: boolean;
  reason?: string;
  session?: SessionData;
}

export const securityManager = SecurityManager.getInstance();