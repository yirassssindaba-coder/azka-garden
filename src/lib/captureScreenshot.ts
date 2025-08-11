import html2canvas from 'html2canvas';

export interface CaptureOptions {
  scale?: number;
  download?: boolean;
  fileName?: string;
  copyToClipboard?: boolean;
}

/**
 * Mengambil screenshot elemen dan mengembalikan dataURL PNG.
 * - download: otomatis mengunduh
 * - copyToClipboard: coba salin gambar ke clipboard (browser modern)
 */
export async function captureElementToDataUrl(
  element: HTMLElement,
  options: CaptureOptions = {}
): Promise<string> {
  const {
    scale = 2,
    download = true,
    fileName = 'order-screenshot.png',
    copyToClipboard = false
  } = options;

  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight
  });

  const dataUrl = canvas.toDataURL('image/png');

  if (download) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    a.click();
  }

  if (copyToClipboard && 'clipboard' in navigator) {
    try {
      const blob = await (await fetch(dataUrl)).blob();
      // @ts-ignore ClipboardItem mungkin perlu lib DOM terbaru
      const item = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([item]);
      console.info('[capture] Screenshot berhasil disalin ke clipboard');
    } catch (err) {
      console.warn('[capture] Gagal menyalin ke clipboard', err);
    }
  }

  return dataUrl;
}
