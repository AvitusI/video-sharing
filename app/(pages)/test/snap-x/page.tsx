import Image from "next/image";

// snap-proximity, snap-mandatory

export default function Page() {
  return (
    <div className="bg-zinc-800 h-screen flex justify-center items-center">
      <div className="absolute h-full w-1 bg-white z-10"></div>
      <div className="z-10 absolute bottom-6 left-2/4 ml-1 bg-slate-800 text-white rounded px-4 py-2">
        Snap Point
      </div>

      <div className="relative h-full flex gap-6 overflow-x-auto pb-14 snap-x snap-mandatory">

        <div className="w-40 snap-center shrink-0">
          <div className="shrink-0 w-48"></div>
        </div>

        <div className="w-40 snap-center shrink-0">
          <div className="shrink-0 w-48"></div>
        </div>

        <div className="w-40 snap-center shrink-0">
          <div className="shrink-0 w-48"></div>
        </div>

        <figure className="w-96 snap-center shrink-0">
          <Image
            src="/images/img1.jpg"
            width={394}
            height={394}
            alt=""
            className="object-cover rounded-md w-full h-full"
          />
        </figure>

        <figure className="w-96 snap-center shrink-0">
        <Image
            src="/images/img2.jpg"
            width={394}
            height={394}
            alt=""
            className="object-cover rounded-md w-full h-full"
          />
        </figure>

        <figure className="w-96 snap-center shrink-0">
        <Image
            src="/images/img3.jpg"
            width={394}
            height={394}
            alt=""
            className="object-cover rounded-md w-full h-full"
          />
        </figure>

        <figure className="w-96 snap-center shrink-0">
        <Image
            src="/images/img4.jpg"
            width={394}
            height={394}
            alt=""
            className="object-cover rounded-md w-full h-full"
          />
        </figure>

        <figure className="w-96 snap-center shrink-0">
        <Image
            src="/images/img5.jpg"
            width={394}
            height={394}
            alt=""
            className="object-cover rounded-md w-full h-full"
          />
        </figure>

        <figure className="w-96 snap-center shrink-0">
        <Image
            src="/images/img6.jpg"
            width={394}
            height={394}
            alt=""
            className="object-cover rounded-md w-full h-full"
          />
        </figure>

        <figure className="w-96 snap-center shrink-0">
        <Image
            src="/images/img7.jpg"
            width={394}
            height={394}
            alt=""
            className="object-cover rounded-md w-full h-full"
          />
        </figure>

        <figure className="w-96 snap-center shrink-0">        
        <Image
            src="/images/img8.jpg"
            width={394}
            height={394}
            alt=""
            className="object-cover rounded-md w-full h-full"
          />
        </figure>

        <div className="w-40 snap-center shrink-0">
          <div className="shrink-0 w-48"></div>
        </div>

        <div className="w-40 snap-center shrink-0">
          <div className="shrink-0 w-48"></div>
        </div>

        <div className="w-40 snap-center shrink-0">
          <div className="shrink-0 w-48"></div>
        </div>
      </div>
    </div>
  )
}