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
    <Dialog.Root>
      <div>
        <Dialog.Content>
          <Tabs.Root>
            <Tabs.List>
              <Tabs.Content value="Login">Login</Tabs.Content>
              <Tabs.Content value="Register">Register</Tabs.Content>
            </Tabs.List>

            <Box px="4" pt="3" pb="2">
              <Tabs.Content value="Login">
                <form onSubmit={handleSignIn}>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit">Sign In</button>
                </form>{" "}
              </Tabs.Content>

              <Tabs.Content value="Register">
                <form onSubmit={handleSignIn}>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit">Sign In</button>
                </form>{" "}
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Dialog.Content>
      </div>
    </Dialog.Root>
  );
};

export default CustomLogin;
