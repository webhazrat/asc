import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json(
    {
      message: "Hello world!",
    },
    { status: 500 }
  );
}

/*
return Response.json({
    status: 200,
    message: "Hello world!",
  });

*/
