import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    try {
      const apiKey = import.meta.env.VITE_BREVO_API_KEY;
      const senderEmail = import.meta.env.VITE_SENDER_EMAIL;
      const ownerEmail = import.meta.env.VITE_OWNER_EMAIL;

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          sender: { name: "Neti Academy Website", email: senderEmail },
          to: [{ email: ownerEmail, name: "Neti Academy Admin" }],
          subject: "New Newsletter Subscription",
          htmlContent: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
              <h2 style="color: #1e3a8a;">New Subscriber</h2>
              <p>Great news! A new student has subscribed to the Neti Academy Daily Newsletter.</p>
              <p><strong>Subscriber Email:</strong> ${email}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #666;">This is an automated notification from your Neti Academy website.</p>
            </div>
          `
        })
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        // Reset success message after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Brand & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl font-playfair font-bold text-blue-900 mb-6">NETI ACADEMY</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              A platform for focused exam preparation, with clarity, discipline, and mental balance.
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Subscribe to get the current affairs and updates via email.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="w-full max-w-xs space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-900 transition-all font-inter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${status === "success"
                  ? "bg-green-600 text-white"
                  : status === "error"
                    ? "bg-red-600 text-white"
                    : "bg-blue-900 text-white hover:bg-blue-800 shadow-md active:scale-95"
                  }`}
              >
                {status === "submitting" ? "Subscribing..." :
                  status === "success" ? "Subscribed! ✓" :
                    status === "error" ? "Try Again" : "Subscribe Now"}
              </button>
            </form>
          </div>

          {/* Newsletter/CTA */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Stay Updated</h4>
            <p className="text-sm text-slate-500 mb-6 italic leading-relaxed">
              "Get clarity and daily updates directly in your phone with our community."
            </p>

            <div className="w-full max-w-sm">
              <a
                href="https://t.me/netiacademy01"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 text-white px-8 py-4 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all text-center flex items-center justify-center gap-3 shadow-lg active:scale-95 group"
              >
                Join Telegram Channel
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] md:text-xs text-slate-400">
            © {currentYear} Neti Academy. All rights reserved.
          </p>
          <div className="text-[10px] md:text-xs text-slate-400 font-medium tracking-tight">
            Clarifying the Journey, One Topic at a Time.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
