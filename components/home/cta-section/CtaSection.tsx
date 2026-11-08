import Image from "next/image"
import { ButtonLink } from "../../ui/button-link"
import ctaBg from "@/app/images/cta-bg.png"

// Exact arc geometry of cta-bg.png (1440x964): the grid dome is a circular arc
// through (720,2) and (0,337)/(1440,337) -> center at (50%, 97.8% of image
// height) with radius 65.4% of image width. The glow below is painted as a
// radial RING in that same coordinate space, so the light hugs the dome curve
// precisely (bright inside the arc, transparent outside it), then fades
// downward via a mask.

type CtaSectionProps = {
  createAccountHref: string
}

// CTA banner: the grid-dome background art is a light image on a white sky.
// Rendered with mix-blend-multiply over the dark page, the white sky vanishes,
// the curved violet glow underneath shines through the dome interior, and the
// grid lines remain visible as darker strokes.
const CtaSection = ({ createAccountHref }: CtaSectionProps) => {
  return (
    <section className="isolate relative overflow-hidden bg-[#08080c] px-4 text-white">
      <div className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden py-24 text-center sm:min-h-[640px]">
        {/* background art wrapper: glow ring + grid dome, sharing the image's
            exact aspect box so the glow curve aligns with the drawn arc. Scaled
            up on smaller viewports so the arc's height covers the section. */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 aspect-[1440/964] w-[240%] max-w-none -translate-x-1/2 sm:w-[160%] lg:w-full"
        >
          {/* violet glow ringing the dome's arc, faded downward */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65.4% 97.7% at 50% 97.8%," +
                "rgba(109,97,248,0) 30%," +
                "rgba(109,97,248,0.25) 60%," +
                "rgba(109,97,248,0.5) 82%," +
                "rgba(133,120,255,0.95) 96%," +
                "rgba(133,120,255,1) 99.2%," +
                "rgba(133,120,255,0) 100.4%)",
              maskImage:
                "linear-gradient(to bottom, black, black 42%, transparent 70%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, black 42%, transparent 70%)",
            }}
          />

          {/* grid dome */}
          <Image
            src={ctaBg}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 100vw, (min-width: 640px) 160vw, 240vw"
            className="pointer-events-none object-cover mix-blend-multiply"
          />

          {/* clean fade into the page at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-transparent via-[#08080c]/60 to-[#08080c]" />
        </div>

        {/* content */}
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-5">
          <h2 className="max-w-xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl sm:leading-[1.05]">
            Your next role is already looking for you
          </h2>
          <p className="max-w-xl text-sm text-white/60 sm:text-base sm:leading-relaxed">
            Build a profile in three minutes. The matches start arriving tomorrow
            morning.
          </p>
          <div className="mt-3 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <ButtonLink
              href={createAccountHref}
              size="lg"
              className="h-11 w-full! justify-center rounded-lg! bg-white! px-6! font-medium text-[#0d0e14]! hover:bg-white/90! sm:w-auto!"
            >
              Create a free account
            </ButtonLink>
            <ButtonLink
              href="/pricing"
              size="lg"
              className="h-11 w-full! justify-center rounded-lg! border-white/15! bg-white/[0.06]! px-6! font-medium text-white! hover:bg-white/[0.11]! sm:w-auto!"
            >
              View pricing
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
