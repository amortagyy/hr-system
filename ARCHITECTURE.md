```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                     HR SAAS - FULL STACK ARCHITECTURE                         ║
╚═══════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (PORT 3000)                               │
│                         Next.js 16 + React 19 + TS                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ PUBLIC PAGES                      PROTECTED DASHBOARDS              │  │
│  │ ├─ Home (/)                      ├─ Super Admin (/dashboard/admin)  │  │
│  │ ├─ About                         ├─ HR (/dashboard/hr)             │  │
│  │ ├─ Features                      └─ Employee (/dashboard/employee) │  │
│  │ ├─ Contact                                                          │  │
│  │ └─ Login                         ┌─ Middleware (middleware.ts)     │  │
│  │    └─ Forgot Password            │  ├─ Token validation            │  │
│  │                                  │  ├─ Role-based routing          │  │
│  │                                  │  └─ Auto redirect               │  │
│  │                                  └─                                │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   ↕                                         │
│                        HTTP REST API Calls                                   │
│                                   ↕                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↕
                    lib/api/client.ts (API Client)
                    lib/auth/context.tsx (Auth)
                    lib/i18n/context.tsx (i18n)
                                    ↕
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND (PORT 5000)                                │
│                      Express.js + TypeScript + JWT                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐         ┌──────────────┐        ┌──────────────┐         │
│  │ AUTH ROUTES  │         │ EMPLOYEE API │        │ OTHER APIs   │         │
│  ├──────────────┤         ├──────────────┤        ├──────────────┤         │
│  │ POST /login  │         │ GET /all     │        │ /attendance  │         │
│  │ POST /register│         │ GET /:id     │        │ /leaves      │         │
│  │ GET /me      │         │ POST /create │        │ /payroll     │         │
│  └──────────────┘         │ PUT /:id     │        └──────────────┘         │
│        ↕                  └──────────────┘               ↕                  │
│   ┌────────────────────┐                    ┌────────────────────┐        │
│   │  MIDDLEWARE        │                    │  MIDDLEWARE        │        │
│   ├────────────────────┤                    ├────────────────────┤        │
│   │ - Auth JWT check   │                    │ - Role validation  │        │
│   │ - CORS enabled     │                    │ - Error handling   │        │
│   │ - Body parser      │                    └────────────────────┘        │
│   └────────────────────┘                                                   │
│        ↕                                                                    │
│   ┌────────────────────┐                                                   │
│   │  CONTROLLERS       │                                                   │
│   ├────────────────────┤                                                   │
│   │ authController     │   ← Hashes passwords, generates JWT              │
│   │ employeeController │   ← CRUD operations                              │
│   │ ...                │                                                   │
│   └────────────────────┘                                                   │
│        ↕                                                                    │
│   ┌────────────────────┐                                                   │
│   │  PRISMA ORM        │                                                   │
│   ├────────────────────┤                                                   │
│   │ Type-safe queries  │                                                   │
│   │ Auto migrations    │                                                   │
│   │ Relations          │                                                   │
│   └────────────────────┘                                                   │
│        ↕                                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↕
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DATABASE (PostgreSQL)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │ companies │  │   users   │  │ employees │  │attendance │               │
│  ├───────────┤  ├───────────┤  ├───────────┤  ├───────────┤               │
│  │ id        │  │ id        │  │ id        │  │ id        │               │
│  │ name      │  │ email     │  │ firstName │  │ date      │               │
│  │ email     │  │ password* │  │ lastName  │  │ status    │               │
│  │ status    │  │ role      │  │ salary    │  │ checkIn   │               │
│  └───────────┘  │ company   │  │ company   │  │ checkOut  │               │
│                 │ employee? │  │ user      │  └───────────┘               │
│                 └───────────┘  └───────────┘                               │
│                                                                              │
│  (* bcryptjs hashed password)                                               │
│                                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │  leaves   │  │ departments │ │  payroll  │  │   ...     │               │
│  ├───────────┤  ├───────────┤  ├───────────┤  └───────────┘               │
│  │ id        │  │ id        │  │ id        │                               │
│  │ employee  │  │ name      │  │ employee  │                               │
│  │ type      │  │ company   │  │ salary    │                               │
│  │ status    │  │ employees │  │ tax       │                               │
│  └───────────┘  └───────────┘  │ netSalary │                               │
│                                 └───────────┘                               │
└─────────────────────────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════════════════════════════════════╗
║                         DATA FLOW DIAGRAM                                      ║
╚═══════════════════════════════════════════════════════════════════════════════╝

1. USER LOGIN:
   Browser → Login Form → POST /api/auth/login → Backend → Verify Password
   → Generate JWT Token → Save to localStorage → Redirect to Dashboard

2. API REQUEST:
   Browser → Include Authorization Header with JWT → Backend → Verify Token
   → Check Role → Execute Query → Prisma → PostgreSQL → Return Data

3. ROLE-BASED ACCESS:
   Super Admin → Can manage all companies
   Company Admin → Can manage own company
   HR → Can manage employees & attendance
   Employee → Can only view own data

╔═══════════════════════════════════════════════════════════════════════════════╗
║                      SECURITY LAYERS                                           ║
╚═══════════════════════════════════════════════════════════════════════════════╝

✅ Password Hashing         → bcryptjs (10 salt rounds)
✅ Authentication          → JWT tokens (7 days expiry)
✅ Authorization           → Role-based middleware
✅ API Security            → CORS enabled
✅ Input Validation        → Prisma type safety
✅ Database Encryption     → Built into PostgreSQL
✅ Middleware Protection   → Token validation
✅ Error Handling          → Secure error messages

```
