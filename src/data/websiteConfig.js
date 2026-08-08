// Seed config data schema for bilingual website management

export const INITIAL_WEBSITE_CONFIG = {
  global: {
    siteName: "TRUST CARD™",
    announcement: {
      en: "First 100 registrations get verified status free of charge. 👇",
      ar: "أول ١٠٠ تسجيل يحصلون على حالة موثقة مجاناً بالكامل. 👇"
    },
    navigation: {
      links: [
        { id: "nav-how", label: { en: "How It Works", ar: "كيف يعمل" }, href: "#desktop-landing-how" },
        { id: "nav-stats", label: { en: "For Professionals", ar: "للمحترفين" }, href: "#desktop-landing-stats" },
        { id: "nav-trust", label: { en: "Trust Page", ar: "صفحة الثقة" }, href: "#btn-hero-fallback-cta" }
      ],
      cta: {
        label: { en: "Get My Trust Card™", ar: "احصل على بطاقة الثقة الخاصة بي" },
        href: "#btn-hero-fallback-cta"
      }
    },
    footer: {
      en: "© 2026 R8ESTATE. Audited decision intelligence infrastructure. All rights reserved.",
      ar: "© ٢٠٢٦ R8ESTATE. البنية التحتية لذكاء القرار العقاري المدقق. جميع الحقوق محفوظة."
    }
  },
  hero: {
    eyebrow: {
      en: "REAL ESTATE PROFESSIONALS LOOKING FOR",
      ar: "محترفو العقارات الباحثون عن"
    },
    outcomes: [
      { text: { en: "MORE CLIENTS", ar: "المزيد من العملاء" } },
      { text: { en: "MORE DEALS", ar: "المزيد من الصفقات" } },
      { text: { en: "MORE REFERRALS", ar: "المزيد من التوصيات" } },
      { text: { en: "MORE AUTHORITY", ar: "المزيد من الهيئة والتميز" } },
      { text: { en: "MORE VISIBILITY", ar: "المزيد من البروز والظهور" } },
      { text: { en: "BETTER OPPORTUNITIES", ar: "فرص استثمارية أفضل" } },
      { text: { en: "STRONGER REPUTATION", ar: "سمعة مهنية أقوى" } }
    ],
    supportingText: {
      en: "Build a verified professional presence that turns your experience into trust, confidence and opportunities.",
      ar: "ابنِ حضوراً مهنياً موثقاً يحول خبرتك وعملك إلى ثقة، أمان وصفقات جديدة."
    },
    personalizationPrompt: {
      en: "What should clients call you?",
      ar: "ما الاسم الذي يفضله العملاء لمناداتك؟"
    },
    personalizationPlaceholder: {
      en: "Enter your name...",
      ar: "أدخل اسمك هنا..."
    },
    personalizationSuccess: {
      en: "Looks good. Let's build your Trust Page.",
      ar: "رائع جداً! دعنا نبني بطاقة الثقة الخاصة بك."
    },
    fallbackCta: {
      en: "BUILD MY TRUST CARD ➜",
      ar: "ابنِ بطاقة الثقة الخاصة بي ➜"
    }
  },
  sections: [
    { id: "section-1-overview", label: { en: "Can I Trust Him?", ar: "هل يمكنني الثقة به؟" }, isActive: true, order: 1 },
    { id: "section-2-impact", label: { en: "Why Choose Him?", ar: "لماذا تختاره؟" }, isActive: true, order: 2 },
    { id: "section-3-proof", label: { en: "Show Me The Proof", ar: "اعرض الإثباتات" }, isActive: true, order: 3 },
    { id: "section-4-reviews", label: { en: "Client Testimonials", ar: "ماذا يقول العملاء؟" }, isActive: true, order: 4 },
    { id: "section-5-security", label: { en: "Why Buyers Feel Safe", ar: "لماذا المشترون آمنون؟" }, isActive: true, order: 5 },
    { id: "section-6-intelligence", label: { en: "Decision Intelligence", ar: "تقرير الذكاء" }, isActive: true, order: 6 },
    { id: "section-7-cta", label: { en: "Start Decision", ar: "اتخاذ قرار" }, isActive: true, order: 7 }
  ],
  theme: {
    accent: "#FAC417",
    navy: "#0A3D62",
    danger: "#FF1744",
    radius: "24px", // "12px" | "16px" | "24px" | "9999px"
    shadow: "shadow-premium-soft", // "shadow-sm" | "shadow-md" | "shadow-lg" | "shadow-premium-soft"
    fontSerif: "'Playfair Display', Georgia, serif",
    fontSans: "'Plus Jakarta Sans', sans-serif"
  },
  seo: {
    title: {
      en: "TRUST CARD™ | Your Verified Real Estate Professional Identity",
      ar: "TRUST CARD™ | الهوية الموثقة لخبراء العقارات"
    },
    description: {
      en: "R8ESTATE Trust Page: The world's most trusted decision intelligence profile for real estate leaders.",
      ar: "بطاقة الثقة من R8ESTATE: الملف الموثق الأكثر أماناً لاتخاذ القرارات العقارية."
    },
    ogImage: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500",
    canonicalUrl: "https://trustcard.r8estate.com/"
  },
  qrSettings: {
    destinationUrl: "https://trustcard.r8estate.com/",
    badgeType: "Gold" // "Gold" | "Silver" | "Platinum" | "Elite"
  }
};
