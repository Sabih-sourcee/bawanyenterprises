import React, { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import PageContainer from "@/src/components/layout/PageContainer";
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

  const inputClass =
    "w-full bg-transparent border-0 border-b border-pure-white/40 focus:border-electric-lime outline-none py-3 text-body-md text-pure-white placeholder:text-pure-white/40 transition-colors";

  return (
    <section id="contact-form-section" className="section-y bg-surface !pb-0">
      <PageContainer>
        <div className="bg-jet-black text-pure-white buzz-card-round-top py-12 md:py-20 lg:py-24">
        <h2 className="section-heading text-pure-white mb-10 md:mb-14">
          Let&apos;s Connect
        </h2>

        {submitted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
            <div className="w-14 h-14 border-2 border-electric-lime flex items-center justify-center mx-auto mb-6">
              <Check className="w-7 h-7 text-electric-lime" />
            </div>
            <p className="text-headline-md font-serif">Thank you! Your submission has been received.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
              {(
                [
                  ["fullName", "Full name", "text"],
                  ["email", "Email", "email"],
                  ["phone", "Phone", "tel"],
                  ["companyName", "Company name", "text"],
                  ["designation", "Your designation", "text"],
                ] as const
              ).map(([field, label, type]) => (
                <div key={field}>
                  <label className="text-label-caps text-pure-white/50 block mb-1">{label}</label>
                  <input
                    type={type}
                    required
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="text-label-caps text-pure-white/50 block mb-1">
                  How did you hear about us
                </label>
                <select
                  required
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="" className="text-jet-black">
                    Select one
                  </option>
                  {formSources.map((s) => (
                    <option key={s} value={s} className="text-jet-black">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-10">
              <p className="text-label-caps text-pure-white/50 mb-4">I am interested in</p>
              <div className="flex flex-wrap gap-3">
                {formInterests.map((interest) => (
                  <label
                    key={interest}
                    className={`flex items-center gap-2 px-4 py-2 border cursor-pointer buzz-card-round-sm text-sm transition-colors ${
                      formData.interests.includes(interest)
                        ? "bg-electric-lime text-jet-black border-electric-lime"
                        : "border-pure-white/30 hover:border-pure-white"
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

            <div className="mb-10">
              <p className="text-label-caps text-pure-white/50 mb-4">My budget is</p>
              <div className="flex flex-col gap-3">
                {formBudgets.map((b) => (
                  <label
                    key={b}
                    className={`flex items-center gap-3 px-4 py-3 border cursor-pointer buzz-card-round-sm transition-colors ${
                      formData.budget === b
                        ? "bg-electric-lime text-jet-black border-electric-lime"
                        : "border-pure-white/30 hover:border-pure-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="budget"
                      required
                      className="accent-electric-lime"
                      checked={formData.budget === b}
                      onChange={() => setFormData({ ...formData, budget: b })}
                    />
                    {b}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <label className="text-label-caps text-pure-white/50 block mb-1">Write your message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="px-10 py-4 bg-electric-lime text-jet-black font-bold text-label-caps hover:bg-pure-white transition-colors cursor-pointer buzz-card-round-sm"
            >
              Submit
            </button>
          </form>
        )}

        <p className="text-pure-white/30 text-sm mt-12">{brand.name}</p>
        </div>
      </PageContainer>
    </section>
  );
}
