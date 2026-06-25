import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");

      return Response.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const fullName = String(body.FullName ?? "").trim();
    const social = String(body["IG / FB Account"] ?? "").trim();
    const businessType = String(body.BusinessType ?? "").trim();
    const interestedPlan = String(body.InterestedPlan ?? "").trim();

    if (!fullName || !businessType || !interestedPlan) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "Replai Website <onboarding@resend.dev>",
      to: ["replaii.official@gmail.com"],
      subject: `New inquiry from ${fullName}`,
      text: `
New contact form submission

Name: ${fullName}
IG / FB Account: ${social || "Not provided"}
Business Type: ${businessType}
Interested Plan: ${interestedPlan}
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        { error: "Email could not be sent" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}