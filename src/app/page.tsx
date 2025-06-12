'use server';

import Link from "next/link";
import { SignOutButton } from "@/components/client/signout";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import CopyButton from "~/components/client/copy-button";
import CodeExamples from "~/components/client/code-examples";
import { Inference } from "~/components/client/Inference";


export default async function HomePage() {

  const session  = await auth()

  const quota = await db.apiQuota.findUniqueOrThrow({
    where: {
      userId: session?.user.id,
    }
  })
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 ">
      <nav className='flex items-center justify-between h-16 border-b border-gray-200 px-10 fixed top-0 left-0 w-full z-50 bg-white'>
            <div className='text-2xl font-bold text-gray-800'>
                Feedback Analysis

            </div>
            <div className='flex items-center space-x-4'>
              <SignOutButton/>
            </div>
        </nav>
        <main className="flex min-h-screen w-full flex-col gap-6 pt-10 sm:p-10 md:flex-row">
          <Inference quota={{secretkey : quota.secretKey}}/> 
          
          <div className="hidden border-l border-slate-200 md:block"></div>
          <div className="flex h-fit w-full flex-col gap-3 md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome, {session?.user.name || "User"}!
            </h2>
            <div className="mt-3 flex h-fit w-full flex-col rounded-xl bg-gray-100 bg-opacity-80 p-6">
              <span className="text-sm font-medium">Secret Key</span>
              <span className="text-sm text-gray-500">This key should be used when calling the APi, Not share publicaly</span>
              <div className="mt-4 flex flex-row items-center gap-2 sm:flex-row sm:items-center sm:justify-baseline md:justify-baseline">
                <span className="text-sm font-medium">Key :</span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-full max-w-[200px] overflow-x-auto scrollbar-hidden rounded-sm border border-gray-200 px-3 py-1 text-sm text-gray-600 sm:w-auto">{quota.secretKey}</span>
                  <CopyButton text={quota.secretKey}/>
                </div>
              </div>
            </div>
            <div className="mt-2 flex h-fit w-full flex-col rounded-xl bg-gray-100 bg-opacity-80 p-6">
              <div className="flex flex-row gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-medium">Monthly Quota : </span>
                <span className="text-xs font-medium text-gray-600">{quota.requestsUsed} / {quota.maxRequests} Requests</span>
              </div>
              <div className="mt-1 h-1 w-full rounded-full bg-gray-200">
                <div style={{ width: (quota.requestsUsed / quota.maxRequests) * 100 + '%' }} className="h-full rounded-full bg-gray-800 transition-all duration-300 ease-in-out">

                </div>
              </div>
            </div>

            <CodeExamples />

          </div>
          
        </main>
    </div>

  );
}
