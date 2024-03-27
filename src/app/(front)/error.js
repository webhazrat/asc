"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container my-10 text-center space-y-2">
      <AlertCircle className="stroke-red-500 mx-auto" />
      <h2>Something went wrong!</h2>
      <p>{error?.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
