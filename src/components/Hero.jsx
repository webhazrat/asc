import Image from "next/image";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="container bg-hero-pattern bg-contain bg-center grid grid-cols-2 py-20 items-center relative rounded-2xl z-10">
      <div className="absolute top-0 left-0 overflow-hidden blur-3xl h-96 w-[36.125rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 -z-10"></div>
      <div className="absolute bottom-0 right-0 overflow-hidden blur-3xl h-96 w-[36.125rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 -z-10"></div>
      <div className="space-y-5">
        <h1 className="text-5xl font-bold">
          Let’s build our community strength with student education power
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Molestie nec vel ut purus
          auctor vitae nulla. Venenatis sollicitudin mauris egestas quis mi elit
          posuere. Varius orci duis gravida in purus ultrices. Cursus morbi nibh
          ante viverra est sit.
        </p>
        <div className="flex gap-2">
          <Button>Let's Join</Button>
          <Button variant="link">View Students</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center gap-5 relative pl-10">
        <div>
          <Image
            src={
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=400&w=300&q=80"
            }
            width={200}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-5">
          <Image
            src={
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=400&w=280&q=80"
            }
            width={200}
            height={400}
            className="rounded-lg shadow-md"
          />

          <Image
            src={
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=400&w=300&q=80"
            }
            width={200}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-5 relative -top-14">
          <Image
            src={
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=400&w=300&q=80"
            }
            width={200}
            height={400}
            className="rounded-lg shadow-md"
          />
          <Image
            src={
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=400&w=300&q=80"
            }
            width={200}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
