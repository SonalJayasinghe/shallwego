import { Text } from "@radix-ui/themes";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="rounded-t-md">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-1 gap-10 px-4 py-6 lg:py-8 md:grid-cols-3 max-md:text-center bg-slate-100 rounded-t-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-pink-600">Shall We Go</h1>
            <p className="text-pink-400 font-semibold">
              Where Every Askout Speaks Louder Than Words{" "}
            </p>
            <Text className="text-pink-400 inline-flex flex-wrap items-center justify-center">
              {" "}
              Made with &nbsp; {<AiFillHeart color={"pink"} />} &nbsp; in Sri
              Lanka.{" "}
            </Text>
          </div>

          <div>
            <div className=" justify-center flex flex-row">
              <h1 className="text-md font-semibold mb-3 text-pink-600 justify-center">
                Navigation
              </h1>
            </div>
            <div className="justify-center flex">
              <ul className="text-pink-400">
                <li className="mb-2">
                  <Link href={"/"}>Home Page</Link>
                </li>
                <li className="mb-2">
                  <Link href={"/admin"}>Dashboard</Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className=" justify-center flex flex-row">
              <h1 className="text-md font-semibold mb-3 text-pink-600 justify-center">
                Legal
              </h1>
            </div>
            <div className="justify-center flex">
              <ul className="text-pink-400">
                <li className="mb-2">
                  <Link href={"/termsandcondition"}> Terms and Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-pink-800 p-2 text-center items-center flex-col flex">
        <Text className="text-slate-100 justify-center text-sm">
          {" "}
          Developed by{" "}
          <Link
            href={"https://www.linkedin.com/in/sonaljayasinghe"}
            target={"_blank"}
          >
            Sonal Jayasinghe
          </Link>
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
