import { Flex, Select, TextField, Text, Button } from "@radix-ui/themes";
import React, { Dispatch, useState } from "react";
import { SingleImageDropzone } from "./SingleImageDropZone";
import { BiLoaderCircle } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useEdgeStore } from "../lib/edgestore";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

interface Props {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

const Form = ({ setOpen }: Props) => {
  

  //Navigation and Session
  const session = useSession();
  const router = useRouter();

  //Form and edgestore
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { edgestore } = useEdgeStore();

  //State variavbles
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);

  //Handling the onsubmit event
  const onHandleSubmit = handleSubmit(async (data) => {
    if (file) {
      const res = await edgestore.publicPetImages.upload({
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
        toast.success(" Pet Added Successfully");
      } catch {
        toast.error("Sorry! Something Went wrong");
      }
    }
    router.refresh();
  });

  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <Flex direction="column" gap="3">

          {/* Pet Name  */}
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

          {/* Pet Name  */}
          <TextField.Input
            disabled={isUploading}
            radius="full"
            placeholder=" Your Name"
            {...register("partner", {
              required: "* Your Partner Name is Required",
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
