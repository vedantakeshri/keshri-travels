
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { supabase } from "./lib/supabase";

// const PHONE = "919430557450"; // Confirm brother's WhatsApp number

// const services = [
//   ["✈️", "Flight Booking", "Domestic and international flight booking enquiries."],
//   ["🚌", "Bus Booking", "Bus ticket booking assistance."],
//   ["🏧", "AEPS & Micro ATM", "Banking services through authorised providers."],
//   ["💸", "Money Transfer", "Money transfer assistance through authorised providers."],
//   ["🪪", "PAN Card Services", "PAN application assistance."],
//   ["📈", "SIP, Mutual Funds & Demat", "Enquiries about available authorised services."],
//   ["💻", "Other Online Services", "Contact us for other digital services."],
// ];

// export default function Home() {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [service, setService] = useState("Flight Booking");
//   const [message, setMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);


// async function sendEnquiry(e: React.FormEvent<HTMLFormElement>) {
//   e.preventDefault();

//   if (isSubmitting) return;

//   setIsSubmitting(true);

//   try {
//     // Save enquiry in Supabase
//     const { error } = await supabase
//       .from("enquiries")
//       .insert([
//         {
//           name: name.trim(),
//           phone: mobile.trim(),
//           service: service,
//           message: message.trim() || null,
//         },
//       ]);

//     if (error) {
//       console.error("Supabase error:", error);
//       alert("Unable to save your enquiry. Please try again.");
//       return;
//     }

//     // Open WhatsApp after successful database insertion
//     const text = `Hello Keshri Travels!
// Name: ${name}
// Mobile: ${mobile}
// Service: ${service}
// Message: ${message}`;

//     const whatsappURL =
//       `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

//     window.location.assign(whatsappURL);

//   } catch (error) {
//     console.error("Enquiry submission error:", error);
//     alert("Something went wrong. Please try again.");
//   } finally {
//     setIsSubmitting(false);
//   }
// }


//   return (
//     <main className="min-h-screen bg-white text-slate-900">

//       {/* NAVBAR */}
//       <header className="sticky top-0 z-50 bg-white shadow-sm">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
//           <h1 className="text-2xl font-black text-blue-950">
//             KESHRI <span className="text-orange-500">TRAVELS</span>
//           </h1>

//           <nav className="hidden gap-7 font-semibold md:flex">
//             <a href="#home">Home</a>
//             <a href="#services">Services</a>
//             <a href="#about">About</a>
//             <a href="#contact">Contact</a>
//           </nav>

//           <a
//             href={`tel:+${PHONE}`}
//             className="rounded-lg bg-blue-950 px-5 py-3 font-bold text-white"
//           >
//             Call Now
//           </a>
//         </div>
//       </header>

//       {/* HERO */}
//       <section
//         id="home"
//         className="bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white"
//       >
//         <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">
//           <div>
//             <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-orange-300">
//               YOUR LOCAL DIGITAL SERVICE PARTNER
//             </span>

//             <h2 className="mt-8 text-5xl font-black leading-tight md:text-6xl">
//               Travel & Digital Services
//               <span className="text-orange-400"> Made Simple.</span>
//             </h2>

//             <p className="mt-6 text-lg leading-8 text-blue-100">
//               Flight booking, bus booking, PAN assistance,
//               AEPS, money transfer and more.
//               Get friendly assistance from Keshri Travels.
//             </p>

//             <div className="mt-9 flex flex-wrap gap-4">
//               <a
//                 href="#contact"
//                 className="rounded-lg bg-orange-500 px-7 py-4 font-bold text-white hover:bg-orange-600"
//               >
//                 Send an Enquiry →
//               </a>

//               <a
//                 href={`https://wa.me/${PHONE}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="rounded-lg border border-white/40 px-7 py-4 font-bold"
//               >
//                 WhatsApp Us
//               </a>
//             </div>

//             <p className="mt-8 text-sm text-blue-200">
//               📍 Danapur Cantt, Patna, Bihar
//             </p>
//           </div>

