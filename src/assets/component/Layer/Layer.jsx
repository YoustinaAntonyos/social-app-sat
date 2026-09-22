import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";

export default function Layer() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="ml-64 flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
