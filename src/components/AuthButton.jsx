import React from 'react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { User, LogIn } from 'lucide-react';

export default function AuthButton() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-dark-700"></div>
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 rounded-full border-2 border-lambo-500",
              userButtonPopoverCard: "bg-dark-900 border border-dark-700",
              userButtonPopoverActionButton: "hover:bg-dark-800",
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <SignInButton mode="modal">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors border border-dark-700">
          <LogIn size={18} className="text-lambo-500" />
          <span className="text-sm font-medium text-white">Inloggen</span>
        </button>
      </SignInButton>

      <SignUpButton mode="modal">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-lambo-500 hover:bg-lambo-600 transition-colors">
          <User size={18} className="text-dark-900" />
          <span className="text-sm font-medium text-dark-900">Aanmelden</span>
        </button>
      </SignUpButton>
    </div>
  );
}
