import React from "react";
import {
  CheckCircle2,
  Clock3,
  Home,
  Building2,
  ShieldCheck,
  LogOut,
  CalendarDays,
  Bell,
  LayoutDashboard,
  CalendarCheck,
  Users,
  ListTodo,
  FileText,
  Settings,
  Send,
  XCircle,
} from "lucide-react";
import { AttendanceRecord, EmployeeProfile } from "./types";

type AttendancePageProps = {
  now: Date;
  officeStart: Date;
  isAdminView: boolean;
  currentUser: EmployeeProfile;
  employees: EmployeeProfile[];
  records: AttendanceRecord[];
  onMarkPresent: (id: number) => void;
  onSendLateRequest: (id: number, reason: string) => void;
  onApproveLate: (id: number) => void;
  onRejectLate: (id: number) => void;
  onUpdateWorkMode: (id: number, mode: "Office" | "WFH") => void;
  onUpdateHours: (id: number, key: "totalWorkingHours" | "screenHours", value: string) => void;
  onUpdateTasks: (id: number, tasks: string) => void;
  onLogout: () => void;
};

export default function AttendancePage({
  now,
  officeStart,
  isAdminView,
  currentUser,
  employees,
  records,
  onMarkPresent,
  onSendLateRequest,
  onApproveLate,
  onRejectLate,
  onUpdateWorkMode,
  onUpdateHours,
  onUpdateTasks,
  onLogout,
}: AttendancePageProps) {
  const beforeOfficeTime = now < officeStart;
  const [lateReasonDraft, setLateReasonDraft] = React.useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = React.useState("Dashboard");

  const mergedData = employees.map((emp) => ({
    ...emp,
    ...records.find((record) => record.id === emp.id)!,
  }));

  const visibleEmployees = isAdminView
    ? mergedData
    : mergedData.filter((emp) => emp.id === currentUser.id);

  const statsSource = isAdminView ? mergedData : visibleEmployees;
  const presentCount = statsSource.filter((emp) => emp.status === "Present").length;
  const lateCount = statsSource.filter((emp) => emp.status.startsWith("Late")).length;
  const wfhCount = statsSource.filter((emp) => emp.workMode === "WFH").length;
  const absentCount = statsSource.filter((emp) => emp.status === "Absent").length;

  const dateLabel = now.toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeLabel = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const deadlineLabel = officeStart.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-[#F3F4F8] text-brand-primary">
      <div className="flex min-h-screen">
        {isAdminView && (
          <aside className="hidden lg:flex w-64 bg-white border-r border-brand-primary/15 p-6 flex-col">
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" alt="DALX" className="h-10 w-auto object-contain" />
            </div>
            <nav className="space-y-2 text-sm font-semibold">
              {[
                { label: "Dashboard", icon: LayoutDashboard },
                { label: "Attendance", icon: CalendarCheck },
                { label: "Employees", icon: Users },
                { label: "Tasks", icon: ListTodo },
                { label: "Reports", icon: FileText },
                { label: "Settings", icon: Settings },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 ${activeTab === item.label
                      ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-[1.02]"
                      : "text-gray-600 hover:bg-brand-primary/10"
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
            <button
              onClick={onLogout}
              className="mt-auto w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-gray-600 hover:bg-brand-primary/10 font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </aside>
        )}

        <div className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-brand-primary/15">
            <div className="px-4 sm:px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="DALX" className="h-10 w-auto object-contain lg:hidden" />
                <CalendarDays className="w-4 h-4 text-brand-primary hidden sm:block" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">
                    {beforeOfficeTime ? "Before 10:00 AM" : "After 10:00 AM"}
                  </p>
                  <p className="text-lg font-bold leading-none">{timeLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-brand-primary" />
                </button>
                <img
                  src={currentUser.avatarSrc}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-xl object-cover border border-brand-primary/20"
                />
                <div className="px-3 py-2 rounded-xl bg-brand-primary text-white text-xs sm:text-sm font-bold">
                  {isAdminView ? "ADMIN" : "EMP"}
                </div>
                {!isAdminView && (
                  <button
                    onClick={onLogout}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </header>

          <main className="px-3 sm:px-6 py-6 sm:py-8 space-y-5">
            <section className="bg-white border border-brand-primary/25 rounded-2xl sm:rounded-3xl shadow-sm p-5 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Good Morning, {currentUser.name.split(" ")[0]} 👋</h1>
              <p className="text-gray-500 mb-4">{dateLabel}</p>
              <p className="text-lg font-bold text-brand-primary mb-4">{timeLabel}</p>

              {!isAdminView && (
                <div className="space-y-4">
                  {visibleEmployees.map((emp) => {
                    const latePending = emp.status === "Late - Pending Approval";
                    const lateRejected = emp.status === "Late - Rejected";
                    const lateMode = !beforeOfficeTime && emp.status !== "Late - Approved" && emp.status !== "Present";

                    return (
                      <div key={emp.id} className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-600">Work Mode</span>
                          <div className="inline-flex rounded-xl border border-brand-primary/20 bg-gray-100 p-1">
                            <button
                              onClick={() => onUpdateWorkMode(emp.id, "Office")}
                              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${emp.workMode === "Office"
                                  ? "bg-brand-primary text-white"
                                  : "text-gray-600 hover:bg-white"
                                }`}
                            >
                              Office
                            </button>
                            <button
                              onClick={() => onUpdateWorkMode(emp.id, "WFH")}
                              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${emp.workMode === "WFH"
                                  ? "bg-brand-primary text-white"
                                  : "text-gray-600 hover:bg-white"
                                }`}
                            >
                              WFH
                            </button>
                          </div>
                        </div>

                        {beforeOfficeTime && (
                          <div className="border border-dashed border-brand-primary/20 rounded-xl p-4 bg-[#F7F8FC]">
                            <button
                              onClick={() => onMarkPresent(emp.id)}
                              className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold inline-flex items-center justify-center gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Mark Present
                            </button>
                            <p className="text-xs text-gray-500 text-center font-semibold mt-3">Deadline: {deadlineLabel}</p>
                          </div>
                        )}

                        {!beforeOfficeTime && (
                          <div className="border border-dashed border-brand-primary/20 rounded-xl p-4 bg-[#F7F8FC] space-y-3">
                            <div className="rounded-lg bg-rose-100 text-rose-700 px-3 py-2 text-sm font-semibold text-center">
                              Check-in time exceeded (10:00 AM).
                            </div>
                            <button
                              disabled
                              className="w-full bg-gray-300 text-gray-500 py-3 rounded-xl font-bold inline-flex items-center justify-center gap-2 cursor-not-allowed"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Mark Present
                            </button>
                            <p className="text-xs text-gray-500 text-center font-semibold">Deadline: {deadlineLabel}</p>
                          </div>
                        )}

                        {!beforeOfficeTime && lateMode && (
                          <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 space-y-3">
                            <p className="text-sm font-bold text-amber-800">You are late today</p>
                            <input
                              value={lateReasonDraft[emp.id] ?? emp.lateReason}
                              onChange={(e) => setLateReasonDraft((prev) => ({ ...prev, [emp.id]: e.target.value }))}
                              placeholder="Reason for late check-in"
                              className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white text-sm outline-none"
                            />
                            <button
                              onClick={() => onSendLateRequest(emp.id, lateReasonDraft[emp.id] ?? emp.lateReason)}
                              className="w-full bg-amber-600 text-white py-2.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2"
                            >
                              <Send className="w-4 h-4" />
                              Send Approval Request
                            </button>
                            {(latePending || lateRejected) && (
                              <p className="text-xs font-semibold text-amber-700">
                                Current status: {emp.status}
                              </p>
                            )}
                          </div>
                        )}

                        {emp.workMode === "WFH" && (
                          <div className="border border-brand-primary/20 rounded-xl p-4 bg-[#F7F8FC] space-y-3">
                            <div className="flex items-center justify-between text-sm font-semibold">
                              <span>Working Hours Timer</span>
                              <span>{emp.totalWorkingHours.toFixed(2)}h / 8h</span>
                            </div>
                            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                              <div
                                className="h-full bg-brand-primary"
                                style={{ width: `${Math.min((emp.totalWorkingHours / 8) * 100, 100)}%` }}
                              />
                            </div>
                            <textarea
                              rows={4}
                              value={emp.todaysTasks}
                              onChange={(e) => onUpdateTasks(emp.id, e.target.value)}
                              placeholder="Submit Today's Tasks"
                              className="w-full px-3 py-2 rounded-lg border border-brand-primary/25 bg-white text-sm outline-none"
                            />
                            <button
                              onClick={() => onUpdateTasks(emp.id, emp.todaysTasks)}
                              className="w-full bg-brand-primary text-white py-2.5 rounded-lg font-semibold"
                            >
                              Submit Tasks
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {(activeTab === "Dashboard" || !isAdminView) && (
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white border border-brand-primary/25 rounded-xl sm:rounded-2xl p-4 shadow-sm">
                  <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-bold">Present Employees</p>
                  <p className="text-3xl font-bold leading-tight">{presentCount}</p>
                </div>
                <div className="bg-white border border-brand-primary/25 rounded-xl sm:rounded-2xl p-4 shadow-sm">
                  <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-bold">Late Employees</p>
                  <p className="text-3xl font-bold leading-tight text-rose-600">{lateCount}</p>
                </div>
                <div className="bg-white border border-brand-primary/25 rounded-xl sm:rounded-2xl p-4 shadow-sm">
                  <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-bold">WFH Employees</p>
                  <p className="text-3xl font-bold leading-tight">{wfhCount}</p>
                </div>
                <div className="bg-white border border-brand-primary/25 rounded-xl sm:rounded-2xl p-4 shadow-sm">
                  <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-bold">Absent Employees</p>
                  <p className="text-3xl font-bold leading-tight">{absentCount}</p>
                </div>
              </section>
            )}

            {isAdminView && activeTab === "Dashboard" && (
              <div className="bg-white border border-brand-primary/25 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <LayoutDashboard className="w-8 h-8 text-brand-primary" />
                </div>
                <h2 className="text-xl font-bold">Welcome to DALX Admin Dashboard</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Use the sidebar to navigate through attendance records, employee lists, and task submissions.
                </p>
              </div>
            )}

            {isAdminView && activeTab === "Attendance" && (
              <section className="bg-white border border-brand-primary/25 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-brand-primary/15">
                  <h2 className="text-xl sm:text-2xl font-bold">Admin Approval Panel (Late Check-ins)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 bg-[#F7F8FC] border-b border-brand-primary/10">
                        <th className="py-3 px-5">Employee Name</th>
                        <th className="py-3 px-5">Check-in Time</th>
                        <th className="py-3 px-5">Reason</th>
                        <th className="py-3 px-5">Status</th>
                        <th className="py-3 px-5">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mergedData
                        .filter((emp) => emp.status.startsWith("Late"))
                        .map((emp) => (
                          <tr key={emp.id} className="border-b border-brand-primary/10">
                            <td className="py-4 px-5 font-semibold">{emp.name}</td>
                            <td className="py-4 px-5">{emp.checkInTime ? new Date(emp.checkInTime).toLocaleTimeString() : "--"}</td>
                            <td className="py-4 px-5">{emp.lateReason || "--"}</td>
                            <td className="py-4 px-5">{emp.status}</td>
                            <td className="py-4 px-5">
                              {emp.status === "Late - Pending Approval" ? (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => onApproveLate(emp.id)}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-emerald-600 text-white"
                                  >
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => onRejectLate(emp.id)}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-rose-600 text-white"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                    Reject
                                  </button>
                                </div>
                              ) : (
                                <span className="text-xs text-gray-400 font-semibold">--</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {(activeTab === "Attendance" || activeTab === "Employees") && (
              <section className="bg-white border border-brand-primary/25 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-brand-primary/15 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{activeTab} List</h2>
                  <span className="text-xs sm:text-sm text-gray-400 font-semibold">
                    {statsSource.length} total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 bg-[#F7F8FC] border-b border-brand-primary/10">
                        <th className="py-3 px-5">Employee Name</th>
                        <th className="py-3 px-5">Status</th>
                        <th className="py-3 px-5">Check In</th>
                        <th className="py-3 px-5">Work Mode</th>
                        <th className="py-3 px-5">Total Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(isAdminView ? mergedData : visibleEmployees).map((emp) => (
                        <tr key={emp.id} className="border-b border-brand-primary/10">
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3">
                              <img src={emp.avatarSrc} alt={emp.name} className="w-10 h-10 rounded-full object-cover border border-brand-primary/20" />
                              <span className="font-semibold">{emp.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${emp.status === "Present" ? "bg-emerald-100 text-emerald-700" :
                                emp.status === "Absent" ? "bg-rose-100 text-rose-700" :
                                  "bg-amber-100 text-amber-700"
                              }`}>
                              {emp.status}
                            </span>
                          </td>
                          <td className="py-4 px-5 font-medium">{emp.checkInTime ? new Date(emp.checkInTime).toLocaleTimeString() : "--"}</td>
                          <td className="py-4 px-5 font-medium">{emp.workMode}</td>
                          <td className="py-4 px-5 font-medium">{emp.totalWorkingHours.toFixed(2)}h</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {isAdminView && (activeTab === "Tasks" || activeTab === "Reports" || activeTab === "Settings") && (
              <div className="bg-white border border-brand-primary/25 rounded-2xl p-12 text-center space-y-4">
                <div className="w-20 h-20 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto rotate-3">
                  {activeTab === "Tasks" && <ListTodo className="w-10 h-10 text-brand-primary" />}
                  {activeTab === "Reports" && <FileText className="w-10 h-10 text-brand-primary" />}
                  {activeTab === "Settings" && <Settings className="w-10 h-10 text-brand-primary" />}
                </div>
                <h2 className="text-2xl font-bold">{activeTab} View</h2>
                <p className="text-gray-500 max-w-sm mx-auto">
                  The {activeTab.toLowerCase()} management system is currently under development. Stay tuned for updates!
                </p>
                <div className="inline-block px-4 py-2 bg-brand-primary/5 text-brand-primary text-xs font-bold rounded-lg border border-brand-primary/10">
                  FEATURE COMING SOON
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
