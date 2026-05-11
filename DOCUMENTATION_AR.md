# HR SaaS - Full Stack Documentation

## نظرة عامة على المشروع

تطبيق HR SaaS متكامل بـ **Full-Stack Architecture**:
- **Frontend**: Next.js 16 + React 19 + TypeScript + Tailwind CSS
- **Backend**: Express.js + Node.js + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT Tokens
- **Localization**: Arabic (RTL) & English (LTR)

---

## البنية الهندسية للمشروع

```
/
├── app/                    # Next.js Frontend
│   ├── (public)/          # صفحات عامة
│   ├── login/             # صفحة تسجيل الدخول
│   ├── dashboard/         # لوحات التحكم
│   └── globals.css        # أنماط عامة
├── components/            # مكونات React
├── lib/                   # مكتبات مشتركة
│   ├── auth/              # منطق المصادقة
│   ├── i18n/              # الترجمة
│   └── api/               # عميل API
├── server/                # Backend Express
│   ├── src/
│   │   ├── controllers/   # معالجات الطلبات
│   │   ├── routes/        # مسارات API
│   │   ├── middleware/    # برمجيات وسيطة
│   │   ├── utils/         # دوال مساعدة
│   │   └── app.ts         # تطبيق Express الرئيسي
│   ├── prisma/
│   │   └── schema.prisma  # نموذج قاعدة البيانات
│   └── .env               # متغيرات البيئة
└── middleware.ts          # Next.js middleware
```

---

## التشغيل والتطوير

### إعداد البيئة

```bash
# 1. استنساخ المشروع
git clone <repo>
cd hr-saas

# 2. تثبيت المكتبات
pnpm install

# 3. إعداد قاعدة البيانات
# انسخ .env.example إلى .env في مجلد server
cp server/.env.example server/.env

# 4. تحديث DATABASE_URL في server/.env
# مثال: postgresql://user:password@localhost:5432/hr_saas

# 5. تطبيق الهجرات
cd server
pnpm run prisma:migrate
pnpm run prisma:generate
```

### تشغيل التطبيق

```bash
# تشغيل Frontend و Backend معاً
pnpm dev

# أو تشغيل كل منهما على حدة
pnpm dev:frontend  # http://localhost:3000
pnpm dev:backend   # http://localhost:5000
```

---

## مسارات API الرئيسية

### المصادقة

```
POST /api/auth/register
{
  "name": "Ahmed",
  "email": "ahmed@example.com",
  "password": "secure123",
  "companyId": "company-id",
  "role": "hr"
}
Response: { token: "...", user: {...} }

POST /api/auth/login
{
  "email": "ahmed@example.com",
  "password": "secure123"
}
Response: { token: "...", user: {...} }

GET /api/auth/me
Headers: { Authorization: "Bearer token" }
Response: { user: {...} }
```

### الموظفين

```
GET /api/employees?companyId=company-id
GET /api/employees/:id
POST /api/employees
PUT /api/employees/:id
```

---

## نماذج قاعدة البيانات (Prisma Schema)

### Company (الشركة)
- id, name, email, phone
- status: active | inactive | suspended

### User (المستخدم)
- id, name, email, password (مشفرة)
- role: super_admin | company_admin | hr | employee
- lastLogin, loginAttempts

### Employee (الموظف)
- id, employeeCode, firstName, lastName
- designation, department, salary
- dateOfBirth, nationality, gender

### Attendance (الحضور)
- employeeId, date, checkInTime, checkOutTime
- status: present | absent | late | early_leave

### Leave (الإجازات)
- employeeId, type, startDate, endDate
- status: pending | approved | rejected

### Payroll (الرواتب - مصري)
- baseSalary, allowances, overtime
- incomeTax, socialInsurance, healthInsurance
- grossSalary, netSalary

---

## تدفق المصادقة

```
1. المستخدم يملأ بيانات الدخول
   ↓
2. Frontend يرسل POST /api/auth/login
   ↓
3. Backend يتحقق من كلمة المرور (bcrypt)
   ↓
4. إذا صحيح: ينشئ JWT token
   ↓
5. Frontend يحفظ token في localStorage
   ↓
6. جميع الطلبات التالية ترسل Authorization header
   ↓
7. Backend middleware يتحقق من token
```

---

## هيكل الأدوار والأذونات

### Super Admin
- إدارة جميع الشركات
- إدارة مديري الشركات
- عرض جميع الإحصائيات

### Company Admin
- إدارة موظفي شركته
- إدارة الأقسام
- عرض تقارير الشركة

### HR
- إضافة/تعديل الموظفين
- إدارة الحضور والإجازات
- إنشاء تقارير الرواتب

### Employee
- عرض بيانته الشخصية
- طلب إجازة
- عرض حضوره
- تحميل كشف الراتب

---

## الترجمة (i18n)

الترجمة متعددة الأنماط:
```
lib/i18n/
├── en.json   # English
├── ar.json   # العربية
└── context.tsx
```

استخدام الترجمة في المكونات:
```jsx
import { useTranslation } from '@/lib/i18n/context';

export function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('welcome')}</h1>;
}
```

---

## نصائح للتطوير

### لا تضع Business Logic في المكونات
❌ خطأ:
```tsx
const tax = salary * 0.1;
```

✅ صح:
```tsx
// server/src/services/payroll.ts
export function calculateTax(salary: number) {
  return salary * 0.1;
}
```

### استخدم API Client للتواصل مع Backend
```tsx
import { apiClient } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/context';

export function EmployeesList() {
  const { token } = useAuth();
  const employees = apiClient.employees.getAll(token);
}
```

### احمِ الصفحات بـ Middleware
```tsx
// middleware.ts
if (isProtectedRoute && !token) {
  return NextResponse.redirect(new URL('/login', request.url));
}
```

---

## الخطوات التالية

- [ ] ربط قاعدة البيانات الفعلية (PostgreSQL)
- [ ] إضافة المزيد من الـ Controllers
- [ ] بناء API للحضور والإجازات
- [ ] تطبيق حسابات الرواتب المصرية
- [ ] إضافة التقارير والإحصائيات
- [ ] تطبيق الإخطارات
- [ ] اختبارات الوحدة والتكامل

---

## الدعم

للمزيد من المساعدة، تواصل مع فريق التطوير.
