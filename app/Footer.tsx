import { Text } from "@radix-ui/themes";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-teal-700 rounded-t-md">
      <div className="bg-pink-700 p-2 text-center items-center flex-col flex">
        <Text className="text-slate-200 justify-center text-sm">
          {" "}
          Developed by <Link href={"https://www.linkedin.com/in/sonaljayasinghe"} target={'_blank'}>Sonal Jayasinghe</Link>
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