//           <div className="rounded-3xl bg-white p-8 text-slate-900 shadow-2xl">
//             <p className="font-bold uppercase tracking-widest text-orange-500">
//               Keshri Travels
//             </p>

//             <h3 className="mt-4 text-3xl font-black">
//               How can we help you today?
//             </h3>

//             <div className="mt-7 space-y-3">
//               {services.slice(0, 5).map((item) => (
//                 <a
//                   href="#contact"
//                   key={item[1]}
//                   onClick={() => setService(item[1])}
//                   className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 font-semibold hover:bg-orange-50"
//                 >
//                   <span className="text-2xl">{item[0]}</span>
//                   {item[1]}
//                   <span className="ml-auto text-orange-500">↗</span>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SERVICES */}
//       <section id="services" className="mx-auto max-w-7xl px-6 py-24">
//         <div className="text-center">
//           <p className="font-bold uppercase tracking-widest text-orange-500">
//             WHAT WE OFFER
//           </p>
//           <h2 className="mt-4 text-4xl font-black">
//             Our Services
//           </h2>
//           <p className="mx-auto mt-4 max-w-xl text-slate-500">
//             Explore our services and contact us for assistance.
//           </p>
//         </div>

//         <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {services.map((item) => (
//             <article
//               key={item[1]}
//               className="rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-2 hover:border-orange-300 hover:shadow-xl"
//             >
//               <div className="text-4xl">{item[0]}</div>

//               <h3 className="mt-5 text-xl font-bold">
//                 {item[1]}
//               </h3>

//               <p className="mt-3 leading-7 text-slate-500">
//                 {item[2]}
//               </p>



//               <Link
//   href={`/services/${[
//     "flight-booking",
//     "bus-booking",
//     "aeps-micro-atm",
//     "money-transfer",
//     "pan-card",
//     "investment",
//     "online-services",
//   ][services.findIndex((s) => s[1] === item[1])]}`}
//   className="mt-6 inline-block font-bold text-orange-600"
// >
//   Explore Service →
// </Link>
//             </article>
//           ))}
//         </div>
//       </section>

//       {/* ABOUT */}
//       <section id="about" className="bg-slate-50 px-6 py-24">
//         <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
//           <div>
//             <p className="font-bold uppercase tracking-widest text-orange-500">
//               ABOUT US
//             </p>

//             <h2 className="mt-5 text-4xl font-black">
//               Your Local Partner for Travel & Digital Services
//             </h2>
//           </div>

//           <div>
//             <p className="leading-8 text-slate-600">
//               Keshri Travels is based in Danapur Cantt, Patna.
//               We help customers with travel booking enquiries
//               and various digital services. Contact our team
//               or visit our shop to discuss your requirements.
//             </p>

//             <a
//               href="#contact"
//               className="mt-7 inline-block rounded-lg bg-blue-950 px-7 py-4 font-bold text-white"
//             >
//               Contact Us →
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* CONTACT FORM */}
//       <section id="contact" className="bg-blue-950 px-6 py-24 text-white">
//         <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
//           <div>
//             <p className="font-bold uppercase tracking-widest text-orange-400">
//               GET IN TOUCH
//             </p>

//             <h2 className="mt-5 text-5xl font-black">
//               Let's Talk About Your Requirements.
//             </h2>

//             <p className="mt-6 leading-8 text-blue-200">
//               Send your enquiry and our team will get in touch.
//             </p>

//             <div className="mt-9 space-y-4">
//               <p>📍 Danapur Cantt, Patna, Bihar</p>
//               <p>📞 +91 94305 57450</p>
//             </div>
//           </div>

//           <form
//             onSubmit={sendEnquiry}
//             className="rounded-2xl bg-white p-8 text-slate-900"
//           >
//             <h3 className="text-2xl font-black">Send an Enquiry</h3>

//             <label className="mt-6 block font-semibold">
//               Your Name
//               <input
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your name"
//                 className="mt-2 w-full rounded-lg border p-4"
//               />
//             </label>

