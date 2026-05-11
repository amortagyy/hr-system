// ============================================================
// Mock Data — all static data used across dashboards
// Replace with real API calls in production
// ============================================================

export const mockCompanies = [
  { id: "techcorp", name: "TechCorp Arabia", employees: 124, plan: "Professional", status: "active", industry: "Technology", country: "Saudi Arabia" },
  { id: "buildco", name: "BuildCo Construction", employees: 87, plan: "Starter", status: "active", industry: "Construction", country: "UAE" },
  { id: "medplus", name: "MedPlus Healthcare", employees: 213, plan: "Enterprise", status: "active", industry: "Healthcare", country: "Kuwait" },
  { id: "fintech", name: "Gulf FinTech", employees: 45, plan: "Starter", status: "inactive", industry: "Finance", country: "Bahrain" },
  { id: "retail", name: "AlNoor Retail", employees: 312, plan: "Enterprise", status: "active", industry: "Retail", country: "Qatar" },
];

export const mockEmployees = [
  { id: "e1", name: "Mohammed Al-Hassan", email: "m.hassan@techcorp.com", department: "Engineering", position: "Software Engineer", status: "active", joinDate: "2022-03-15", salary: 12000, company: "TechCorp Arabia" },
  { id: "e2", name: "Fatima Al-Zahra", email: "f.zahra@techcorp.com", department: "Design", position: "UI/UX Designer", status: "active", joinDate: "2021-07-20", salary: 10500, company: "TechCorp Arabia" },
  { id: "e3", name: "Khalid Al-Otaibi", email: "k.otaibi@techcorp.com", department: "Sales", position: "Sales Manager", status: "active", joinDate: "2020-01-10", salary: 15000, company: "TechCorp Arabia" },
  { id: "e4", name: "Noura Al-Ghamdi", email: "n.ghamdi@techcorp.com", department: "HR", position: "HR Specialist", status: "active", joinDate: "2023-02-01", salary: 9000, company: "TechCorp Arabia" },
  { id: "e5", name: "Abdullah Al-Shehri", email: "a.shehri@techcorp.com", department: "Engineering", position: "DevOps Engineer", status: "inactive", joinDate: "2021-11-15", salary: 13500, company: "TechCorp Arabia" },
  { id: "e6", name: "Maha Al-Dosari", email: "m.dosari@techcorp.com", department: "Finance", position: "Financial Analyst", status: "active", joinDate: "2022-08-30", salary: 11000, company: "TechCorp Arabia" },
];

export const mockLeaveRequests = [
  { id: "l1", employee: "Mohammed Al-Hassan", type: "Annual Leave", startDate: "2024-05-10", endDate: "2024-05-15", days: 5, status: "pending", reason: "Family vacation" },
  { id: "l2", employee: "Fatima Al-Zahra", type: "Sick Leave", startDate: "2024-05-03", endDate: "2024-05-04", days: 2, status: "approved", reason: "Medical appointment" },
  { id: "l3", employee: "Khalid Al-Otaibi", type: "Emergency Leave", startDate: "2024-04-28", endDate: "2024-04-28", days: 1, status: "approved", reason: "Personal emergency" },
  { id: "l4", employee: "Noura Al-Ghamdi", type: "Annual Leave", startDate: "2024-05-20", endDate: "2024-05-25", days: 6, status: "pending", reason: "Hajj pilgrimage" },
  { id: "l5", employee: "Maha Al-Dosari", type: "Annual Leave", startDate: "2024-06-01", endDate: "2024-06-07", days: 7, status: "rejected", reason: "Personal travel" },
];

export const mockAttendance = [
  { date: "2024-05-01", checkIn: "08:45", checkOut: "17:30", status: "present", hoursWorked: 8.75 },
  { date: "2024-05-02", checkIn: "09:10", checkOut: "17:45", status: "present", hoursWorked: 8.58 },
  { date: "2024-05-05", checkIn: "08:30", checkOut: "17:00", status: "present", hoursWorked: 8.5 },
  { date: "2024-05-06", checkIn: "10:00", checkOut: "17:00", status: "late", hoursWorked: 7.0 },
  { date: "2024-05-07", checkIn: null, checkOut: null, status: "absent", hoursWorked: 0 },
  { date: "2024-05-08", checkIn: "08:55", checkOut: "18:00", status: "present", hoursWorked: 9.08 },
];

export const mockPayslips = [
  { id: "p1", month: "April 2024", basic: 12000, allowances: 2000, deductions: 1200, net: 12800, status: "paid" },
  { id: "p2", month: "March 2024", basic: 12000, allowances: 2000, deductions: 1200, net: 12800, status: "paid" },
  { id: "p3", month: "February 2024", basic: 12000, allowances: 2000, deductions: 1200, net: 12800, status: "paid" },
];

export const mockRecentActivity = [
  { id: 1, action: "New employee onboarded", user: "Sara Al-Mansouri", time: "2 hours ago", icon: "user-plus" },
  { id: 2, action: "Leave request approved", user: "Fatima Al-Zahra", time: "4 hours ago", icon: "check-circle" },
  { id: 3, action: "Payroll processed for April", user: "System", time: "1 day ago", icon: "dollar-sign" },
  { id: 4, action: "Performance review completed", user: "Khalid Al-Otaibi", time: "2 days ago", icon: "star" },
  { id: 5, action: "New company registered", user: "Admin", time: "3 days ago", icon: "building" },
];

// Chart data for dashboard analytics
export const mockHeadcountData = [
  { month: "Jan", count: 98 },
  { month: "Feb", count: 102 },
  { month: "Mar", count: 108 },
  { month: "Apr", count: 112 },
  { month: "May", count: 118 },
  { month: "Jun", count: 124 },
];

export const mockDepartmentData = [
  { name: "Engineering", value: 45, fill: "var(--color-chart-1)" },
  { name: "Sales", value: 28, fill: "var(--color-chart-2)" },
  { name: "Design", value: 18, fill: "var(--color-chart-3)" },
  { name: "HR", value: 12, fill: "var(--color-chart-4)" },
  { name: "Finance", value: 21, fill: "var(--color-chart-5)" },
];

export const mockPayrollData = [
  { month: "Jan", amount: 1420000 },
  { month: "Feb", amount: 1480000 },
  { month: "Mar", amount: 1520000 },
  { month: "Apr", amount: 1490000 },
  { month: "May", amount: 1560000 },
  { month: "Jun", amount: 1610000 },
];

export const mockAdminStats = {
  totalCompanies: 5,
  activeCompanies: 4,
  totalEmployees: 781,
  totalUsers: 24,
  monthlyRevenue: 8450,
  pendingLeaves: 12,
};

export const mockHRStats = {
  totalEmployees: 124,
  presentToday: 108,
  pendingLeaves: 7,
  monthlyPayroll: 1610000,
  openPositions: 3,
  newHires: 5,
};

export const mockEmployeeStats = {
  leaveBalance: { annual: 14, sick: 8, emergency: 3 },
  attendanceRate: 94,
  currentMonth: { present: 18, absent: 1, late: 2 },
};
