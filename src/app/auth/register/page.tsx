"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { Card, CardHeader, Button } from "@heroui/react";
import { Mail, Lock, Eye, EyeOff, Utensils, User, UserPlus, ImageIcon } from "lucide-react";

export default function RegisterPage(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);

  const toggleVisibility = (): void => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setWasSubmitted(true);
    setServerError("");

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await authClient.signUp.email({
        email: email.toLowerCase().trim(),
        password: password,
        name: name.trim(),
        image: photoUrl.trim(),
        ...({ role: "user" as string })
      });

      if (error) {
        setServerError(error.message || "Registration failed. Try again.");
      } else {
        alert("Account registered successfully using Better Auth!");
        setName("");
        setEmail("");
        setPhotoUrl("");
        setPassword("");
        setWasSubmitted(false);
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Auth process tracking exception logging:", err);
      setServerError("Network framework processing timeout error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#06090F" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05),transparent_45%)] pointer-events-none" />

      <Card
        className="w-full max-w-md border border-gray-800/80 shadow-2xl backdrop-blur-md p-4 sm:p-6"
        style={{ backgroundColor: "rgba(10, 15, 26, 0.7)" }}
      >
        <CardHeader className="flex flex-col items-center justify-center gap-2 pb-4">
          <Link href="/" className="flex items-center gap-2 font-bold mb-2">
            <Utensils className="h-7 w-7 text-amber-500" />
            <span className="text-2xl font-extrabold tracking-wide text-white">
              Meal<span className="text-amber-500">Craft</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-white text-center">Create an Account</h1>
          <p className="text-xs text-gray-400 text-center">
            Sign up today to explore and customize your premium meals.
          </p>
        </CardHeader>

        <div className="p-0">
          <form
            onSubmit={handleSubmit}
            noValidate
            className={`flex flex-col gap-4 ${wasSubmitted ? "was-submitted" : ""}`}
          >

            {serverError && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                {serverError}
              </div>
            )}

            <div>
              <label className="block text-gray-300 font-medium text-xs mb-1.5">
                Full Name <span className="text-amber-500">*</span>
              </label>
              <div className="relative flex items-center bg-gray-900/60 border border-gray-800 hover:border-gray-700 focus-within:!border-amber-500 rounded-lg h-11 px-3 transition-colors [.was-submitted_&:has(:invalid)]:border-red-500/90">
                <User className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  className="w-full text-white placeholder:text-gray-500 text-sm bg-transparent focus:outline-none border-none outline-none rounded-lg ring-0 p-1.5"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium text-xs mb-1.5">
                Email Address <span className="text-amber-500">*</span>
              </label>
              <div className="relative flex items-center bg-gray-900/60 border border-gray-800 hover:border-gray-700 focus-within:!border-amber-500 rounded-lg h-11 px-3 transition-colors [.was-submitted_&:has(:invalid)]:border-red-500/90">
                <Mail className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="email"
                  placeholder="enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="w-full text-white placeholder:text-gray-500 text-sm bg-transparent focus:outline-none border-none outline-none rounded-lg ring-0 p-1.5"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium text-xs mb-1.5">
                Photo URL <span className="text-amber-500">*</span>
              </label>
              <div className="relative flex items-center bg-gray-900/60 border border-gray-800 hover:border-gray-700 focus-within:!border-amber-500 rounded-lg h-11 px-3 transition-colors [.was-submitted_&:has(:invalid)]:border-red-500/90">
                <ImageIcon className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="url"
                  placeholder="https://example.com/profile.jpg"
                  value={photoUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhotoUrl(e.target.value)}
                  className="w-full text-white placeholder:text-gray-500 text-sm bg-transparent focus:outline-none border-none outline-none rounded-lg ring-0 p-1.5"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium text-xs mb-1.5">
                Password <span className="text-amber-500">*</span>
              </label>
              <div className="relative flex items-center bg-gray-900/60 border border-gray-800 hover:border-gray-700 focus-within:!border-amber-500 rounded-lg h-11 px-3 transition-colors [.was-submitted_&:has(:invalid)]:border-red-500/90">
                <Lock className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type={isVisible ? "text" : "password"}
                  placeholder="Create strong password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="w-full text-white placeholder:text-gray-500 text-sm bg-transparent focus:outline-none border-none outline-none rounded-lg ring-0 p-1.5"
                  required
                  disabled={isLoading}
                />
                <button
                  className="focus:outline-none flex items-center justify-center ml-2 shrink-0"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                  disabled={isLoading}
                >
                  {isVisible ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-200" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-200" />
                  )}
                </button>
              </div>
            </div>
              
              <Button
                type="submit"
                isDisabled={isLoading}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-bold h-11 mt-2 rounded-lg transition-colors shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
              >
                <span>{isLoading ? "Signing Up..." : "Sign Up"}</span>
                <UserPlus className="h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-gray-400 mt-2">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-amber-500 hover:text-amber-400 font-semibold text-xs transition-colors"
                >
                  Log In
                </Link>
              </p>
          </form>
        </div>
      </Card>
    </div>
  );
}