
import Link from "next/link";
import { notFound } from "next/navigation";

const PHONE = "919430557450";

const services = {
  "flight-booking": {
    icon: "✈️",
    title: "Flight Booking",
    subtitle: "Your journey begins with the right booking.",
    description:
      "Planning a domestic or international trip? Get assistance with flight enquiries, travel dates, routes and ticket booking through our booking partners.",
    benefits: [
      "Domestic flight enquiries",
      "International flight enquiries",
      "Travel date and route assistance",
      "Booking and ticket support",
    ],
    steps: [
      "Share your departure city and destination.",
      "Tell us your preferred travel date.",
      "We check available options with our booking provider.",
      "Review the details and confirm through the authorised process.",
    ],
    faqs: [
      ["Can I enquire about international flights?", "Yes. Share your destination and travel date to check available options."],
      ["What information should I provide?", "Your departure city, destination, travel date and passenger count. Avoid sending sensitive identity documents through ordinary WhatsApp messages."],
      ["Can I book through WhatsApp?", "You can start an enquiry through WhatsApp. Booking and payment depend on the authorised provider's process."],
    ],
  },
  "bus-booking": {
    icon: "🚌",
    title: "Bus Booking",
    subtitle: "Make your next road journey easier.",
    description:
      "Need help planning a bus journey? Contact Keshri Travels for route enquiries, travel date assistance and ticket booking support.",
    benefits: [
      "Bus route enquiries",
      "Travel date assistance",
      "Passenger information guidance",
      "Ticket booking assistance",
    ],
    steps: [
      "Share your starting location.",
      "Tell us your destination and travel date.",
      "We check available travel options.",
      "Review the journey details before confirming.",
    ],
    faqs: [
      ["Can I enquire about different bus routes?", "Yes. Share your starting location and destination."],
      ["What details are needed?", "Your origin, destination, journey date and passenger count."],
      ["Is my ticket confirmed immediately?", "No. Confirmation depends on availability and completion of the provider's booking process."],
    ],
  },
  "aeps-micro-atm": {
    icon: "🏧",
    title: "AEPS & Micro ATM",
    subtitle: "Convenient in-person banking service assistance.",
    description:
      "Keshri Travels provides access to available AEPS and Micro ATM services through authorised banking partners at our physical shop.",
    benefits: [
      "In-person service assistance",
      "AEPS availability enquiries",
      "Micro ATM assistance",
      "Guidance on provider requirements",
    ],
    steps: [
      "Contact us to check service availability.",
      "Visit our shop in Danapur Cantt.",
      "Follow the authorised provider's verification process.",
      "Check your transaction status and receipt.",
    ],
    faqs: [
      ["Can I use AEPS remotely?", "No. This service is available in person at the authorised service point."],
      ["Do I need to visit the shop?", "Yes. These services require an in-person visit and the provider's prescribed verification."],
      ["Are services always available?", "Availability depends on the authorised provider and banking network."],
    ],
  },
  "money-transfer": {
    icon: "💸",
    title: "Money Transfer",
    subtitle: "Get assistance with available transfer services.",
    description:
      "Enquire about eligible money transfer services through authorised service providers at Keshri Travels.",
    benefits: [
      "Service availability enquiries",
      "Provider requirement guidance",
      "In-person assistance where required",
      "Transaction status guidance",
    ],
    steps: [
      "Contact our shop about service availability.",
      "Visit the shop if verification is required.",
      "Follow the authorised provider's process.",
      "Keep your transaction receipt for reference.",
    ],
    faqs: [
      ["Can I send money through this website?", "No. This website only accepts enquiries. Transactions must be completed through authorised provider systems."],
      ["What documents are required?", "Requirements depend on the authorised provider. Contact us before visiting."],
      ["Can I get transaction assistance?", "Yes. You can contact the shop with a general enquiry. Never share OTPs, PINs or passwords."],
    ],
  },
  "pan-card": {
    icon: "🪪",
    title: "PAN Card Services",
    subtitle: "Get guidance with your PAN application process.",
    description:
      "Contact Keshri Travels for guidance about PAN applications, corrections and related assistance through appropriate authorised channels.",
    benefits: [
      "PAN application guidance",
      "Document requirement information",
      "Application process assistance",
      "General application enquiries",
    ],
    steps: [
      "Contact us about the PAN service you need.",
      "We explain the applicable process and requirements.",
      "Complete your application through the appropriate authorised channel.",
      "Keep your acknowledgement details safe.",
    ],
    faqs: [
      ["Can I apply for a new PAN?", "Contact us to confirm the available application assistance."],
      ["Can I enquire about PAN corrections?", "Yes. Tell us what kind of correction assistance you need."],
      ["Should I send Aadhaar details on WhatsApp?", "No. Do not send Aadhaar numbers, OTPs or sensitive documents through ordinary WhatsApp messages."],
    ],
  },
  investment: {
    icon: "📈",
    title: "SIP, Mutual Funds & Demat",
    subtitle: "Explore available investment-related services.",
    description:
      "Contact Keshri Travels to enquire about available SIP, mutual fund and Demat account-related services through appropriately authorised partners.",
    benefits: [
      "General service enquiries",
      "Demat account process information",
      "SIP-related service enquiries",
      "Partner requirement information",
    ],
    steps: [
      "Tell us which service you want to enquire about.",
      "We confirm whether an appropriately authorised service is available.",
      "Review the provider's documentation and disclosures.",
      "Proceed through the authorised provider's process.",
    ],
    faqs: [
      ["Can I open a Demat account?", "You can enquire about account-opening assistance through an appropriately authorised provider."],
      ["Are investment returns guaranteed?", "No. Mutual funds and market-linked investments involve risk. Returns are not guaranteed."],
      ["Do you provide investment advice?", "This website does not provide investment advice. Regulated activities must be handled by appropriately authorised persons."],
    ],
  },
  "online-services": {
    icon: "💻",
    title: "Other Online Services",
    subtitle: "One place to enquire about everyday online assistance.",
    description:
      "Looking for help with another online service? Contact Keshri Travels and tell us what you need. We will confirm whether assistance is available.",
    benefits: [
      "General online service enquiries",
      "Application process guidance",
      "Service availability confirmation",
      "In-person assistance where applicable",
    ],
    steps: [
      "Tell us which service you need.",
      "We check whether assistance is available.",
      "We explain the applicable requirements.",
      "Proceed through the appropriate official or authorised channel.",
    ],
    faqs: [
      ["Can I ask about a service not listed here?", "Yes. Send us a general enquiry and we will confirm whether we can assist."],
      ["Can all services be completed online?", "No. Some services may require an in-person visit or an authorised provider."],
      ["Do you guarantee application approval?", "No. Approval depends on the relevant authority or service provider."],
    ],
  },
};

