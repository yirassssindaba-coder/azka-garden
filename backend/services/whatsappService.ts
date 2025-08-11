import fetch from 'node-fetch';
import FormData from 'form-data';

const TOKEN = process.env.WA_TOKEN!;
const PHONE_NUMBER_ID = process.env.WA_PHONE_NUMBER_ID!;

export async function uploadImageToWhatsApp(buffer: Buffer, fileName = 'order.png') {
  const form = new FormData();
  form.append('file', buffer, { filename: fileName, contentType: 'image/png' });
  form.append('messaging_product', 'whatsapp');

  const res = await fetch(`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/media`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: form as any
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Upload gagal: ' + JSON.stringify(data));
  }
  return data.id;
}

export async function sendWhatsAppImage(toNumber: string, mediaId: string, caption: string) {
  const res = await fetch(`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: toNumber,
      type: 'image',
      image: {
        id: mediaId,
        caption
      }
    })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Kirim pesan gagal: ' + JSON.stringify(data));
  }
  return data;
}
