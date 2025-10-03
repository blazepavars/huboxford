

So# Agility CMS Documentation for The Hub Project

**Generated:** October 1, 2025  
**Project:** The Hub - Oxford Properties  
**Purpose:** Document Agility CMS structure and implementation approach  
**Last Updated:** October 1, 2025 - Added actual implementation steps

## 🔑 API Access Information

```
GUID: d26acb91-u
Website Name: Oxford Properties Corp
Fetch API Key: TheHubLive.fe7b61a3a664bc71dc1b680ca825034b340deffe2d215c81a2267c5b202fbcde
Preview API Key: TheHubPreview.87c1de36ec0c6cdd3dabb1011d0b18d90a9f18eb354a0f54d9e59fc257227c54
```

## 📡 API Endpoint Findings

### Working Endpoints
- ✅ `/list/{contentType}` - Returns content lists (currently empty)
- ✅ `/sync/{contentType}` - Returns sync data with items
- ❌ `/sitemap` variations - All return 400 errors
- ❌ `/page/{path}` - Returns 404 (no pages exist yet)

### Current Content Status
All content lists are currently empty:
- `pages`: 0 items
- `sliders`: 0 items
- `galleries`: 0 items
- `modules`: 0 items
- `components`: 0 items

**Conclusion:** This appears to be a fresh Agility CMS instance with no existing content.

## 🏗️ Implementation Plan

Since there are no existing components to reuse, we'll create everything from scratch:

### 1. Component Model: HubAccordion
Create a new Component Model with these fields:
```
- title (Text): "THE HUB FOR OPPORTUNITY"
- slides (Nested Content/Repeater):
  - image (Image/Media)
  - titleTop (Text): e.g., "OFFICE & RETAIL"
  - titleBottom (Text): e.g., "1.5M SF"
  - metaTop (Text): e.g., "ABOVE GRADE"
  - metaBottom (Text): e.g., "57 STOREYS"
```

### 2. Page Model: HubLanding
Create a simple one-zone page model:
```
- Main Content Zone
  - Allows: HubAccordion component
```

### 3. Page Creation
Create a page at the root path (`/`) using the HubLanding template.

## ✅ Actual Implementation Steps Completed

### 1. Created Hub Slide Content Model
**Location:** Settings → Content Models → Content Models  
**Details:**
- **Name:** Hub Slide
- **Reference Name:** hubslide
- **Fields Created:**
  - `image` (Image field) - Slide Image
  - `titleTop` (Text field) - Title Top Line
  - `titleBottom` (Text field) - Title Bottom Line
  - `metaTop` (Text field) - Meta Top Line
  - `metaBottom` (Text field) - Meta Bottom Line

### 2. Created HubAccordion Component Model
**Location:** Settings → Content Models → Component Models  
**Details:**
- **Name:** HubAccordion
- **Reference Name:** hubaccordion
- **Fields Created:**
  - `title` (Text field) - Default: "THE HUB FOR OPPORTUNITY"
  - `slides` (Linked Content field)
    - Link To: Shared Content
    - Link Type: Specific Item(s) from a List
    - Content Selection: Specific Content List
    - Content Model: Hub Slide
    - Show Embedded View: Yes
    - Allow Multiple: Yes
    - Max Items: 4

### 3. Created Page Model
**Location:** Settings → Content Models → Page Models  
**Details:**
- **Name:** Hub Landing Page
- **Reference Name:** hublandingpage
- **Content Zone Added:**
  - Zone Name: Main Content Zone
  - Reference Name: maincontent
  - Allowed Components: HubAccordion

### 4. Created Container and Group
**Location:** Content → Hub Slide  
**Details:**
- **Container Name:** Hub Slides
- **Group:** The Hub (for organization)
- **Purpose:** Contains all slide content items

### 5. Created Asset Folder and Uploaded Images
**Location:** Media & Documents → Assets  
**Details:**
- **Folder Name:** Hub
- **Images Uploaded:** 5 images with appropriate descriptive file names
- **Purpose:** Images for the 4 slides + any additional assets

### 6. Created The Hub Page
**Location:** Pages → The Hub (folder/group)  
**Details:**
- **Page Title:** Homepage
- **Page Name:** Homepage
- **Page Path:** / (root/homepage)
- **Page Template:** Hub Landing Page
- **Parent/Group:** The Hub

## 📋 Current Status Summary

### ✅ Completed in Agility CMS:
1. **Content Model:** Hub Slide (for individual slides)
2. **Component Model:** HubAccordion (with linked content field for slides)
3. **Page Model:** Hub Landing Page (with Main Content Zone)
4. **Organization:**
   - Created "The Hub" group for pages
   - Created "Hub Slides" container for slide content
   - Created "Hub" folder in Assets for images
5. **Page:** Homepage created at root path using Hub Landing Page template
6. **Assets:** All required images uploaded and ready

### ✅ All Portal Setup Complete!

