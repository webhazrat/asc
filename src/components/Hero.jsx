import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="container bg-hero-pattern bg-cover bg-center py-20 relative z-10 overflow-hidden md:overflow-visible">
      <div className="absolute top-0 left-0 overflow-hidden blur-3xl h-96 w-[36.125rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 -z-10"></div>
      <div className="hidden lg:block absolute bottom-0 right-0 overflow-hidden blur-3xl h-96 w-[36.125rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 -z-10"></div>
      <div className="space-y-5 max-w-xl m-auto text-center">
        <h1 className="text-4xl lg:text-5xl font-bold">
          স্কুল ছাড়লেও, বন্ধুত্বের বন্ধনে হৃদয়ের টানে একত্রিত
        </h1>
        <p>
          বয়সের গন্ডী নেই, বন্ধুত্বের বন্ধন চিরকাল । স্কুল ছাড়লেও শেখা থামে
          না! আড্ডা, আনন্দ, পুনর্মিলন, ক্রিড়া, শিক্ষা ও বন্ধুত্বের মাধ্যমে
          সম্প্রদায়কে এগিয়ে নেওয়ার অঙ্গীকার।
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button asChild>
            <Link href={"/join"}>জয়েন করুন</Link>
          </Button>
          <Button variant="link">
            <Link href={"/batches"}>ব্যাচসমূহ দেখুন</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
