import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import { FaCloud, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaHeartCircleBolt } from "react-icons/fa6";



interface Props {
  status: string;
}
const StatusCard = ({ status }: Props) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning!';
    } else if (currentHour < 18) {
      return 'Good Afternoon!';
    } else {
      return 'Good Evening!';
    }
  };

  const getIcon = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return <FaSun size="2em" />;
    } else if (currentHour < 18) {
      return <FaCloud size="2em" />;
    } else {
      return <FaMoon size="2em" />;
    }
  };
  
  const gradientClass = status === 'APPROVED' 
  ? 'bg-gradient-to-r from-green-600 to-green-400' 
  : status === 'REJECTED' ? 'bg-gradient-to-r from-orange-600 to-orange-400' : 
  status === 'WAITING' ? 'bg-gradient-to-r from-pink-600 to-pink-400' : 'bg-gradient-to-r from-pink-600 to-pink-400';
  return (
    <div className={`flex flex-col space-y-3 items-center w-full min-h-[200px] rounded-3xl ${gradientClass} justify-center p-3`}>
      <Flex gap="3" align="center" justify={"center"} direction={"row"}>
        {status === 'WAITING' && <>
          <div>
            {" "}
            <FaHeart className=" animate-bounce" size="2em" />{" "}
          </div>{" "}
          <Text className=" font-bold text-2xl"> Lup Dup</Text>
        </>}

        {status === 'DEFAULT' && <>
          <div className=" animate-bounce"> 
            {" "}
            {getIcon()}
          </div>{" "}
          <Text className=" font-bold text-2xl"> {getGreeting()} </Text>
        </>}


        { status === 'APPROVED'  && <>
          <div>
            {" "}
            <FaHeartCircleCheck className=" animate-bounce" size="2em" />{" "}
          </div>{" "}
          <Text className=" font-bold text-2xl"> Congratulations! </Text>
        </>}

        { status === 'REJECTED' && <>
          <div>
            {" "}
            <FaHeartCircleBolt className=" animate-bounce" size="2em" />{" "}
          </div>{" "}
          <Text className=" font-bold text-2xl"> Oh No! </Text>
        </>}


      </Flex>
    </div>
  );
};

export default StatusCard;
