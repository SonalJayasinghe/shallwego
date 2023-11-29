import PostCard from "@/app/components/Post";
import prisma from "@/prisma/client";
import React from "react";

interface Props {
  params: { id: string };
}

const PostPage = async ({ params }: Props) => {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <>
      {post && (
        <PostCard
          name={post?.name}
          partner={post.partner}
          imageUrl={post.imageUrl!}
          status={post.status}
        />
      )}
    </>
  );
};

export default PostPage;
