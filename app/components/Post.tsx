"use client";
import heroBG from "@/public/images/BGImage.webp";
import { Avatar, Button, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  partner: string;
  imageUrl: string;
  status: string;
}

const PostCard = ({ name, partner, imageUrl, status }: Props) => {
  return (
    <section className=" justify-center items-center relative w-full min-h-[500px] flex flex-col rounded-[80px] shadow-lg bg-pink-600 overflow-clip mb-5">
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
          I've Got a Sweet Question For You
        </Text>{" "}
        🙈🙈🙈🙈
        <Text className="  text-pink-800 font-bold md:text-5xl text-3xl ">
          {" "}
          Will You Be My Social Date?
        </Text>{" "}
        <Avatar
          src={imageUrl}
          fallback={"U"}
          size={"8"}
          className=" mt-7 mb-3"
        />
        <Text className=" text-pink-600 font-bold md:text-xl text-lg shadow-sm text-center font-handwriting">
          From {name}
        </Text>
        <div className="md:flex-row flex-col flex gap-2 mt-4">
          {status === "WAITING" && (
            <>
              <Button variant="solid" size={"3"} className=" animate-pulse">
                {" "}
                <Link href={"/sematary"}> Accept</Link>{" "}
              </Button>
              <Button variant="outline" size={"3"}>
                {" "}
                <Link href={"/about"}> Reject</Link>{" "}
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
              Sorry! The Askout Has Been Rejected!
            </Text>{" "}
          </>
        )}
      </Flex>
    </section>
  );
};

export default PostCard;
