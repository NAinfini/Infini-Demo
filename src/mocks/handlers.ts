import { delay, http, HttpResponse } from "msw";

const USERS = [
  { id: "1", name: "Alice Chen", role: "Engineer", status: "active" },
  { id: "2", name: "Bob Nakamura", role: "Designer", status: "pending" },
  { id: "3", name: "Carol Osei", role: "Manager", status: "active" },
];

let retryAttemptCount = 0;

export const handlers = [
  http.get("/api/users", async () => {
    await delay(140);
    return HttpResponse.json({ users: USERS }, { status: 200 });
  }),

  http.get("/api/users/:id", async ({ params }) => {
    await delay(100);
    const user = USERS.find((item) => item.id === params.id);
    if (!user) {
      return HttpResponse.json(
        {
          type: "urn:infini:error:not-found",
          title: "User Not Found",
          status: 404,
          detail: `No user found for id '${String(params.id)}'`,
          instance: `/api/users/${String(params.id)}`,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json(user, { status: 200 });
  }),

  http.post("/api/validate", async ({ request }) => {
    const payload = (await request.json().catch(() => ({}))) as {
      email?: string;
      name?: string;
    };

    return HttpResponse.json(
      {
        type: "urn:infini:error:validation",
        title: "Validation Failed",
        status: 400,
        detail: "One or more fields are invalid.",
        instance: "/api/validate",
        errors: {
          email: payload.email ? [] : ["Email is required."],
          name: payload.name ? [] : ["Name is required."],
        },
      },
      { status: 400 },
    );
  }),

  http.get("/api/protected", async () => {
    await delay(90);
    return HttpResponse.json(
      {
        type: "urn:infini:error:auth",
        title: "Unauthorized",
        status: 401,
        detail: "Authentication token is missing or expired.",
        instance: "/api/protected",
      },
      { status: 401 },
    );
  }),

  http.get("/api/slow", async () => {
    await delay(3000);
    return HttpResponse.json(
      {
        ok: true,
        message: "Slow endpoint eventually succeeded.",
      },
      { status: 200 },
    );
  }),

  http.get("/api/retry", async () => {
    retryAttemptCount += 1;
    if (retryAttemptCount % 2 === 1) {
      return HttpResponse.json(
        {
          type: "urn:infini:error:rate-limit",
          title: "Too Many Requests",
          status: 429,
          detail: "Rate limit reached. Retry shortly.",
          instance: "/api/retry",
          attempt: retryAttemptCount,
        },
        {
          status: 429,
          headers: {
            "Retry-After": "1",
          },
        },
      );
    }

    return HttpResponse.json(
      {
        ok: true,
        message: "Retry succeeded.",
        attempt: retryAttemptCount,
      },
      { status: 200 },
    );
  }),
];
