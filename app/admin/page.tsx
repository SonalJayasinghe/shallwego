"use client";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { FaHeart } from "react-icons/fa";
import { GiAmpleDress } from "react-icons/gi";
import { IoIosBowtie } from "react-icons/io";
import CreatePost from "../components/CreatePost";
import copy from "copy-to-clipboard";
import PostCard from "../components/Post";
import axios from "axios";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import { useEdgeStore } from "../lib/edgestore";
import StatusCard from "./StatusCard";
import CountCard from "./CountCard";

export const Admin = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const { edgestore } = useEdgeStore();

  const onImageDelete = async (imageUrl: string) => {
    try {
      await edgestore.publicImages
        .delete({
          url: imageUrl,
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
        });
      toast.success(" Post Deleted Successfully");
      setPost(null);
      setDisabled(false);
    } catch (error) {
      toast.error(" Error Deleting Post");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/askout");
      setPost(response.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 pl-5 pr-5 justify-center items-center mb-5">
        <div className="flex flex-col space-y-3 items-center w-full h-full rounded-3xl bg-gradient-to-r from-pink-50 to-pink-100 justify-center p-3">
          {!post && (
            <CreatePost
              setPost={(post: Post) => setPost(post)}
              isLoading={loading}
            />
          )}
          {post && (
            <>
              <Text> Copy the link and send to the partner </Text>

              <div className=" flex flex-row gap-3 justify-between">
                <Button
                  onClick={() => {
                    copy(`http://localhost:3000/askout/${post.id}`);
                    toast.success("Link Copied to Clipboard");
                  }}
                >
                  {" "}
                  Copy Link{" "}
                </Button>
                <Button
                  disabled={disabled}
                  variant={"surface"}
                  onClick={async () => {
                    setDisabled(true);
                    const deleted = await axios.delete(`/api/askout`);
                    onImageDelete(post.imageUrl!);
                  }}
                >
                  {" "}
                  Delete Askout{" "}
                </Button>
              </div>
            </>
          )}
            <CountCard/>
        </div>

        <StatusCard />
      </div>

      <div className="flex justify-center items-center mt-10">
        {loading && <BiLoaderCircle className=" animate-ping" />}
        {post && (
          <Text
            className=" text-pink-600 text-2xl font-semibold"
            align={"center"}
          >
            {" "}
            Preview of Your Askout{" "}
          </Text>
        )}
      </div>

      <div className=" pointer-events-none">
        {post && (
          <>
            <PostCard
              name={post.name}
              partner={post.partner}
              imageUrl={post.imageUrl!}
              status={post.status}
            />
          </>
        )}
      </div>
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
export default Admin;