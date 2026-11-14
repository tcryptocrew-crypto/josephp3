import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { saveToGoogleSheet } from "@/lib/google-sheet.server";

const lead = {
  name: "Usman Qadir",
  email: "usman@example.com",
  phone: "+12015550199",
  address: "123 Main St, Alpine, NJ",
  needs: "Addition of 2 master bedrooms",
};

const request = vi.fn<typeof fetch>();

beforeEach(() => {
  request.mockReset();
  vi.stubGlobal("fetch", request);
  vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", "https://sheetdb.io/api/v1/test-id");
  vi.stubEnv("GOOGLE_SHEET_WEBHOOK_SECRET", "");
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("Google Sheet evaluation lead submission", () => {
  it("formats payload correctly for SheetDB with exact column names and default Landing Page 1 source", async () => {
    request.mockResolvedValueOnce(Response.json({ created: 1 }, { status: 201 }));

    const res = await saveToGoogleSheet(lead);
    expect(res).toEqual({ saved: true });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(
      "https://sheetdb.io/api/v1/test-id",
      expect.objectContaining({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    );

    const sentPayload = JSON.parse(String(request.mock.calls[0]?.[1]?.body));
    expect(sentPayload.data).toBeDefined();
    expect(sentPayload.data[0]).toMatchObject({
      "Full Name": "Usman Qadir",
      Email: "usman@example.com",
      "Phone Number": "+12015550199",
      "Property Address": "123 Main St, Alpine, NJ",
      "What They're Looking For": "Addition of 2 master bedrooms",
      "Landing Page Source": "Landing Page 1",
    });
    expect(sentPayload.data[0]["Date Submitted"]).toBeDefined();
  });

  it("writes a P3 lead to the Lead Feedback tab's six lead columns", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", "https://script.google.com/macros/s/test/exec");
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_SECRET", "test-secret");

    const headers = [
      "Date",
      "Name",
      "Email",
      "Phone Number",
      "Property Adress",
      "What are they looking for?",
    ];
    const setValues = vi.fn();
    const getRange = vi
      .fn()
      .mockReturnValueOnce({ getDisplayValues: () => [headers] })
      .mockReturnValueOnce({ setValues });
    const getSheetById = vi.fn().mockReturnValue({
      getRange,
      getLastRow: () => 5,
      getMaxRows: () => 100,
    });
    const openById = vi.fn().mockReturnValue({ getSheetById });
    const releaseLock = vi.fn();
    const flush = vi.fn();
    const script = readFileSync("integrations/google-sheets/Code.gs", "utf8");
    const receive = runInNewContext(script + "\n;doPost", {
      ContentService: {
        MimeType: { JSON: "application/json" },
        createTextOutput: (body: string) => ({ setMimeType: () => body }),
      },
      PropertiesService: {
        getScriptProperties: () => ({
          getProperty: (name: string) =>
            name === "GOOGLE_LEAD_SPREADSHEET_ID" ? "test-spreadsheet" : "test-secret",
        }),
      },
      LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock }) },
      SpreadsheetApp: { openById, flush },
    }) as (event: { postData: { contents: string } }) => string;
    request.mockImplementation(async (_url, options) => {
      const contents = String(options?.body);
      return new Response(receive({ postData: { contents } }));
    });

    expect(await saveToGoogleSheet(lead)).toEqual({ saved: true });
    expect(openById).toHaveBeenCalledWith("test-spreadsheet");
    expect(getSheetById).toHaveBeenCalledWith(1066462612);
    expect(getRange.mock.calls).toEqual([
      [2, 1, 1, 6],
      [6, 1, 1, 6],
    ]);
    const [row] = setValues.mock.calls[0][0];
    expect(Object.prototype.toString.call(row[0])).toBe("[object Date]");
    expect(row.slice(1)).toEqual(
      [lead.name, lead.email, lead.phone, lead.address, lead.needs].map((value) => "'" + value),
    );
    expect(flush).toHaveBeenCalledOnce();
    expect(releaseLock).toHaveBeenCalledOnce();

    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_SECRET", "wrong-secret");
    expect(await saveToGoogleSheet(lead)).toEqual({
      saved: false,
      error: "Google Sheet append was not confirmed",
    });
    expect(setValues).toHaveBeenCalledOnce();
  });

  it("handles missing webhook URL gracefully", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", "");
    const res = await saveToGoogleSheet(lead);
    expect(res.saved).toBe(false);
    expect(request).not.toHaveBeenCalled();
  });

  it("handles webhook HTTP error status", async () => {
    request.mockResolvedValueOnce(new Response(null, { status: 500 }));
    const res = await saveToGoogleSheet(lead);
    expect(res.saved).toBe(false);
  });
});
