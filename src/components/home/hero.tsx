import Image from "next/image";
import { Button } from "../ui/button";
import { link } from "fs";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full px-4 text-center sm:px-6 lg:px-8">
      <div className="pt-3">
        <h1 className="flex justify-center text-2xl font-semibold tracking-tight text-blue-500 sm:text-3xl md:text-4xl">
          <div className="flex items-center gap-x-2">
            <Image src="/image.png" alt="Insurance" width={40} height={40} />
            PolicySense
          </div>
        </h1>
        <p className="pt-2 text-sm text-[#999999] sm:text-base">
          A one stop platform for all your insurance needs.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <h1 className="bg-gradient-to-b from-[#437AE069] to-[#699BF72F] bg-clip-text pt-6 text-2xl font-semibold capitalize tracking-tight text-transparent sm:pt-10 sm:text-3xl md:text-4xl">
          Manage, verify and update all your financial policies with ease
        </h1>
      </div>

      <div className="flex flex-col justify-center gap-6 pt-6 sm:flex-row sm:gap-x-10 sm:pt-10">
        {PolicyObject.map((policy: any, index: number) => (
          <PolicyCard key={index} policy={policy} />
        ))}
      </div>

      <p className="py-4 text-xs font-semibold text-gray-500/50 sm:text-sm">
        Recheck the generated results for your own clarity{" "}
        <span className="text-blue-500">PolicySense</span>, might make mistakes.
      </p>
    </div>
  );
};

const PolicyObject = [
  {
    name: "PolicyQuery",
    description:
      "Your one stop destination for any queries related to policies.",
    features: [
      "Your one stop destination for policies",
      "Get real time replies from AI",
      "Quickly compare policy details",
    ],
    button: "Get Started",
    link: "/policy-query",
  },
  {
    name: "VerifyDocs",
    description: "Talk to your policy documents.",
    features: [
      "Instantly upload Policy Docs",
      "Ask questions from your Policy Docs",
      "Helps you understand your policies better",
    ],
    button: "Get Started",
    link: "/verify-docs",
  },
  {
    name: "PolicyForm",
    description: "Easily fill out policy forms through chat.",
    features: [
      "Has forms for all types of insurance policies",
      "Fill out forms with ease",
      "Get real time replies from AI",
    ],
    button: "Get Started",
    link: "/policy-form",
  },
];

const PolicyCard = ({ policy }: { policy: any }) => {
  return (
    <Link href={policy.link}>
      <div className="flex w-full flex-col items-center justify-center gap-y-3 rounded-xl bg-white p-4 shadow-sm sm:w-[290px] sm:p-6">
        <h1 className="bg-gradient-to-b from-[#699BF7] to-[#3E5B91] bg-clip-text text-center text-lg font-semibold tracking-tight text-transparent sm:text-xl">
          {policy.name}
        </h1>
        <p className="pb-1 text-center text-xs text-[#999999]">
          {policy.description}
        </p>
        <div className="w-full rounded-xl border-t-2 py-2 text-sm shadow-lg">
          <p className="mb-3 py-2 text-xs font-semibold text-[#93949D] sm:py-4">
            About this bot
          </p>
          <ul className="mx-4 flex flex-col gap-y-2 text-left text-xs text-[#999999] sm:mx-6 sm:gap-y-[12px]">
            {policy.features.map((feature: string, index: number) => (
              <li className="capitalize" key={index}>
                {feature}
              </li>
            ))}
          </ul>
          <Button
            className="mb-2 mt-4 bg-[#699BF7] hover:bg-blue-500 sm:mt-5"
            size={"lg"}
          >
            {policy.button}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default Hero;
