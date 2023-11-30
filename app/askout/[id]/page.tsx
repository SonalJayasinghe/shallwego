import PostCard from "@/app/components/Post";
import prisma from "@/prisma/client";
import React from "react";
import { Metadata } from "next";
import openGraphImage from "@/public/images/opengThumb.jpg";


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
          id={post.id}
          name={post?.name}
          partner={post.partner}
          imageUrl={post.imageUrl!}
          status={post.status}
        />
      )}
    </>
  );
};
export const metadata = {
  title: 'Will You Accept?',
  openGraph: {
    ...openGraphImage,
    title: 'Shall We Go | Askout',
    description: ' You can accept or reject the askout by clicking the link',
  },
}


export default PostPage;
