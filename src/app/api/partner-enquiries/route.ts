import { NextResponse } from "next/server";
import { prisma } from "@/lib/Prisma";
import { ENQUIRY_TYPES } from "@/lib/enquiry-types";

const MAX_BODY_CHARS = 12_000;
const PER_EMAIL_PER_HOUR = 3;
const ALL_VISITORS_PER_HOUR = 30;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function fail(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: Request) {
  // Only accept posts that come from this site's own pages
  const origin = request.headers.get("origin");
  if (origin) {
    const host =
      request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    try {
      if (new URL(origin).host !== host) return fail("Request not allowed.", 403);
    } catch {
      return fail("Request not allowed.", 403);
    }
  }

  // Cap the size, and treat unreadable JSON as a client error
  const text = await request.text();
  if (text.length > MAX_BODY_CHARS) return fail("Your message is too long.", 413);

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return fail("Invalid submission.", 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return fail("Invalid submission.", 400);
  }

  const data = body as Record<string, unknown>;

  // Honeypot: bots may fill this hidden field.
  if (typeof data.website === "string" && data.website.trim()) {
    return NextResponse.json({ success: true });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email =
    typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const organization =
    typeof data.organization === "string" ? data.organization.trim() : "";
  const enquiryType =
    typeof data.enquiryType === "string" ? data.enquiryType.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (
    !name ||
    name.length > 100 ||
    !email ||
    email.length > 254 ||
    !isValidEmail(email) ||
    !(ENQUIRY_TYPES as readonly string[]).includes(enquiryType) ||
    message.length < 10 ||
    message.length > 5000 ||
    organization.length > 150
  ) {
    return fail(
      "Please check your details. The message should be at least 10 characters.",
      400,
    );
  }

  try {
    // Simple database-backed rate limits
    const since = new Date(Date.now() - 60 * 60 * 1000);
    const [fromThisEmail, fromEveryone] = await Promise.all([
      prisma.partnerEnquiry.count({
        where: { email, createdAt: { gte: since } },
      }),
      prisma.partnerEnquiry.count({ where: { createdAt: { gte: since } } }),
    ]);

    if (fromThisEmail >= PER_EMAIL_PER_HOUR || fromEveryone >= ALL_VISITORS_PER_HOUR) {
      return fail(
        "We're receiving a lot of enquiries right now. Please try again a little later.",
        429,
      );
    }

    await prisma.partnerEnquiry.create({
      data: {
        name,
        email,
        organization: organization || null,
        enquiryType,
        message,
      },
    });

    return NextResponse.json(
      { success: true, message: "Your enquiry has been received." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Partner enquiry submission failed:", error);
    return fail(
      "We could not submit your enquiry right now. Please try again later.",
      500,
    );
  }
}