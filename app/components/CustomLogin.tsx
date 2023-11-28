import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Box, Dialog, Tabs, Text } from "@radix-ui/themes";

interface Props {
  onClose: () => void;
}

const CustomLogin = ({ onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = useSession();

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!result!.error) {
      onClose();
    }
  };

  return (
    
  );
};

export default CustomLogin;
