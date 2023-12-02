import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Text } from "@radix-ui/themes";
import { GiPerspectiveDiceSixFacesTwo } from "react-icons/gi";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

type NameObject = {
  name: string;
};

const oscillate = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(-15deg); }
  75% { transform: rotate(15deg); }
  0% { transform: rotate(0deg); }
`;

const OscillatingIcon = styled.div`
  animation: ${oscillate} 1s ease-in-out infinite;
`;

const FindAvailable = () => {
  const [names, setNames] = useState<NameObject[]>([]);
  const [randomName, setRandomName] = useState<string>(
    "Roll the Dice to Find Your Pal!"
  );

  useEffect(() => {
    axios
      .get("/api/available")
      .then((response) => setNames(response.data))
      .catch((error) => console.error(error));
  }, []);

  const getRandomName = () => {
    setRandomName("Rolling The Dice... ");
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setRandomName(names[randomIndex].name);
    }, 1000);
  };

  return (
    <div className="flex flex-col-2 gap-3 items-center w-[400px] h-[100px] p-4 bg-pink-100 rounded-2xl justify-between pl-5 pr-5">
      <div>
        {" "}
        <Text color="pink" size={"4"} className=" font-semibold">
          {" "}
          {randomName}{" "}
        </Text>
      </div>
      <Button onClick={getRandomName} size={"3"}>
        <OscillatingIcon>
          <GiPerspectiveDiceSixFacesTwo size="30" />
        </OscillatingIcon>
      </Button>
    </div>
  );
};

export default FindAvailable;
