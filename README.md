# 🚀 HR SaaS - Production Ready

**Full-Stack HR Management System with JWT Authentication & PostgreSQL**

## Quick Start

```bash
# Install dependencies
pnpm install

# Setup backend database
cp server/.env.example server/.env
# Edit server/.env with your PostgreSQL URL

# Run migrations
cd server && pnpm run prisma:migrate

# Start both frontend & backend
pnpm dev
```

## Features

✅ **Full-Stack Architecture** - Next.js Frontend + Express Backend
✅ **Real JWT Authentication** - Secure token-based auth
✅ **PostgreSQL + Prisma** - Type-safe database ORM
✅ **Role-Based Access** - Super Admin, HR, Employee roles
✅ **Arabic/English** - Full i18n support with RTL
✅ **Dark Mode** - Theme switching
✅ **Production Ready** - TypeScript, security best practices

## Project Structure

- `/app` - Next.js frontend (React 19)
- `/server` - Express.js backend
- `/lib` - Shared utilities (auth, i18n, API client)
- `/components` - React UI components (shadcn/ui)

## Key Differences from Mock Version

| Feature | Before | Now |
|---------|--------|-----|
| Auth | Mock users in localStorage | Real JWT tokens |
| Database | No persistence | PostgreSQL + Prisma |
| API | Frontend-only | Full REST API |
| Security | None | bcrypt + JWT |
| Middleware | None | Authentication middleware |

## API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
GET    /api/employees
POST   /api/employees
PUT    /api/employees/:id
```

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, TypeScript, Prisma, PostgreSQL
- **Auth**: JWT + bcryptjs
- **i18n**: Custom solution (Arabic + English)

## Documentation

See [DOCUMENTATION_AR.md](./DOCUMENTATION_AR.md) for detailed guide (Arabic).

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (server/.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/hr_saas
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
PORT=5000
```

## Development Commands

```bash
pnpm dev              # Start both frontend & backend
pnpm dev:frontend     # Frontend only (http://localhost:3000)
pnpm dev:backend      # Backend only (http://localhost:5000)
pnpm build            # Build for production
```

## Next Steps

1. Set up PostgreSQL database
2. Update DATABASE_URL in server/.env
3. Run `pnpm dev` to start development
4. Login at http://localhost:3000/login
5. Build out your features!

---

**Ready to go production-ready! 🎉**
