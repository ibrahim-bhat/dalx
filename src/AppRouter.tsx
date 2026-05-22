import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AttendancePage from "./AttendancePage";
import LoginPage from "./LoginPage";
import App from "./App";
import { DALX_EMPLOYEES } from "./data/dalxEmployees";
import { AttendanceRecord, EmployeeProfile } from "./types";

const STORAGE_SESSION_KEY = "dalx_attendance_session";
const STORAGE_RECORDS_KEY = "dalx_attendance_records";

function getOfficeStart(now: Date) {
  const officeStart = new Date(now);
  officeStart.setHours(10, 0, 0, 0);
  return officeStart;
}

function diffHours(checkInTime: string, now: Date) {
  const ms = now.getTime() - new Date(checkInTime).getTime();
  return Math.max(0, Number((ms / (1000 * 60 * 60)).toFixed(2)));
}

function buildInitialRecords(): AttendanceRecord[] {
  return DALX_EMPLOYEES.map((employee) => ({
    id: employee.id,
    checkInTime: null,
    status: "Absent",
    workMode: employee.workMode,
    totalWorkingHours: 0,
    screenHours: 0,
    lateReason: "",
    todaysTasks: "",
  }));
}

function readSavedSession() {
  const value = localStorage.getItem(STORAGE_SESSION_KEY);
  if (!value) return null;
  const parsed = Number(value);
  return DALX_EMPLOYEES.find((employee) => employee.id === parsed) ?? null;
}

function readSavedRecords() {
  const value = localStorage.getItem(STORAGE_RECORDS_KEY);
  if (!value) return buildInitialRecords();
  try {
    const parsed = JSON.parse(value) as AttendanceRecord[];
    if (!Array.isArray(parsed)) return buildInitialRecords();
    return parsed;
  } catch {
    return buildInitialRecords();
  }
}

type GateProps = {
  user: EmployeeProfile | null;
  adminOnly?: boolean;
  children: React.ReactNode;
};

function RouteGate({ user, adminOnly, children }: GateProps) {
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/attendance" replace />;
  return <>{children}</>;
}

export default function AppRouter() {
  const [now, setNow] = React.useState(new Date());
  const [currentUser, setCurrentUser] = React.useState<EmployeeProfile | null>(() => readSavedSession());
  const [records, setRecords] = React.useState<AttendanceRecord[]>(() => readSavedRecords());

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_RECORDS_KEY, JSON.stringify(records));
  }, [records]);

  React.useEffect(() => {
    const officeStart = getOfficeStart(now);
    const beforeOfficeTime = now < officeStart;
    if (beforeOfficeTime) return;

    setRecords((prev) =>
      prev.map((record) =>
        record.status === "Absent"
          ? { ...record, status: "Late - Pending Approval" }
          : record
      )
    );
  }, [now]);

  React.useEffect(() => {
    setRecords((prev) =>
      prev.map((record) => {
        if (!record.checkInTime) return record;
        const employee = DALX_EMPLOYEES.find((member) => member.id === record.id);
        if (!employee || employee.workMode === "WFH") return record;
        return { ...record, totalWorkingHours: diffHours(record.checkInTime, now) };
      })
    );
  }, [now]);

  const officeStart = getOfficeStart(now);
  const beforeOfficeTime = now < officeStart;

  const onLogin = (email: string, password: string) => {
    const match = DALX_EMPLOYEES.find((employee) => employee.email === email && employee.password === password);
    if (!match) return false;
    setCurrentUser(match);
    localStorage.setItem(STORAGE_SESSION_KEY, String(match.id));
    return true;
  };

  const onLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_SESSION_KEY);
  };

  const onMarkPresent = (id: number) => {
    if (!beforeOfficeTime) return;
    const checkIn = new Date().toISOString();
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, checkInTime: checkIn, status: "Present" } : record
      )
    );
  };

  const onSendLateRequest = (id: number, reason: string) => {
    const trimmed = reason.trim();
    if (!trimmed) return;
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id
          ? { ...record, status: "Late - Pending Approval", lateReason: trimmed }
          : record
      )
    );
  };

  const onApproveLate = (id: number) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id
          ? {
            ...record,
            status: "Late - Approved",
            checkInTime: record.checkInTime ?? new Date().toISOString(),
          }
          : record
      )
    );
  };

  const onRejectLate = (id: number) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, status: "Late - Rejected" } : record
      )
    );
  };

  const onUpdateWorkMode = (id: number, mode: "Office" | "WFH") => {
    setRecords((prev) =>
      prev.map((record) => (record.id === id ? { ...record, workMode: mode } : record))
    );
  };

  const onUpdateHours = (id: number, key: "totalWorkingHours" | "screenHours", value: string) => {
    const numeric = Number(value);
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id
          ? { ...record, [key]: Number.isNaN(numeric) ? 0 : numeric }
          : record
      )
    );
  };

  const onUpdateTasks = (id: number, tasks: string) => {
    setRecords((prev) =>
      prev.map((record) => (record.id === id ? { ...record, todaysTasks: tasks } : record))
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/login"
          element={currentUser ? <Navigate to={currentUser.role === "admin" ? "/admin" : "/attendance"} replace /> : <LoginPage onLogin={onLogin} />}
        />
        <Route
          path="/attendance"
          element={
            <RouteGate user={currentUser}>
              <AttendancePage
                now={now}
                officeStart={officeStart}
                isAdminView={false}
                currentUser={currentUser!}
                employees={DALX_EMPLOYEES}
                records={records}
                onMarkPresent={onMarkPresent}
                onSendLateRequest={onSendLateRequest}
                onApproveLate={onApproveLate}
                onRejectLate={onRejectLate}
                onUpdateWorkMode={onUpdateWorkMode}
                onUpdateHours={onUpdateHours}
                onUpdateTasks={onUpdateTasks}
                onLogout={onLogout}
              />
            </RouteGate>
          }
        />
        <Route
          path="/admin"
          element={
            <RouteGate user={currentUser} adminOnly>
              <AttendancePage
                now={now}
                officeStart={officeStart}
                isAdminView
                currentUser={currentUser!}
                employees={DALX_EMPLOYEES}
                records={records}
                onMarkPresent={onMarkPresent}
                onSendLateRequest={onSendLateRequest}
                onApproveLate={onApproveLate}
                onRejectLate={onRejectLate}
                onUpdateWorkMode={onUpdateWorkMode}
                onUpdateHours={onUpdateHours}
                onUpdateTasks={onUpdateTasks}
                onLogout={onLogout}
              />
            </RouteGate>
          }
        />
        <Route path="*" element={<Navigate to={currentUser ? (currentUser.role === "admin" ? "/admin" : "/attendance") : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
