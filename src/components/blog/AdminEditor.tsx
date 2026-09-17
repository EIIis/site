"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { slugifyTitle } from "@/lib/blog/slug";

type FieldName = "title" | "date" | "description" | "body";
type FieldErrors = Partial<Record<FieldName, string>>;

interface EditorForm {
  title: string;
  date: string;
  description: string;
  body: string;
}

function localDate(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export function AdminEditor() {
  const [form, setForm] = useState<EditorForm>({
    title: "",
    date: localDate(),
    description: "",
    body: "",
  });
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [publishedUrl, setPublishedUrl] = useState("");
  const slug = slugifyTitle(form.title);

  useEffect(() => {
    if (!form.body.trim()) return;

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setPreviewLoading(true);
      try {
        const response = await fetch("/api/blog/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ markdown: form.body }),
          signal: controller.signal,
        });
        const payload = (await response.json()) as { html?: string; error?: string };
        if (!response.ok) throw new Error(payload.error ?? "Preview failed.");
        setPreviewHtml(payload.html ?? "");
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setMessage(error.message);
        }
      } finally {
        if (!controller.signal.aborted) setPreviewLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [form.body]);

  function updateField(field: FieldName, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setMessage("");
    setPublishedUrl("");
    if (field === "body" && !value.trim()) setPreviewHtml("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFieldErrors({});
    setMessage("");
    setPublishedUrl("");

    try {
      const response = await fetch("/api/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json()) as {
        error?: string;
        fieldErrors?: FieldErrors;
        message?: string;
        postUrl?: string;
      };

      if (!response.ok) {
        if (payload.fieldErrors) setFieldErrors(payload.fieldErrors);
        throw new Error(payload.error ?? "Publishing failed.");
      }

      setMessage(payload.message ?? "Post published.");
      setPublishedUrl(payload.postUrl ?? "");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Publishing failed.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClassName =
    "w-full rounded-md border border-border-default bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-border-strong";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <EditorField label="title" error={fieldErrors.title}>
          <input
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            className={inputClassName}
            maxLength={120}
            autoComplete="off"
          />
        </EditorField>
        <EditorField label="date" error={fieldErrors.date}>
          <input
            type="date"
            value={form.date}
            onChange={(event) => updateField("date", event.target.value)}
            className={inputClassName}
          />
        </EditorField>
      </div>

      <EditorField label="description" error={fieldErrors.description}>
        <input
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          className={inputClassName}
          maxLength={280}
        />
      </EditorField>

      <div className="rounded-md border border-border-default px-3 py-2">
        <span className="block text-xs text-text-muted">url preview</span>
        <code className="mt-1 block break-all text-xs text-text-secondary">
          alcantinez.dev/blog/{slug || "your-post-title"}
        </code>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <EditorField label="markdown" error={fieldErrors.body}>
          <textarea
            value={form.body}
            onChange={(event) => updateField("body", event.target.value)}
            className={`${inputClassName} min-h-[28rem] resize-y font-mono leading-relaxed`}
            maxLength={200_000}
          />
        </EditorField>

        <section className="min-h-[28rem] rounded-md border border-border-default p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs text-text-muted">preview</span>
            {previewLoading ? (
              <span className="text-xs text-text-muted">updating…</span>
            ) : null}
          </div>
          {previewHtml ? (
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          ) : (
            <p className="text-sm text-text-muted">preview will appear here.</p>
          )}
        </section>
      </div>

      {message ? (
        <p className="text-sm text-text-secondary" role="status">
          {message}{" "}
          {publishedUrl ? (
            <a className="underline" href={publishedUrl} target="_blank" rel="noreferrer">
              open post
            </a>
          ) : null}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-10 items-center justify-center rounded-md border border-border-strong px-5 text-sm text-foreground hover:opacity-60 transition-opacity disabled:cursor-wait disabled:opacity-50"
      >
        {submitting ? "publishing…" : "publish"}
      </button>
    </form>
  );
}

function EditorField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-text-muted">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-red-500">{error}</span> : null}
    </label>
  );
}
