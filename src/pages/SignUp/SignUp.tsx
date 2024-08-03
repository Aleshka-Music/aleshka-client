"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FormDataSchema } from "./lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { Card, CardFooter } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@radix-ui/react-separator";
import SignupWith from "./components/ui/signup-with";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Basic Info",
    fields: ["email", "password", "confirmPassword"],
  },
  {
    id: "Step 2",
    name: "Personal Info",
    fields: ["userName", "firstName", "lastName", "birthDate"],
  },
  { id: "Step 3", name: "Complete" },
];

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start duration-500">
      <div className="absolute right-0 top-0 p-2">
        <ModeToggle />
      </div>
      <h1 className="text-3xl font-bold pt-[2.2em] pb-1 mx-2 duration-300">
        Welcome to Aleshka
      </h1>

      <Card className="flex flex-col justify-between w-11/12 px-4">
        <nav aria-label="Progress">
          <ol role="list" className="flex mt-2">
            {steps.map((step, index) => (
              <li key={step.id} className="flex-1">
                {currentStep > index ? (
                  <div className="group flex w-full flex-col border-t-[.2em] border-[#eeeeee] dark:border-[#1f1f1f] py-2 pt-1 pl-4 transition-colors">
                    <span className="text-[.7em] font-medium text-[#c5c5c5] dark:text-[#343434] transition-colors">
                      {step.id}
                    </span>
                  </div>
                ) : currentStep === index ? (
                  <div
                    className="flex w-full flex-col border-t-[.2em] border-black dark:border-white py-2 pt-1 pl-4"
                    aria-current="step"
                  >
                    <span className="text-[.7em] font-medium text-black dark:text-white">
                      {step.id}
                    </span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-t-[.2em] border-[#eeeeee] dark:border-[#1f1f1f] py-2 pt-1 pl-4 transition-colors">
                    <span className="text-[.7em] font-medium text-[#c5c5c5] dark:text-[#343434] transition-colors">
                      {step.id}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <form className="pb-2" onSubmit={handleSubmit(processForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex-col justify-between mt-4">
                <div className="text-start">
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    autoComplete="email"
                  />
                  {errors.email?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 text-start">
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    autoComplete="current-password"
                  />
                  {errors.password?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 text-start">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                    autoComplete="current-password"
                  />
                  {errors.confirmPassword?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex-col justify-between mt-4">
                <div className="text-start">
                  <Input
                    type="text"
                    id="userName"
                    placeholder="Enter your username"
                    {...register("userName")}
                    autoComplete="username"
                  />
                  {errors.userName?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.userName.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 text-start">
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                    {...register("firstName")}
                    autoComplete="given-name"
                  />
                  {errors.firstName?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 text-start">
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                    {...register("lastName")}
                    autoComplete="family-name"
                  />
                  {errors.lastName?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 text-start">
                  <Input
                    id="birthDate"
                    type="date"
                    className="text-white"
                    placeholder="Enter your birth date"
                    {...register("birthDate")}
                    autoComplete="bday"
                  />
                  {errors.birthDate?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <>
              <h2 className="mt-[8em] text-2xl font-semibold leading-7 text-black dark:text-white">
                Thank you!
              </h2>
              <p className="mt-1 text-md leading-6 text-black dark:text-white">
                Your account has been successfully created.
              </p>
            </>
          )}
        </form>

        {currentStep === 2 ? (
          ""
        ) : (
          <CardFooter className="pb-0">
            <div className="mt-3">
              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  onClick={prev}
                  disabled={currentStep === 0}
                  className="bg-transparent px-2 py-1 border-black dark:border-white border-[0.7px] rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <GrLinkPrevious />
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className="bg-transparent px-2 py-1 border-black dark:border-white border-[0.7px] rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {currentStep === steps.length - 2 ? (
                    "Sign Up"
                  ) : currentStep === steps.length - 1 ? (
                    "Complete"
                  ) : (
                    <GrLinkNext />
                  )}
                </button>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>

      <footer className="w-11/12 px-4">
        {currentStep === 2 ? (
          ""
        ) : (
          <div className="flex items-center justify-center py-3">
            <Separator className="bg-black dark:bg-[#ffffff] w-1/2 h-[0.7px]" />
            <p className="mx-2">or</p>
            <Separator className="bg-black dark:bg-[#ffffff] w-1/2 h-[0.7px]" />
          </div>
        )}

        {currentStep !== 0 ? "" : <SignupWith />}

        {currentStep === 2 ? (
          ""
        ) : (
          <div className="text-center pt-2">
            <p className="text-sm">
              Already have an account?{" "}
              <a href="/login" className="font-bold">
                Log In
              </a>
            </p>
          </div>
        )}
      </footer>
    </div>
  );
}
