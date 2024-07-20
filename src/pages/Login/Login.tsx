// import React from 'react'
// import { useEffect } from "react";
// import {
//   GoogleLogin,
//   GoogleLoginResponse,
//   GoogleLoginResponseOffline,
// } from "react-google-login";
// import { gapi } from "gapi-script";
import * as z from "zod";
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
import { useEffect } from "react";
//IMPORTS

//Spotify Login
const clientId = "794b6718e2594918a275de9ee5d55119";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173/login";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPE_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnParamsFromSpotifyAuth = (hash: string) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((acc, curr) => {
    console.log(curr);
    const [key, value] = curr.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return paramsSplitUp;
};

//Zod Validation
const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(6),
});

//LOGIN
function Login() {
  //Zod Validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
    },
  });
  //Form Submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);

    const resLogin = loginRequest(data.emailAddress, data.password);
    console.log(resLogin);
  };

  //Spotify Login
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, token_type, expires_in, state } =
        getReturnParamsFromSpotifyAuth(window.location.hash);
      console.log({ access_token, token_type, expires_in, state });
    }
  }, []);

  const handleLogin = () => {
    window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientId}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPE_URL_PARAM}&response_type=token&show_dialog=true`;
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
                  Log In
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

            {/* Spotify Button */}
            <ButtonSignUpWith onClick={handleLogin} className="dark:bg-[#2c2c2c] dark:text-white bg-[#e8e8e8] text-black h-10">
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
