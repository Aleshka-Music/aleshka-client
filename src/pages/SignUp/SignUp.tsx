// import React from 'react'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerRequest } from "./api/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/pages/SignUp/components/ui/card";
import { Input } from "@/pages/SignUp/components/ui/input";
import { Button } from "@/pages/SignUp/components/ui/button";
import { Separator } from "@/pages/SignUp/components/ui/separator";
import { ButtonSignUpWith } from "@/pages/SignUp/components/ui/button-signup-with";
import { FaSpotify, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
//IMPORTS 

//Zod Validation
const formSchema = z
  .object({
    emailAddress: z.string().email(),
    password: z.string().min(6),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

//SIGNUP
function SignUp() {
  //Zod Validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
    },
  });

  //Form Submission
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);

    const resLogin = await registerRequest(data.emailAddress, data.password);
    console.log(resLogin);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center duration-500">
      <div className="absolute right-0 top-0 p-2">
        <ModeToggle />
      </div>
      <h1 className="text-3xl font-bold p-2 duration-300">
        Welcome to Aleshka
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Get Started for Free!</CardTitle>
        </CardHeader>

        {/* Form */}
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-col mb-2 text-left">
                      <FormControl>
                        <Input
                          placeholder="Enter your email."
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-500" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-col mb-2 text-left">
                      <FormControl>
                        <Input
                          placeholder="Enter your password."
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-500" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-col mb-2 text-left">
                      <FormControl>
                        <Input
                          placeholder="Confirm your password."
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-500" />
                    </FormItem>
                  );
                }}
              />

              {/* Button */}
              <div className="mt-3">
                <Button
                  type="submit"
                  className="w-full h-10  bg-black text-white dark:bg-[#ffffff] dark:text-black hover:bg-none duration-500"
                >
                  Sign Up
                </Button>
              </div>

              {/* Separator */}
              <div className="flex items-center justify-center px-4 py-3">
                <Separator className="bg-black dark:bg-[#ffffff] w-1/2 h-[0.7px]" />
                <p className="mx-2">or</p>
                <Separator className="bg-black dark:bg-[#ffffff] w-1/2 h-[0.7px]" />
              </div>
            </form>
          </Form>
          {/* Sign Up with */}
          <div className="flex flex-col space-y-2 mb-0">
            {/* Spotify Button */}
            <ButtonSignUpWith className="dark:bg-[#2c2c2c] dark:text-white bg-[#e8e8e8] text-black h-10">
              <div className="flex items-center justify-center gap-2 w-full text-start">
                <FaSpotify size={26} viewBox="0 0 512 512" fill="#1DB954" />
                Continue with Spotify
              </div>
            </ButtonSignUpWith>

            {/* Apple Music Button */}
            <ButtonSignUpWith className="dark:bg-[#2c2c2c] dark:text-white bg-[#e8e8e8] text-black h-10">
              <div className="flex items-center justify-center gap-1 w-full text-start">
                <FaApple size={30} />
                Continue with Apple Music
              </div>
            </ButtonSignUpWith>

            {/* Google Button */}
            <ButtonSignUpWith className="dark:bg-[#2c2c2c] dark:text-white bg-[#e8e8e8] text-black h-10">
              <div className="flex items-center justify-center gap-2 w-full text-start">
                <FcGoogle size={28} />
                Continue with Google
              </div>
            </ButtonSignUpWith>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter>
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="font-bold">
              Log In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp;
