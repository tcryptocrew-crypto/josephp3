import { createServerFn } from "@tanstack/react-start";

export interface LeadSubmissionData {
  name: string;
  email: string;
  phone: string;
  address: string;
  needs?: string;
}

export const submitLeadToGoogleSheet = createServerFn({ method: "POST" })
  .validator((data: LeadSubmissionData) => data)
  .handler(async ({ data }) => {
    const webhookUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      (process.env as Record<string, string | undefined>).VITE_GOOGLE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycby47KQUMYOTJHLkXo3aH6tylLbmM4Fw2izJCclGnjQ7fJzyiYhCeHPXRLysvhZtatxI/exec";

    const payload = {
      dateSubmitted: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
      fullName: data.name,
      email: data.email,
      phoneNumber: data.phone,
      propertyAddress: data.address,
      whatTheyAreLookingFor: data.needs || "",
      source: "Landing Page 2",
      landingPageSource: "Landing Page 2",
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!res.ok) {
      throw new Error(`Google Sheet submission failed with status ${res.status}`);
    }

    return { success: true };
  });
