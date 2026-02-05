export type Product = "Connect" | "ALEKS" | "SIMnet" | "SIMnet" | "Sharpen";

export type ReportFormat = "csv" | "xlsx" | "both";

export type Frequency = "daily" | "weekly" | "monthly" | "term-end";

export type DeliveryMethod = "email" | "download-center" | "both";

export interface Report {
  id: string;
  name: string;
  description: string;
  product: Product;
  lastGenerated: Date | null;
  availableFormats: ReportFormat[];
  category: string;
}

export interface ScheduledReport {
  id: string;
  reportId: string;
  reportName: string;
  product: Product;
  frequency: Frequency;
  dayOfWeek?: number; // 0-6 for weekly
  dayOfMonth?: number; // 1-31 for monthly
  format: ReportFormat;
  deliveryMethod: DeliveryMethod;
  email?: string;
  nextRun: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface GeneratedReport {
  id: string;
  reportId: string;
  reportName: string;
  product: Product;
  generatedAt: Date;
  format: ReportFormat;
  fileSize: string;
  downloadUrl: string;
  expiresAt: Date;
}

// Mock reports data
export const reports: Report[] = [
  // Connect Reports
  {
    id: "connect-enrollment",
    name: "Course Enrollment Summary",
    description: "Overview of student enrollments across all Connect courses, including enrollment trends and course capacity utilization.",
    product: "Connect",
    lastGenerated: new Date("2026-01-20"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Enrollment",
  },
  {
    id: "connect-performance",
    name: "Student Performance Report",
    description: "Detailed analysis of student performance metrics including assignment scores, completion rates, and grade distributions.",
    product: "Connect",
    lastGenerated: new Date("2026-01-19"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Performance",
  },
  {
    id: "connect-active-users",
    name: "Active Users Report",
    description: "Daily and weekly active user counts with engagement metrics and session duration analysis.",
    product: "Connect",
    lastGenerated: new Date("2026-01-25"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Usage",
  },
  {
    id: "connect-assignment",
    name: "Assignment Statistics",
    description: "Comprehensive assignment data including submission rates, average scores, and time-to-complete metrics.",
    product: "Connect",
    lastGenerated: new Date("2026-01-22"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Performance",
  },
  {
    id: "connect-faculty",
    name: "Faculty Activity Report",
    description: "Faculty engagement metrics including course creation, grading activity, and student interaction frequency.",
    product: "Connect",
    lastGenerated: new Date("2026-01-18"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Usage",
  },
  // ALEKS Reports
  {
    id: "aleks-learning-path",
    name: "Learning Path Progress",
    description: "Student progress through ALEKS learning paths with topic mastery and time-on-task metrics.",
    product: "ALEKS",
    lastGenerated: new Date("2026-01-18"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Performance",
  },
  {
    id: "aleks-mastery",
    name: "Topic Mastery Report",
    description: "Detailed breakdown of student mastery levels across all ALEKS topics and skill areas.",
    product: "ALEKS",
    lastGenerated: new Date("2026-01-21"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Performance",
  },
  {
    id: "aleks-time",
    name: "Time on Task Analysis",
    description: "Analysis of student time spent in ALEKS including productive learning time and session patterns.",
    product: "ALEKS",
    lastGenerated: new Date("2026-01-17"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Usage",
  },
  {
    id: "aleks-placement",
    name: "Placement Assessment Results",
    description: "Summary of placement assessment scores and recommended course placements.",
    product: "ALEKS",
    lastGenerated: null,
    availableFormats: ["csv", "xlsx", "both"],
    category: "Assessment",
  },
  // SIMnet Reports
  {
    id: "simnet-skills",
    name: "Skills Assessment Summary",
    description: "Overview of student performance on SIMnet skills assessments across Microsoft Office applications.",
    product: "SIMnet",
    lastGenerated: new Date("2026-01-23"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Assessment",
  },
  {
    id: "simnet-certification",
    name: "Certification Readiness",
    description: "Student readiness metrics for Microsoft Office Specialist certification exams.",
    product: "SIMnet",
    lastGenerated: new Date("2026-01-15"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Assessment",
  },
  {
    id: "simnet-project",
    name: "Project Completion Report",
    description: "Detailed project completion data with skill-by-skill breakdown and common error analysis.",
    product: "SIMnet",
    lastGenerated: new Date("2026-01-20"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Performance",
  },
  // Sharpen Reports
  {
    id: "sharpen-engagement",
    name: "Student Engagement Metrics",
    description: "Sharpen platform engagement including video views, practice problem attempts, and study session data.",
    product: "Sharpen",
    lastGenerated: new Date("2026-01-24"),
    availableFormats: ["csv", "xlsx", "both"],
    category: "Usage",
  },
  {
    id: "sharpen-outcomes",
    name: "Learning Outcomes Report",
    description: "Analysis of learning outcomes and skill improvement metrics from Sharpen activities.",
    product: "Sharpen",
    lastGenerated: null,
    availableFormats: ["csv", "xlsx", "both"],
    category: "Performance",
  },
];

// Mock scheduled reports
export const scheduledReports: ScheduledReport[] = [
  {
    id: "sched-1",
    reportId: "connect-enrollment",
    reportName: "Course Enrollment Summary",
    product: "Connect",
    frequency: "weekly",
    dayOfWeek: 1, // Monday
    format: "xlsx",
    deliveryMethod: "both",
    email: "admin@university.edu",
    nextRun: new Date("2026-01-29"),
    isActive: true,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "sched-2",
    reportId: "connect-active-users",
    reportName: "Active Users Report",
    product: "Connect",
    frequency: "daily",
    format: "csv",
    deliveryMethod: "email",
    email: "admin@university.edu",
    nextRun: new Date("2026-01-27"),
    isActive: true,
    createdAt: new Date("2026-01-10"),
  },
  {
    id: "sched-3",
    reportId: "aleks-learning-path",
    reportName: "Learning Path Progress",
    product: "ALEKS",
    frequency: "monthly",
    dayOfMonth: 1,
    format: "both",
    deliveryMethod: "download-center",
    nextRun: new Date("2026-02-01"),
    isActive: true,
    createdAt: new Date("2025-12-15"),
  },
  {
    id: "sched-4",
    reportId: "simnet-skills",
    reportName: "Skills Assessment Summary",
    product: "SIMnet",
    frequency: "weekly",
    dayOfWeek: 3, // Wednesday
    format: "xlsx",
    deliveryMethod: "email",
    email: "reports@university.edu",
    nextRun: new Date("2026-01-30"),
    isActive: true,
    createdAt: new Date("2026-01-05"),
  },
  {
    id: "sched-5",
    reportId: "connect-performance",
    reportName: "Student Performance Report",
    product: "Connect",
    frequency: "term-end",
    format: "both",
    deliveryMethod: "both",
    email: "dean@university.edu",
    nextRun: new Date("2026-05-15"),
    isActive: true,
    createdAt: new Date("2025-09-01"),
  },
];

// Mock generated reports (download center)
export const generatedReports: GeneratedReport[] = [
  {
    id: "gen-1",
    reportId: "connect-enrollment",
    reportName: "Course Enrollment Summary",
    product: "Connect",
    generatedAt: new Date("2026-01-20T09:30:00"),
    format: "xlsx",
    fileSize: "2.4 MB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-20"),
  },
  {
    id: "gen-2",
    reportId: "connect-enrollment",
    reportName: "Course Enrollment Summary",
    product: "Connect",
    generatedAt: new Date("2026-01-13T09:30:00"),
    format: "xlsx",
    fileSize: "2.3 MB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-13"),
  },
  {
    id: "gen-3",
    reportId: "connect-performance",
    reportName: "Student Performance Report",
    product: "Connect",
    generatedAt: new Date("2026-01-19T14:15:00"),
    format: "csv",
    fileSize: "1.8 MB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-19"),
  },
  {
    id: "gen-4",
    reportId: "connect-active-users",
    reportName: "Active Users Report",
    product: "Connect",
    generatedAt: new Date("2026-01-25T06:00:00"),
    format: "csv",
    fileSize: "856 KB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-25"),
  },
  {
    id: "gen-5",
    reportId: "aleks-learning-path",
    reportName: "Learning Path Progress",
    product: "ALEKS",
    generatedAt: new Date("2026-01-18T10:00:00"),
    format: "xlsx",
    fileSize: "3.1 MB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-18"),
  },
  {
    id: "gen-6",
    reportId: "aleks-mastery",
    reportName: "Topic Mastery Report",
    product: "ALEKS",
    generatedAt: new Date("2026-01-21T11:30:00"),
    format: "both",
    fileSize: "4.2 MB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-21"),
  },
  {
    id: "gen-7",
    reportId: "simnet-skills",
    reportName: "Skills Assessment Summary",
    product: "SIMnet",
    generatedAt: new Date("2026-01-23T08:45:00"),
    format: "xlsx",
    fileSize: "1.5 MB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-23"),
  },
  {
    id: "gen-8",
    reportId: "connect-assignment",
    reportName: "Assignment Statistics",
    product: "Connect",
    generatedAt: new Date("2026-01-22T16:20:00"),
    format: "csv",
    fileSize: "2.1 MB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-22"),
  },
  {
    id: "gen-9",
    reportId: "sharpen-engagement",
    reportName: "Student Engagement Metrics",
    product: "Sharpen",
    generatedAt: new Date("2026-01-24T13:00:00"),
    format: "xlsx",
    fileSize: "1.2 MB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-24"),
  },
  {
    id: "gen-10",
    reportId: "connect-faculty",
    reportName: "Faculty Activity Report",
    product: "Connect",
    generatedAt: new Date("2026-01-18T15:30:00"),
    format: "both",
    fileSize: "980 KB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-18"),
  },
  {
    id: "gen-11",
    reportId: "simnet-project",
    reportName: "Project Completion Report",
    product: "SIMnet",
    generatedAt: new Date("2026-01-20T12:00:00"),
    format: "xlsx",
    fileSize: "2.7 MB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-20"),
  },
  {
    id: "gen-12",
    reportId: "aleks-time",
    reportName: "Time on Task Analysis",
    product: "ALEKS",
    generatedAt: new Date("2026-01-17T09:00:00"),
    format: "csv",
    fileSize: "1.4 MB",
    downloadUrl: "#",
    expiresAt: new Date("2026-04-17"),
  },
];

// Helper functions
export function getProductColor(product: Product): string {
  const colors: Record<Product, string> = {
    Connect: "bg-nexus-purple text-white",
    ALEKS: "bg-nexus-red text-white",
    SIMnet: "bg-nexus-green text-white",
    Sharpen: "bg-nexus-pink text-nexus-purple-dark",
  };
  return colors[product] || "bg-gray-500 text-white";
}

export function getProductBorderColor(product: Product): string {
  const colors: Record<Product, string> = {
    Connect: "border-nexus-purple",
    ALEKS: "border-nexus-red",
    SIMnet: "border-nexus-green",
    Sharpen: "border-nexus-pink",
  };
  return colors[product] || "border-gray-500";
}

export function formatFrequency(frequency: Frequency, dayOfWeek?: number, dayOfMonth?: number): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  switch (frequency) {
    case "daily":
      return "Daily";
    case "weekly":
      return `Weekly on ${days[dayOfWeek || 0]}`;
    case "monthly":
      return `Monthly on the ${dayOfMonth}${getOrdinalSuffix(dayOfMonth || 1)}`;
    case "term-end":
      return "End of Term";
    default:
      return frequency;
  }
}

function getOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

// ============================================================
// USER ROLES & PERSONAS
// ============================================================

export type UserRole = "platform_admin" | "institutional_admin" | "billing_admin";

export type ModuleAccess = "full" | "view_only" | "none";

export interface UserPermissions {
  reports: ModuleAccess;
  licenses: ModuleAccess;
  enrollment: ModuleAccess;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution: string;
  avatar?: string;
  permissions: UserPermissions;
}

export const rolePermissions: Record<UserRole, UserPermissions> = {
  platform_admin: {
    reports: "full",
    licenses: "view_only",
    enrollment: "view_only",
  },
  institutional_admin: {
    reports: "full",
    licenses: "full",
    enrollment: "view_only",
  },
  billing_admin: {
    reports: "full",
    licenses: "view_only",
    enrollment: "full",
  },
};

export const currentUser: User = {
  id: "user-1",
  name: "Sarah Chen",
  email: "schen@stateuniversity.edu",
  role: "institutional_admin",
  institution: "State University",
  permissions: rolePermissions.institutional_admin,
};

// ============================================================
// LICENSES
// ============================================================

export type LicenseStatus = "active" | "expired" | "expiring_soon" | "unassigned";

export interface License {
  id: string;
  product: Product;
  totalSeats: number;
  usedSeats: number;
  availableSeats: number;
  expirationDate: Date;
  status: LicenseStatus;
  costPerSeat: number;
  renewalDate?: Date;
}

