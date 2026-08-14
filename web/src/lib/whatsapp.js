// Central place for the WhatsApp number so it only needs updating once.
// +966 50 327 0141 → wa.me wants digits only, country code, no leading 0.
export const WHATSAPP_NUMBER = '966503270141';

export const buildWhatsAppLink = (message = '') =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
