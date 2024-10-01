import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { message } = await request.json();
  try {
    const res = await fetch(process.env.CHATBOT1!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `${message}. Please do not use markdown. Respond with only the answer.`,
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.response });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
