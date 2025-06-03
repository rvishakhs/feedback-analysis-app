'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiLogOut } from "react-icons/fi";

export function SignOutButton() {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({
            redirect: false, // Prevent automatic redirection
        });
        router.push('/login'); // Redirect to login page after sign out
    };
      
    return (
        <button 
            className='flex items-center gap-2 text-black hover:text-gray-600 hover:cursor-pointer transition-colors relative after:absolute after:left-0 after:bottom-0 after:block after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full' 
            onClick={handleSignOut}
        >
            <FiLogOut className='h-4 w-4'/> 
            Logout
        </button>
    );
}
