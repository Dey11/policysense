import scrape from "@/lib/scraper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url } = await req.json();

  const data = await scrape(url);

  return NextResponse.json({ data });
}
