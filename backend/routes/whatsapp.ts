import { Router } from 'express';
import { uploadImageToWhatsApp, sendWhatsAppImage } from '../services/whatsappService';

const router = Router();

router.post('/send-order', async (req, res) => {
  try {
    const { base64Image, to, caption } = req.body;
    if (!base64Image || !to) return res.status(400).json({ error: 'Missing params' });

    const buffer = Buffer.from(base64Image.replace(/^data:image\/png;base64,/, ''), 'base64');
    const mediaId = await uploadImageToWhatsApp(buffer);
    const result = await sendWhatsAppImage(to, mediaId, caption || 'Order');
    res.json({ success: true, result });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