export interface StudentLicense {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  product: Product;
  assignedDate: Date;
  expirationDate: Date;
  status: LicenseStatus;
  lastAccess?: Date;
  courseName?: string;
}

export const licenses: License[] = [
  {
    id: "lic-1",
    product: "Connect",
    totalSeats: 500,
    usedSeats: 423,
    availableSeats: 77,
    expirationDate: new Date("2026-08-15"),
    status: "active",
    costPerSeat: 89,
    renewalDate: new Date("2026-07-01"),
  },
  {
    id: "lic-2",
    product: "ALEKS",
    totalSeats: 300,
    usedSeats: 287,
    availableSeats: 13,
    expirationDate: new Date("2026-05-31"),
    status: "active",
    costPerSeat: 75,
    renewalDate: new Date("2026-04-15"),
  },
  {
    id: "lic-3",
    product: "SIMnet",
    totalSeats: 150,
    usedSeats: 142,
    availableSeats: 8,
    expirationDate: new Date("2026-02-28"),
    status: "expiring_soon",
    costPerSeat: 65,
    renewalDate: new Date("2026-02-01"),
  },
  {
    id: "lic-4",
    product: "Sharpen",
    totalSeats: 200,
    usedSeats: 156,
    availableSeats: 44,
    expirationDate: new Date("2026-12-31"),
    status: "active",
    costPerSeat: 45,
  },
];

