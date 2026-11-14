import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { saveEvaluationLead } from "@/lib/highlevel.server";

const lead = {
  name: "Example Homeowner",
  email: "owner@example.test",
  phone: "+12015550101",
  address: "10 Example Avenue",
  needs: "A more accessible layout",
};

const request = vi.fn<typeof fetch>();

beforeEach(() => {
  request.mockReset();
  vi.stubGlobal("fetch", request);
  vi.stubEnv("GHL_PRIVATE_INTEGRATION_TOKEN", "test-token");
  vi.stubEnv("GHL_LOCATION_ID", "test-location");
  vi.stubEnv("GHL_WORKFLOW_ID", "test-workflow");
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("GoHighLevel evaluation submission", () => {
  it("maps both custom fields and enrolls the contact only after the save", async () => {
    request
      .mockResolvedValueOnce(Response.json({ contact: { id: "saved-contact" } }))
      .mockResolvedValueOnce(Response.json({ succeeded: true }));

    await expect(saveEvaluationLead(lead)).resolves.toEqual({
      saved: true,
      contactId: "saved-contact",
    });
    expect(request).toHaveBeenNthCalledWith(
      1,
      "https://services.leadconnectorhq.com/contacts/upsert",
      expect.objectContaining({ method: "POST", redirect: "error" }),
    );
    expect(JSON.parse(String(request.mock.calls[0]?.[1]?.body))).toMatchObject({
      locationId: "test-location",
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: "Landing Page 1",
      customFields: [
        { id: "arNAYodrZv4Cv08XWfmV", fieldValue: lead.address },
        { id: "0fOh5jbfik5iWW97Qmvs", fieldValue: lead.needs },
      ],
    });
    expect(request).toHaveBeenNthCalledWith(
      2,
      "https://services.leadconnectorhq.com/contacts/saved-contact/workflows/test-workflow",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("reports an unconfigured integration instead of simulating success", async () => {
    vi.stubEnv("GHL_PRIVATE_INTEGRATION_TOKEN", "");
    await expect(saveEvaluationLead(lead)).resolves.toEqual({ saved: false });
    expect(request).not.toHaveBeenCalled();
  });

  it("does not enroll a contact when HighLevel rejects the save", async () => {
    request.mockResolvedValueOnce(new Response(null, { status: 403 }));
    await expect(saveEvaluationLead(lead)).resolves.toEqual({ saved: false });
    expect(request).toHaveBeenCalledTimes(1);
  });

  it("keeps a confirmed lead saved if the follow-up workflow fails", async () => {
    request
      .mockResolvedValueOnce(Response.json({ contact: { id: "saved-contact" } }))
      .mockResolvedValueOnce(new Response(null, { status: 503 }));

    await expect(saveEvaluationLead(lead)).resolves.toEqual({
      saved: true,
      contactId: "saved-contact",
    });
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("workflow enrollment returned HTTP 503"),
      expect.anything(),
    );
  });
});
