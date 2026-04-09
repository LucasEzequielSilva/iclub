import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DATA_FILE = path.join(process.cwd(), "data", "reviews.json");

async function readReviews() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeReviews(reviews: unknown[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2), "utf8");
}

export async function GET() {
  const reviews = await readReviews();
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, device, rating, comment, date } = body;

    if (!name || !device || !rating || !date) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const reviews = await readReviews();
    const review = { name, device, rating, comment: comment || null, date, created_at: new Date().toISOString() };
    reviews.unshift(review);
    await writeReviews(reviews);

    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
