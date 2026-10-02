# MY TICKET visual direction

`editable-concept.png` and `finished-concept.png` are the complete primary-screen and result-state concepts. The user’s revised white ticket-tool brief replaces the previous landing page.

- Pure white page and ticket body. No CSS gradients. Charcoal `#262626`, gray hairlines `#d9d9d9`, restrained vermilion `#d84338`. At the user’s request, the ticket now adds soft peach (Classic), lavender (Concert), and warm honey (VIP) panels.
- Quiet MY TICKET wordmark. One centered 600px ticket containing the actual editable form, including Classic / Concert / VIP choices and an optional message.
- Space Grotesk for ticket content; Inter for utility labels. Generous whitespace, understated inline inputs, perforated stub, fine border, gentle physical shadow.
- Finished ticket: expressive event title, attendee, date/time, venue, optional note, local decorative number, non-encoded decorative pattern, explicit preview note.
- Finished actions sit beneath the ticket. No additional marketing sections.
- Separate transparent camera and printer illustrations float subtly outside the form and hide below 950px; never overlap controls.
- A 3.1-second receipt-printer effect feeds the user’s actual ticket from a physical printer slot and reveals the finished design. The paper travels at a calm, constant speed, then pauses briefly before settling. The user requested this slower timing. Reduced motion uses a 180ms fade.
- A small geometric ribbon and outlined flower, pastel date/time panel, tinted stub, and quote rule give the ticket a more personal feel. These are intentional updates to the original white concepts, requested by the user; the central form, typography, perforations, and white page remain.
- Intentional functional adaptations: inputs remain truly blank; required fields are marked; disabled state is clear; QR-like pattern lacks real QR finder data; all meaningful labels stay HTML; message remains optional. Generated branded props were replaced by unbranded standalone assets.

## Asset briefs

Built-in image generation supplied `public/assets/camera.webp` and `public/assets/printer.webp`. Prompts: isolated compact graphite camera with silver lens and restrained red shutter, no logos/text, transparent background; tiny off-white receipt printer with a blank marked paper strip and small red power light, transparent background. The camera was edited to remove an extra star and bright red halo. WebP conversion preserves transparency.

The reveal uses `public/assets/printer-reveal.webp`, a matching front-view off-white printer with an empty slot, generated from the decorative printer asset. Its paper is live HTML using the same FinishedTicket component. The user requested the printer effect in place of the shutter reveal.
