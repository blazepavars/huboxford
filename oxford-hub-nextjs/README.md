# The Hub - Oxford Properties Landing Page

**Project:** The Hub - Oxford Properties Landing Page  
**Last Updated:** October 2, 2025

---

## PROJECT SUMMARY

Complete responsive landing page for The Hub at 30 Bay Street. Features desktop hover accordion, mobile swiper, fade-in animations, and full CMS integration.

**Desktop:** Hover-to-expand accordion with smooth animations  
**Mobile:** Touch swiper with static navigation arrows  
**Tech:** Next.js 14, TypeScript, Swiper.js, Agility CMS

---

## AGILITY CMS SETUP COMPLETED

### **Component Models Created:**
- **HubSlide** - Individual accordion/slider cards (Content Model for HubAccordion - Linked Content)
- **HubAccordion** - Main accordion component  
- **HubHeroSection** - Hero logo and headings
- **HubPlatformSection** - Introduction section content
- **HubCTA** - Contact section with John Peets info
- **HubFooter** - Footer links (Privacy, Terms, Cookies)

### **Page Structure:**
- **Hub Landing Page** template at root path (/)
- **Homepage** using Hub Landing Page template
- **Content organized** under "The Hub" group

### **Current Content:**
- **4 Hub Slides** with all property information
- **Hero section** with logo and "THE HUB" heading
- **Platform section** with Toronto skyline image
- **Contact section** with John Peets details
- **Footer** with legal links

---

## ISSUES TO RESOLVE

### **1. Unused Content Models (Need Deletion)**
There is an old content model under "The Hub" group named "Platform Section" that was created during setup but is not being used. **needs to be deleted as I don't have access:**
- Any duplicate or test content models
- Unused page templates
- Test content items

### **2. Image Optimization Required**
Current images need to be optimized:
- **Convert to WebP format** for better performance
- **Compress file sizes** while maintaining quality  
- **Rename files** with descriptive names (no spaces, use hyphens)
- **Upload optimized versions** to replace current images

### **3. Missing Hero Video**
The hero section is missing the background video that should be added behind the logo and text.

---

## TODO

### **Immediate Tasks:**
- [ ] **Delete unused content models** from "The Hub" group (I do not have account permissions to do this.)
- [ ] **Add hero background video** to Hero section
- [ ] **Convert all images to WebP** and re-upload
- [ ] **Rename image files** with proper descriptive names

### **SEO Implementation:**
Ready-to-add SEO metadata for /src/app/page.tsx:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Hub - Oxford Properties | Premium Office Space at 30 Bay Street',
  description: 'Discover The Hub, Oxford Properties\' premium office space at 30 Bay Street, Toronto. A destination that inspires, connects, and elevates performance in the new era of work.',
  keywords: 'office space toronto, premium office, oxford properties, 30 bay street, commercial real estate, workplace solutions, business center toronto',
  openGraph: {
    title: 'The Hub - Oxford Properties | Premium Office Space',
    description: 'Platform for performance, destination for belonging.',
    url: 'https://hub.oxfordproperties.com',
    siteName: 'The Hub - Oxford Properties',
    images: [{
      url: 'https://hub.oxfordproperties.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'The Hub - Premium Office Space at 30 Bay Street'
    }],
    locale: 'en_CA',
    type: 'website'
  }
}
```

### **Additional Files Needed:**
- **OG image** (1200x630px) for social sharing
- **Favicon** and app icons
- **robots.txt** and **sitemap.xml**

---

## TECHNICAL NOTES

- **Footer logo** links to oxfordproperties.com with UTM tracking
- **All content** pulls from Agility CMS (no hardcoded text)
- **Mobile swiper** uses Swiper.js for reliable touch gestures
- **Animations** are CSS-based with Intersection Observer

---

**Developed by:** Blaze Pavars - OHS Global  
**Contact for questions:** blaze@ohs.global