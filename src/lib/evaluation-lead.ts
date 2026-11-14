import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const evaluationLeadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  address: z.string().trim().min(3, "Please enter your property address").max(200),
  needs: z.string().trim().max(1000).optional(),
  landingPageSource: z.string().optional(),
});

export type EvaluationLead = z.infer<typeof evaluationLeadSchema>;

export const submitEvaluationLead = createServerFn({ method: "POST" })
  .validator(evaluationLeadSchema)
  .handler(async ({ data }) => {
    const results: { ghlSaved?: boolean; sheetSaved?: boolean; contactId?: string } = {};

    // 1. Save to Google Sheet (Source: Landing Page 1)
    try {
      const { saveToGoogleSheet } = await import("./google-sheet.server");
      const sheetRes = await saveToGoogleSheet(data, data.landingPageSource || "Landing Page 1");
      results.sheetSaved = sheetRes.saved;
    } catch (err) {
      console.error("[Submit] Failed to save to Google Sheet:", err);
      results.sheetSaved = false;
    }

    // 2. Save to HighLevel (GoHighLevel CRM)
    try {
      const { saveEvaluationLead } = await import("./highlevel.server");
      const ghlRes = await saveEvaluationLead(data);
      results.ghlSaved = ghlRes.saved;
      if (ghlRes.contactId) {
        results.contactId = ghlRes.contactId;
      }
    } catch (err) {
      console.error("[Submit] Failed to save to HighLevel:", err);
      results.ghlSaved = false;
    }

    // If either Google Sheet or GHL saved successfully, return saved: true
    const saved = results.sheetSaved === true || results.ghlSaved === true;

    return { saved, details: results };
  });
