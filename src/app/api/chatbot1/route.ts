import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  const { message, uniqueId } = await request.json();
  try {
    const res = await fetch(process.env.CHATBOT1!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `${message}`,
        user_id: session?.user?.id || uniqueId || "okok",
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.response });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
