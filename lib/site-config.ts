/**
 * Single source of truth for organisation-wide constants.
 * Update contact details, navigation and social links here.
 */

export const site = {
  name: "Cheriven Empowerment Foundation",
  shortName: "Cheriven",
  abbr: "CEF",
  registration: "IT-145738",
  tagline: "Igniting hope, one life at a time.",
  description:
    "Cheriven Empowerment Foundation (CEF) is a CAC-registered Nigerian non-profit empowering widows, women, youth and children through education, vocational skills, sustainable livelihoods and social support.",
  url: "https://www.cherivenfoundation.org",
  ogImage: "/brand/og-image.jpeg",
  locale: "en_NG",
} as const;

export const contact = {
  phone: "+234 706 571 4529",
  phoneHref: "tel:+2347065714529",
  email: "info@cherivenfoundation.org",
  emailHref: "mailto:info@cherivenfoundation.org",
  address:
    "Suite 111/125 El-Rufai Block, New Garki International Market, Abuja, Nigeria.",
  addressShort: "New Garki International Market, Abuja, Nigeria",
  hours: "Mon – Sat · 9:00am to 5:00pm",
  mapQuery:
    "New Garki International Market, Abuja, Nigeria",
} as const;

export const social = {
  facebook: "https://facebook.com/cherivenfoundation",
  instagram: "https://instagram.com/cherivenfoundation",
  twitter: "https://twitter.com/cheriven",
  linkedin: "https://www.linkedin.com/company/cherivenfoundation",
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Volunteers", href: "/volunteers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const footerLinks = {
  organisation: [
    { label: "About Us", href: "/about" },
    { label: "Our Programs", href: "/programs" },
    { label: "Volunteers", href: "/volunteers" },
    { label: "Gallery", href: "/gallery" },
  ],
  engage: [
    { label: "Latest Blog", href: "/blog" },
    { label: "Upcoming Events", href: "/#events" },
    { label: "Donate", href: "/donate" },
    { label: "Contact Us", href: "/contact" },
  ],
};

/** Primary call-to-action used across the site */
export const donateHref = "/donate";

/**
 * Bank / donation details. Replace the placeholders with the foundation's
 * real account information before going live.
 */
export const donation = {
  bankName: "Bank name — update in lib/site-config.ts",
  accountName: "Cheriven Empowerment Foundation",
  accountNumber: "0000000000",
} as const;