export const studentLicenses: StudentLicense[] = [
  {
    id: "sl-1",
    studentId: "STU-10234",
    studentName: "Emily Johnson",
    studentEmail: "ejohnson@stateuniversity.edu",
    product: "Connect",
    assignedDate: new Date("2026-01-10"),
    expirationDate: new Date("2026-08-15"),
    status: "active",
    lastAccess: new Date("2026-01-25"),
    courseName: "ECON 101",
  },
  {
    id: "sl-2",
    studentId: "STU-10235",
    studentName: "Michael Chen",
    studentEmail: "mchen@stateuniversity.edu",
    product: "Connect",
    assignedDate: new Date("2026-01-08"),
    expirationDate: new Date("2026-08-15"),
    status: "active",
    lastAccess: new Date("2026-01-26"),
    courseName: "BIO 201",
  },
  {
    id: "sl-3",
    studentId: "STU-10236",
    studentName: "Sofia Rodriguez",
    studentEmail: "srodriguez@stateuniversity.edu",
    product: "ALEKS",
    assignedDate: new Date("2026-01-05"),
    expirationDate: new Date("2026-05-31"),
    status: "active",
    lastAccess: new Date("2026-01-24"),
    courseName: "MATH 150",
  },
  {
    id: "sl-4",
    studentId: "STU-10237",
    studentName: "James Williams",
    studentEmail: "jwilliams@stateuniversity.edu",
    product: "SIMnet",
    assignedDate: new Date("2025-09-01"),
    expirationDate: new Date("2026-02-28"),
    status: "expiring_soon",
    lastAccess: new Date("2026-01-20"),
    courseName: "CIS 110",
  },
  {
    id: "sl-5",
    studentId: "STU-10238",
    studentName: "Aisha Patel",
    studentEmail: "apatel@stateuniversity.edu",
    product: "Connect",
    assignedDate: new Date("2026-01-12"),
    expirationDate: new Date("2026-08-15"),
    status: "active",
    lastAccess: new Date("2026-01-25"),
    courseName: "CHEM 101",
  },
  {
    id: "sl-6",
    studentId: "STU-10239",
    studentName: "David Kim",
    studentEmail: "dkim@stateuniversity.edu",
    product: "ALEKS",
    assignedDate: new Date("2026-01-03"),
    expirationDate: new Date("2026-05-31"),
    status: "active",
    lastAccess: new Date("2026-01-26"),
    courseName: "MATH 201",
  },
  {
    id: "sl-7",
    studentId: "STU-10240",
    studentName: "Rachel Thompson",
    studentEmail: "rthompson@stateuniversity.edu",
    product: "Sharpen",
    assignedDate: new Date("2026-01-15"),
    expirationDate: new Date("2026-12-31"),
    status: "active",
    lastAccess: new Date("2026-01-23"),
    courseName: "PSY 101",
  },
  {
    id: "sl-8",
    studentId: "STU-10241",
    studentName: "Kevin Martinez",
    studentEmail: "kmartinez@stateuniversity.edu",
    product: "Connect",
    assignedDate: new Date("2026-01-08"),
    expirationDate: new Date("2026-08-15"),
    status: "active",
    lastAccess: new Date("2026-01-24"),
    courseName: "PHYS 101",
  },
];

// ============================================================
// ENROLLMENT
// ============================================================

export type EnrollmentStatus = "active" | "pending" | "completed" | "dropped";

