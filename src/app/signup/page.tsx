'use client'
import { FiAlertCircle } from "react-icons/fi";
import React from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver } from '@hookform/resolvers/zod'
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import type { z } from "zod"
import { signUpSchema, type SignUpSchema } from '~/schema/auth'

export function signuppage({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [error, setError] = React.useState<string | null>(null)
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    async function onSubmit(data:SignUpSchema) 
    {
        return 
    }

  return (
    <div className='min-h-screen bg-white overflow-y-auto'>
        <nav className='flex items-center justify-between h-16 border-b border-gray-200 px-10 fixed top-0 left-0 w-full z-50 bg-white'>
            <div className='text-2xl font-bold text-gray-800'>
                Feedback Analysis
            </div>
            <div className='flex items-center space-x-4'>
                <a href="/login" className='text-gray-600 hover:text-gray-800 hover:underline-offset-auto '>Login</a>
                {/* <a href="/signup" className='text-blue-600 hover:text-blue-800'>Sign Up</a> */}
            </div>
        </nav>
        <div className='flex items-center justify-center h-screen'>
            <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                    <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Welcome</h1>
                        <p className="text-muted-foreground text-balance">
                        Signup to your Feedback Analysis 
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">User name</Label>
                        <Input
                        {...form.register("name")}
                        id="username"
                        type="username"
                        placeholder="username"
                        required
                        />
                        {form.formState.errors.name && (
                            <div className="text-red-500 flex items-center gap-2">
                                <FiAlertCircle  />
                                <p className="text-red-500 text-xs">
                                    {form.formState.errors.name?.message}
                                </p>
                            </div>

                        )}
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
                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {/* <a
                            href="#"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                            Forgot your password?
                        </a> */}
                        </div>
                        <Input
                        {...form.register("password")} 
                        id="password" 
                        type="password" 
                        required 
                        />
                        {form.formState.errors.password && (
                            <div className="text-red-500 flex items-center gap-2">
                                <FiAlertCircle  />
                                <p className="text-red-500 text-xs">
                                    {form.formState.errors.password?.message}
                                </p>
                            </div>
                        )}
                        <Label htmlFor="Confirm_password">Confirm Password</Label>
                        <Input 
                        {...form.register("confirmPassword")}
                        id="Confirm_password" 
                        type="password" 
                        required 
                        />
                        {form.formState.errors.confirmPassword && (
                            <div className="text-red-500 flex items-center gap-2">
                                <FiAlertCircle  />
                                <p className="text-red-500 text-xs">
                                    {form.formState.errors.confirmPassword?.message}
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
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or continue with
                        </span>
                    </div>
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <a href="#" className="underline underline-offset-4">
                        Login
                        </a>
                    </div>
                    </div>
                </form>
                <div className="bg-muted relative hidden md:block">
                    <img
                    src="https://cdn.pixabay.com/photo/2017/05/02/10/01/checklist-2277702_1280.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4] dark:grayscale-75"
                    />
                </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
        </div>        
    </div>
  )
}

export default signuppage


