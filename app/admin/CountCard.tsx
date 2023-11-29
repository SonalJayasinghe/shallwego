import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { GiAmpleDress } from "react-icons/gi";
import { IoIosBowtie } from "react-icons/io";

const CountCard = () => {
  return (
    <Card style={{ maxWidth: 300 }}>
      <Flex gap="3" align="center" justify={"center"}>
        <div className=" hover:text-pink-600 transition-colors">
          <IoIosBowtie size="2em" />
        </div>
        <div>
          <Text as="div" size="5" weight="bold" align={"center"}>
            234 Partners
          </Text>
          <Text as="div" size="2" color="gray" align={"center"}>
            Accepted Invitations
          </Text>
        </div>
        <div className=" hover:text-pink-600 transition-colors">
          <GiAmpleDress size="2em" />
        </div>
      </Flex>
    </Card>
  );
};

export default CountCard;
