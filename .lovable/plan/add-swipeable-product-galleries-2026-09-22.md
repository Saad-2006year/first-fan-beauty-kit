# Add swipeable product galleries

## What will change
- Create two coordinated alternate photos for each of the four existing products, giving every product three images total.
- Add a reusable swipeable image gallery with touch dragging, arrow controls, position dots, accessible labels, and reduced-motion support.
- Use the gallery on each product details page; keep product cards focused on their existing primary image.
- Preserve the current FIRST FAN colors, spacing, typography, product data, cart behavior, and responsive layout.

## Technical details
- Store the new generated images with the existing product assets and extend each product entry with an image array.
- Build the gallery with browser-native scrolling and React state rather than adding a heavy carousel dependency.
- Lazy-load non-primary images and keep a stable square image area to prevent layout shifts.
- Verify swiping, arrows, dots, mobile sizing, desktop layout, metadata, and the add-to-cart flow.
