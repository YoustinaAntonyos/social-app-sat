
import {
  Camera,
  CalendarDays,
  Mail,
  // MapPin,
  MoreHorizontal,
  UserPlus,
  Settings,
  Bookmark,
  Users,
  UserRound,
  Image as ImageIcon,
  Cake,
  AtSign,
} from "lucide-react";
import { useState, useContext } from "react";
import { UserContext } from "../../assets/component/context/UserContext";

export default function Profile() {


  const { userInfo } = useContext(UserContext)
  const [profilePhoto, setProfilePhoto] = useState(null);
  // const profile = '../../assets/animie_avatar.webp';


  async function uploadPhoto(file) {
    if (!file) return;

    const formData = new FormData();

    formData.append("photo", file);

    try {
      const response = await fetch(
        "https://route-posts.routemisr.com/users/upload-photo",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Upload response:", data);

      if (response.ok) {
        setProfilePhoto(data.user?.photo || data.data?.user?.photo);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log("Upload error:", error);
    }
  }

  if (!userInfo) {
    return;
  }


  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* ================= Cover Section ================= */}
      <div className="relative">

        {/* Cover */}
        <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 relative overflow-hidden">

          {/* Decorative Background */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_25%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.12),transparent_25%)]" />

          {/* Cover Actions */}
          <div className="absolute top-5 right-5 flex items-center gap-2">

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/25 transition"
            >
              <Camera size={18} />
              <span className="hidden sm:block">Edit Cover</span>
            </button>

            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition"
            >
              <MoreHorizontal size={20} />
            </button>

          </div>
        </div>

        {/* ================= Profile Header ================= */}
        <div className="bg-white border-b border-gray-200">

          <div className="max-w-6xl mx-auto px-5">

            <div className="relative mt-5 flex flex-col sm:flex-row sm:items-end gap-5 pb-6">

              {/* Profile Image */}
              <div className="-mt-16 sm:-mt-20 relative">

                <div className="p-1.5 bg-white rounded-full shadow-lg inline-block">
                  <div className="-mt-16 sm:-mt-20 relative">

                    <div className="p-1.5 bg-white rounded-full shadow-lg inline-block">
                      <label className="cursor-pointer block">
                        <img
                          src={profilePhoto || userInfo.photo}
                          alt={userInfo.name}
                          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border border-gray-100"
                        />

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];

                            if (file) {
                              uploadPhoto(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <span className="absolute bottom-5 right-5 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />

                    <label className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer hover:bg-blue-700 transition shadow-md">
                      <Camera size={18} />

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];

                          if (file) {
                            uploadPhoto(file);
                          }
                        }}
                      />
                    </label>

                  </div>
                </div>

                {/* Online Indicator */}
                <span className="absolute bottom-5 right-5 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />

              </div>

              {/* User Info */}
              <div className="flex-1 pb-1">

                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {userInfo.name}
                  </h1>

                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                    Active
                  </span>

                </div>

                <p className="text-gray-500 mt-1">
                  @{userInfo.username}
                </p>

              </div>

              {/* Profile Actions */}
              <div className="flex items-center gap-2">

                <button
                  type="button"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition shadow-sm"
                >
                  <UserPlus size={18} />
                  Follow
                </button>

                <button
                  type="button"
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                >
                  <Settings size={19} />
                </button>

              </div>

            </div>

            {/* ================= Stats ================= */}
            <div className="border-t border-gray-100 py-4">

              <div className="flex items-center justify-center justify-content-evenly gap-8 sm:gap-12">

                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">
                    0
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Followers
                  </p>
                </div>

                <div className="w-px h-8 bg-gray-200" />

                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">
                    3
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Following
                  </p>
                </div>

                <div className="w-px h-8 bg-gray-200" />

                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">
                    0
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Saved
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ================= Main Content ================= */}
      <main className="max-w-6xl mx-auto px-5 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

          {/* ================= Sidebar ================= */}
          <aside className="space-y-5">

            {/* About Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">

              <h2 className="text-lg font-bold text-gray-900 mb-5">
                About
              </h2>

              <div className="space-y-4">

                {/* Username */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <AtSign
                      size={18}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Username
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      @{userInfo.username}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                    <Mail
                      size={18}
                      className="text-violet-600"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">
                      Email
                    </p>
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {userInfo.email}
                    </p>
                  </div>
                </div>

                {/* Birthday */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-50 flex items-center justify-center">
                    <Cake
                      size={18}
                      className="text-pink-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Date of Birth
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(userInfo.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <UserRound
                      size={18}
                      className="text-emerald-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Gender
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {userInfo.gender}
                    </p>
                  </div>
                </div>

                {/* Joined */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                    <CalendarDays
                      size={18}
                      className="text-orange-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Joined
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(userInfo.createdAt).toDateString()}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Connections Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">

              <div className="flex items-center justify-between mb-5">

                <h2 className="text-lg font-bold text-gray-900">
                  Connections
                </h2>

                <Users
                  size={20}
                  className="text-gray-400"
                />

              </div>

              <div className="space-y-4">

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Users
                        size={19}
                        className="text-blue-600"
                      />
                    </div>

                    <span className="text-sm text-gray-600">
                      Followers
                    </span>
                  </div>

                  <span className="font-bold text-gray-900">
                    {userInfo.followersCount}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                      <UserPlus
                        size={19}
                        className="text-violet-600"
                      />
                    </div>

                    <span className="text-sm text-gray-600">
                      Following
                    </span>
                  </div>

                  <span className="font-bold text-gray-900">
                    {userInfo.followingCount}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Bookmark
                        size={19}
                        className="text-amber-600"
                      />
                    </div>

                    <span className="text-sm text-gray-600">
                      Saved Posts
                    </span>
                  </div>

                  <span className="font-bold text-gray-900">
                    {userInfo.bookmarksCount}
                  </span>
                </div>

              </div>
            </div>

          </aside>

          {/* ================= Posts Section ================= */}
          <section>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

              <div className="flex items-center border-b border-gray-100">

                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold text-blue-600 border-b-2 border-blue-600"
                >
                  <ImageIcon size={18} />
                  Posts
                </button>

                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium text-gray-500 hover:text-gray-800 transition"
                >
                  <Bookmark size={18} />
                  Saved
                </button>

              </div>

              {/* Empty Posts State */}
              <div className="flex flex-col items-center justify-center py-20 px-6">

                <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-5">
                  <ImageIcon
                    size={34}
                    className="text-blue-500"
                  />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  No posts yet
                </h3>

                {/* <p className="text-sm text-gray-500 text-center max-w-sm mt-2 leading-6">
                  Tina hasn't shared anything yet. Posts will appear
                  here when they start sharing with the community.
                </p> */}

                <button
                  type="button"
                  className="mt-6 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Create a Post
                </button>

              </div>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}