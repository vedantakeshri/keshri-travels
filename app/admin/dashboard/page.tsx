
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  service: string;
  message: string | null;
  status: string;
  follow_up_at: string | null;
  created_at: string;
};

const statuses = [
  "New",
  "Contacted",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const statusStyles: Record<string, string> = {
  New: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Contacted: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Confirmed: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Cancelled: "bg-red-50 text-red-700 ring-red-600/20",
};

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDashboard() {
  const router = useRouter();

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadEnquiries = useCallback(async () => {
    setError("");
    setRefreshing(true);

    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setEnquiries((data ?? []) as Enquiry[]);
    }

    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    let active = true;

    async function initialise() {
      const { data, error } = await supabase.auth.getUser();

      if (!active) return;

      if (error || !data.user) {
        router.replace("/admin/login");
        return;
      }

      await loadEnquiries();
    }

    initialise();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.replace("/admin/login");
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router, loadEnquiries]);

  async function updateEnquiry(
    id: string,
    updates: Partial<Pick<Enquiry, "status" | "follow_up_at">>
  ) {
    setUpdatingId(id);
    setError("");

    const { error } = await supabase
      .from("enquiries")
      .update(updates)
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      setEnquiries((current) =>
        current.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        )
      );
    }

    setUpdatingId(null);
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
      return;
    }

    router.replace("/admin/login");
  }

  const services = useMemo(
    () => [...new Set(enquiries.map((item) => item.service))],
    [enquiries]
  );

  const today = dateKey(new Date());

  const followUpsDue = enquiries.filter((item) => {
    if (!item.follow_up_at) return false;
    if (["Completed", "Cancelled"].includes(item.status)) return false;

    return item.follow_up_at.slice(0, 10) <= today;
  });

  const confirmedCount = enquiries.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const newCount = enquiries.filter(
    (item) => item.status === "New"
  ).length;

  const filteredEnquiries = enquiries.filter((item) => {
    const query = search.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.phone.includes(search) ||
      (item.message || "").toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    const matchesService =
      serviceFilter === "All" || item.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  const stats = [
    {
      label: "Total enquiries",
      value: enquiries.length,
      icon: "◫",
      color: "bg-blue-50 text-blue-700",
      note: "All customer enquiries",
    },
    {
      label: "New enquiries",
      value: newCount,
      icon: "✦",
      color: "bg-orange-50 text-orange-700",
      note: "Waiting for response",
    },
    {
      label: "Confirmed",
      value: confirmedCount,
      icon: "✓",
      color: "bg-emerald-50 text-emerald-700",
      note: "Confirmed customers",
    },
    {
      label: "Follow-ups due",
      value: followUpsDue.length,
      icon: "◷",
      color: "bg-violet-50 text-violet-700",
      note: "Due today or overdue",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f6fa] text-slate-800">

      {/* SIDEBAR + MAIN */}
      <div className="min-h-screen lg:flex">

        {/* SIDEBAR */}
        <aside className="bg-[#101c35] text-white lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-xl font-black">
              K
            </div>
            <div>
              <h1 className="text-lg font-black tracking-wide">
                KESHRI <span className="text-orange-400">TRAVELS</span>
              </h1>
              <p className="text-xs text-slate-400">
                Business management
              </p>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto p-4 lg:flex-1 lg:flex-col">
            <a
              href="/admin/dashboard"
              className="flex shrink-0 items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white"
            >
              <span>▦</span> Dashboard
            </a>

            <a
              href="#enquiries"
              className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <span>▤</span> Enquiries
            </a>

            <a
              href="#followups"
              className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <span>◷</span> Follow-ups
            </a>
          </nav>

          <div className="hidden border-t border-white/10 p-5 lg:block">
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">Business location</p>
              <p className="mt-2 text-sm font-semibold">Danapur Cantt</p>
              <p className="text-xs text-slate-400">Patna, Bihar</p>
            </div>

            <button
              onClick={logout}
              className="mt-4 w-full rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-red-500/20 hover:text-white"
            >
              ↪ Sign out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 flex-1 lg:ml-64">

          {/* TOP BAR */}
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-md sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Keshri Travels / Overview
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                Business Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={loadEnquiries}
                disabled={refreshing}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold transition hover:bg-slate-50 disabled:opacity-50 sm:px-4"
              >
                {refreshing ? "Loading..." : "↻ Refresh"}
              </button>

              <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#101c35] font-bold text-white sm:flex">
                KT
              </div>

              <button
                onClick={logout}
                className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 lg:hidden"
              >
                Logout
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-7 p-4 sm:p-8">

            {/* WELCOME */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#101c35] to-[#243e68] p-6 text-white shadow-lg sm:p-8">
              <div className="relative z-10">
                <p className="text-sm font-medium text-blue-200">
                  Welcome to your workspace
                </p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Manage your business smarter.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">
                  Track customer enquiries, manage bookings and stay on top
                  of every follow-up from one place.
                </p>
                <a
                  href="#enquiries"
                  className="mt-5 inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  View enquiries →
                </a>
              </div>
              <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border-[35px] border-white/5" />
              <div className="pointer-events-none absolute -bottom-32 right-32 h-64 w-64 rounded-full border-[30px] border-orange-400/10" />
            </div>

            {/* STATS */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Business overview
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Your enquiry activity at a glance
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-500 sm:text-sm">
                        {item.label}
                      </p>
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${item.color}`}>
                        {item.icon}
                      </div>
                    </div>
                    <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FOLLOW-UP REMINDER */}
            <section id="followups" className="rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Follow-up reminders
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Customers whose follow-up date has arrived or passed.
                  </p>
                </div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                  {followUpsDue.length} due
                </span>
              </div>

              {followUpsDue.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">
                  You're all caught up. No follow-ups are due.
                </p>
              ) : (
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {followUpsDue.slice(0, 6).map((item) => (
                    <div key={item.id} className="rounded-xl border border-orange-100 bg-white p-4">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.service}</p>
                      <p className="mt-2 text-xs font-semibold text-orange-700">
                        Due: {formatDate(item.follow_up_at!)}
                      </p>
                      <a
                        href={`https://wa.me/${item.phone.replace(/\D/g, "").length === 10 ? "91" : ""}${item.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                      >
                        WhatsApp customer
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ENQUIRIES */}
            <section id="enquiries" className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

              <div className="border-b border-slate-100 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Customer enquiries
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      View and manage all customer requests.
                    </p>
                  </div>
                  <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">
                    {filteredEnquiries.length} records
                  </span>
                </div>

                {/* FILTERS */}
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="⌕ Search customer, phone or message"
                    className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-400"
                  >
                    <option value="All">All statuses</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>

                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-400"
                  >
                    <option value="All">All services</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="m-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* LOADING / EMPTY */}
              {loading ? (
                <div className="p-12 text-center text-sm text-slate-500">
                  Loading your enquiries...
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                    ▤
                  </div>
                  <h4 className="mt-4 font-bold text-slate-800">
                    No enquiries found
                  </h4>
                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filters.
                  </p>
                </div>
              ) : (
                <>
                  {/* DESKTOP TABLE */}
                  <div className="hidden overflow-x-auto lg:block">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                          <th className="px-6 py-4">Customer</th>
                          <th className="px-6 py-4">Service</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Follow-up</th>
                          <th className="px-6 py-4">Contact</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredEnquiries.map((item) => (
                          <tr key={item.id} className="transition hover:bg-slate-50/80">
                            <td className="px-6 py-5">
                              <p className="font-bold text-slate-900">{item.name}</p>
                              <p className="mt-1 text-xs text-slate-500">{item.phone}</p>
                              {item.message && (
                                <p className="mt-2 max-w-xs truncate text-xs text-slate-400" title={item.message}>
                                  {item.message}
                                </p>
                              )}
                            </td>

                            <td className="px-6 py-5 font-medium text-slate-700">
                              {item.service}
                            </td>

                            <td className="whitespace-nowrap px-6 py-5 text-slate-500">
                              {formatDate(item.created_at)}
                            </td>

                            <td className="px-6 py-5">
                              <select
                                value={item.status}
                                disabled={updatingId === item.id}
                                onChange={(e) => updateEnquiry(item.id, { status: e.target.value })}
                                className={`rounded-full px-3 py-2 text-xs font-bold ring-1 ring-inset outline-none disabled:opacity-50 ${statusStyles[item.status] || "bg-slate-100 text-slate-700"}`}
                              >
                                {statuses.map((status) => (
                                  <option key={status} value={status}>{status}</option>
                                ))}
                              </select>
                            </td>

                            <td className="px-6 py-5">
                              <input
                                type="date"
                                value={item.follow_up_at ? item.follow_up_at.slice(0, 10) : ""}
                                disabled={updatingId === item.id}
                                onChange={(e) =>
                                  updateEnquiry(item.id, {
                                    follow_up_at: e.target.value
                                      ? new Date(`${e.target.value}T12:00:00`).toISOString()
                                      : null,
                                  })
                                }
                                className="w-36 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs outline-none focus:border-orange-400"
                              />
                            </td>

                            <td className="px-6 py-5">
                              <a
                                href={`https://wa.me/${item.phone.replace(/\D/g, "").length === 10 ? "91" : ""}${item.phone.replace(/\D/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
                              >
                                WhatsApp ↗
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE + TABLET CARDS */}
                  <div className="grid gap-3 p-4 lg:hidden">
                    {filteredEnquiries.map((item) => (
                      <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900">{item.name}</h4>
                            <p className="mt-1 text-sm text-slate-500">{item.phone}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${statusStyles[item.status] || "bg-slate-100 text-slate-700"}`}>
                            {item.status}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-xs text-slate-400">Service</p>
                            <p className="mt-1 font-semibold">{item.service}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Received</p>
                            <p className="mt-1 font-semibold">{formatDate(item.created_at)}</p>
                          </div>
                        </div>

                        {item.message && (
                          <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                            {item.message}
                          </p>
                        )}

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-500">
                              Update status
                            </label>
                            <select
                              value={item.status}
                              disabled={updatingId === item.id}
                              onChange={(e) => updateEnquiry(item.id, { status: e.target.value })}
                              className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm"
                            >
                              {statuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-500">
                              Follow-up date
                            </label>
                            <input
                              type="date"
                              value={item.follow_up_at ? item.follow_up_at.slice(0, 10) : ""}
                              disabled={updatingId === item.id}
                              onChange={(e) =>
                                updateEnquiry(item.id, {
                                  follow_up_at: e.target.value
                                    ? new Date(`${e.target.value}T12:00:00`).toISOString()
                                    : null,
                                })
                              }
                              className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm"
                            />
                          </div>
                        </div>

                        <a
                          href={`https://wa.me/${item.phone.replace(/\D/g, "").length === 10 ? "91" : ""}${item.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                        >
                          Open WhatsApp chat ↗
                        </a>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </section>

            <footer className="pb-4 text-center text-xs text-slate-400">
              © {new Date().getFullYear()} Keshri Travels · Danapur Cantt, Patna
            </footer>

          </div>
        </section>
      </div>
    </main>
  );
}
