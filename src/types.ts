export type UserRole = "admin" | "employee";
export type WorkMode = "Office" | "WFH";
export type AttendanceStatus =
  | "Absent"
  | "Present"
  | "Late - Pending Approval"
  | "Late - Approved"
  | "Late - Rejected";

export type EmployeeProfile = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  workMode: WorkMode;
  avatarSrc: string;
};

export type AttendanceRecord = {
  id: number;
  checkInTime: string | null;
  status: AttendanceStatus;
  workMode: WorkMode;
  totalWorkingHours: number;
  screenHours: number;
  lateReason: string;
  todaysTasks: string;
};
