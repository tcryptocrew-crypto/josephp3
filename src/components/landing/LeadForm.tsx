import { useState } from "react";
import { ChevronRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import {
  evaluationLeadSchema,
  submitEvaluationLead,
  type EvaluationLead,
} from "@/lib/evaluation-lead";

type Errors = Partial<Record<keyof EvaluationLead, string>>;

const field =
  "w-full rounded-md border border-[#E2D7C8] bg-white px-4 py-3 text-base text-[#3D3335] placeholder:text-[#8F8585] outline-none transition focus:border-primary focus:shadow-[var(--glow-soft)]";

export function LeadForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const rawData = Object.fromEntries(new FormData(e.currentTarget));
    const r = evaluationLeadSchema.safeParse(rawData);
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] = i.message));
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitEvaluationLead({ data: r.data });
      if (!result.saved) throw new Error("Contact save was not confirmed");
      setDone(true);
    } catch {
      setSubmitError(
        "There was a problem submitting your request. Please try again or contact Joseph directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (done)
    return (
      <div className="panel gold-frame rounded-xl p-10 text-center animate-in fade-in duration-300">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-3xl">Thank you.</h3>
        <p className="mt-3 text-muted-foreground">
          Joseph's team will contact you shortly to arrange a conversation.
        </p>
      </div>
    );

  const F = ({
    name,
    label,
    type = "text",
    ph,
  }: {
    name: keyof Errors;
    label: string;
    type?: string;
    ph: string;
  }) => (
    <label className="block">
      <span className="mb-1.5 block text-[15px] font-semibold">{label}</span>
      <input name={name} type={type} placeholder={ph} disabled={isSubmitting} className={field} />
      {errors[name] && <span className="mt-1 block text-sm text-destructive">{errors[name]}</span>}
    </label>
  );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="panel gold-frame space-y-5 rounded-2xl p-6 sm:p-8 bg-white/95 shadow-xl border border-primary/35"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {F({ name: "name", label: "Full name", ph: "Enter your full name" })}
        {F({
          name: "email",
          label: "Email address",
          type: "email",
          ph: "Enter your email address",
        })}
        {F({ name: "phone", label: "Phone number", type: "tel", ph: "Enter your phone number" })}
        {F({ name: "address", label: "Property address", ph: "Enter your property address" })}
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[15px] font-semibold">
          Tell me what you want to accomplish{" "}
          <span className="font-normal italic text-muted-foreground">Optional</span>
        </span>
        <textarea
          name="needs"
          rows={3}
          disabled={isSubmitting}
          placeholder="Another bedroom, a better layout, more outdoor space, or something else."
          className={field}
        />
      </label>

      {submitError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gold w-full justify-center px-5! py-2.5! text-sm! sm:text-base! [&>svg]:h-4! [&>svg]:w-4! disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              Request My Free Home Evaluation <ChevronRight className="h-5 w-5" />
            </>
          )}
        </button>

        <p className="text-[11px] text-muted-foreground/80 text-center leading-relaxed">
          By providing your phone number, you agree to receive communications regarding your
          property evaluation.
        </p>
      </div>
    </form>
  );
}