export interface Course {
  id: string;
  name: string;
  code: string;
  product: Product;
  instructor: string;
  department: string;
  term: string;
  enrolledCount: number;
  capacity: number;
  startDate: Date;
  endDate: Date;
  status: "active" | "upcoming" | "completed";
  lastSynced?: Date;
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  product: Product;
  enrollmentDate: Date;
  status: EnrollmentStatus;
  grade?: string;
  progress?: number;
  lastActivity?: Date;
}

export const courses: Course[] = [
  {
    id: "course-1",
    name: "Introduction to Economics",
    code: "ECON 101",
    product: "Connect",
    instructor: "Dr. Amanda Foster",
    department: "Economics",
    term: "Spring 2026",
    enrolledCount: 145,
    capacity: 150,
    startDate: new Date("2026-01-13"),
    endDate: new Date("2026-05-10"),
    status: "active",
    lastSynced: new Date("2026-01-26T08:00:00"),
  },
  {
    id: "course-2",
    name: "Cell Biology",
    code: "BIO 201",
    product: "Connect",
    instructor: "Dr. Robert Chang",
    department: "Biology",
    term: "Spring 2026",
    enrolledCount: 98,
    capacity: 100,
    startDate: new Date("2026-01-13"),
    endDate: new Date("2026-05-10"),
    status: "active",
    lastSynced: new Date("2026-01-26T08:00:00"),
  },
  {
    id: "course-3",
    name: "Calculus I",
    code: "MATH 150",
    product: "ALEKS",
    instructor: "Dr. Lisa Wang",
    department: "Mathematics",
    term: "Spring 2026",
    enrolledCount: 180,
    capacity: 200,
    startDate: new Date("2026-01-13"),
    endDate: new Date("2026-05-10"),
    status: "active",
    lastSynced: new Date("2026-01-25T14:30:00"),
  },
  {
    id: "course-4",
    name: "Computer Applications",
    code: "CIS 110",
    product: "SIMnet",
    instructor: "Prof. Mark Davis",
    department: "Computer Science",
    term: "Spring 2026",
    enrolledCount: 72,
    capacity: 80,
    startDate: new Date("2026-01-13"),
    endDate: new Date("2026-05-10"),
    status: "active",
    lastSynced: new Date("2026-01-24T16:45:00"),
  },
  {
    id: "course-5",
    name: "General Chemistry",
    code: "CHEM 101",
    product: "Connect",
    instructor: "Dr. Jennifer Lee",
    department: "Chemistry",
    term: "Spring 2026",
    enrolledCount: 120,
    capacity: 125,
    startDate: new Date("2026-01-13"),
    endDate: new Date("2026-05-10"),
    status: "active",
    lastSynced: new Date("2026-01-26T09:15:00"),
  },
  {
    id: "course-6",
    name: "Linear Algebra",
    code: "MATH 201",
    product: "ALEKS",
    instructor: "Dr. Thomas Green",
    department: "Mathematics",
    term: "Spring 2026",
    enrolledCount: 65,
    capacity: 75,
    startDate: new Date("2026-01-13"),
    endDate: new Date("2026-05-10"),
    status: "active",
    lastSynced: new Date("2026-01-25T14:30:00"),
  },
  {
    id: "course-7",
    name: "Introduction to Psychology",
    code: "PSY 101",
    product: "Sharpen",
    instructor: "Dr. Sarah Miller",
    department: "Psychology",
    term: "Spring 2026",
    enrolledCount: 156,
    capacity: 175,
    startDate: new Date("2026-01-13"),
    endDate: new Date("2026-05-10"),
    status: "active",
    lastSynced: new Date("2026-01-23T11:00:00"),
  },
  {
    id: "course-8",
    name: "Physics I",
    code: "PHYS 101",
    product: "Connect",
    instructor: "Dr. Michael Brown",
    department: "Physics",
    term: "Spring 2026",
    enrolledCount: 88,
    capacity: 100,
    startDate: new Date("2026-01-13"),
    endDate: new Date("2026-05-10"),
    status: "active",
    lastSynced: new Date("2026-01-26T07:30:00"),
  },
];

