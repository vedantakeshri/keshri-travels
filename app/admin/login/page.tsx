
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "../../lib/supabase";

// export default function AdminLogin() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     setLoading(false);

//     if (error) {
//       setError(error.message);
//       return;
//     }

//     router.push("/admin/dashboard");
//   }

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5">
//       <form
//         onSubmit={handleLogin}
//         className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
//       >
//         <h1 className="text-3xl font-black text-blue-950 text-center">
//           KESHRI <span className="text-orange-500">TRAVELS</span>
//         </h1>

//         <p className="mt-3 text-slate-500 text-center">Admin Login</p>

//         <label className="mt-8 block font-semibold">
//           Email
//           <input
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-2 w-full rounded-lg border p-3"
//             placeholder="Admin email"
//           />
//         </label>

//         <label className="mt-5 block font-semibold">
//           Password
//           <input
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-2 w-full rounded-lg border p-3"
//             placeholder="Password"
//           />
//         </label>

//         {error && (
//           <p className="mt-4 text-sm text-red-600">{error}</p>
//         )}

//         <button
//           disabled={loading}
//           className="mt-7 w-full rounded-lg bg-orange-500 py-4 font-bold text-white disabled:opacity-60"
//         >
//           {loading ? "Logging in..." : "Login to Dashboard"}
//         </button>

//         <a href="/" className="mt-6 block text-center text-sm text-blue-700">
//           Back to Website
//         </a>
//       </form>
//     </main>
//   );
// }








"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setError(
          error.message === "Invalid login credentials"
            ? "Incorrect email or password. Please try again."
            : error.message
        );
        return;
      }

      router.replace("/admin/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b1426] p-4 sm:p-6">

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-2xl lg:min-h-[680px] lg:grid-cols-2">

        {/* LEFT BRAND PANEL */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#101d38] via-[#172c50] to-[#263e66] p-10 text-white lg:flex xl:p-14">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-20 top-32 h-56 w-56 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-36 -left-28 h-96 w-96 rounded-full border border-orange-400/10" />

          {/* BRAND */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-2xl font-black shadow-lg shadow-orange-950/30">
                K
              </div>

              <div>
                <h1 className="text-xl font-black tracking-wide">
                  KESHRI <span className="text-orange-400">TRAVELS</span>
                </h1>
                <p className="mt-0.5 text-xs tracking-widest text-blue-200">
                  YOUR TRUSTED SERVICE PARTNER
                </p>
              </div>
            </div>
          </div>

          {/* MAIN MESSAGE */}
          <div className="relative z-10 max-w-md">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-blue-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              BUSINESS ADMINISTRATION PORTAL
            </div>

            <h2 className="text-4xl font-black leading-tight xl:text-5xl">
              Everything your business needs,
              <span className="mt-2 block text-orange-400">
                in one place.
              </span>
            </h2>

            <p className="mt-6 text-base leading-8 text-blue-100/75">
              Manage customer enquiries, organise bookings and stay connected
              with your customers through your dedicated business workspace.
            </p>

            <div className="mt-10 space-y-5">
              {[
                ["01", "Manage customer enquiries"],
                ["02", "Track bookings and follow-ups"],
                ["03", "Stay connected with customers"],
              ].map(([number, label]) => (
                <div key={number} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-orange-400">
                    {number}
                  </span>
                  <span className="text-sm font-medium text-blue-50">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-blue-200/60">
            <span>Danapur Cantt, Patna, Bihar</span>
            <span>© 2026 Keshri Travels</span>
          </div>
        </section>

        {/* RIGHT LOGIN PANEL */}
        <section className="flex items-center justify-center bg-white px-6 py-12 sm:px-12 lg:px-14">

          <div className="w-full max-w-md">

            {/* MOBILE BRAND */}
            <div className="mb-12 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#142746] text-2xl font-black text-orange-400">
                K
              </div>
              <div>
                <h1 className="text-lg font-black text-[#142746]">
                  KESHRI <span className="text-orange-500">TRAVELS</span>
                </h1>
                <p className="text-xs tracking-wider text-slate-400">
                  ADMINISTRATION PORTAL
                </p>
              </div>
            </div>

            {/* HEADING */}
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-orange-600">
                ↗
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
                Welcome back
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#142746] sm:text-4xl">
                Admin Login
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in to access your Keshri Travels business dashboard.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleLogin} className="mt-9 space-y-6">

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                    ✉
                  </span>

                  <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your admin email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                    ◆
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-16 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-orange-600"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
                >
                  <div className="font-bold">Login unsuccessful</div>
                  <p className="mt-1">{error}</p>
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#142746] py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-[#1d385f] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to Dashboard
                    <span className="text-lg text-orange-400">→</span>
                  </>
                )}
              </button>
            </form>

            {/* SECURITY NOTE */}
            <div className="mt-8 flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <span className="text-lg text-emerald-600">✓</span>
              <div>
                <p className="text-xs font-bold text-slate-700">
                  Secure admin access
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  This portal is restricted to authorised Keshri Travels
                  administrators.
                </p>
              </div>
            </div>

            {/* BACK TO WEBSITE */}
            <a
              href="/"
              className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-600"
            >
              <span>←</span> Back to Keshri Travels website
            </a>

            <p className="mt-8 text-center text-xs text-slate-400">
              © 2026 Keshri Travels. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
