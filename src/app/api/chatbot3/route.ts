import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { message, uniqueId, lang } = await request.json();
  const session = await auth();

  try {
    const res = await fetch(process.env.CHATBOT3!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `${message}.`,
        user_id: session?.user?.id || uniqueId || "okok",
        language: lang.language || "English",
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data?.response.includes("```json")) {
      const resData = data.response
        .split("``")[1]
        .replace("```", "")
        .replace("`json", "");
      // console.log(mock);
      // const resData = JSON.parse(
      //   data.response.replace("``json", "").replace("```", ""),
      // );
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
