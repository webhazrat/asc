import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json({
    status: 200,
    message: "Hello world!",
  });
}

/*
return Response.json({
    status: 200,
    message: "Hello world!",
  });

*/
