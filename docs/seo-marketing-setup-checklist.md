# 20-Point SEO + Growth Execution Plan (South Africa)

This plan tracks the 20 priority items needed to push organic visibility, local pack performance, and lead conversion outcomes.

## A) Technical + On-Site (implemented in code)
- [x] 1. Canonical metadata and social metadata per page
- [x] 2. JSON-LD structured data (Organization, LocalBusiness, FAQ, Service, BlogPosting, Breadcrumb)
- [x] 3. XML sitemap including stories, service pages, and location pages
- [x] 4. robots.txt configured for crawl control and sitemap hinting
- [x] 5. llms.txt machine-readable content map for AI retrieval systems
- [x] 6. Stories section with indexed listing and detail pages
- [x] 7. Service detail pages for all six services (`/services/[slug]`)
- [x] 8. Location landing pages for Johannesburg, Pretoria, and Midrand
- [x] 9. Internal linking between stories, services, and location pages
- [x] 10. NAP consistency in code (phone/email/WhatsApp)
- [x] 11. Real lead submission API endpoint (`/api/lead`)
- [x] 12. Contact forms wired to submit live leads (not just track clicks)
- [x] 13. Conversion event tracking for phone/email/WhatsApp/form actions
- [x] 14. IndexNow key route and submission API support
- [x] 15. Performance improvements (lighter gallery payload, optimized hero images, long cache headers)

## B) Local SEO + Authority (manual account tasks)
- [ ] 16. Google Business Profile optimization and weekly posting routine
- [ ] 17. Search Console + Bing Webmaster full verification and issue cleanup
- [ ] 18. Local citation rollout with strict NAP consistency across directories
- [ ] 19. Review generation workflow (request, response, and reputation management)
- [ ] 20. Backlink outreach program with South African partner sites and venues

## C) Immediate account setup
Add these IDs/tokens to `.env.local` using `.env.example`:
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`
- `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`
- `LEAD_WEBHOOK_URL` (or `RESEND_API_KEY`, `LEAD_TO_EMAIL`)
- `INDEXNOW_KEY`

## D) Weekly operating cadence
- Monday: publish one new story targeting a service + location query pair
- Tuesday: update Google Business Profile post + images
- Wednesday: request 3 new reviews from recent clients
- Thursday: acquire 1 local backlink/citation
- Friday: review Search Console + analytics + conversion trends and fix issues
