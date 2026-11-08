import Image from "next/image"
import globe from "@/app/images/globe.png"

const starPatternStyle = {
  backgroundImage:
    "radial-gradient(1px 1px at 12% 20%, rgba(255,255,255,0.45) 50%, transparent 51%)," +
    "radial-gradient(1px 1px at 38% 12%, rgba(255,255,255,0.3) 50%, transparent 51%)," +
    "radial-gradient(1.5px 1.5px at 66% 32%, rgba(255,255,255,0.4) 50%, transparent 51%)," +
    "radial-gradient(1px 1px at 86% 62%, rgba(255,255,255,0.3) 50%, transparent 51%)," +
    "radial-gradient(1px 1px at 24% 72%, rgba(255,255,255,0.25) 50%, transparent 51%)," +
    "radial-gradient(1.5px 1.5px at 55% 88%, rgba(255,255,255,0.25) 50%, transparent 51%)",
  backgroundSize: "600px 420px",
}

// page-level background layer: absolutely positioned at the top of the page,
// filling the first screen. The globe image's white/pink sky is blended away
// via mix-blend-multiply over the dark background; the glow div painted under
// the image becomes a halo ring around the sphere.
const GlobeBackground = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute top-0 left-0 h-screen w-full overflow-hidden"
  >
    {/* halo glow around the sphere's top edge */}
    <div className="absolute top-[12vw] left-1/2 h-[26vw] w-[110vw] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[80px]" />

    {/* stars */}
    <div className="absolute inset-x-0 top-0 h-[60%] opacity-70" style={starPatternStyle} />

    {/* globe */}
    <Image
      src={globe}
      alt=""
      priority
      sizes="100vw"
      className="absolute top-0 left-1/2 w-full max-w-none -translate-x-1/2 -translate-y-[38%] "
    />
  </div>
)

export default GlobeBackground
