const dashboardStats = [
  { title: 'Total Bookings', value: 0 },
  { title: 'Active Packages', value: 0 },
  { title: 'Customers', value: 0 },
  { title: 'New Inquiries', value: 0 },
]

export default function AdminPage() {
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="mt-2 text-slate-600">
          Manage your travel website, packages, bookings, and customer inquiries.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.title}</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h3>
          <p className="mt-3 text-sm text-slate-500">
            No recent activity yet.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
              Add Package
            </button>
            <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700">
              View Bookings
            </button>
            <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700">
              Check Inquiries
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}