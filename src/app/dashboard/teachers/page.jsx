"use client";
import Title from "@/components/dashbaord/Title";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="space-y-2">
      <Title title="শিক্ষকগণ">
        <div>
          <Button>শিক্ষক সংযুক্ত করুন</Button>
        </div>
      </Title>
    </div>
  );
}
