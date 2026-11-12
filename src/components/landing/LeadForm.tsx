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

  return (
    <div className="w-full overflow-hidden rounded-[20px] bg-card shadow-xl">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/068Tat3aDkIti56tSHoO"
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
