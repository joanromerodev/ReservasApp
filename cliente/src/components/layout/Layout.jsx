import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main className="min-h-dvh flex">
      <SideBar />
      <div className="flex flex-col w-full bg-[#f5f5f9] space-y-6 pb-5">
        <TopBar />
        <div className="px-5 lg:px-10 w-full h-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default Layout;
