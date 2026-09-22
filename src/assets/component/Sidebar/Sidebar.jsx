import {
  Home,
  // Bell,
  UserRound,
  // Settings,
  LogOut,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

export default function Sidebar() {
  const { userInfo, setToken, setsetUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const navigation = [
    { label: "Home", to: "/app", icon: Home, end: true },
    // { label: "Notifications", to: "/app/notification", icon: Bell },
    { label: "Profile", to: "/app/profile", icon: UserRound },
    // { label: "Settings", to: "/app/setting", icon: Settings },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setToken(null);
    setsetUserInfo(null);
    navigate("/login");
  }

  return (
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-64 flex-col overflow-y-auto  bg-white text-black m-3 rounded-xl">
      <div className="flex items-center gap-3 px-6 pb-8 pt-7">
        <div className="flex h-10 w-10 rotate-3 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <MessageCircle size={21} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-lg font-bold tracking-tight">Social App</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f9998]">Your circle</p>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black">Explore</p>
        <ul className="space-y-1.5">
          {navigation.map(({ label, to, icon: Icon, end }) => (
            <li key={label}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${isActive ? "bg-blue-600 text-[#f4f1ea] " : "text-[#717b7a] hover:bg-gray-50 hover:text-[#717b7a]"}`}
              >
                <Icon size={19} strokeWidth={2} />
                <span className="flex-1">{label}</span>
                <ChevronRight size={15} className="opacity-0 transition group-hover:opacity-60" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 border-t border-[#717b7a] p-4">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3">
          <div className="flex items-center gap-3">
            {userInfo?.photo ? (
              <img src={userInfo.photo} alt={userInfo.name || "Profile"} className="h-11 w-11 rounded-xl object-cover" />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-[#171a1b]">
                {(userInfo?.name || "U").charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-gray-600">{userInfo?.name || "Your profile"}</p>
              <p className="truncate text-xs text-gray-600">{userInfo?.username ? `@${userInfo.username}` : "Stay connected"}</p>
             </div>
          </div>
          <button type="button" onClick={handleLogout} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#717b7a] px-3 py-2 text-xs font-bold text-[#717b7a] transition hover:border-blue-600 hover:text-blue-600">
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}