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

export default function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" required placeholder="**********"/>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
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