export const studentEnrollments: StudentEnrollment[] = [
  {
    id: "enr-1",
    studentId: "STU-10234",
    studentName: "Emily Johnson",
    studentEmail: "ejohnson@stateuniversity.edu",
    courseId: "course-1",
    courseName: "Introduction to Economics",
    courseCode: "ECON 101",
    product: "Connect",
    enrollmentDate: new Date("2026-01-10"),
    status: "active",
    grade: "A-",
    progress: 78,
    lastActivity: new Date("2026-01-25"),
  },
  {
    id: "enr-2",
    studentId: "STU-10235",
    studentName: "Michael Chen",
    studentEmail: "mchen@stateuniversity.edu",
    courseId: "course-2",
    courseName: "Cell Biology",
    courseCode: "BIO 201",
    product: "Connect",
    enrollmentDate: new Date("2026-01-08"),
    status: "active",
    grade: "B+",
    progress: 82,
    lastActivity: new Date("2026-01-26"),
  },
  {
    id: "enr-3",
    studentId: "STU-10236",
    studentName: "Sofia Rodriguez",
    studentEmail: "srodriguez@stateuniversity.edu",
    courseId: "course-3",
    courseName: "Calculus I",
    courseCode: "MATH 150",
    product: "ALEKS",
    enrollmentDate: new Date("2026-01-05"),
    status: "active",
    progress: 65,
    lastActivity: new Date("2026-01-24"),
  },
  {
    id: "enr-4",
    studentId: "STU-10237",
    studentName: "James Williams",
    studentEmail: "jwilliams@stateuniversity.edu",
    courseId: "course-4",
    courseName: "Computer Applications",
    courseCode: "CIS 110",
    product: "SIMnet",
    enrollmentDate: new Date("2025-09-01"),
    status: "active",
    grade: "A",
    progress: 91,
    lastActivity: new Date("2026-01-20"),
  },
  {
    id: "enr-5",
    studentId: "STU-10238",
    studentName: "Aisha Patel",
    studentEmail: "apatel@stateuniversity.edu",
    courseId: "course-5",
    courseName: "General Chemistry",
    courseCode: "CHEM 101",
    product: "Connect",
    enrollmentDate: new Date("2026-01-12"),
    status: "active",
    grade: "B",
    progress: 70,
    lastActivity: new Date("2026-01-25"),
  },
];

// ============================================================
// LICENSE STATS HELPERS
// ============================================================

export function getLicenseStats() {
  const totalLicenses = licenses.reduce((sum, l) => sum + l.totalSeats, 0);
  const usedLicenses = licenses.reduce((sum, l) => sum + l.usedSeats, 0);
  const availableLicenses = licenses.reduce((sum, l) => sum + l.availableSeats, 0);
  const expiringLicenses = licenses.filter(l => l.status === "expiring_soon").reduce((sum, l) => sum + l.usedSeats, 0);

  return {
    total: totalLicenses,
    used: usedLicenses,
    available: availableLicenses,
    expiring: expiringLicenses,
    utilizationRate: Math.round((usedLicenses / totalLicenses) * 100),
  };
}

export function getEnrollmentStats() {
  const totalEnrolled = courses.reduce((sum, c) => sum + c.enrolledCount, 0);
  const totalCapacity = courses.reduce((sum, c) => sum + c.capacity, 0);
  const activeCourses = courses.filter(c => c.status === "active").length;

  return {
    totalStudents: totalEnrolled,
    totalCapacity: totalCapacity,
    activeCourses: activeCourses,
    utilizationRate: Math.round((totalEnrolled / totalCapacity) * 100),
  };
}

