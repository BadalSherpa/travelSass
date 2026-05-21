export default function VideosPage() {
  return (
    <section className="bg-slate-950 px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
          Travel Videos
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">
          Watch destination stories and travel moments.
        </h1>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((video) => (
            <div
              key={video}
              className="rounded-3xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex h-56 items-center justify-center rounded-2xl bg-slate-900">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-950">
                  ▶
                </div>
              </div>
              <h2 className="mt-5 text-xl font-bold">
                Travel Video {video}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}