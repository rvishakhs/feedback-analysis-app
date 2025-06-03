import Link from "next/link";
import { SignOutButton } from "@/components/client/signout";

export default async function HomePage() {
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
    </div>
  );
}
