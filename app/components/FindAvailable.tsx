'use client'
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Switch, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { GiPerspectiveDiceSixFacesTwo } from "react-icons/gi";

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
    if (names.length === 0) {
      setRandomName("Rolling The Dice... ");
      setTimeout(() => {
        setRandomName("No Pals Are Available");
      }, 1000);
      return;
    }
  
    setRandomName("Rolling The Dice... ");
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setRandomName(names[randomIndex].name);
    }, 1000);
  };

  return (
    <>
      <div>
        <div className="flex flex-col-2 gap-3 items-center w-full h-[100px] bg-pink-100 rounded-2xl justify-between pl-5 pr-5">
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
        <div className="flex flex-col justify-center items-center mt-3 w-full h-[100px] bg-pink-100 rounded-2xl pl-5 pr-5 gap-2">
          <div className="flex flex-col-2 gap-3 justify-between pl-5 pr-5">
            <Text className="font-semibold"> I&apos;m Looking For Pal </Text>
            <Switch size={"3"} />
          </div>
          <div className="flex">
            <Text size={'2'} align={'center'}> When You Enable This, Others Can See Your Name Though The Dice. </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindAvailable;
