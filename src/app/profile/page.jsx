"use client";
import ProfileEditModal from "@/components/profile/ProfileEditModal";
import { useUser } from "@/hooks/useUser";
import { format } from "date-fns";
import CustomAvatar from "@/components/common/CustomAvatar";

export default function Page() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium">প্রোফাইল</h1>
        <ProfileEditModal user={user} />
      </div>
      <div>
        <div className="flex gap-5 items-center">
          <div className="relative">
            <div className="w-[90px] h-[90px] border rounded-full">
              <CustomAvatar avatar={user?.avatar || ""} name={user?.name} />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium">
              {user?.name}{" "}
              <span className="text-[10px] border border-indigo-500 px-1 rounded-full">
                {user?.status}
              </span>
            </h2>
            <p>{user?.phone}</p>
            <p>রক্তের গ্রুপ : {user?.bloodGroup || "-"}</p>
            <p>Role: {user?.role?.join(", ")}</p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-5">
            <h1 className="text-lg font-medium">ব্যক্তিগত তথ্য</h1>
            <div>
              <p className="font-medium">বর্তমান ঠিকানা :</p>
              <p>{user?.presentAddress || "-"}</p>
            </div>
            <div>
              <p className="font-medium">স্থায়ী ঠিকানা :</p>
              <p>{user?.permanentAddress || "-"}</p>
            </div>
            <div>
              <p className="font-medium">জন্ম তারিখ :</p>
              <p>
                {(user?.dob && format(new Date(user.dob), "dd MMMM yyyy")) ||
                  "-"}
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <h1 className="text-lg font-medium">শিক্ষাগত তথ্য</h1>
            <div>
              <p className="font-medium">এসএসসি পাশের সাল :</p>
              <p>{user?.passingYear || "-"}</p>
            </div>
            <div>
              <p className="font-medium">সর্বশেষ শিক্ষাগত যোগ্যতা :</p>
              <p>{user?.qualification || "-"}</p>
            </div>
            <div>
              <p className="font-medium">প্রতিষ্ঠানের নাম :</p>
              <p>{user?.institute || "-"}</p>
            </div>
          </div>
          <div className="space-y-5">
            <h1 className="text-lg font-medium">পেশাগত তথ্য</h1>
            <div>
              <p className="font-medium">কর্মরত প্রতিষ্ঠান :</p>
              <p>{user?.professionalInstitute || "-"}</p>
            </div>
            <div>
              <p className="font-medium">পদবি :</p>
              <p>{user?.designation || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
