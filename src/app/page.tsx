'use server';

import Link from "next/link";
import { SignOutButton } from "@/components/client/signout";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function HomePage() {

  const session  = await auth()

  const quota = await db.apiQuota.findUniqueOrThrow({
    where: {
      userId: session?.user.id,
    }
  })
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <nav className='flex items-center justify-between h-16 border-b border-gray-200 px-10 fixed top-0 left-0 w-full z-50 bg-white'>
            <div className='text-2xl font-bold text-gray-800'>
                Feedback Analysis

            </div>
            <div className='flex items-center space-x-4'>
              <SignOutButton/>
            </div>
        </nav>
        <main className="flex min-h-screen w-full flex-col gap-6 sm:p-10 md:flex-row">
          <div className="flex h-screen w-full flex-col gap-3 md:w-1/2"></div>
          <div className="hidden border-l border-slate-200 md:block"></div>
          <div className="flex h-screen w-full flex-col gap-3 md:w-1/2">
            <h2>
              Welcome, {session?.user.name || "User"}! Your
            </h2>
          </div>
          
        </main>
    </div>

  );
}
