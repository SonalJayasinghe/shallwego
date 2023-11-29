"use client";
import { Tabs, Box, Text } from "@radix-ui/themes";
import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import SignInForm from "../components/SignInForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const session = useSession();
  const router = useRouter();
  if(session.data?.user?.email){
    router.push("/admin");
    router.refresh();
  }
  return (
    <>
      <div className=" flex min-h-screen mt-3 justify-center ">
        <Tabs.Root defaultValue="signin">
          <Tabs.List size="2" className=" justify-center">
            <Tabs.Trigger value="signin">Sign in</Tabs.Trigger>
            <Tabs.Trigger value="register">Register</Tabs.Trigger>
          
          </Tabs.List>

          <Box className=" w-[300px] justify-center items-center">

            <Tabs.Content value="register" className=" space-y-3 mt-4 ">
              <div className="flex justify-center">
                <Text size="2" className=" font-semibold" align={"center"}>
                  {" "}
                  Please Never Use Your Email Password
                </Text>
              </div>
              <RegistrationForm />
            </Tabs.Content>

            <Tabs.Content value="signin" className=" space-y-3 mt-4 ">
            <div className="flex justify-center">
                <Text size="2" className=" font-semibold" align={"center"}>
                  {" "}
                  Make Sure To Save Your Password
                </Text>
              </div>
              <SignInForm />
            </Tabs.Content>

          </Box>
        </Tabs.Root>
      </div>
    </>
  );
};

export default AuthPage;
