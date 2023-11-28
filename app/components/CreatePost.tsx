"use client";
import { Button, Dialog, Text } from "@radix-ui/themes";
import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import Form from "./Form";

const CreatePost = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="solid" size="2">
          Create an Askout
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Close>
          <button className=" absolute top-[1opx] " aria-label="Close">
            <GrFormClose />
          </button>
        </Dialog.Close>

        <div className="flex flex-col p-6 rounded-lg w-full align-middle">
          <Text align={"center"} className=" text-pink-700 font-semibold pb-2">
            Create an Askout
          </Text>

          <Form setOpen={setOpen} />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreatePost;
