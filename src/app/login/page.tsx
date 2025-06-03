'use client'

import { LoginForm } from "~/components/login-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { loginSchema, type LoginSchema } from "~/schema/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { FiAlertCircle } from "react-icons/fi"
import { set } from "zod"
import { signIn } from "next-auth/react"

export default function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function onSubmit(data:LoginSchema) 
    {
        try {
          setLoading(true);

          const signInResults = await signIn("credentials", {
              redirect: false,
              email: data.email,
              password: data.password,
          })

          if (!signInResults?.error){
                // Redirect to the home page after successful sign in
                router.push("/");
            } else {
                setError(signInResults.error === "CredentialsSignin" ? "Invalid email or password. Please try again." : "Somethingwent wrong with logging In");
            }

        } catch (error) {
            setError("An error occurred while logging up. Please try again later.");
        } finally {
            setLoading(false);
        }
    } 


  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <nav className='flex items-center justify-between h-16 border-b border-gray-200 px-10 fixed top-0 left-0 w-full z-50 bg-white'>
            <div className='text-2xl font-bold text-gray-800'>
                Feedback Analysis
            </div>
            <div className='flex items-center space-x-4'>
                <a href="/signup" className='text-gray-600 hover:text-gray-800 hover:underline-offset-auto '>Sign Up</a>
                {/* <a href="/signup" className='text-blue-600 hover:text-blue-800'>Sign Up</a> */}
            </div>
        </nav>
      <div className="w-full max-w-sm">
            <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...form.register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {form.formState.errors.email && (
                    <div className="text-red-500 flex items-center gap-2">
                        <FiAlertCircle  />
                        <p className="text-red-500 text-xs">
                            {form.formState.errors.email?.message}
                        </p>
                    </div>

                )}
              </div>
              <div className="grid gap-2 my-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input 
                {...form.register("password")}
                id="password" 
                type="password" 
                required placeholder="**********"
                />
                {form.formState.errors.password && (
                  <div className="text-red-500 flex items-center gap-2">
                      <FiAlertCircle  />
                      <p className="text-red-500 text-xs">
                          {form.formState.errors.password?.message}
                      </p>
                  </div>
              )}
              </div>
              {error && (
                  <div className="text-red-500 text-xm rounded-sm border-red-400 p-1 flex items-center gap-2">
                      <FiAlertCircle  />
                      {error}
                  </div>
              )}
              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
      </div>
    </div>
  )
}
