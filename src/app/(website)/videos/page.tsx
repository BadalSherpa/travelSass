import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function VideosPage() {
  const videos = await prisma.packageVideo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      package: {
        select: {
          title: true,
          slug: true,
          location: true,
        },
      },
    },
  })

  const featuredVideo = videos[0]
  const otherVideos = videos.slice(1)

  return (
    <div className="bg-[#030712] text-white">
      <section className="relative overflow-hidden px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.06),_transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-400">
              Travel Videos
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Watch the journey before you experience it.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Explore destination stories, scenic stays, homestay walkthroughs,
              local food moments, and curated travel experiences.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <div className="rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm text-slate-300 backdrop-blur-xl">
              {videos.length} Travel Videos
            </div>

            <Link
              href="/packages"
              className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </section>

      {videos.length === 0 ? (
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-12 text-center">
            <h2 className="text-3xl font-black">No videos added yet</h2>
            <p className="mt-4 text-slate-400">
              Travel videos will appear here once added from admin.
            </p>
          </div>
        </section>
      ) : (
        <>
          {featuredVideo ? (
            <section className="px-4 pb-20">
              <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                  <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-2xl shadow-black/30">
                    <div className="aspect-video">
                      <iframe
                        src={featuredVideo.videoUrl}
                        title={featuredVideo.title}
                        className="h-full w-full"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-400">
                      Featured Story
                    </p>

                    <h2 className="mt-4 text-4xl font-black tracking-tight">
                      {featuredVideo.title}
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      Watch this curated travel moment and explore the full package
                      connected to this journey.
                    </p>

                    <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                        Related Package
                      </p>

                      <h3 className="mt-3 text-xl font-black text-white">
                        {featuredVideo.package.title}
                      </h3>

                      {featuredVideo.package.location ? (
                        <p className="mt-2 text-sm text-slate-400">
                          {featuredVideo.package.location}
                        </p>
                      ) : null}

                      <Link
                        href={`/packages/${featuredVideo.package.slug}`}
                        className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
                      >
                        View Package
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          <section className="bg-white px-4 py-24 text-slate-950">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-600">
                    Latest Stories
                  </p>

                  <h2 className="mt-4 text-5xl font-black tracking-tight">
                    More journeys to explore.
                  </h2>
                </div>

                <Link
                  href="/packages"
                  className="inline-flex rounded-full border border-slate-200 bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  Browse Packages
                </Link>
              </div>

              {otherVideos.length === 0 ? (
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
                  More videos will appear here soon.
                </div>
              ) : (
                <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                  {otherVideos.map((video) => (
                    <div
                      key={video.id}
                      className="group overflow-hidden rounded-[2.5rem] border bg-white p-4 shadow-[0_15px_60px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_90px_rgba(15,23,42,0.15)]"
                    >
                      <div className="aspect-video overflow-hidden rounded-[2rem] bg-black">
                        <iframe
                          src={video.videoUrl}
                          title={video.title}
                          className="h-full w-full"
                          allowFullScreen
                        />
                      </div>

                      <div className="p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-600">
                          Travel Story
                        </p>

                        <h3 className="mt-3 text-2xl font-black text-slate-950">
                          {video.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          {video.package.location || 'Curated Travel'}
                        </p>

                        <Link
                          href={`/packages/${video.package.slug}`}
                          className="mt-5 inline-flex text-sm font-bold text-sky-700 transition hover:text-sky-900"
                        >
                          {video.package.title} →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  )
}