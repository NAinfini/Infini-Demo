export type MockEndpointMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type MockApiEndpoint = {
  id: string;
  method: MockEndpointMethod;
  route: string;
  description: string;
};

export const MOCK_ROUTES = {
  users: "/api/users",
  userById: "/api/users/:id",
  validate: "/api/validate",
  protected: "/api/protected",
  slow: "/api/slow",
  retry: "/api/retry",
} as const;

export const MOCK_API_ENDPOINTS = [
  { id: "users-list", method: "GET", route: MOCK_ROUTES.users, description: "List users" },
  { id: "users-detail", method: "GET", route: MOCK_ROUTES.userById, description: "Fetch user by id" },
  { id: "validate", method: "POST", route: MOCK_ROUTES.validate, description: "Validate payload and return field errors" },
  { id: "protected", method: "GET", route: MOCK_ROUTES.protected, description: "Protected endpoint without auth token" },
  { id: "slow", method: "GET", route: MOCK_ROUTES.slow, description: "Slow endpoint for timeout behavior" },
  { id: "retry", method: "GET", route: MOCK_ROUTES.retry, description: "Rate-limit endpoint for retry behavior" },
] as const satisfies readonly MockApiEndpoint[];
