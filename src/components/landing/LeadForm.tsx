import { useEffect } from "react";

export function LeadForm() {
  useEffect(() => {
    const scriptSrc = "https://link.msgsndr.com/js/form_embed.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    let tracked = false;
    const onMessage = (event: MessageEvent) => {
      try {
        let raw = event.data;
        if (typeof raw === "string") {
          try {
            raw = JSON.parse(raw);
          } catch {
            // Not a JSON string
          }
        }
        // Strictly check for GoHighLevel form submission events only
        const isSubmitEvent =
          (raw && typeof raw === "object" && (
            raw.type === "form-submitted" ||
            raw.action === "form_submit" ||
            raw.action === "form-submitted" ||
            raw.event === "form_submit" ||
            raw.status === "form_submitted"
          )) ||
          (typeof raw === "string" && (
            raw.includes('"action":"form_submit"') ||
            raw.includes('"action":"form-submitted"') ||
            raw.includes('"type":"form-submitted"')
          ));
        if (isSubmitEvent && !tracked && typeof window !== "undefined") {
          tracked = true;
          // Prevent duplicate fires using sessionStorage
          try {
            sessionStorage.setItem("meta_lead_tracked", "true");
          } catch {}
          // Fire Meta Pixel Lead event
          const win = window as unknown as { fbq?: (...args: unknown[]) => void };
          if (typeof win.fbq === "function") {
            win.fbq("track", "Lead", {
              content_name: "Lead Form Submission",
              content_category: "Lead Generation",
            });
          }
          // Automatically redirect user to /thank-you page
          setTimeout(() => {
            window.location.href = "/thank-you";
          }, 400);
        }
      } catch {
        // Ignore cross-origin message parse errors
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-[20px] bg-card shadow-xl">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/068Tat3aDkIti56tSHoO?source=Landing+Page+1&utm_source=Landing+Page+1"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "646px",
          border: "none",
          borderRadius: "20px",
          display: "block",
        }}
        id="inline-068Tat3aDkIti56tSHoO"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Joseph | Free Home Evaluation"
        data-height="646"
        data-layout-iframe-id="inline-068Tat3aDkIti56tSHoO"
        data-form-id="068Tat3aDkIti56tSHoO"
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title="Joseph | Free Home Evaluation"
      />
    </div>
  );
}
