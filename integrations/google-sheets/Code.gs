const leadTabId = 1066462612;
const headerRow = 2;
const leadHeaders = [
  "Date",
  "Name",
  "Email",
  "Phone Number",
  /^Property Add?ress$/,
  "What are they looking for?",
];

function doPost(event) {
  const properties = PropertiesService.getScriptProperties();
  const secret = properties.getProperty("GOOGLE_SHEET_WEBHOOK_SECRET");
  let lead;
  try {
    lead = JSON.parse(event.postData.contents);
  } catch {
    return reply({ saved: false });
  }

  if (!secret || lead?.webhookSecret !== secret) {
    return reply({ saved: false });
  }

  const details = [lead.fullName, lead.email, lead.phoneNumber, lead.propertyAddress];
  if (!details.every((value) => typeof value === "string" && value.trim())) {
    return reply({ saved: false });
  }

  const needs = typeof lead.whatTheyAreLookingFor === "string" ? lead.whatTheyAreLookingFor : "";
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    return reply({ saved: false });
  }

  try {
    const spreadsheetId = properties.getProperty("GOOGLE_LEAD_SPREADSHEET_ID");
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetById(leadTabId);
    const headers = sheet.getRange(headerRow, 1, 1, leadHeaders.length).getDisplayValues()[0];
    if (
      !leadHeaders.every((header, index) =>
        typeof header === "string"
          ? header === headers[index].trim()
          : header.test(headers[index].trim()),
      )
    ) {
      return reply({ saved: false });
    }

    const row = sheet.getLastRow() + 1;
    if (row > sheet.getMaxRows()) {
      sheet.insertRowsAfter(sheet.getMaxRows(), 1);
    }

    // Keep submitted strings literal, including phone numbers and values that start with "=".
    const values = [new Date(), ...[...details, needs].map((value) => (value ? "'" + value : ""))];
    sheet.getRange(row, 1, 1, values.length).setValues([values]);
    SpreadsheetApp.flush();
    return reply({ saved: true });
  } catch (error) {
    console.error("Lead Feedback append failed: " + error.name);
    return reply({ saved: false });
  } finally {
    lock.releaseLock();
  }
}

function reply(result) {
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
