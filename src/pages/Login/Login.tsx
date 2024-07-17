// import React from 'react'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@/pages/SignUp/components/ui/card";
import { Input } from "@/pages/SignUp/components/ui/input";
import { Button } from "@/pages/SignUp/components/ui/button";
import { Separator } from "@/pages/SignUp/components/ui/separator";
import { ButtonSignUpWith } from "@/pages/SignUp/components/ui/button-signup-with";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

const formSchema = z
  .object({
    emailAddress: z.string().email(),
    password: z.string().min(6),
  })
  
function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center duration-500">
      <div className="absolute right-0 top-0 p-2">
        <ModeToggle />
      </div>
      <div className="w-11/12 text-center mt-0">
        <h1 className="text-[1.7rem] font-bold pt-2 duration-300">
          Welcome back to Aleshka!
        </h1>
      </div>

      <Card className="flex-col justify-center pt-5">
        {/* Form */}
        <CardContent className="mt-7 mb-3 p py-0">
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
                          placeholder="Enter your email or username."
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
              {/* Forgot password */}
              <div className="text-right">
                <p className="text-sm">
                  <a href="#" className="">
                    Forgot password?
                  </a>
                </p>
              </div>

              {/* Button */}
              <div className="mt-5">
                <Button
                  type="submit"
                  className="w-full h-10  bg-black text-white dark:bg-[#ffffff] dark:text-black hover:bg-none duration-500"
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
          {/* Separator */}
          <div className="flex items-center justify-center w-full px-4 py-3">
            <Separator className="bg-black dark:bg-[#ffffff] w-6/12 h-[0.7px]" />
            <p className="mx-2">or</p>
            <Separator className="bg-black dark:bg-[#ffffff] w-6/12 h-[0.7px]" />
          </div>
          {/* Login Up with */}
          <div className="flex flex-col space-y-2 mb-0">
            <ButtonSignUpWith className="dark:bg-[#252525] dark:text-white bg-[#cccccc] text-black">
              <div className="flex items-center justify-center gap-2 w-full text-start">
                <FaGoogle size={22} />
                Login Up with Google
              </div>
            </ButtonSignUpWith>

            <ButtonSignUpWith className="dark:bg-[#252525] dark:text-white bg-[#cccccc] text-black">
              <div className="flex items-center justify-center gap-2 w-full text-start">
                <FaFacebook size={24} />
                Login Up with Facebook
              </div>
            </ButtonSignUpWith>

            <ButtonSignUpWith className="dark:bg-[#252525] dark:text-white bg-[#cccccc] text-black">
              <div className="flex items-center justify-center gap-[1px] w-full text-left">
                <FaApple size={30} viewBox="0 0 512 512" />
                Login Up with Apple
              </div>
            </ButtonSignUpWith>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter>
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="/" className="font-bold">
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
