import Hero from "@/components/home/hero";
import Sidebar from "@/components/home/sidebar";

export default function Home() {
  return (
    <main className="container mx-auto max-w-[1440px] px-4">
      <div className="mt-[30px] flex">
        <Sidebar />
        <Hero />
      </div>
    </main>
  );
}
