import { auth } from "@/auth";
import { randomString } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { message } = await request.json();
  const session = await auth();
  try {
    const res = await fetch(process.env.CHATBOT3!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `${message}.`,
        user_id: session?.user?.id || "abc",
      }),
    });
    const data = await res.json();

    if (data.response.includes("```json")) {
      const resData = JSON.parse(
        data.response.replace("```json", "").replace("```", ""),
      );
      return NextResponse.json({
        message: "Your form is filled with the data you provided.",
        resData,
      });
    }
    return NextResponse.json({ message: data.response });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
