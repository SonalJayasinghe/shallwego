"use client";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Switch, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GiPerspectiveDiceSixFacesTwo } from "react-icons/gi";
import { set } from "zod";

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
  const [randomName, setRandomName] = useState(
    "Roll the Dice to Find Your Pal!"
  );
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    axios
      .get("/api/changeAvailability")
      .then((response) => setAvailable(response.data.lookingFor))
      .catch((error) => console.error(error));
  }, []);

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

  const handleAvailable = () => {
    axios
      .patch("/api/changeAvailability")
      .then((response) => {
        setAvailable(response.data.lookingFor);
        if(response.data.lookingFor){
        toast.success(" Others Can See Your Name Through The Dice!");
        }
        else{
          toast.error(" No One Can See Your Name Through The Dice!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
            <Switch
              size={"3"}
              onClick={handleAvailable}
              checked={available}
            />
          </div>
          <div className="flex">
            <Text size={"2"} align={"center"}>
              {" "}
              When You Enable This, Others Can See Your Name Though The Dice.{" "}
            </Text>
          </div>
        </div>
      </div>

      <Toaster
        position="top-center"
        z-index={50}
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
          success:{
            duration: 4000
          }
        }}
      />
    </>
  );
};

export default FindAvailable;
