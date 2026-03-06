import { delay, http, HttpResponse } from "msw";

type MockEndpointMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type MockApiEndpoint = {
  id: string;
  method: MockEndpointMethod;
  route: string;
  description: string;
};

const ROUTES = {
  users: "/api/users",
  userById: "/api/users/:id",
  validate: "/api/validate",
  protected: "/api/protected",
  slow: "/api/slow",
  retry: "/api/retry",
} as const;

export const MOCK_API_ENDPOINTS = [
  { id: "users-list", method: "GET", route: ROUTES.users, description: "List users" },
  { id: "users-detail", method: "GET", route: ROUTES.userById, description: "Fetch user by id" },
  { id: "validate", method: "POST", route: ROUTES.validate, description: "Validate payload and return field errors" },
  { id: "protected", method: "GET", route: ROUTES.protected, description: "Protected endpoint without auth token" },
  { id: "slow", method: "GET", route: ROUTES.slow, description: "Slow endpoint for timeout behavior" },
  { id: "retry", method: "GET", route: ROUTES.retry, description: "Rate-limit endpoint for retry behavior" },
] as const satisfies readonly MockApiEndpoint[];

const USERS = [
  { id: "1", name: "Alice Chen", role: "Engineer", status: "active" },
  { id: "2", name: "Bob Nakamura", role: "Designer", status: "pending" },
  { id: "3", name: "Carol Osei", role: "Manager", status: "active" },
];

let retryAttemptCount = 0;

export const handlers = [
  http.get(ROUTES.users, async () => {
    await delay(140);
    return HttpResponse.json({ users: USERS }, { status: 200 });
  }),

  http.get(ROUTES.userById, async ({ params }) => {
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

  http.post(ROUTES.validate, async ({ request }) => {
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

  http.get(ROUTES.protected, async () => {
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

  http.get(ROUTES.slow, async () => {
    await delay(3000);
    return HttpResponse.json(
      {
        ok: true,
        message: "Slow endpoint eventually succeeded.",
      },
      { status: 200 },
    );
  }),

  http.get(ROUTES.retry, async () => {
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
