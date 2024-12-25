import QRCode from 'qrcode';

export const generateQRCode = async (data: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(data, {
      width: 400,
      margin: 2,
      color: {
        dark: '#4338ca',
        light: '#ffffff',
      },
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
};