export function getLicenseStatusColor(status: LicenseStatus): string {
  const colors: Record<LicenseStatus, string> = {
    active: "bg-green-100 text-green-700",
    expired: "bg-red-100 text-red-700",
    expiring_soon: "bg-amber-100 text-amber-700",
    unassigned: "bg-gray-100 text-gray-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
}

export function getEnrollmentStatusColor(status: EnrollmentStatus): string {
  const colors: Record<EnrollmentStatus, string> = {
    active: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    completed: "bg-blue-100 text-blue-700",
    dropped: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
}

// ============================================================
// ENROLLMENT EXTENDED DATA (for Enrollment Dashboard)
// ============================================================

export interface LMSSyncInfo {
  lmsName: string;
  lastSynced: Date;
  totalCourses: number;
  totalStudents: number;
  newEnrollments: number;
  droppedStudents: number;
  autoSyncTime: string;
}

export interface SyncHistoryItem {
  id: string;
  timestamp: Date;
  type: "auto" | "manual";
  status: "success" | "partial" | "failed";
  coursesUpdated: number;
  studentsProcessed: number;
  newEnrollments: number;
  droppedStudents: number;
  duration?: string;
  errorMessage?: string;
}

export interface EnrollmentByProduct {
  product: Product;
  totalStudents: number;
  activeStudents: number;
  activePercentage: number;
  courseCount: number;
  topCourses: { name: string; enrolled: number }[];
}

export const lmsSyncInfo: LMSSyncInfo = {
  lmsName: "Canvas",
  lastSynced: new Date("2026-01-26T10:45:00"),
  totalCourses: 34,
  totalStudents: 1247,
  newEnrollments: 12,
  droppedStudents: 3,
  autoSyncTime: "10:45 AM",
};

export const syncHistory: SyncHistoryItem[] = [
  {
    id: "sync-1",
    timestamp: new Date("2026-01-26T12:45:00"),
    type: "manual",
    status: "success",
    coursesUpdated: 34,
    studentsProcessed: 1247,
    newEnrollments: 12,
    droppedStudents: 3,
    duration: "2 min 18 sec",
  },
  {
    id: "sync-2",
    timestamp: new Date("2026-01-26T10:45:00"),
    type: "auto",
    status: "success",
    coursesUpdated: 34,
    studentsProcessed: 1235,
    newEnrollments: 5,
    droppedStudents: 1,
    duration: "2 min 5 sec",
  },
  {
    id: "sync-3",
    timestamp: new Date("2026-01-25T10:45:00"),
    type: "auto",
    status: "success",
    coursesUpdated: 34,
    studentsProcessed: 1231,
    newEnrollments: 8,
    droppedStudents: 2,
    duration: "2 min 12 sec",
  },
  {
    id: "sync-4",
    timestamp: new Date("2026-01-24T10:45:00"),
    type: "auto",
    status: "success",
    coursesUpdated: 34,
    studentsProcessed: 1225,
    newEnrollments: 15,
    droppedStudents: 0,
    duration: "2 min 8 sec",
  },
  {
    id: "sync-5",
    timestamp: new Date("2026-01-23T10:45:00"),
    type: "auto",
    status: "partial",
    coursesUpdated: 28,
    studentsProcessed: 1210,
    newEnrollments: 0,
    droppedStudents: 0,
    duration: "3 min 45 sec",
    errorMessage: "Timeout - Retried at 11:15 AM",
  },
  {
    id: "sync-6",
    timestamp: new Date("2026-01-23T11:15:00"),
    type: "manual",
    status: "success",
    coursesUpdated: 34,
    studentsProcessed: 1210,
    newEnrollments: 0,
    droppedStudents: 0,
    duration: "2 min 20 sec",
  },
  {
    id: "sync-7",
    timestamp: new Date("2026-01-22T10:45:00"),
    type: "auto",
    status: "success",
    coursesUpdated: 34,
    studentsProcessed: 1210,
    newEnrollments: 7,
    droppedStudents: 3,
    duration: "2 min 15 sec",
  },
];

export const enrollmentByProduct: EnrollmentByProduct[] = [
  {
    product: "Connect",
    totalStudents: 856,
    activeStudents: 698,
    activePercentage: 82,
    courseCount: 18,
    topCourses: [
      { name: "Biology 101", enrolled: 247 },
      { name: "Intro to Chemistry", enrolled: 189 },
      { name: "Business Math", enrolled: 134 },
    ],
  },
  {
    product: "ALEKS",
    totalStudents: 421,
    activeStudents: 378,
    activePercentage: 90,
    courseCount: 11,
    topCourses: [
      { name: "Calculus I", enrolled: 156 },
      { name: "Statistics", enrolled: 125 },
      { name: "Pre-Algebra", enrolled: 89 },
    ],
  },
  {
    product: "SIMnet",
    totalStudents: 178,
    activeStudents: 143,
    activePercentage: 80,
    courseCount: 5,
    topCourses: [
      { name: "Computer Skills", enrolled: 118 },
      { name: "MS Office", enrolled: 60 },
    ],
  },
];

// Extended course data for enrollment dashboard
export interface EnrollmentCourse {
  id: string;
  name: string;
  code: string;
  product: Product;
  instructor: string;
  term: string;
  enrolledCount: number;
  activeCount: number;
  lastUpdated: Date;
}

export const enrollmentCourses: EnrollmentCourse[] = [
  {
    id: "enc-1",
    name: "Biology 101",
    code: "BIO 101",
    product: "Connect",
    instructor: "Dr. Sarah Ahmed",
    term: "Spring 2026",
    enrolledCount: 247,
    activeCount: 198,
    lastUpdated: new Date("2026-01-26T10:45:00"),
  },
  {
    id: "enc-2",
    name: "Intro to Chemistry",
    code: "CHEM 101",
    product: "Connect",
    instructor: "Dr. Jennifer Lee",
    term: "Spring 2026",
    enrolledCount: 189,
    activeCount: 167,
    lastUpdated: new Date("2026-01-26T10:45:00"),
  },
  {
    id: "enc-3",
    name: "Calculus I",
    code: "MATH 150",
    product: "ALEKS",
    instructor: "Dr. Lisa Wang",
    term: "Spring 2026",
    enrolledCount: 156,
    activeCount: 142,
    lastUpdated: new Date("2026-01-26T10:45:00"),
  },
  {
    id: "enc-4",
    name: "Business Math",
    code: "MATH 110",
    product: "Connect",
    instructor: "Prof. James Miller",
    term: "Spring 2026",
    enrolledCount: 134,
    activeCount: 108,
    lastUpdated: new Date("2026-01-26T10:45:00"),
  },
  {
    id: "enc-5",
    name: "Physics 101",
    code: "PHYS 101",
    product: "Connect",
    instructor: "Dr. Michael Brown",
    term: "Spring 2026",
    enrolledCount: 128,
    activeCount: 115,
    lastUpdated: new Date("2026-01-26T10:45:00"),
  },
  {
    id: "enc-6",
    name: "Statistics",
    code: "STAT 200",
    product: "ALEKS",
    instructor: "Dr. Thomas Green",
    term: "Spring 2026",
    enrolledCount: 125,
    activeCount: 119,
    lastUpdated: new Date("2026-01-26T10:45:00"),
  },
  {
    id: "enc-7",
    name: "Computer Skills",
    code: "CIS 100",
    product: "SIMnet",
    instructor: "Prof. Mark Davis",
    term: "Spring 2026",
    enrolledCount: 118,
    activeCount: 95,
    lastUpdated: new Date("2026-01-26T10:45:00"),
  },
];

// Extended student data for course details page
export interface CourseStudent {
  id: string;
  studentId: string;
  name: string;
  email: string;
  enrollmentDate: Date;
  lastAccess: Date | null;
  status: "active" | "inactive";
}

export const courseStudents: CourseStudent[] = [
  { id: "cs-1", studentId: "202401234", name: "Ahmed, Fatima", email: "fahmed@ksu.edu.sa", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-26"), status: "active" },
  { id: "cs-2", studentId: "202401235", name: "Al-Rashid, Omar", email: "oalrashid@ksu.edu", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-25"), status: "active" },
  { id: "cs-3", studentId: "202401236", name: "Hassan, Layla", email: "lhassan@ksu.edu.sa", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-26"), status: "active" },
  { id: "cs-4", studentId: "202401237", name: "Mohammed, Khaled", email: "kmohammed@ksu.edu", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-24"), status: "active" },
  { id: "cs-5", studentId: "202401238", name: "Nasser, Aisha", email: "anasser@ksu.edu.sa", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-26"), status: "active" },
  { id: "cs-6", studentId: "202401239", name: "Abdullah, Yousef", email: "yabdullah@ksu.edu", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-25"), status: "active" },
  { id: "cs-7", studentId: "202401240", name: "Ibrahim, Nora", email: "nibrahim@ksu.edu.sa", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-26"), status: "active" },
  { id: "cs-8", studentId: "202401241", name: "Salem, Tariq", email: "tsalem@ksu.edu.sa", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-23"), status: "active" },
  { id: "cs-9", studentId: "202401242", name: "Khalil, Maryam", email: "mkhalil@ksu.edu.sa", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-25"), status: "active" },
  { id: "cs-10", studentId: "202401243", name: "Fahad, Sara", email: "sfahad@ksu.edu.sa", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-26"), status: "active" },
  { id: "cs-11", studentId: "202401244", name: "Mansour, Ali", email: "amansour@ksu.edu.sa", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-21"), status: "inactive" },
  { id: "cs-12", studentId: "202401245", name: "Othman, Hala", email: "hothman@ksu.edu.sa", enrollmentDate: new Date("2026-01-10"), lastAccess: new Date("2026-01-18"), status: "inactive" },
];

export function getEnrollmentDashboardStats() {
  const totalStudents = 1247;
  const activeStudents = 1089;
  const totalCourses = 34;

  const connectStudents = 856;
  const aleksStudents = 421;
  const simnetStudents = 178;

  return {
    total: totalStudents,
    active: activeStudents,
    activePercentage: Math.round((activeStudents / totalStudents) * 100),
    courses: totalCourses,
    byProduct: {
      Connect: { count: connectStudents, percentage: Math.round((connectStudents / totalStudents) * 100) },
      ALEKS: { count: aleksStudents, percentage: Math.round((aleksStudents / totalStudents) * 100) },
      SIMnet: { count: simnetStudents, percentage: Math.round((simnetStudents / totalStudents) * 100) },
    },
  };
}
