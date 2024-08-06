import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRequest } from "./api/auth";
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
import { FaApple, FaSpotify } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
//IMPORTS

const formSchema = z.object({
  identifier: z.string().min(1, "Identifier is required"),
  password: z.string().min(1, "Password is required"),
});

// LOGIN
function Login() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(data);
    try {
      await loginRequest(data.identifier, data.password);
      // Handle successful login
      console.log(res);
    } catch (error) {
      // Handle login error
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start duration-500">
      <div className="absolute right-0 top-0 p-2">
        <ModeToggle />
      </div>
      <div className="w-full text-center">
        <h1 className="text-3xl font-bold pt-[2.2em] pb-1 mx-2 duration-300">
          Sign Up to Aleshka
        </h1>
      </div>

      <Card className="flex-col justify-center pt-0 w-11/12">
        <CardContent className="mt-5 mb-3 py-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem className="flex-col mb-2 text-left">
                    <FormControl>
                      <Input
                        placeholder="Enter your email or username."
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-col mb-2 text-left">
                    <FormControl>
                      <Input
                        placeholder="Enter your password."
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-right">
                <p className="text-sm">
                  <a href="#" className="">
                    Forgot password?
                  </a>
                </p>
              </div>
              <div className="mt-5">
                <Button
                  type="submit"
                  className="w-full h-10 bg-black text-white dark:bg-[#ffffff] dark:text-black duration-500"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex items-center justify-center w-full px-4 py-3">
            <Separator className="bg-black dark:bg-[#ffffff] w-6/12 h-[0.7px]" />
            <p className="mx-2">or</p>
            <Separator className="bg-black dark:bg-[#ffffff] w-6/12 h-[0.7px]" />
          </div>
          <div className="flex flex-col space-y-2 mb-0">
            <ButtonSignUpWith
              className="dark:bg-[#2c2c2c] dark:text-white bg-[#e8e8e8] text-black h-10"
            >
              <div className="flex items-center justify-center gap-2 w-full text-start">
                <FaSpotify size={26} fill="#1DB954" />
                Continue with Spotify
              </div>
            </ButtonSignUpWith>
            <ButtonSignUpWith className="dark:bg-[#2c2c2c] dark:text-white bg-[#e8e8e8] text-black h-10">
              <div className="flex items-center justify-center gap-1 w-full text-start">
                <FaApple size={30} />
                Continue with Apple Music
              </div>
            </ButtonSignUpWith>
            <ButtonSignUpWith className="dark:bg-[#2c2c2c] dark:text-white bg-[#e8e8e8] text-black h-10">
              <div className="flex items-center justify-center gap-2 w-full text-start">
                <FcGoogle size={28} />
                Continue with Google
              </div>
            </ButtonSignUpWith>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="font-bold">
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;