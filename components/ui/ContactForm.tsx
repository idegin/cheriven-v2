"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { contact } from "@/lib/site-config";

type ContactFormProps = {
  subject?: string;
  interestField?: boolean;
  cta?: string;
};

/**
 * Static-site friendly form: composes a mailto: so the visitor's email client
 * opens pre-filled. No backend required for GitHub Pages hosting.
 */
export function ContactForm({
  subject = "Website enquiry",
  interestField = false,
  cta = "Send message",
}: ContactFormProps) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const interest = String(data.get("interest") ?? "");
    const message = String(data.get("message") ?? "");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      interest && `Interest: ${interest}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `${contact.emailHref}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-ink-200 bg-canvas px-4 py-3 text-ink-900 placeholder:text-ink-400 transition focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/15";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">Full name</label>
          <input id="name" name="name" required placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className={field} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-700">Phone <span className="text-ink-400">(optional)</span></label>
          <input id="phone" name="phone" placeholder="+234 ..." className={field} />
        </div>
        {interestField && (
          <div>
            <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-ink-700">I&apos;d like to help with</label>
            <select id="interest" name="interest" className={field} defaultValue="">
              <option value="" disabled>Select an area</option>
              <option>Training &amp; mentorship</option>
              <option>Community outreach</option>
              <option>Fundraising &amp; advocacy</option>
              <option>Administrative support</option>
              <option>Wherever I&apos;m needed</option>
            </select>
          </div>
        )}
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">Message</label>
        <textarea id="message" name="message" required rows={5} placeholder="Tell us a little about how you'd like to get involved…" className={field} />
      </div>

      <button
        type="submit"
        className="group inline-flex items-center gap-2.5 rounded-full bg-brand-700 px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-800"
      >
        {cta}
        <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
      </button>

      {sent && (
        <p className="flex items-center gap-2 text-sm text-teal-700">
          <Icon name="check" size={18} /> Your email app should open with the message ready to send.
        </p>
      )}
    </form>
  );
}
