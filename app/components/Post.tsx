"use client";
import heroBG from "@/public/images/BGImage.webp";
import { Avatar, Button, Flex, Text } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";


interface Props {
  id?: string;
  name: string;
  partner: string;
  imageUrl: string;
  status: string;
}

const PostCard = ({ name, partner, imageUrl, status, id }: Props) => {
  const router = useRouter();
  const onApprove = async (id: string) => {
    try {
      const data = await axios.patch(`/api/acceptance/${id}`, { status: "APPROVED" })
      //catch the error text from the api
      router.push(`/askout/${id}`);
      router.refresh();
      toast.success(" Take a Screenshot and Share it with your friends!");

    } catch(error) {
      if(error instanceof AxiosError){
      if (error.response && error.response.status === 403) {
        if (error.response.data.error === 'You cannot approve or reject your own post') {
          toast.error("Sorry! You cannot Aprove or Reject Your Own Post");
        }
      } else {
        toast.error("Hmm... Something Wrong");
      }
    }
    }
  };

  const onReject = async (id: string) => {
    try {
      const data = await axios.patch(`/api/acceptance/${id}`, { status: "REJECTED" })
      //catch the error text from the api
      router.push(`/askout/${id}`);
      router.refresh();
    } catch(error) {
      if(error instanceof AxiosError){
      if (error.response && error.response.status === 403) {
        if (error.response.data.error === 'You cannot approve or reject your own post') {
          toast.error("Sorry! You Cannot Aprove or Reject Your Own Post");
        }
      } else {
        toast.error("Hmm... Something Wrong");
      }
    }
    }
  };


  return (
    <section className=" justify-center items-center relative w-full min-h-[500px] flex flex-col rounded-[40px] shadow-lg bg-pink-600 overflow-clip mb-5">
      <div className="absolute brightness-[0.95] transition-all duration-500 ease-in-out min-h-full min-w-full">
        <Image
          src={heroBG}
          priority={true}
          alt="hero"
          fill={true}
          quality={75}
          style={{ objectFit: "cover", objectPosition: "center" }}
          loading="eager"
        />
      </div>
      <Flex
        direction={"column"}
        className=" z-10 p-10 text-center justify-center items-center"
      >
        {" "}
        <Text className=" text-pink-500 font-extrabold md:text-4xl text-3xl font-handwriting mb-4">
          {" "}
          Hey {partner}!
        </Text>{" "}
        <Text className="  text-pink-600 font-bold md:text-3xl text-xl ">
          {" "}
          I&apos;ve Got a Sweet Question For You
        </Text>{" "}
        🙈🙈🙈🙈
        <Text className="  text-pink-800 font-bold md:text-5xl text-3xl ">
          {" "}
          Will You Be My Date?
        </Text>{" "}
        <Avatar
          src={imageUrl}
          fallback={"U"}
          size={"8"}
          className=" mt-7 mb-3"
        />
        <Text className=" text-pink-600 font-bold md:text-xl text-lg text-center font-handwriting">
          From {name}
        </Text>
        <div className="md:flex-row flex-col flex gap-2 mt-4">
          {status === "WAITING" && (
            <>
              <Button
                variant="solid"
                size={"3"}
                className=" animate-pulse"
                onClick={() => onApprove(id!)}
              >
                Accept
              </Button>
              
              <Button variant="outline" size={"3"} onClick={() => onReject(id!)}>
                {" "}
               Reject
              </Button>{" "}
            </>
          )}
        </div>
        {status === "APPROVED" && (
          <>
            <Text className="  text-pink-600 font-bold md:text-3xl text-xl ">
              {" "}
              The Askout Has Been Accepted!
            </Text>{" "}
          </>
        )}
        {status === "REJECTED" && (
          <>
            <Text className="  text-pink-600 font-bold md:text-3xl text-xl ">
              {" "}
              Oh No! The Askout Has Been Rejected!
            </Text>{" "}
          </>
        )}
      </Flex>
      <Toaster
        position="top-center"
        z-index={50}
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          success:{
            duration: 5000,
          },
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </section>
  );
};

export default PostCard;
