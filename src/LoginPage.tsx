import React from "react";
import { Shield, User } from "lucide-react";

type LoginPageProps = {
  onLogin: (email: string, password: string) => boolean;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(email.trim().toLowerCase(), password.trim());
    if (!ok) setError("Invalid credentials. Please try again.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-brand-primary/25 shadow-sm p-8">
        <div className="flex items-center justify-center mb-6">
          <img src="/logo.png" alt="DALX" className="h-12 w-auto object-contain" />
        </div>

        <h1 className="text-2xl font-bold text-center text-brand-primary mb-2">DALX Attendance Login</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Login first to mark attendance</p>

        <form className="space-y-4" onSubmit={submit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-brand-primary/25 outline-none focus:ring-2 focus:ring-brand-primary/20"
                placeholder="name@dalx.tech"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <div className="relative">
              <Shield className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-brand-primary/25 outline-none focus:ring-2 focus:ring-brand-primary/20"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && <p className="text-sm font-semibold text-rose-600">{error}</p>}

          <button className="w-full bg-brand-primary text-white py-3 rounded-2xl font-bold hover:opacity-90 transition-opacity">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
