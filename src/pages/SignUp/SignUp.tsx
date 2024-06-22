// import React from 'react'
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="absolute right-0 top-0 p-2">
        <ModeToggle />
      </div>
      <h1 className="text-3xl font-bold p-2">Welcome to Aleshka</h1>

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
            <Button className="w-full h-10  bg-black text-white dark:bg-[#ffffff] dark:text-black">
              Sign Up
            </Button>
          </div>
          <div className="flex items-center justify-center px-4 py-3">
            <Separator className="bg-black dark:bg-[#ffffff] w-1/2 h-[0.7px]" />
            <p className="mx-2">or</p>
            <Separator className="bg-black dark:bg-[#ffffff] w-1/2 h-[0.7px]" />
          </div>
          <div className="flex flex-col space-y-2 mb-0">
            <Button className="dark:bg-[#252525] dark:text-white bg-[#cccccc] text-black ">
              Sign Up with Google
            </Button>
            <Button className="dark:bg-[#252525] dark:text-white bg-[#cccccc] text-black ">
              Sign Up with Facebook
            </Button>
            <Button className="dark:bg-[#252525] dark:text-white bg-[#cccccc] text-black ">
              Sign Up with Apple
            </Button>
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
