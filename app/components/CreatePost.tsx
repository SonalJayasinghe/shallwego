"use client";
import { Button, Dialog, Text } from "@radix-ui/themes";
import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import Form from "./Form";
import { Post } from "@prisma/client";

interface Props{
  isLoading: boolean;
  setPost: (post: Post) => void;
}
const CreatePost = ({isLoading, setPost}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button disabled={isLoading} variant="solid" size="2" className=" w-[300px]">
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
          <Text align={"center"} className=" text-pink-700 font-semibold pb-1">
            Create an Askout
          </Text>
          <Text align={"center"} className="text-sm pb-2 ">
            You can send only one Askout at a time. You can send another one once your current Askout is deleted or rejected.
          </Text>

          <Form setPost={(post: Post) => setPost(post)} setOpen={setOpen} />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreatePost;