type ServiceSlug = keyof typeof services;

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];

  if (!service) {
    return { title: "Service Not Found | Keshri Travels" };
  }

  return {
    title: `${service.title} in Danapur, Patna | Keshri Travels`,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];

  if (!service) notFound();

  const whatsappMessage = `Hello Keshri Travels! I want to enquire about ${service.title}. Please share the details.`;
  const whatsappURL = `https://wa.me/${PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#fafbff] text-slate-900">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="group">
            <span className="block text-xl font-black tracking-tight text-[#10264b] sm:text-2xl">
              KESHRI <span className="text-orange-500">TRAVELS</span>
            </span>
            <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Travel & Digital Services
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-7">
            <Link
              href="/#services"
              className="hidden text-sm font-semibold text-slate-600 transition hover:text-orange-500 sm:block"
            >
              Our Services
            </Link>
            <Link
              href="/#contact"
              className="hidden text-sm font-semibold text-slate-600 transition hover:text-orange-500 sm:block"
            >
              Contact
            </Link>
            <a
              href={whatsappURL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#10264b] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-950/10 transition hover:-translate-y-0.5 hover:bg-orange-500 sm:text-sm"
            >
              Enquire Now <span className="ml-1">↗</span>
            </a>
          </nav>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-5 pt-7 sm:px-8">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 sm:text-sm">
          <Link href="/" className="transition hover:text-orange-500">
            Home
          </Link>
          <span>/</span>
          <Link href="/#services" className="transition hover:text-orange-500">
            Services
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#10264b]">{service.title}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-orange-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-600">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Keshri Travels · Danapur, Patna
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.12] tracking-tight text-[#10264b] sm:text-5xl lg:text-6xl">
              {service.title}
              <span className="text-orange-500">.</span>
            </h1>

            <h2 className="mt-5 text-lg font-bold text-slate-600 sm:text-xl">
              {service.subtitle}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              {service.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappURL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600"
              >
                Enquire on WhatsApp <span className="text-lg">↗</span>
              </a>

              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-[#10264b] transition hover:border-[#10264b]"
              >
                Contact Our Shop
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-semibold text-slate-500 sm:text-sm">
              <span className="flex items-center gap-2">
                <span className="text-lg text-orange-500">✓</span>
                Personal assistance
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg text-orange-500">✓</span>
                Enquiry support
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg text-orange-500">✓</span>
                Local shop assistance
              </span>
            </div>
          </div>

          {/* VISUAL CARD */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-orange-200/50" />
            <div className="relative overflow-hidden rounded-[2rem] bg-[#10264b] p-8 text-white shadow-2xl shadow-blue-950/20 sm:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5" />
              <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border-[35px] border-orange-500/20" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">
                    Our Services
                  </span>
                  <span className="text-4xl">{service.icon}</span>
                </div>

                <div className="mt-16">
                  <p className="text-sm font-medium text-blue-200">
                    Your local assistance point
                  </p>
                  <h3 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                    Making everyday services simpler.
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-blue-100/70">
                    Connect with our team to understand the available service and the next steps.
                  </p>
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-white/15 pt-6">
                  <div>
                    <p className="text-xs text-blue-200/70">Visit us</p>
                    <p className="mt-1 text-sm font-bold">Danapur Cantt, Patna</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-xl">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-100 px-5 py-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
          <div className="flex items-center justify-center gap-3 py-4 sm:py-2">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-sm font-bold text-[#10264b]">Local assistance</p>
              <p className="text-xs text-slate-400">Danapur Cantt, Patna</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 py-4 sm:py-2">
            <span className="text-2xl">💬</span>
            <div>
              <p className="text-sm font-bold text-[#10264b]">Easy enquiries</p>
              <p className="text-xs text-slate-400">Connect through WhatsApp</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 py-4 sm:py-2">
            <span className="text-2xl">🤝</span>
            <div>
              <p className="text-sm font-bold text-[#10264b]">Personal support</p>
              <p className="text-xs text-slate-400">Guidance on next steps</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
            What we offer
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#10264b] sm:text-4xl">
            How we can help you
          </h2>
          <p className="mt-4 leading-7 text-slate-500">
            Get information and assistance for the services you need, with clear guidance on the next steps.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {service.benefits.map((benefit, index) => (
            <div
              key={benefit}
              className="group rounded-2xl border border-slate-200/80 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-lg font-black text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                0{index + 1}
              </div>
              <h3 className="mt-7 text-base font-bold leading-7 text-[#10264b]">
                {benefit}
              </h3>
              <div className="mt-6 h-1 w-10 rounded-full bg-orange-400 transition-all group-hover:w-16" />
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#10264b] px-5 py-20 text-white sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-400">
              Simple process
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 leading-7 text-blue-100/70">
              Start with a simple enquiry. We will help you understand the available options and process.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 transition hover:bg-white/10"
              >
                <span className="text-4xl font-black text-orange-400">
                  0{index + 1}
                </span>
                <div className="my-6 h-px w-full bg-white/10" />
                <p className="text-sm leading-7 text-blue-50/90">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
            Need to know
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#10264b] sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            A few helpful answers before you get in touch.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {service.faqs.map(([question, answer], index) => (
            <details
              key={question}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition open:border-orange-200 open:shadow-lg open:shadow-orange-100/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#10264b]">
                <span className="flex items-center gap-4">
                  <span className="text-sm font-black text-orange-500">
                    0{index + 1}
                  </span>
                  {question}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg transition group-open:rotate-45 group-open:bg-orange-100 group-open:text-orange-600">
                  +
                </span>
              </summary>
              <p className="mt-5 border-t border-slate-100 pt-5 pl-9 text-sm leading-7 text-slate-500">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-orange-500 px-7 py-14 text-center text-white sm:px-16 sm:py-20">
          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border-[45px] border-white/10" />
          <div className="absolute -bottom-36 -left-20 h-80 w-80 rounded-full border-[45px] border-white/10" />

          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-100">
              We are here to help
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
              Need help with {service.title}?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-orange-50 sm:text-base">
              Get in touch with Keshri Travels. Tell us what you need and our team will guide you through the next steps.
            </p>
            <a
              href={whatsappURL}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black text-[#10264b] shadow-xl transition hover:-translate-y-1 hover:bg-[#10264b] hover:text-white"
            >
              Start Your Enquiry <span className="text-lg">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#091a35] px-5 py-14 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <Link href="/" className="text-2xl font-black tracking-tight">
              KESHRI <span className="text-orange-500">TRAVELS</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-blue-100/60">
              Your local destination for travel enquiries and everyday digital service assistance in Danapur Cantt, Patna.
            </p>
          </div>

          <div className="md:ml-auto">
            <h3 className="font-bold">Get in touch</h3>
            <p className="mt-4 text-sm text-blue-100/60">
              Danapur Cantt, Patna, Bihar
            </p>
            <a
              href="tel:+919430557450"
              className="mt-2 block text-sm font-semibold text-white transition hover:text-orange-400"
            >
              +91 94305 57450
            </a>
            <a
              href={whatsappURL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm font-bold text-orange-400 hover:text-orange-300"
            >
              Chat on WhatsApp ↗
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-7">
          <p className="text-xs leading-6 text-blue-100/40">
            © 2026 Keshri Travels. All rights reserved.
          </p>
          <p className="mt-4 max-w-4xl text-[11px] leading-6 text-blue-100/40">
            Services are subject to provider availability and applicable authorisations. AEPS, Micro ATM and money transfer services are provided only through authorised partners where available. Investment-related services are subject to applicable regulations and market risks. This website is an enquiry channel, not a bank, government portal or investment adviser. Never share OTPs, PINs, passwords, Aadhaar numbers or banking credentials through this website or ordinary WhatsApp messages.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block text-xs font-bold text-orange-400 transition hover:text-white"
          >
            ← Back to Homepage
          </Link>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={whatsappURL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Keshri Travels on WhatsApp"
        className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-2xl shadow-green-900/30 transition hover:scale-110 hover:bg-green-600 sm:right-8"
      >
        ☎
      </a>
    </main>
  );
}
