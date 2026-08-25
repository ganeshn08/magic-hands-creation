# Magic Hands Creation

Handmade craft business website — flower keychains, fridge magnets, clips, brooches, and forever bouquets. Orders via WhatsApp.

## Run locally

```bash
cp .env.local.example .env.local
# put your real WhatsApp number in NEXT_PUBLIC_WHATSAPP_NUMBER (digits only, with country code)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## WhatsApp

All “Order” / gallery links open `wa.me` with a prefilled message. Set:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```