## 🎉 Final Implementation in Agility CMS

### 7. Created Hub Slide Content Items
**Location:** Content → Hub Slides  
**Created 4 slides:**
1. **Office & Retail Slide**
   - Title Top: OFFICE & RETAIL
   - Title Bottom: 1.5M SF
   - Meta Top: ABOVE GRADE
   - Meta Bottom: 57 STOREYS

2. **Connection Slide**
   - Title Top: CONNECTION TO
   - Title Bottom: THE PATH
   - Meta Top: 5 MIN WALK TO
   - Meta Bottom: UNION STATION

3. **Sustainability Slide**
   - Title Top: CAGBC ZERO
   - Title Bottom: CARBON DESIGN
   - Meta Top: LEED V4.1 BD+C
   - Meta Bottom: CS PLATINUM

4. **Terrace Slide**
   - Title Top: 27K SF
   - Title Bottom: TENANT TERRACE
   - Meta Top: 55 FT HIGH
   - Meta Bottom: SKYGARDEN

### 8. Added HubAccordion Component to Homepage
**Location:** Pages → The Hub → Homepage  
**Details:**
- Added HubAccordion module to Main Content Zone
- Linked all 4 Hub Slides in correct order
- Title field: THE HUB FOR OPPORTUNITY
- Status: Published and ready

## ✅ Agility CMS Setup Complete!

All content structure is now in place. The next step is to connect the Next.js application to fetch and display this content.

## 🔌 API Integration Status

### What's Working:
- ✅ Hub Slides API endpoint: `/list/hubslides` returns all 4 slides with content
- ✅ Preview API authentication successful
- ✅ Content fields properly structured

### Known Issues:
- ⚠️ Standard page endpoints (`/page/homepage`) not working - returning 404
- ⚠️ Sitemap endpoints returning 400 errors
- ⚠️ Homepage exists in CMS but not accessible via standard API routes

### Workaround:
We're fetching the slides directly from `/list/hubslides` and hardcoding the title "THE HUB FOR OPPORTUNITY" until the page API access is resolved.

## 📁 Next.js Project Structure

```
/src
  /components
    AccordionSlider.tsx    # Main component (desktop/mobile)
    Hero.tsx               # Title section
    ContactInfo.tsx        # Email/phone footer
  /lib
    agility.ts             # API client and helpers
  /styles
    accordion.module.css   # Component styles
  /app
    page.tsx               # Homepage
    layout.tsx             # Root layout
```

## 🔧 API Integration Pattern

Since the sitemap endpoints don't work, we'll use the content list approach:

```typescript
// Fetch content using list endpoint
const response = await fetch(
  `https://api.aglty.io/${guid}/fetch/en-us/list/hubaccordion`,
  {
    headers: {
      'APIKey': process.env.AGILITY_API_FETCH_KEY,
      'Accept': 'application/json'
    }
  }
);
```

## ⚠️ Important Notes

1. **No Existing Content**: The CMS is empty, so all content models, pages, and components need to be created.
2. **API Limitations**: Standard sitemap/page endpoints return errors. Use `/list/` endpoints instead.
3. **Sync Endpoint**: The `/sync/` endpoint works but returns empty page structures.
4. **Security**: Never commit API keys. They're in `.env.local` and excluded from git.

## 📝 Action Items for Oxford Team

1. **In Agility CMS Admin:**
   - Create the HubAccordion Component Model with fields listed above
   - Create the HubLanding Page Model with one content zone
   - Create a page at root path using this template
   - Add the HubAccordion component to the page
   - Upload the 4 slide images to Media/Assets
   - Populate the component with content

2. **Content to Add:**
   ```
   Slide 1:
   - titleTop: "OFFICE & RETAIL"
   - titleBottom: "1.5M SF"
   - metaTop: "ABOVE GRADE"
   - metaBottom: "57 STOREYS"
   
   Slide 2:
   - titleTop: "CONNECTION TO"
   - titleBottom: "THE PATH"
   
   - metaTop: "5 MIN WALK TO"
   - metaBottom: "UNION STATION"
   
   Slide 3:
   - titleTop: "CAGBC ZERO"
   - titleBottom: "CARBON DESIGN"
   - metaTop: "LEED V4.1 BD+C"
   - metaBottom: "CS PLATINUM"
   
   Slide 4:
   - titleTop: "27K SF"
   - titleBottom: "TENANT TERRACE"
   - metaTop: "55 FT HIGH"
   - metaBottom: "SKYGARDEN"
   ```

## 🚀 Development Workflow

1. Oxford creates content structure in Agility
2. We verify API access to new content
3. We build components to match Elementor functionality
4. Test and deploy

## 📞 Contact Information Component

```html
Email: jpeets@oxfordproperties.com (underlined)
Phone: (416) 865-8288
```

---

**Document maintained by:** OHS Development Team  
**Last updated:** October 1, 2025