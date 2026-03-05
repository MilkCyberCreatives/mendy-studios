# Search Console and Bing Setup

## Google Search Console
1. Add `https://www.mendystudios.co.za` as a Domain property.
2. Add DNS TXT verification token.
3. Submit sitemap: `https://www.mendystudios.co.za/sitemap.xml`.
4. Monitor Coverage, Page Indexing, and Core Web Vitals weekly.
5. Use URL Inspection for priority pages after updates.

## Bing Webmaster Tools
1. Add site and verify by DNS or meta tag.
2. Submit sitemap: `https://www.mendystudios.co.za/sitemap.xml`.
3. Enable IndexNow key and test `indexnow.txt` response.
4. Monitor crawl errors and query performance weekly.

## IndexNow submission endpoint
- API route: `POST /api/indexnow/submit`
- Body:
```json
{
  "urls": [
    "https://www.mendystudios.co.za/services/photography",
    "https://www.mendystudios.co.za/stories/wedding-photography-planning-gauteng"
  ]
}
```
