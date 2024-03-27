import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-muted">
      <div className="container grid gap-6 py-10 md:py-0 md:gap-0 md:grid-cols-5">
        <div className="md:col-span-2 space-y-4 md:border-r border-muted md:py-10 md:pr-10">
          <Link href={"/"}>
            <Image src={"/logo.svg"} width={50} height={20} alt="logo" />
          </Link>
          <p>
            আল ইসলাহ ইসলামী একাডেমী স্টুডেন্টস কমিউনিটি- সকল প্রাক্তন
            শিক্ষার্থীদের নিয়ে পুনর্মিলন, ক্রিড়া, শিক্ষার অবকাঠামোর সার্বিক
            উন্নতির জন্য একসাথে সর্বোচ্চ কাজ করার মাধ্যমে প্রাক্তন ও চলমান
            শিক্ষার্থীদের মননশীল চিন্তা ও জ্ঞান বিকাশের মাধ্যমে সম্প্রদায়কে
            এগিয়ে নেওয়ার অঙ্গীকার।
          </p>
        </div>
        <div className="md:p-10">
          <h4 className="text-lg mb-4 font-semibold">প্রয়োজনীয় লিংঙ্কসমূহ</h4>
          <ul className="space-y-2">
            <li>
              <Link href={"/"}>হোম</Link>
            </li>
            <li>
              <Link href={"/batches"}>ব্যাচসমূহ</Link>
            </li>
            <li>
              <Link href={"/events"}>ইভেন্টস</Link>
            </li>
          </ul>
        </div>
        <div className="md:p-10">
          <h4 className="text-lg mb-4 font-semibold">সোস্যাল</h4>
          <ul className="space-y-2">
            <li>
              <Link href={"/"}>ফেসবুক</Link>
            </li>
            <li>
              <Link href={"/"}>ইনস্টাগ্রাম</Link>
            </li>
            <li>
              <Link href={"/"}>ইউটিউব</Link>
            </li>
          </ul>
        </div>
        <div className="md:py-10 md:pl-10">
          <div>
            <p className="mb-1">আইটি সাপোর্ট ও ডেভেলপমেন্টে</p>
            <a href="https://itwindow.dev" target="_blank">
              <Image
                src="/itwindow.svg"
                width={90}
                height={20}
                alt="itwindow"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
