import { Button, Checkbox, Flex, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";

const RegistrationForm = () => {
  const [isSubmiting, setSubmiting] = useState(false);

  //Form and edgestore
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const password = watch("password");

  //Handling the onsubmit event
  const onHandleSubmit = handleSubmit(async ({ confirmPassword, ...data }) => {
    try {
      console.log(data);
      await axios.post("/api/register", data);
      reset();
      toast.success(" Account Created Succesfully. Please Sign In");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 400) {
          if (error.response.data.error === "User already exists") {
            toast.error("Email Already Exists");
          }
        } else {
          toast.error("Sorry! Something Went Wrong");
        }
      }
      router.refresh();
    }
  });

  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <Flex direction="column" gap="3">
          <TextField.Input
            radius="full"
            placeholder=" Your Email"
            type="email"
            {...register("email", {
              required: "* Your Email is Required",
            })}
          />
          {errors.email && (
            <Text size={"1"} color="red">
              {" "}
              {errors.email?.message?.toString()}{" "}
            </Text>
          )}
          <TextField.Input
            radius="full"
            type="password"
            placeholder="Your Password"
            {...register("password", {
              required: "* Password is requiered",
            })}
          />
          {errors.password && (
            <Text size={"1"} color="red">
              {" "}
              {errors.password?.message?.toString()}{" "}
            </Text>
          )}
          <TextField.Input
            radius="full"
            type="password"
            placeholder="Confirm Your Password"
            {...register("confirmPassword", {
              required: "* Confirmation Password is required",
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <Text size={"1"} color="red">
              {" "}
              {errors.confirmPassword?.message?.toString()}{" "}
            </Text>
          )}
          <div className=" flex items-center space-x-2">
            <Checkbox size="1" required />
            <Link href={"/termsandcondition"}>
              {" "}
              Agree to Terms and Conditions{" "}
            </Link>
          </div>
          <Button disabled={isSubmiting}>
            {isSubmiting ? (
              <>
                {" "}
                <BiLoaderCircle className=" animate-ping" /> Registering...{" "}
              </>
            ) : (
              <>Register </>
            )}
          </Button>
        </Flex>
      </form>

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
        }}
      />
    </>
  );
};

export default RegistrationForm;
