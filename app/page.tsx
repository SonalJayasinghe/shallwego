'use client'
import { Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FaCircleArrowRight } from "react-icons/fa6";

const Home = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col min-h-full items-center justify-center">
        <Text align={'center'} className=" md:text-8xl text-6xl font-bold text-pink-700 mb-3">
          {" "}
          ARE YOU SHY TO ASKOUT?
        </Text>
        <Text align={'center'} className=" md:text-6xl text-3xl font-semibold text-pink-600 mb-3">
          {" "}
          We Got You Covered
        </Text>

        <div role="button" onClick={() => {
          router.push('/admin');
          router.refresh();
        }}>
          {" "}
          <div className="flex space-x-2 items-center hover:translate-x-[10px] transition ease-in p-3 hover:bg-pink-600 rounded-full hover:text-slate-100">
            <div>
              <Text className="md:text-4xl text-2xl font-semibold items-center"> Let&apos;s Create</Text>
            </div>
            <div>
              <FaCircleArrowRight size={'40'}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
