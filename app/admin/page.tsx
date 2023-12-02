"use client";
import { Post } from "@prisma/client";
import { Button, Text } from "@radix-ui/themes";
import axios from "axios";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/Post";
import { useEdgeStore } from "../lib/edgestore";
import CountCard from "./CountCard";
import StatusCard from "./StatusCard";
import FindAvailable from "../components/FindAvailable";

const AdminPage = () => {
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
      toast.success(" Askout Deleted Successfully");
      setPost(null);
      setDisabled(false);
    } catch (error) {
      toast.error(" Error Deleting Askout");
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
        <div className="flex flex-col space-y-2 items-center w-full min-h-[200px] rounded-3xl bg-gradient-to-r from-pink-50 to-pink-100 justify-center p-3">
          {!post && (
            <CreatePost
              setPost={(post: Post) => setPost(post)}
              isLoading={loading}
            />
          )}
          {post && (
            <>
              {(post.status === "WAITING" || post.status === "APPROVED") && (
                <Text align={"center"}>
                  {" "}
                  Copy the link and send to the partner{" "}
                </Text>
              )}
              {post.status === "REJECTED" && (
                <Text align={"center"}>
                  {" "}
                  Delete the current Askout to create a new Askout{" "}
                </Text>
              )}

              <div className=" flex flex-row gap-3 justify-between">
                <Button
                  onClick={() => {
                    copy(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/askout/${post.id}`
                    );
                    toast.success("Link Copied to Clipboard");
                  }}
                >
                  {" "}
                  Copy Link{" "}
                </Button>
                <Button
                  disabled={disabled || post.status === "APPROVED"}
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
          <CountCard />
        </div>

        <StatusCard status={post?.status || "DEFAULT"} />
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

      {post ? (
        <div className=" pointer-events-none">
          <PostCard
            name={post.name}
            partner={post.partner}
            imageUrl={post.imageUrl!}
            status={post.status}
          />
        </div>
      ) : loading ? null : (
       <div className=" flex justify-center"> <FindAvailable/> </div>
      )}

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
export default AdminPage;
