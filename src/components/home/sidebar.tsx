"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, Plus, X, ChevronDown, LogOut, Globe } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { SignIn } from "../custom-btns/signin";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import { langState } from "@/store/languageState";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const { data: session } = useSession();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleChatOptions = () => setShowChatOptions(!showChatOptions);
  const [lang, setLang] = useRecoilState(langState);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const toggleLanguageOptions = () =>
    setShowLanguageOptions(!showLanguageOptions);

  const pathname = usePathname();

  const languageOptions = [
    {
      name: "English",
      onClick: () => setLang({ language: "English" }),
    },
    {
      name: "Hindi",
      onClick: () => setLang({ language: "Hindi" }),
    },
  ];

  const chatOptions = [
    {
      name: "Policy Query",
      link: "/policy-query",
      features: [
        "Your one stop destination for policies",
        "Get real time replies from AI",
        "Quickly compare policy details",
      ],
    },
    {
      name: "Verify Docs",
      link: "/verify-docs",
      features: [
        "Instantly verify the authenticity and accuracy of your policy documents.",
        "Ask questions from your Policy Docs",
        "Helps you understand your policies better",
      ],
    },
    {
      name: "Policy Form",
      link: "/policy-form",
      features: [
        "Has forms for all types of insurance policies",
        "Fill out forms with ease",
        "Get real time replies from AI",
      ],
    },
  ];

  return (
    <>
      <Button
        className="fixed left-4 top-4 z-50 md:hidden"
        variant="outline"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      <div
        className={`fixed inset-y-0 left-0 z-40 w-full max-w-[330px] transform bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <Link href="/" className="mx-auto pt-5 text-xl font-semibold">
            <h1 className="text-blue-500">PolicySense</h1>
          </Link>{" "}
          <div className="relative">
            <Button
              className="mx-2 mb-2 mt-5 w-[calc(100%-16px)] gap-x-1"
              variant="outline"
              onClick={toggleChatOptions}
            >
              <Plus className="h-5 w-5 text-gray-400" />
              {pathname === "/policy-query"
                ? "Policy Query"
                : pathname === "/verify-docs"
                  ? "Verify Docs"
                  : pathname === "/policy-form"
                    ? "Policy Form"
                    : "New Chat"}
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
            {showChatOptions && (
              <div className="absolute left-2 right-2 top-full z-50 rounded-md border border-gray-200 bg-white shadow-lg">
                {chatOptions.map((option, index) => (
                  <Link href={`${option.link}`} key={index}>
                    <Button
                      className="w-full justify-start rounded-none hover:bg-gray-100"
                      variant="ghost"
                      onClick={() => {
                        setShowChatOptions(false);
                      }}
                    >
                      {option.name}
                    </Button>
                  </Link>
                ))}
              </div>
            )}

            <Button
              className="mx-2 mb-2 mt-5 w-[calc(100%-16px)] gap-x-1"
              variant="outline"
              onClick={toggleLanguageOptions}
            >
              <Globe className="mr-1 h-5 w-5 text-gray-400" />
              {lang.language}
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
            {showLanguageOptions && (
              <div className="absolute left-2 right-2 top-full z-50 rounded-md border border-gray-200 bg-white shadow-lg">
                {languageOptions.map((option, index) => (
                  <Button
                    key={index}
                    className="w-full justify-start rounded-none hover:bg-gray-100"
                    variant="ghost"
                    onClick={() => {
                      setShowLanguageOptions(false);
                      setLang({ language: option.name });
                    }}
                  >
                    {option.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="mx-5 pt-10">
            {pathname === "/policy-query" && (
              <div>
                {chatOptions[0].features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-400">
                    {feature}
                  </li>
                ))}
              </div>
            )}
            {pathname === "/verify-docs" && (
              <div>
                {chatOptions[1].features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-400">
                    {feature}
                  </li>
                ))}
              </div>
            )}
            {pathname === "/policy-form" && (
              <div>
                {chatOptions[2].features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-400">
                    {feature}
                  </li>
                ))}
              </div>
            )}
          </div>
          <div className="mx-6 mt-auto flex items-center justify-between rounded-lg p-2">
            {session?.user ? (
              <div className="flex items-center justify-between">
                <div className="flex w-[240px] items-center gap-x-2">
                  <div className="h-9 w-9">
                    <Image
                      src={session.user.image!}
                      alt="Profile Picture"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <h2 className="text-sm font-semibold text-[#3A3A40]">
                    {session.user.name}
                  </h2>
                </div>
                <LogOut
                  className="h-6 w-6 text-gray-400"
                  onClick={() => signOut()}
                />
              </div>
            ) : (
              <div className="w-full items-center">
                <SignIn />
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
