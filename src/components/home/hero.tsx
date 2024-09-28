import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="ml-[330px] w-full text-center">
      <div className="pt-3">
        <h1 className="flex justify-center text-[40px] font-semibold tracking-tight text-blue-500">
          <div className="flex items-center gap-x-2">
            <Image src="/image.png" alt="Insurance" width={40} height={40} />
            PolicySense
          </div>
        </h1>
        <p className="pt-2 text-[#999999]">
          A one stop platform for all your insurance needs.
        </p>
      </div>

      <div className="mx-[170px]">
        <h1 className="bg-gradient-to-b from-[#437AE069] to-[#699BF72F] bg-clip-text pt-10 text-[40px] font-semibold capitalize tracking-tight text-transparent">
          Manage, verify and update all your financial policies with ease
        </h1>
      </div>

      <div className="flex justify-center gap-x-10 pt-10">
        {PolicyObject.map((policy: any, index: number) => (
          <PolicyCard key={index} policy={policy} />
        ))}
      </div>

      <p className="py-4 text-sm font-semibold text-gray-500/50">
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
      "Quickly access and manage all your financial policies in one place.",
    features: [
      "Access all your financial policies",
      "Download and view documents",
      "Get real time updates",
      "Quickly compare policy details",
    ],
    button: "Get Started",
  },
  {
    name: "VerifyDocs",
    description:
      "Instantly verify the authenticity and accuracy of your policy documents.",
    features: [
      "Instantly upload Policy Docs",
      "Ensure Document Authenticity",
      "Receive Notifications via SMS",
      "Track Document Status",
    ],
    button: "Get Started",
  },
  {
    name: "PolicyForm",
    description:
      "Easily update, submit, and track your financial policy forms.",
    features: [
      "Update Key Policy Details",
      "Update Key Policy Details",
      "AI powered forms",
      "Access Pre-Filled Forms",
    ],
    button: "Get Started",
  },
];

const PolicyCard = ({ policy }: { policy: any }) => {
  return (
    <div className="flex w-[290px] flex-col items-center justify-center gap-y-3 rounded-xl bg-white p-6 shadow-sm">
      <h1 className="bg-gradient-to-b from-[#699BF7] to-[#3E5B91] bg-clip-text text-center text-[20px] font-semibold tracking-tight text-transparent">
        {policy.name}
      </h1>
      <p className="pb-1 text-center text-xs text-[#999999]">
        {policy.description}
      </p>
      <div className="w-full rounded-xl border-t-2 py-2 text-sm shadow-lg">
        <p className="mb-3 py-4 text-xs font-semibold text-[#93949D]">
          About this bot
        </p>
        <ul className="mx-6 flex flex-col gap-y-[12px] text-left text-xs text-[#999999]">
          {policy.features.map((feature: string, index: number) => (
            <li className="capitalize" key={index}>
              {feature}
            </li>
          ))}
        </ul>
        <Button
          className="mb-2 mt-5 bg-[#699BF7] hover:bg-blue-500"
          size={"lg"}
        >
          {policy.button}
        </Button>
      </div>
    </div>
  );
};

export default Hero;
