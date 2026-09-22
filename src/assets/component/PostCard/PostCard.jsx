import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Check,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Globe,
  Send,
} from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "sonner";

export default function PostCard({postDetails}) {

    const {sharesCount, commentsCount, id, image, body, likesCount, user, privacy} = postDetails;
    const {token, userInfo} = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBody, setEditedBody] = useState(body);
    const [displayBody, setDisplayBody] = useState(body);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);
    const isOwner = userInfo?.id === user?.id || userInfo?._id === user?._id;

    async function requestPostAction(method, url, data) {
      return axios.request({
        url,
        method,
        headers: {
          authorization: `Bearer ${token}`
        },
        data
      });
    }

    async function handlePostLike(){
      try{

        const config ={
          url: `https://route-posts.routemisr.com/posts/${id}/like`,
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`
          }
        }
        const {data}= await axios.request(config)
        console.log(data);
        

      } catch(error){
        console.log(error);
        
      }
    }

    async function handleBookmark() {
      setIsBusy(true);
      try {
        await requestPostAction("POST", `https://route-posts.routemisr.com/posts/${id}/bookmark`);
        setIsBookmarked(true);
        setIsMenuOpen(false);
        toast.success("Post bookmarked");
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not bookmark this post");
      } finally {
        setIsBusy(false);
      }
    }

    async function handleUpdate() {
      if (!editedBody.trim()) {
        toast.error("Post content cannot be empty");
        return;
      }

      setIsBusy(true);
      try {
        await requestPostAction("PUT", `https://route-posts.routemisr.com/posts/${id}`, {
          body: editedBody.trim()
        });
        setDisplayBody(editedBody.trim());
        setIsEditing(false);
        setIsMenuOpen(false);
        toast.success("Post updated");
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not update this post");
      } finally {
        setIsBusy(false);
      }
    }

    async function handleDelete() {
      if (!window.confirm("Delete this post?")) return;

      setIsBusy(true);
      try {
        await requestPostAction("DELETE", `https://route-posts.routemisr.com/posts/${id}`);
        setIsRemoved(true);
        toast.success("Post deleted");
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not delete this post");
      } finally {
        setIsBusy(false);
      }
    }

    if (isRemoved) return null;

   
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-xl mx-auto">

        {/* Post Card */}
        <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* ================= Header ================= */}
          <div className="relative flex items-center justify-between p-5">

            <div className="flex items-center gap-3">

              {/* Profile Image */}
              <img
                src={user.photo}
                alt="mahmoud"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
              />

              {/* User Information */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">
                    {user.name}
                  </h3>

                  <span className="text-gray-400 text-sm">
                    •
                  </span>

                  <span className="text-sm text-gray-500">
                    @{user.username}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                  <span>Sep 20, 2026</span>
                  <span>•</span>
                  <Globe size={12} />
                  <span>{privacy}</span>
                </div>
              </div>
            </div>

            {/* More Button */}
            <button
              type="button"
              aria-label="Post actions"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition"
            >
              <MoreHorizontal size={21} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-5 top-16 z-10 w-48 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg">
                <button
                  type="button"
                  onClick={handleBookmark}
                  disabled={isBusy || isBookmarked}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-yellow-50 hover:text-yellow-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Bookmark size={17} fill={isBookmarked ? "currentColor" : "none"} />
                  {isBookmarked ? "Bookmarked" : "Bookmark post"}
                </button>

                {isOwner && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setEditedBody(displayBody);
                        setIsEditing(true);
                        setIsMenuOpen(false);
                      }}
                      disabled={isBusy}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50"
                    >
                      <Pencil size={17} />
                      Update post
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={isBusy}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={17} />
                      Delete post
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* ================= Post Content ================= */}
          <div className="px-5 pb-5">
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editedBody}
                  onChange={(event) => setEditedBody(event.target.value)}
                  rows={4}
                  autoFocus
                  className="w-full resize-none rounded-xl border border-blue-200 p-3 text-[15px] leading-7 text-gray-800 outline-none focus:ring-2 focus:ring-blue-100"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    disabled={isBusy}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={isBusy}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Check size={16} />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[15px] leading-7 text-gray-800">
                {displayBody}
              </p>
            )}
          </div>

          {/* ================= Post Image ================= */}
          {image && 
          (<div className="w-full bg-gray-100">
            <img
              src={image}
              alt="Post"
              className="w-full max-h-[650px] object-cover"
            />
          </div>)}

          {/* ================= Statistics ================= */}
          <div className="px-5 py-3">

            <div className="flex items-center justify-between text-sm text-gray-500">

              <div className="flex items-center gap-1">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white">
                  <Heart size={11} fill="currentColor" />
                </div>
                
                <span>{likesCount} Likes</span>
              </div>

              <div className="flex items-center gap-4">
                <span>{commentsCount} Comments</span>
                <span>{sharesCount} Shares</span>
              </div>

            </div>
          </div>

          {/* ================= Actions ================= */}
          <div className="px-4 border-t border-gray-100">

            <div className="grid grid-cols-4 gap-1 py-2">

              {/* Like */}
              <button
                type="button"
                onClick={handlePostLike}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 transition"
              >
                <Heart size={20} />
                <span className="text-sm font-medium">
                  Like
                </span>
              </button>

              {/* Comment */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <MessageCircle size={20} />
                <span className="text-sm font-medium">
                  Comment
                </span>
              </button>

              {/* Share */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
              >
                <Share2 size={20} />
                <span className="text-sm font-medium">
                  Share
                </span>
              </button>

              {/* Bookmark */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 transition"
              >
                <Bookmark size={20} />
                <span className="text-sm font-medium">
                  Save
                </span>
              </button>

            </div>
          </div>

          {/* ================= Comment Section ================= */}
          <div className="border-t border-gray-100 p-5">

            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Comments
            </h4>

            {/* Empty Comments */}
            <div className="text-center py-5">

              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                <MessageCircle
                  size={22}
                  className="text-gray-400"
                />
              </div>

              <p className="text-sm font-medium text-gray-600">
                No comments yet
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Be the first to comment on this post
              </p>

            </div>

            {/* Comment Input */}
            <div className="flex items-center gap-3 mt-3">

              <img
                src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                alt="Your profile"
                className="w-9 h-9 rounded-full object-cover"
              />

              <div className="flex-1 relative">

                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full h-10 rounded-full border border-gray-200 bg-gray-50 px-4 pr-11 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />

                <button
                  type="button"
                  className="absolute right-1 top-1 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
                >
                  <Send size={16} />
                </button>

              </div>

            </div>
          </div>

        </article>

      </div>
    </div>
  );
}