//             <label className="mt-5 block font-semibold">
//               Mobile Number
//               <input
//                 required
//                 type="tel"
//                 pattern="[0-9]{10}"
//                 maxLength={10}
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//                 placeholder="10-digit mobile number"
//                 className="mt-2 w-full rounded-lg border p-4"
//               />
//             </label>

//             <label className="mt-5 block font-semibold">
//               Select Service
//               <select
//                 value={service}
//                 onChange={(e) => setService(e.target.value)}
//                 className="mt-2 w-full rounded-lg border bg-white p-4"
//               >
//                 {services.map((item) => (
//                   <option key={item[1]} value={item[1]}>
//                     {item[1]}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label className="mt-5 block font-semibold">
//               Your Requirement
//               <textarea
//                 rows={4}
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Tell us what you need..."
//                 className="mt-2 w-full rounded-lg border p-4"
//               />
//             </label>



//             <button
//   type="submit"
//   disabled={isSubmitting}
//   className="mt-7 w-full rounded-lg bg-green-600 py-4 font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
// >
//   {isSubmitting ? "Saving Enquiry..." : "Send on WhatsApp →"}
// </button>

//             <p className="mt-3 text-xs text-slate-500">
//               Do not enter Aadhaar numbers, OTPs, PINs,
//               passwords or banking credentials.
//             </p>
//           </form>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-slate-950 px-6 py-10 text-white">
//         <div className="mx-auto max-w-7xl">
//           <h2 className="text-2xl font-black">
//             KESHRI <span className="text-orange-500">TRAVELS</span>
//           </h2>

//           <p className="mt-4 text-sm text-slate-400">
//             Danapur Cantt, Patna, Bihar
//           </p>

//           <p className="mt-2 text-sm text-slate-400">
//             Phone: +91 94305 57450
//           </p>

//           <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-6 text-slate-500">
//             Services are subject to provider availability and applicable
//             authorisations. Keshri Travels is not a bank, government
//             portal or investment adviser.
//           </p>

//           <p className="mt-4 text-xs text-slate-500">
//             © {new Date().getFullYear()} Keshri Travels. All rights reserved.
//           </p>
//         </div>
//       </footer>

//       {/* FLOATING WHATSAPP */}
//       <a
//         href={`https://wa.me/${PHONE}`}
//         target="_blank"
//         rel="noreferrer"
//         className="fixed bottom-6 right-6 rounded-full bg-green-500 px-6 py-4 font-bold text-white shadow-xl"
//       >
//         WhatsApp
//       </a>
//     </main>
//   );
// }










"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "./lib/supabase";

const PHONE = "919430557450";

const services = [
  {
    icon: "✈",
    number: "01",
    title: "Flight Booking",
    description: "Explore domestic and international flight booking assistance.",
    slug: "flight-booking",
    tag: "TRAVEL",
  },
  {
    icon: "▰",
    number: "02",
    title: "Bus Booking",
    description: "Get assistance with bus ticket bookings and travel enquiries.",
    slug: "bus-booking",
    tag: "TRAVEL",
  },
  {
    icon: "⌂",
    number: "03",
    title: "AEPS & Micro ATM",
    description: "Access available banking services through authorised providers.",
    slug: "aeps-micro-atm",
    tag: "DIGITAL SERVICES",
  },
  {
    icon: "⇄",
    number: "04",
    title: "Money Transfer",
    description: "Money transfer assistance through authorised service providers.",
    slug: "money-transfer",
    tag: "DIGITAL SERVICES",
  },
  {
    icon: "▤",
    number: "05",
    title: "PAN Card Services",
    description: "Get assistance with PAN application-related services.",
    slug: "pan-card",
    tag: "DOCUMENTATION",
  },
  {
    icon: "↗",
    number: "06",
    title: "SIP, Mutual Funds & Demat",
    description: "Enquire about available investment and account-related services.",
    slug: "investment",
    tag: "FINANCIAL SERVICES",
  },
  {
    icon: "⌘",
    number: "07",
    title: "Other Online Services",
    description: "Tell us what you need help with. Our team will guide you.",
    slug: "online-services",
    tag: "DIGITAL SERVICES",
  },
];

