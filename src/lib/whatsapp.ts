export function getWhatsAppNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "";
}

export function whatsappUrl(message: string) {
  const number = getWhatsAppNumber();
  const text = encodeURIComponent(message);
  if (!number) {
    return `https://wa.me/?text=${text}`;
  }
  return `https://wa.me/${number}?text=${text}`;
}

export const ORDER_MESSAGE =
  "Hi Magic Hands Creation! I'd love to order a handmade piece. Can you help me pick something?";

export const CUSTOM_MESSAGE =
  "Hi Magic Hands Creation! I'd like a custom handmade order. Here's what I'm imagining:";

export function withGiftNote(message: string, note: string, enabled: boolean) {
  if (!enabled || !note.trim()) return message;
  return `${message}\n\nGift note to include:\n"${note.trim()}"`;
}

export function productOrderMessage(
  title: string,
  category: string,
  priceFrom?: number,
  giftNote?: string,
) {
  const price = priceFrom ? `\nStarting from: ₹${priceFrom}` : "";
  const note = giftNote?.trim()
    ? `\n\nGift note to include:\n"${giftNote.trim()}"`
    : "";
  return `Hi Magic Hands Creation! I'm interested in "${title}" (${category}).${price}\nIs it available?${note}`;
}
