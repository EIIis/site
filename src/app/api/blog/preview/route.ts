import { getServerSession } from "next-auth";
import {
  authOptions,
  isAuthConfigured,
  isAuthorizedSession,
} from "@/lib/auth";
import { renderMarkdownToHtml } from "@/lib/blog/markdown";
import { isSameOriginRequest } from "@/lib/request-security";

const MAX_BODY_LENGTH = 200_000;

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  if (!isAuthConfigured()) {
    return Response.json({ error: "Admin is not configured." }, { status: 503 });
  }

  const session = await getServerSession(authOptions);
  if (!isAuthorizedSession(session)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const markdown =
    payload && typeof payload === "object" && "markdown" in payload
      ? (payload as { markdown?: unknown }).markdown
      : "";

  if (typeof markdown !== "string" || markdown.length > MAX_BODY_LENGTH) {
    return Response.json({ error: "Invalid Markdown body." }, { status: 400 });
  }

  return Response.json({ html: renderMarkdownToHtml(markdown) });
}
