export const maxDuration = 60;

import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  const formData = await request.formData();
  const query = formData.get("query");
  const uniqueId = formData.get("uniqueId");

  try {
    const res = await fetch(process.env.CHATBOT2!, {
      method: "POST",
      body: JSON.stringify({
        query: query as string,
        user_id: session?.user?.id || uniqueId || "okok",
      }),
    });

    const result = await res.json();
    return NextResponse.json({ message: result.response });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Some error occured." });
  }
}
