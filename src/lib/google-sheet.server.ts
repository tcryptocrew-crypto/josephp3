import type { EvaluationLead } from "./evaluation-lead";

const DEFAULT_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycby47KQUMYOTJHLkXo3aH6tylLbmM4Fw2izJCclGnjQ7fJzyiYhCeHPXRLysvhZtatxI/exec";

export async function saveToGoogleSheet(
  lead: EvaluationLead,
  source = "VSL 1",
): Promise<{ saved: boolean; error?: string }> {
  const serverUrl = process.env["GOOGLE_SHEET_WEBHOOK_URL"];
  const envUrl = serverUrl ?? process.env["VITE_GOOGLE_SHEET_WEBHOOK_URL"];
  const webhookSecret = process.env["GOOGLE_SHEET_WEBHOOK_SECRET"]?.trim();
  const webhookUrl = envUrl !== undefined ? envUrl.trim() : DEFAULT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "[GoogleSheet] GOOGLE_SHEET_WEBHOOK_URL is not set. Skipping Google Sheet append.",
    );
    return { saved: false, error: "GOOGLE_SHEET_WEBHOOK_URL is not set" };
  }

  const now = new Date();
  const dateFormatted = now.toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const isSheetDb = webhookUrl.includes("sheetdb.io");
  if (webhookSecret && (!serverUrl?.trim() || isSheetDb)) {
    console.error("[GoogleSheet] A server-side Apps Script URL is required with a webhook secret.");
    return { saved: false, error: "Invalid GOOGLE_SHEET_WEBHOOK_URL" };
  }

  // Format payload according to endpoint type (SheetDB array vs Apps Script object)
  const body = isSheetDb
    ? JSON.stringify({
        data: [
          {
            "Date Submitted": dateFormatted,
            "Full Name": lead.name,
            Email: lead.email,
            "Phone Number": lead.phone,
            "Property Address": lead.address,
            "What They're Looking For": lead.needs || "",
            "Landing Page Source": source,
          },
        ],
      })
    : JSON.stringify({
        dateSubmitted: dateFormatted,
        fullName: lead.name,
        email: lead.email,
        phoneNumber: lead.phone,
        propertyAddress: lead.address,
        whatTheyAreLookingFor: lead.needs || "",
        landingPageSource: source,
        ...(webhookSecret ? { webhookSecret } : {}),
      });

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`[GoogleSheet] Request failed with status ${response.status}`);
      return { saved: false, error: `HTTP ${response.status}` };
    }

    if (webhookSecret) {
      const result: { saved?: boolean } | null = await response.json();
      if (result?.saved !== true) {
        console.error("[GoogleSheet] The webhook did not confirm the lead was written.");
        return { saved: false, error: "Google Sheet append was not confirmed" };
      }
    }

    return { saved: true };
  } catch (err) {
    console.error("[GoogleSheet] Error posting to Google Sheet:", err);
    return { saved: false, error: String(err) };
  }
}