export default function Home() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState("Flight Booking");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function sendEnquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("enquiries").insert([
        {
          name: name.trim(),
          phone: mobile.trim(),
          service,
          message: message.trim() || null,
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        alert("Unable to save your enquiry. Please try again.");
        return;
      }

      const text = `Hello Keshri Travels!

Name: ${name.trim()}
Mobile: ${mobile}
Service: ${service}
Message: ${message.trim() || "No additional message"}

I submitted an enquiry through your website.`;

      window.location.assign(
        `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`
      );
    } catch (error) {
      console.error("Enquiry submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf7] text-[#14233b]">

      {/* TOP ANNOUNCEMENT */}
      <div className="bg-[#14233b] px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        Your local partner for travel & digital services
        <span className="mx-2 text-orange-400">•</span>
        Danapur Cantt, Patna
      </div>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#14233b] text-2xl font-black text-orange-400 shadow-sm">
              K
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight sm:text-xl">
                KESHRI <span className="text-orange-500">TRAVELS</span>
              </h1>
              <p className="text-[9px] font-bold tracking-[0.2em] text-slate-400 sm:text-[10px]">
                TRAVEL & DIGITAL SERVICES
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
            <a href="#home" className="transition hover:text-orange-500">Home</a>
            <a href="#services" className="transition hover:text-orange-500">Services</a>
            <a href="#about" className="transition hover:text-orange-500">About Us</a>
            <a href="#contact" className="transition hover:text-orange-500">Contact</a>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href={`tel:+${PHONE}`} className="text-sm font-bold text-[#14233b] hover:text-orange-500">
              +91 94305 57450
            </a>
            <a
              href="#contact"
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Get Assistance <span className="ml-2">↗</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-xl lg:hidden"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-slate-100 bg-white px-5 py-5 lg:hidden">
            {[
              ["Home", "#home"],
              ["Services", "#services"],
              ["About Us", "#about"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700"
              >
                {label}
              </a>
            ))}
            <a
              href={`tel:+${PHONE}`}
              className="mt-4 block rounded-xl bg-orange-500 px-5 py-3 text-center text-sm font-bold text-white"
            >
              Call Keshri Travels
            </a>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative bg-[#f5f3ed]">
        <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-orange-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Welcome to Keshri Travels
            </div>

            <h2 className="mt-7 max-w-2xl text-4xl font-black leading-[1.12] tracking-tight text-[#14233b] sm:text-5xl lg:text-6xl">
              Your everyday
              <span className="block">travel & digital</span>
              <span className="block text-orange-500">service partner.</span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              From flight and bus booking to essential digital services,
              Keshri Travels helps you get things done with friendly,
              convenient assistance.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#services"
                className="rounded-xl bg-[#14233b] px-7 py-4 text-center text-sm font-bold text-white shadow-xl shadow-blue-950/10 transition hover:-translate-y-1 hover:bg-[#203b60]"
              >
                Explore Our Services <span className="ml-2 text-orange-400">→</span>
              </a>

              <a
                href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hello Keshri Travels, I would like to know more about your services.")}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 text-center text-sm font-bold text-[#14233b] transition hover:border-orange-400 hover:text-orange-600"
              >
                WhatsApp Us ↗
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-slate-200 pt-7">
              <div>
                <p className="text-lg font-black text-[#14233b]">7+</p>
                <p className="mt-1 text-xs text-slate-500">Service categories</p>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <p className="text-lg font-black text-[#14233b]">Local</p>
                <p className="mt-1 text-xs text-slate-500">Customer assistance</p>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <p className="text-lg font-black text-[#14233b]">In-person</p>
                <p className="mt-1 text-xs text-slate-500">Shop support available</p>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-orange-300/40 blur-2xl" />

            <div className="relative overflow-hidden rounded-[30px] bg-[#14233b] p-5 shadow-2xl shadow-blue-950/20 sm:p-7">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10" />

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                    Your service desk
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                    How can we help?
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl text-orange-400">
                  ✦
                </div>
              </div>

              <div className="relative z-10 mt-8 grid grid-cols-2 gap-3">
                {services.slice(0, 6).map((item) => (
                  <a
                    key={item.slug}
                    href="#contact"
                    onClick={() => setService(item.title)}
                    className="group rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition hover:-translate-y-1 hover:border-orange-400/60 hover:bg-white/10"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/15 text-2xl text-orange-300">
                      {item.icon}
                    </span>
                    <p className="mt-4 text-sm font-bold text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-xs text-blue-200/60">
                      Enquire now ↗
                    </p>
                  </a>
                ))}
              </div>

              <div className="relative z-10 mt-5 flex items-center justify-between rounded-2xl bg-orange-500 p-4">
                <div>
                  <p className="text-xs font-semibold text-orange-100">
                    Need personal assistance?
                  </p>
                  <p className="mt-1 text-sm font-black text-white">
                    Talk to our team
                  </p>
                </div>
                <a
                  href={`tel:+${PHONE}`}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl text-orange-600"
                  aria-label="Call Keshri Travels"
                >
                  ☎
                </a>
              </div>
            </div>

            <div className="relative mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600">
                ✓
              </span>
              <div>
                <p className="text-sm font-bold text-[#14233b]">
                  Personal assistance, close to home
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Danapur Cantt, Patna, Bihar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
                WHAT WE DO
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#14233b] sm:text-5xl">
                Services designed around your needs.
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-slate-500">
                Discover our travel, documentation and digital service
                categories. Select a service to learn more or send an enquiry.
              </p>
            </div>
            <a href="#contact" className="shrink-0 text-sm font-bold text-orange-600 hover:text-orange-700">
              Talk to our team ↗
            </a>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <article
                key={item.slug}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f4f6] text-3xl transition group-hover:bg-orange-50">
                    {item.icon}
                  </div>
                  <span className="text-xs font-black tracking-widest text-slate-300">
                    {item.number}
                  </span>
                </div>

                <p className="mt-7 text-[10px] font-black tracking-[0.18em] text-orange-500">
                  {item.tag}
                </p>

                <h3 className="mt-2 text-xl font-black text-[#14233b]">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                  {item.description}
                </p>

                <Link
                  href={`/services/${item.slug}`}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#14233b] transition group-hover:text-orange-600"
                >
                  Explore service <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-24 bg-[#f3f2ed] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
              ABOUT KESHRI TRAVELS
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-[#14233b] sm:text-5xl">
              Helpful services.
              <span className="block text-orange-500">
                A local connection.
              </span>
            </h2>
            <p className="mt-7 leading-8 text-slate-600">
              Based in Danapur Cantt, Patna, Keshri Travels assists customers
              with travel booking enquiries and a range of digital services.
              Whether you need help exploring a travel option or finding
              assistance with an online service, our team is here to guide you.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex rounded-xl bg-[#14233b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#203b60]"
            >
              Get in touch <span className="ml-3 text-orange-400">→</span>
            </a>
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-[#14233b] p-7 text-white shadow-xl sm:p-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                VISIT OUR SHOP
              </p>
              <h3 className="mt-5 text-3xl font-black sm:text-4xl">
                We're right here in your neighbourhood.
              </h3>
              <p className="mt-5 leading-7 text-blue-100/70">
                Visit Keshri Travels in Danapur Cantt, Patna, to discuss
                your requirements and available services.
              </p>

              <div className="mt-9 border-t border-white/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  OUR LOCATION
                </p>
                <p className="mt-3 text-lg font-bold">
                  Danapur Cantt, Patna
                </p>
                <p className="mt-1 text-sm text-blue-200">
                  Bihar, India
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Keshri+Travels+Danapur+Cantt+Patna+Bihar"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Find us on Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">

          <div className="pt-2">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
              LET'S CONNECT
            </p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#14233b] sm:text-5xl">
              Tell us what you need.
            </h2>
            <p className="mt-6 max-w-md leading-8 text-slate-500">
              Share your requirement with us. Submit the form and continue
              the conversation through WhatsApp.
            </p>

            <div className="mt-10 space-y-5">
              <a href={`tel:+${PHONE}`} className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-xl text-orange-600">
                  ☎
                </span>
                <span>
                  <span className="block text-xs text-slate-400">CALL US</span>
                  <span className="mt-1 block font-bold text-[#14233b]">
                    +91 94305 57450
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-xl text-orange-600">
                  ⌖
                </span>
                <span>
                  <span className="block text-xs text-slate-400">VISIT US</span>
                  <span className="mt-1 block font-bold text-[#14233b]">
                    Danapur Cantt, Patna, Bihar
                  </span>
                </span>
              </div>
            </div>

            <a
              href={`https://wa.me/${PHONE}`}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex rounded-xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Chat on WhatsApp ↗
            </a>
          </div>

          {/* ENQUIRY FORM */}
          <form
            onSubmit={sendEnquiry}
            className="rounded-[26px] border border-slate-200 bg-[#fbfaf7] p-5 shadow-xl shadow-slate-900/5 sm:p-9"
          >
            <div className="border-b border-slate-200 pb-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
                CUSTOMER ENQUIRY
              </p>
              <h3 className="mt-3 text-2xl font-black text-[#14233b]">
                How can we assist you?
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Fill in the details below to get started.
              </p>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-bold text-slate-700">
                Full name *
                <input
                  required
                  minLength={2}
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </label>

              <label className="block text-sm font-bold text-slate-700">
                Mobile number *
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="10-digit mobile number"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </label>
            </div>

            <label className="mt-5 block text-sm font-bold text-slate-700">
              Service required *
              <select
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-normal outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              >
                {services.map((item) => (
                  <option key={item.slug} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-5 block text-sm font-bold text-slate-700">
              Your requirement
              <textarea
                rows={4}
                maxLength={1000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe what assistance you need..."
                className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving your enquiry..." : "Submit enquiry & continue to WhatsApp"}
              {!isSubmitting && <span>→</span>}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              Please do not enter Aadhaar numbers, OTPs, PINs, banking
              credentials or passwords in this form.
            </p>
          </form>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#14233b] px-5 py-16 text-center text-white sm:px-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-400">
          NEED ASSISTANCE?
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black sm:text-4xl">
          Let's make your next task simpler.
        </h2>
        <p className="mt-4 text-sm text-blue-100/70">
          Contact Keshri Travels for available travel and digital services.
        </p>
        <a
          href={`tel:+${PHONE}`}
          className="mt-7 inline-flex rounded-xl bg-orange-500 px-7 py-4 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          Call +91 94305 57450
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0c1729] px-5 py-12 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-black">
              KESHRI <span className="text-orange-400">TRAVELS</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
              Travel booking enquiries and digital service assistance
              in Danapur Cantt, Patna.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Quick links</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">
              <a href="#home" className="hover:text-orange-400">Home</a>
              <a href="#services" className="hover:text-orange-400">Services</a>
              <a href="#about" className="hover:text-orange-400">About</a>
              <a href="#contact" className="hover:text-orange-400">Contact</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Contact information</h3>
            <p className="mt-4 text-sm text-slate-400">
              Danapur Cantt, Patna, Bihar, India
            </p>
            <a href={`tel:+${PHONE}`} className="mt-3 block text-sm text-slate-400 hover:text-orange-400">
              +91 94305 57450
            </a>
            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-emerald-400">
              WhatsApp us ↗
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-7">
          <p className="text-xs leading-6 text-slate-500">
            Services are subject to provider availability and applicable
            authorisations. Keshri Travels is not a bank, government portal
            or investment adviser. Financial products are subject to
            applicable risks and terms. No returns are guaranteed.
          </p>
          <p className="mt-5 text-xs text-slate-500">
            © {new Date().getFullYear()} Keshri Travels. All rights reserved.
          </p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={`https://wa.me/${PHONE}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Keshri Travels on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white shadow-xl shadow-emerald-900/20 transition hover:-translate-y-1 hover:bg-emerald-700"
      >
        ☎
      </a>
    </main>
  );
}
