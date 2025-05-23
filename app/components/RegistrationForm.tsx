import {
  Button,
  Checkbox,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { signIn } from "next-auth/react";

const RegistrationForm = () => {
  const [isSubmiting, setSubmiting] = useState(false);

  //Form and edgestore
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const password = watch("password");

  //Handling the onsubmit event
  const onHandleSubmit = handleSubmit(async ({ confirmPassword, ...data }) => {
    setSubmiting(true);
    try {
      const response = await axios.post("/api/register", data);
      if (response.data.status === 200) {
        signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
      }
      setSubmiting(false);
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        setSubmiting(false);

        if (error.response && error.response.status === 400) {
          if (error.response.data.error === "User already exists") {
            toast.error("Email Already Exists");
            reset();
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
            placeholder=" Your Name"
            type="name"
            disabled={isSubmiting}
            {...register("name", {
              required: "* Your Name is Required",
            })}
          />
          {errors.email && (
            <Text size={"1"} color="red">
              {" "}
              {errors.email?.message?.toString()}{" "}
            </Text>
          )}

          <Controller
            name="gender"
            control={control}
            defaultValue={""}
            rules={{ required: "* Please Select Your Gender" }}
            render={({ field: {ref, ...field} }) => (
              <Select.Root
                onValueChange={field.onChange}
                disabled={isSubmiting}
              >
                <Select.Trigger placeholder="Select Your Gender" />
                <Select.Content position="popper" {...field}
                >
                  <Select.Item value="MALE"> Male </Select.Item>
                  <Select.Item value="FEMALE"> Female </Select.Item>
                </Select.Content>
              </Select.Root>
            )}
          />
          {errors.type && (
            <Text size={"1"} color="red">
              {" "}
              {errors.gender?.message?.toString()}{" "}
            </Text>
          )}

          <TextField.Input
            radius="full"
            placeholder=" Your Email"
            type="email"
            disabled={isSubmiting}
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
            disabled={isSubmiting}
            minLength={5}
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
            disabled={isSubmiting}
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
