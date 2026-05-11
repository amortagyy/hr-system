"use client";

// ============================================================
// Auth Context — manages authentication state and role-based
// routing. Uses mock users for UI-only demonstration.
// ============================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// User roles in the system
export type UserRole = "super_admin" | "hr" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string;
  companyId: string;
  avatar?: string;
  department?: string;
  position?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

// ── Mock users for demonstration ──────────────────────────────
export const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "admin@system.com": {
    password: "admin123",
    user: {
      id: "1",
      name: "Ahmad Al-Rashid",
      email: "admin@system.com",
      role: "super_admin",
      company: "PeopleCore System",
      companyId: "system",
      position: "Super Administrator",
    },
  },
  "hr@techcorp.com": {
    password: "hr123456",
    user: {
      id: "2",
      name: "Sara Al-Mansouri",
      email: "hr@techcorp.com",
      role: "hr",
      company: "TechCorp Arabia",
      companyId: "techcorp",
      department: "Human Resources",
      position: "HR Manager",
    },
  },
  "employee@techcorp.com": {
    password: "emp123456",
    user: {
      id: "3",
      name: "Mohammed Al-Hassan",
      email: "employee@techcorp.com",
      role: "employee",
      company: "TechCorp Arabia",
      companyId: "techcorp",
      department: "Engineering",
      position: "Software Engineer",
    },
  },
};

// Role → dashboard route mapping
export const ROLE_ROUTES: Record<UserRole, string> = {
  super_admin: "/dashboard/admin",
  hr: "/dashboard/hr",
  employee: "/dashboard/employee",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("hr-user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("hr-user");
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login — simulates API call with 800ms delay
  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));

      const record = MOCK_USERS[email.toLowerCase()];
      if (!record || record.password !== password) {
        setIsLoading(false);
        return { success: false, error: "Invalid email or password" };
      }

      setUser(record.user);
      localStorage.setItem("hr-user", JSON.stringify(record.user));
      setIsLoading(false);
      return { success: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("hr-user");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
