import { Button } from "@/components/ui/button";
import imageUrl from "../../../public/student1.png";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

async function getData(id) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const data = await getData(session.user._id);
  const {
    name,
    phone,
    passingYear,
    bloodGroup,
    presentAddress,
    parmanentAddress,
    qualification,
    institute,
    professionalInstitute,
    designation,
    dob,
    role,
    status,
  } = data.user;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium mb-3">প্রোফাইল</h1>
        <Button size="sm">আপডেট</Button>
      </div>
      <div>
        <div className="flex gap-5 items-center">
          <div className="relative">
            <div className="w-[90px] h-[90px] border rounded-full">
              <ProfilePhoto avatar={imageUrl} name={name} />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium">
              {name}{" "}
              <span className="text-[10px] border border-indigo-500 px-1 rounded-full">
                {status}
              </span>
            </h2>
            <p>{phone}</p>
            <p>রক্তের গ্রুপ : {bloodGroup || "-"}</p>
            <p>Role: {role}</p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-5">
            <h1 className="text-lg font-medium">ব্যক্তিগত তথ্য</h1>
            <div>
              <p className="font-medium">বর্তমান ঠিকানা :</p>
              <p>{presentAddress || "-"}</p>
            </div>
            <div>
              <p className="font-medium">স্থায়ী ঠিকানা :</p>
              <p>{parmanentAddress || "-"}</p>
            </div>
            <div>
              <p className="font-medium">জন্ম তারিখ :</p>
              <p>{dob || "-"}</p>
            </div>
          </div>
          <div className="space-y-5">
            <h1 className="text-lg font-medium">শিক্ষাগত তথ্য</h1>
            <div>
              <p>এসএসসি পাশের সাল :</p>
              <p>{passingYear || "-"}</p>
            </div>
            <div>
              <p>সর্বশেষ শিক্ষাগত যোগ্যতা :</p>
              <p>{qualification || "-"}</p>
            </div>
            <div>
              <p>প্রতিষ্ঠানের নাম :</p>
              <p>{institute || "-"}</p>
            </div>
          </div>
          <div className="space-y-5">
            <h1 className="text-lg font-medium">পেশাগত তথ্য</h1>
            <div>
              <p>কর্মরত প্রতিষ্ঠান :</p>
              <p>{professionalInstitute || "-"}</p>
            </div>
            <div>
              <p>পদবি :</p>
              <p>{designation || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
