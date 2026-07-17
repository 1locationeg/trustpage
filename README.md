# R8ESTATE — Professional Decision Infrastructure & Trust Page

> **Hostinger-Optimized Production Repository**  
> **Repository:** [1locationeg/trustpage](https://github.com/1locationeg/trustpage)  
> **Hosting Platform:** Hostinger.com  

Transforming **Unknown Professional → Confident Decision**. An evidence-backed real estate decision intelligence platform for buyers, investors, and developers.

---

## 🚀 Hostinger.com Deployment Guide

This project is fully optimized for Hostinger.com web hosting. You can deploy it using **Hostinger Git Auto-Deployment** or **Direct File Manager / FTP Upload**.

### Option 1: Hostinger Git Auto-Deployment (Recommended)
1. Log in to your **Hostinger Control Panel (hPanel)**.
2. Navigate to **Advanced → Git**.
3. Create a new repository:
   - **Repository URL:** `https://github.com/1locationeg/trustpage.git`
   - **Branch:** `main`
   - **Directory:** `/public_html` (or your target domain folder)
4. Click **Create**.
5. Click **Auto-Deploy** or **Deploy** to publish the site automatically.

---

### Option 2: Direct Upload via Hostinger File Manager / FTP
If you prefer manual upload without Git build triggers:
1. Run `npm run build` on your computer (this generates the `dist/` production folder).
2. Open Hostinger **File Manager** (hPanel) or connect via FTP (FileZilla).
3. Navigate to `public_html/`.
4. Upload all files from inside the local `dist/` directory directly into `public_html/`.
5. Ensure `.htaccess` is uploaded to `public_html/` to support SPA routing and clean URLs.

---

## 🛠 Project Architecture & Core Features

- **12-Step Value-First Onboarding Builder**: Step-by-step wizard updating the Live Preview Trust Card in real-time.
- **12 Public Decision Infrastructure Screens**:
  - Hero & Verification Center (Identity, Phone, Email, License, Background Check)
  - Expertise Matrix & Track Record ($145M+ Volume, 142 Deals)
  - Measurable Results (+34% Avg ROI, $3.8M Savings)
  - **Proof Center (Moat Differentiator)** with interactive audited evidence popups
  - Verified Testimonials & Industry Standing
  - R8ESTATE Intelligence Score (94/100 Buyer Confidence gauge)
  - Contact & Conversion (WhatsApp, Phone, Email)
  - Viral Sharing Engine (QR Code generator, Share Card)

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for Hostinger production
npm run build
```

---

## 📄 License & Ownership
Copyright © 2026 R8ESTATE. All rights reserved.
