"use client";
import { Avatar, Button, DropdownMenu, Text } from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <>
      <div>
        <nav className="fixed flex items-center justify-between flex-wrap p-5 pl-8 pr-8 shadow-md w-full bg-white z-50 rounded-md">
          <div className="flex items-center z-10">
            <Text className="font-bold text-2xl text-pink-600 pr-10 font-handwriting">
              <Link href={"/"}>Shall We Go</Link>
            </Text>
            <div className="hidden sm:flex"></div>
          </div>
          <div className=" flex items-center gap-4">
            <Link
              href={"/admin"}
              className=" font-medium hover:text-pink-600 transition-colors"
            >
              {" "}
              Dashboard{" "}
            </Link>
            {session?.user?.email ? (
              <>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <div className=" cursor-pointer">
                      <Avatar fallback={session.user.email.charAt(0)} />
                    </div>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>
                      {session.user.email}
                    </DropdownMenu.Label>
                    <DropdownMenu.Item color="red" onClick={() => signOut()}>
                      Sign Out
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </>
            ) : (
              <div className=" flex space-x-4 justify-center items-center">
                <Button>
                  {" "}
                  <Link href={"/auth"}> Sign In </Link>{" "}
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
