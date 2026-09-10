# Mendy Studios Back Office

The Mendy Studios website includes a protected self-service back office at `/admin`.

## Client workflow

1. Sign in at `/admin`.
2. Use **Visual Editor** to open a real website page and click the text, image, button or link that needs changing.
3. Save as a draft first when a change needs review.
4. Use **Publish** to make an approved change live.
5. Use **Website Content** to review, revert, disable or remove overrides. Removing an override restores the original coded content.

## Main sections

- Overview
- Visual Editor
- Website Content
- Media Library
- SEO & Visibility
- Site Settings
- Enquiries
- Redirects
- Users & Roles
- Activity & History

## Roles

- Super Admin — full system access and role management.
- Admin — day-to-day administration and user management, except assigning Super Admin.
- Editor — content and publishing work.
- Marketing — content, visibility and publishing work.

## Safety model

The public website retains its existing coded design and content as the fallback. CMS changes are stored separately and applied as controlled published overrides. Admin pages are excluded from search indexing. Authentication uses short-lived database-backed sessions stored in an HttpOnly cookie.

The first Super Admin is created using a single-use setup link supplied privately by the developer. The setup token invalidates itself immediately after successful account creation and must never be committed to this repository.
