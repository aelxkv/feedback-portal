"use client";
import { useActionState, useEffect } from "react";
import { validate, CATEGORIES } from "@/lib/validate";

export default function FeedbackForm({ action, initial, submitLabel, onDone }) {
  const [state, formAction, pending] = useActionState(action, {
    ok: false,
    errors: {},
    values: initial,
  });

  useEffect(() => {
    if (state.ok && onDone) onDone();
  }, [state, onDone]);

  // Client-side validation: block submit if invalid.
  function onSubmit(e) {
    const form = e.currentTarget;
    const { errors, valid } = validate(Object.fromEntries(new FormData(form)));
    form.querySelectorAll("[data-client-error]").forEach((n) => (n.textContent = ""));
    if (!valid) {
      e.preventDefault();
      for (const [k, msg] of Object.entries(errors)) {
        const n = form.querySelector(`[data-client-error="${k}"]`);
        if (n) n.textContent = msg;
      }
    }
  }

  const v = state.values;
  const err = state.errors;
  const errorLine = (k) => (
    <small className="error" data-client-error={k}>{err[k]}</small>
  );

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="form">
      {err.form && <p className="error">{err.form}</p>}
      <label className="field">
        <span>Name</span>
        <input name="name" defaultValue={v.name} maxLength={60} />
        {errorLine("name")}
      </label>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={3} defaultValue={v.message} maxLength={600} />
        {errorLine("message")}
      </label>
      <div className="row">
        <label className="field">
          <span>Rating</span>
          <select name="rating" defaultValue={String(v.rating)}>
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"★".repeat(n)}</option>)}
          </select>
          {errorLine("rating")}
        </label>
        <label className="field">
          <span>Category</span>
          <select name="category" defaultValue={v.category}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {errorLine("category")}
        </label>
      </div>
      <button disabled={pending}>{pending ? "Saving…" : submitLabel}</button>
    </form>
  );
}
