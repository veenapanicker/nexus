"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For prototype, any login works
    if (email && password) {
      router.push("/home");
    } else {
      setError("Please enter your email and password");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#E21A23] via-[#B8131A] to-[#8B0E14] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-2xl font-bold">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">Axis</h1>
                <p className="text-white/70 text-sm">by EduTech</p>
              </div>
            </div>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-display font-bold mb-6 leading-tight">
              Your centralized hub for institutional administration
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Manage reports, licenses, and enrollment across all EduTech products in one place.
            </p>
          </div>

          <div className="flex items-center gap-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              All systems operational
            </div>
            <div>© 2026 EduTech</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[var(--background)]">
        <div className="w-full max-w-md animate-slideUp">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E21A23] to-[#B8131A] flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-[var(--foreground)]">Axis</h1>
              <p className="text-xs text-[var(--muted-foreground)]">by EduTech</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-[var(--foreground)] mb-2">
              Welcome back
            </h2>
            <p className="text-[var(--muted-foreground)]">
              Sign in to your institutional account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm animate-slideUp">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className={cn(
                  "w-full px-4 py-3 rounded-lg text-sm transition-all duration-200",
                  "bg-[var(--muted)] border border-transparent",
                  "text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
                  "focus:outline-none focus:border-[#E21A23] focus:ring-2 focus:ring-[#E21A23]/20"
                )}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={cn(
                    "w-full px-4 py-3 pr-12 rounded-lg text-sm transition-all duration-200",
                    "bg-[var(--muted)] border border-transparent",
                    "text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
                    "focus:outline-none focus:border-[#E21A23] focus:ring-2 focus:ring-[#E21A23]/20"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[var(--border)] text-[#E21A23] focus:ring-[#E21A23]"
                />
                <span className="text-[var(--foreground)]">Remember me</span>
              </label>
              <a href="#" className="text-[#E21A23] hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              Need access?{" "}
              <a href="#" className="text-[#E21A23] hover:underline">
                Contact your administrator
              </a>
            </p>
          </div>

          {/* Demo Note */}
          <div className="mt-8 p-4 rounded-lg bg-[var(--muted)] border border-[var(--border)]">
            <p className="text-xs text-[var(--muted-foreground)] text-center">
              <strong>Demo:</strong> Enter any email and password to sign in as an Institutional Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
