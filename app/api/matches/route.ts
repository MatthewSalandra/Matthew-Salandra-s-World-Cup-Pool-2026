import { NextResponse } from "next/server";
import { getWorldCupMatches } from "@/lib/api";
import { seedMatches } from "@/lib/seed";

export async function GET() {
  try {
    const matches = await getWorldCupMatches();
    return NextResponse.json({ source: "football-data", matches });
  } catch (error) {
    return NextResponse.json({
      source: "seed",
      message: error instanceof Error ? error.message : "Using seed matches.",
      matches: seedMatches,
    });
  }
}
