import React, { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { formInterests, formBudgets, formSources } from "@/src/content/sections";
import { brand } from "@/src/content/brand";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  designation: string;
  source: string;
  interests: string[];
  budget: string;
  message: string;
}

export default function MultiStepForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    designation: "",
    source: "",
    interests: [],
    budget: "",
    message: "",
  });

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bawany inquiry:", formData);
    setSubmitted(true);
  };

  const textFields = [
    ["fullName", "Full name", "text"],
    ["email", "Email", "email"],
    ["phone", "Phone", "tel"],
    ["companyName", "Company name", "text"],
    ["designation", "Your designation", "text"],
  ] as const;

  return (
    <section id="contact-form-section" className="bg-surface pb-0">
      {/* Buzz: full-bleed black panel — not wrapped in page-shell */}
      <div className="contact-panel">
        <div className="contact-inner">
          <h2 className="contact-heading">Let&apos;s Connect</h2>

          {submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
              <div className="w-14 h-14 border-2 border-electric-lime flex items-center justify-center mx-auto mb-6">
                <Check className="w-7 h-7 text-electric-lime" />
              </div>
              <p className="text-headline-md font-serif text-pure-white">
                Thank you! Your submission has been received.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full">
              {/* Buzz: single-column stacked fields, placeholder labels, full content width */}
              {textFields.map(([field, placeholder, type]) => (
                <div key={field} className="contact-field">
                  <input
                    type={type}
                    required
                    placeholder={placeholder}
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="contact-input"
                  />
                </div>
              ))}

              <div className="contact-field">
                <select
                  required
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className={`contact-input cursor-pointer ${!formData.source ? "text-pure-white/45" : ""}`}
                >
                  <option value="" disabled className="text-jet-black">
                    How did you hear about us
                  </option>
                  {formSources.map((s) => (
                    <option key={s} value={s} className="text-jet-black">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contact-field">
                <textarea
                  required
                  placeholder="Write your message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="contact-input contact-textarea"
                />
              </div>

              <div className="mb-[clamp(1.5rem,2.5vw,2.25rem)]">
                <p className="contact-section-label">I am interested in</p>
                <div className="flex flex-wrap gap-[clamp(0.625rem,1.2vw,0.875rem)]">
                  {formInterests.map((interest) => (
                    <label
                      key={interest}
                      className={`contact-chip ${
                        formData.interests.includes(interest) ? "is-selected" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={formData.interests.includes(interest)}
                        onChange={() => toggleInterest(interest)}
                      />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-[clamp(1.5rem,2.5vw,2.25rem)]">
                <p className="contact-section-label">My budget is</p>
                <div className="contact-radio-row">
                  {formBudgets.map((b) => (
                    <label
                      key={b}
                      className={`contact-radio ${formData.budget === b ? "is-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        required
                        checked={formData.budget === b}
                        onChange={() => setFormData({ ...formData, budget: b })}
                      />
                      {b}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="contact-submit">
                Submit
              </button>
            </form>
          )}

          <p className="text-pure-white/30 text-sm mt-[clamp(2rem,4vw,3rem)]">{brand.name}</p>
        </div>
      </div>
    </section>
  );
}
