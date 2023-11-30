import PostCard from "@/app/components/Post";
import prisma from "@/prisma/client";
import openGraphImage from "@/public/images/opengThumb.jpg";
import { Text } from "@radix-ui/themes";
import { Metadata } from "next";

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
      {post ? 
        <PostCard
          id={post.id}
          name={post?.name}
          partner={post.partner}
          imageUrl={post.imageUrl!}
          status={post.status}
        />
      :
      <div className="flex justify-center items-center min-h-full">
        <Text align={'center'} className="text-2xl font-semibold">Sorry! This Askout is not available</Text>
      </div>}
    </>
  );
};
export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Will You Accept?',
  openGraph: {
    ...openGraphImage,
    title: 'Shall We Go | Askout',
    description: ' You can accept or reject the askout by clicking the link',
  },
}


export default PostPage;
