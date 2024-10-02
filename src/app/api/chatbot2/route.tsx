export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const query = formData.get("query");
  const file = formData.get("pdf");

  const apiFormData = new FormData();
  apiFormData.append("query", query as string);
  apiFormData.append("file", file!);

  try {
    const res = await fetch(process.env.CHATBOT2!, {
      method: "POST",
      body: apiFormData,
    });

    const result = await res.json();
    return NextResponse.json({ message: result.response });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Some error occured." });
  }
}
