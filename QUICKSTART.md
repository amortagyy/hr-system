# ⚡ Quick Setup Guide (خطوات سريعة)

## تشغيل المشروع في 5 دقائق

### 1️⃣ تثبيت المكتبات
```bash
pnpm install
```

### 2️⃣ إعداد قاعدة البيانات
```bash
# انسخ .env.example
cp server/.env.example server/.env

# افتح server/.env وعدّل:
# DATABASE_URL="postgresql://user:password@localhost:5432/hr_saas"

# ملاحظة: أنت تحتاج PostgreSQL مثبت على جهازك
# أو استخدم Docker:
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

### 3️⃣ تطبيق الهجرات
```bash
cd server
pnpm run prisma:migrate
# اختر اسم للهجرة (مثل "init")
```

### 4️⃣ تشغيل التطبيق
```bash
# من المجلد الجذر
pnpm dev

# هذا سيشغل:
# - Next.js Frontend → http://localhost:3000
# - Express Backend → http://localhost:5000
```

### 5️⃣ اختبر النظام
```
1. افتح http://localhost:3000
2. انقر على "Login"
3. أنشئ حساب جديد
4. دخل الحساب
5. انتقل إلى Dashboard
```

---

## 📋 البيانات الأولية (Seed Data)

### إنشاء بيانات اختبار
```bash
cd server
pnpm run prisma:studio

# أو يدويًا عبر SQL
```

---

## 🚨 مشاكل شائعة

### ❌ "connection refused" على :5000
**الحل:** البيانات قد لا تتصل. تحقق من:
```bash
# تحقق من DATABASE_URL
cat server/.env

# جرب الاتصال
psql postgresql://user:password@localhost:5432/hr_saas
```

### ❌ "CORS error"
**الحل:** تأكد من أن Backend يعمل:
```bash
curl http://localhost:5000/health
# يجب أن يرجع: {"status":"OK"}
```

### ❌ "prisma generate" خطأ
**الحل:** أعد تشغيل:
```bash
cd server
rm -rf node_modules/.prisma
pnpm install
pnpm run prisma:generate
```

---

## 🎯 الخطوات التالية

بعد التشغيل الناجح:

1. **تصفح الأدوار الثلاثة:**
   - `/dashboard/admin` - مدير النظام
   - `/dashboard/hr` - موظف HR
   - `/dashboard/employee` - موظف عادي

2. **افحص قاعدة البيانات:**
   ```bash
   cd server && pnpm run prisma:studio
   ```

3. **أضف بيانات اختبار:**
   - أنشئ شركة جديدة
   - أضف موظفين
   - سجل حضور
   - طلب إجازة

4. **جرب الـ APIs:**
   ```bash
   # تسجيل الدخول
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"123456"}'

   # الحصول على الموظفين
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:5000/api/employees
   ```

---

## 📚 الموارد المفيدة

- **Prisma Docs:** https://www.prisma.io/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Express Docs:** https://expressjs.com
- **PostgreSQL:** https://www.postgresql.org/docs

---

## 💡 نصائح مهمة

✅ احفظ `server/.env` بعيداً عن Git
✅ استخدم `prisma studio` للتصحيح
✅ اقرأ السجلات (logs) عند الأخطاء
✅ جرب Postman لاختبار API

---

**إذا واجهت مشاكل، تحقق من الـ logs أولاً!** 🚀
