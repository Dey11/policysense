import { Button } from "../ui/button";
import { Menu, Plus } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="fixed flex h-[92dvh] w-full max-w-[330px] flex-col rounded-lg bg-white">
      <Button className="mx-2 mb-10 mt-5 gap-x-1" variant={"outline"}>
        <Plus className="h-5 w-5 text-gray-400" />
        New Chat
      </Button>

      {/* <div className="mx-6 p-2 mb-5">
        <h3>On Insurance Details Bot</h3>
        <ul className="list-disc text-gray-400 text-sm mx-4">
          <li>More about car annual protection</li>
          <li>Old age premium secure plan</li>
        </ul>
      </div> */}

      <div className="absolute bottom-5 mx-6 flex items-center justify-between rounded-lg p-2">
        <div className="flex w-[240px] items-center gap-x-2">
          <div className="h-9 w-9 rounded-full bg-black"></div>
          <h2 className="text-sm font-semibold text-[#3A3A40]">
            Joseph Morgan Duo
          </h2>
        </div>
        <Menu className="h-6 w-6 text-gray-400" />
      </div>
      {/* <div className="mx-6 bottom-5 absolute p-2 rounded-lg">
        <Button className="w-[265px] h-[40px] rounded-lg bg-black text-white">
          Login
        </Button>
      </div> */}
    </div>
  );
};

export default Sidebar;
