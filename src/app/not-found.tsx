import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-end pb-24 pt-40">
      <p className="text-sm text-ash">404</p>
      <h1 className="display mt-6 text-[clamp(3.5rem,12vw,13rem)] [--wdth:70]">Nothing here.</h1>
      <p className="mt-8 max-w-[40ch] text-lg text-ash">This page doesn&apos;t exist, or it moved. The work is still where you left it.</p>
      <Link href="/" className="mt-10 inline-flex h-12 w-fit items-center bg-bone px-6 text-sm font-medium text-ink hover:bg-mint">
        Back to the homepage
      </Link>
    </section>
  );
}
