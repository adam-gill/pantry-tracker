"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GrGoogle } from "react-icons/gr";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAuth from "@/lib/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { IoFastFoodOutline } from "react-icons/io5";
import ToolTip from "@/components/ToolTip";

export default function Home() {
  const { user, loadingAuth } = useAuth();

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("user signed out");
    } catch (error) {
      console.log("sign out error: ", error);
    }
  };

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(user);

  if (loadingAuth) {
    return (
      <>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <IoFastFoodOutline className="spinner" size={128} />
        </div>
      </>
    );
  }

  return (
    <main className="w-full h-screen">
      <div className="w-full py-8 relative">
        <div className="w-full px-4 mx-auto max-w-5xl flex flex-col items-center justify-center">
          {/* Not Logged In */}
          {!!user ? (
            <>
              <h1 className="text-5xl sm:text-2xl mb-4">Your Pantry</h1>
              {!!user && user.email}
            </>
          ) : (
            <>
              <h1 className="text-5xl sm:text-2xl">
                Welcome to Pantry Tracker
              </h1>
              <Button
                className="mt-8 text-3xl bg-blue-600 p-8 sm:p-4 sm:text-xl hover:bg-blue-700 active:bg-blue-500"
                onClick={() => signIn()}
              >
                <GrGoogle className="mr-1.5" />
                {"Sign In with Google"}
              </Button>
            </>
          )}
        </div>


        {/* account thing */}

        {!!user && (
          <ToolTip
            tip={
              <>
                <Button
                  onClick={() => logout()}
                  className="w-full h-full bg-white hover:bg-white text-black"
                >
                  Sign Out
                </Button>
              </>
            }
          >
            <Avatar className="cursor-pointer absolute top-6 right-6 rounded-full w-16 h-16 border-2 border-white text-white flex items-center justify-center text-3xl font-bold">
              <AvatarImage className="rounded-full" src={user?.photoURL!} />
              <AvatarFallback>
                {!!user && user.displayName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </ToolTip>
        )}
      </div>
    </main>
  );
}
