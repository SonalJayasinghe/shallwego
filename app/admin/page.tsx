'use client';
import React from "react";
import prisma from "@/prisma/client";
import CreatePost from "../components/CreatePost";
import { Grid, Box, Avatar, Card, Flex, Text } from "@radix-ui/themes";
import { IoIosBowtie } from "react-icons/io";
import { GiAmpleDress } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import PostCard from "../components/Post";
import { useSession } from "next-auth/react";

const  Admin = async () => {
  const session = useSession();

  const post = await prisma.post.findUnique({
    where: {
      email: session?.data?.user?.email!,
    },
  });



  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 pl-5 pr-5 justify-center items-center mb-5">
      <div className="flex flex-col space-y-3 items-center w-full h-full rounded-3xl bg-gradient-to-r from-pink-50 to-pink-100 justify-center p-3">
          <CreatePost />
          <Card style={{ maxWidth: 300 }}>
            <Flex gap="3" align="center" justify={"center"}>
              <div className=" hover:text-pink-600 transition-colors">
                <IoIosBowtie size="2em" />
              </div>
              <Box>
                <Text as="div" size="5" weight="bold" align={"center"}>
                  234 Partners
                </Text>
                <Text as="div" size="2" color="gray" align={"center"}>
                  Accepted Invitations
                </Text>
              </Box>
              <div className=" hover:text-pink-600 transition-colors">
                <GiAmpleDress size="2em" />
              </div>
            </Flex>
          </Card>
        </div>

        <div className="flex flex-col space-y-3 items-center w-full h-full rounded-3xl bg-gradient-to-r from-pink-600 to-pink-400 justify-center p-3">
          <Flex gap="3" align="center" justify={"center"} direction={"row"}>
            <div>
              {" "}
              <FaHeart className=" animate-bounce" size="2em" />{" "}
            </div>{" "}
            <Text className=" font-bold text-2xl"> Lup Dup</Text>
          </Flex>
        </div>
      </div>

      <div className="flex justify-center items-center mt-10">
        <Text
          className=" text-pink-600 text-2xl font-semibold"
          align={"center"}
        >
          {" "}
          Preview of Your Askout{" "}
        </Text>
      </div>
      <div className=" pointer-events-none">
        {post && <PostCard status={post.status} name={post.name} partner={post.partner} imageUrl={post.imageUrl!}/> }
      </div>
    </>
  );
};

export default Admin;
