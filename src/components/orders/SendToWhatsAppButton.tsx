import React, { useState } from 'react';
import { captureElementToDataUrl } from '../../lib/captureScreenshot';
import { Loader2, Phone } from 'lucide-react';

interface Props {
  orderCode: string;
  total: number;
  elementSelector: string;      // CSS selector elemen yang akan di-screenshot
  whatsappNumber: string;       // 62xxxxxxxxxx tanpa tanda +
  shippingName?: string;
  shippingPhone?: string;
  shippingAddressSummary?: string;
  autoCopyImage?: boolean;
}

const formatRupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

const SendToWhatsAppButton: React.FC<Props> = ({
  orderCode,
  total,
  elementSelector,
  whatsappNumber,
  shippingName,
  shippingPhone,
  shippingAddressSummary,
  autoCopyImage = true
}) => {
  const [loading, setLoading] = useState(false);

  const buildMessage = () => {
    const lines: string[] = [];
    lines.push('Halo Admin, berikut detail pesanan saya:');
    lines.push(`Kode Pesanan: ${orderCode}`);
    lines.push(`Total: ${formatRupiah(total)}`);
    if (shippingName) lines.push(`Nama: ${shippingName}`);
    if (shippingPhone) lines.push(`Telp: ${shippingPhone}`);
    if (shippingAddressSummary) lines.push(`Alamat: ${shippingAddressSummary}`);
    lines.push('');
    lines.push('Saya lampirkan screenshot (sudah diunduh / tersalin).');
    return lines.join('\n');
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const el = document.querySelector<HTMLElement>(elementSelector);
      if (!el) {
        alert('Elemen detail pesanan tidak ditemukan.');
        return;
      }
      await captureElementToDataUrl(el, {
        scale: 2,
        download: true,
        fileName: `${orderCode}.png`,
        copyToClipboard: autoCopyImage
      });

      const text = buildMessage();
      const num = whatsappNumber.replace(/[^\d]/g, '');
      const url = `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener');
    } catch (e: any) {
      console.error('Gagal menyiapkan WhatsApp:', e);
      alert('Gagal menyiapkan WhatsApp: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      type="button"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
      <span>Kirim via WhatsApp</span>
    </button>
  );
};

export default SendToWhatsAppButton;
