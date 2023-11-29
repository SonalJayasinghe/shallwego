import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import { FaHeart } from "react-icons/fa";

const StatusCard = () => {
  return (
    <div className="flex flex-col space-y-3 items-center w-full h-full rounded-3xl bg-gradient-to-r from-pink-600 to-pink-400 justify-center p-3">
      <Flex gap="3" align="center" justify={"center"} direction={"row"}>
        <div>
          {" "}
          <FaHeart className=" animate-bounce" size="2em" />{" "}
        </div>{" "}
        <Text className=" font-bold text-2xl"> Lup Dup</Text>
      </Flex>
    </div>
  );
};

export default StatusCard;
