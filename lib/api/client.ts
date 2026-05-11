// API client utility for frontend
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const apiClient = {
  async request<T>(
    endpoint: string,
    options: RequestInit & { token?: string } = {}
  ): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API request failed");
    }

    return response.json();
  },

  // Auth endpoints
  auth: {
    login: (email: string, password: string) =>
      apiClient.request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    register: (data: any) =>
      apiClient.request("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    me: (token: string) =>
      apiClient.request("/auth/me", { token }),
  },

  // Employee endpoints
  employees: {
    getAll: (token: string, companyId?: string) =>
      apiClient.request(
        `/employees${companyId ? `?companyId=${companyId}` : ""}`,
        { token }
      ),

    getById: (token: string, id: string) =>
      apiClient.request(`/employees/${id}`, { token }),

    create: (token: string, data: any) =>
      apiClient.request("/employees", {
        method: "POST",
        body: JSON.stringify(data),
        token,
      }),

    update: (token: string, id: string, data: any) =>
      apiClient.request(`/employees/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        token,
      }),
  },
};
