import { ButtonSignUpWith } from "@/pages/SignUp/components/ui/button-signup-with";
import { FaSpotify, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function SignupWith() {
  return (
    <div className="flex flex-col w-full space-y-2 mb-0">
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
  );
}

export default SignupWith;
