// import React from 'react'
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
// import Apple from "../../assets/icons/Apple";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { ButtonSignUpWith } from "@/pages/SignUp/components/ui/button-signup-with";

import { FaApple } from "react-icons/fa";

function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center duration-500">
      <div className="absolute right-0 top-0 p-2">
        <ModeToggle />
      </div>
      <h1 className="text-3xl font-bold p-2 duration-300">Welcome to Aleshka</h1>

      <Card>
        <CardHeader>
          <CardTitle>Get Started for Free!</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="space-y-2">
            <Input type="email" placeholder="Enter your email."></Input>
            <Input type="password" placeholder="Enter your password."></Input>
            <Input type="password" placeholder="Confirm your password."></Input>
          </div>

          <div className="mt-3">
            <Button className="w-full h-10  bg-black text-white dark:bg-[#ffffff] dark:text-black hover:bg-none duration-500">
              Sign Up
            </Button>
          </div>

          <div className="flex items-center justify-center px-4 py-3">
            <Separator className="bg-black dark:bg-[#ffffff] w-1/2 h-[0.7px]" />
            <p className="mx-2">or</p>
            <Separator className="bg-black dark:bg-[#ffffff] w-1/2 h-[0.7px]" />
          </div>

          <div className="flex flex-col space-y-2 mb-0">
            <ButtonSignUpWith className="dark:bg-[#252525] dark:text-white bg-[#cccccc] text-black">
              <div className="flex items-center justify-start gap-2 w-full ml-12 text-start">
                <FaGoogle size={22} />
                Sign Up with Gooole
              </div>
            </ButtonSignUpWith>

            <ButtonSignUpWith className="dark:bg-[#252525] dark:text-white bg-[#cccccc] text-black">
              <div className="flex items-center justify-start gap-2 w-full ml-12 text-start">
                <FaFacebook size={24} />
                Sign Up with Facebook
              </div>
            </ButtonSignUpWith>

            <ButtonSignUpWith className="dark:bg-[#252525] dark:text-white bg-[#cccccc] text-black">
              <div className="flex items-center justify-start gap-1 w-full ml-12 text-left">
                <FaApple size={30} viewBox="0 0 512 512" />
                Sign Up with Apple
              </div>
            </ButtonSignUpWith>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Aleready have an account?{" "}
            <a href="" className="font-bold">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp;
