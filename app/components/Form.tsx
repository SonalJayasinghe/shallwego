import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Dispatch, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { useEdgeStore } from "../lib/edgestore";
import { SingleImageDropzone } from "./SingleImageDropZone";
import { Post } from "@prisma/client";

interface Props {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setPost: (post:Post) => void
}

const Form = ({ setOpen, setPost }: Props) => {
  //Navigation and Session
  const session = useSession();

  //Form and edgestore
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { edgestore } = useEdgeStore();
  const router = useRouter();


  //State variavbles
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);

  //Handling the onsubmit event
  const onHandleSubmit = handleSubmit(async (data) => {
    if (file) {
      const res = await edgestore.publicImages.upload({
        file,
        onProgressChange: (progress) => {
          if (progress !== 100) setIsUploading(true);
        },
      });

      data = {
        ...data,
        imageUrl: res.url,
        email: session.data?.user?.email,
      };

      try {
        await axios.post("/api/add", data);
        setFile(undefined);
        reset();
        setIsUploading(false);
        setOpen(false);
        const askout = await axios.get("/api/askout");
        setPost(askout.data);
            
        toast.success(" Askout Created Successfully");
      } catch {
        toast.error("Sorry! Something Went wrong");
      }
      router.refresh();
    }
  });

  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <Flex direction="column" gap="3">
          <TextField.Input
            disabled={isUploading}
            radius="full"
            placeholder=" Your Name"
            {...register("name", {
              required: "* Your Name is Required",
            })}
          />
          {errors.name && (
            <Text size={"1"} color="red">
              {" "}
              {errors.name?.message?.toString()}{" "}
            </Text>
          )}

          <TextField.Input
            disabled={isUploading}
            radius="full"
            placeholder=" To be Partner Name"
            {...register("partner", {
              required: "* Your To be Partners Name is Required",
            })}
          />
          {errors.partner && (
            <Text size={"1"} color="red">
              {" "}
              {errors.name?.message?.toString()}{" "}
            </Text>
          )}

          {/* Upload Image */}
          <div className=" items-center justify-center text-center">
            <SingleImageDropzone
              disabled={isUploading}
              width={200}
              height={200}
              value={file}
              dropzoneOptions={{
                maxSize: 1024 * 1024 * 10,
                maxFiles: 1,
              }}
              onChange={(file) => {
                setFile(file);
              }}
            />
          </div>

          <Button disabled={isUploading}>
            {isUploading ? (
              <>
                {" "}
                <BiLoaderCircle className=" animate-ping" /> Posting...{" "}
              </>
            ) : (
              <>Post </>
            )}
          </Button>
        </Flex>
      </form>

      <Toaster
        position="top-center"
        z-index={50}
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default Form;
