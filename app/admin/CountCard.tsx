import { Card, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiAmpleDress } from "react-icons/gi";
import { IoIosBowtie } from "react-icons/io";

const CountCard = () => {
  const [ApprovedAskouts, setApprovedAskouts] = useState(0);

  useEffect(() => {
    const fetchApprovedAskouts = async () => {
      try {
        const response = await axios.get("/api/askoutApproved");
        setApprovedAskouts(response.data);
      } catch (error) {
        console.error("Failed to fetch approved posts count:", error);
      }
    };

    fetchApprovedAskouts();
  }, []);

  return (
    <Card style={{ maxWidth: 300 }}>
      <Flex gap="3" align="center" justify={"center"}>
        <div className=" hover:text-pink-600 transition-colors">
          <IoIosBowtie size="2em" />
        </div>
        <div>
          <Text as="div" size="5" weight="bold" align={"center"}>
            {ApprovedAskouts} Partners
          </Text>
          <Text as="div" size="2" color="gray" align={"center"}>
            Has Been Approved From This Website
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
