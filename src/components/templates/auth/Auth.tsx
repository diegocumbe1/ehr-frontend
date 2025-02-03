"use client";
import Image from "next/image";
import { useState } from "react";
import logo from "@/assets/whitelogo.png";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";

type Inputs = {
  email:string,
  
}
const Auth = () => {
  const t = useTranslations("Auth");
  
  const register = useForm();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log("Email submitted:", email);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex flex-1 bg-gradient-to-b from-primary to-secondary flex-col justify-center items-center text-white p-8">
        <div className="flex items-center justify-center mb-6">
          <div className=" text-black text-2xl font-bold px-4 py-2 rounded-md">
            <Image src={logo} width={150} height={150} alt="White Logo" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">{t("welcome")}</h1>
        <p className="text-center text-lg max-w-md">{t("description")}</p>
      </div>

      <div className="lg:bg-gradient-to-r lg:from-white lg:to-white lg bg-gradient-to-b from-primary to-secondary  flex-1 flex flex-col lg:justify-center justify-around items-center lg:p-8 p-4">
        <div className="lg:hidden">
          <Image src={logo} width={120} height={120} alt="White Logo" />
        </div>
        <div className="w-full max-w-md bg-white lg:p-0 p-8 rounded-2xl">
          <h2 className="lg:text-2xl text-lg font-bold text-center mb-4 uppercase">
            {t("user_registration")}
          </h2>
          <p className="text-sm lg:text-lg font-medium text-center mb-6">
            {t("desc")}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
              <span className="absolute left-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor">
                    <path
                      strokeLinejoin="round"
                      d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                    ></path>
                    <circle cx={12} cy={7} r={3}></circle>
                  </g>
                </svg>
              </span>
              <input
                type="email"
                placeholder={t("email")}
                className="outline-none ml-8 w-[90%]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t("submit")}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            <Link href="es/login" className="text-primary underline">
              {t("login")}
            </Link>
          </p>
        </div>
        <div className="lg:hidden text-center">
          <h1 className="text-xl font-bold mb-4 text-white">{t("welcome")}</h1>
          <p className="text-sm max-w-md text-white font-medium">
            {t("description_mobile")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
