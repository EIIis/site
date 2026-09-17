import { getServerSession } from "next-auth";
import {
  authOptions,
  isAuthConfigured,
  isAuthorizedSession,
} from "@/lib/auth";
import {
  BlogPublishingError,
  publishPost,
  validatePostInput,
} from "@/lib/blog/publishing";
import { isSameOriginRequest } from "@/lib/request-security";

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

  const validation = validatePostInput(
    payload && typeof payload === "object" ? payload : {},
  );
  if (!validation.isValid) {
    return Response.json(
      { error: "Check the highlighted fields.", fieldErrors: validation.errors },
      { status: 400 },
    );
  }

  try {
    await publishPost(validation.data);
    return Response.json({
      message: "Published. The post will appear after deployment finishes.",
      postUrl: validation.data.postUrl,
      slug: validation.data.slug,
    });
  } catch (error) {
    if (error instanceof BlogPublishingError) {
      const status = error.code === "POST_EXISTS" ? 409 : 502;
      return Response.json({ error: error.message }, { status });
    }

    return Response.json({ error: "Publishing failed." }, { status: 500 });
  }
}
