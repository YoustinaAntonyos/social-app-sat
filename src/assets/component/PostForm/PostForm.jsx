import { useFormik } from "formik";
import {
//   Image,
//   Smile,
  Globe,
  X,
  Send,
//   User,
//   Plus,
  Upload,
} from "lucide-react";
import { useContext, useState } from "react";
import * as yup from 'yup'
import { UserContext } from "../context/UserContext";
// import { data } from "react-router";
import axios from "axios";
import { toast } from "sonner";

export default function PostForm() {

    const {token} = useContext(UserContext)
    const [previewImageURL, setPreviewImageURL] = useState(null)
     const { userInfo } = useContext(UserContext)
  const [profilePhoto, setProfilePhoto] = useState(null);

    const schema = yup.object({
        body: yup.string().min(10, 'caption must be at least 10 characters'),
        image: yup.mixed().nullable()
        .test('fileSize', 'image can not exceed 5 MB', (file)=>{
            if(! file || file.size > 5 * 1024 * 1024){
                return false;
            }
             return true;
        })
        .test('fileType', 'you must upload an image', (file)=>{
            if(! file || !['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)){
                return false;
            }
            return true;
        }),
    });

    const formik = useFormik({
        initialValues:{
            body: '',
            image: null
        },

        validationSchema : schema,

        onSubmit: async (values, {resetForm})=>{
            console.log(values);
            try{
                const myFormDate = new FormData()
                myFormDate.append('body', values.body)
                myFormDate.append('image', values.image)

                const config = {
                    url: 'https://route-posts.routemisr.com/posts',
                    method: 'POST',
                    headers:{
                        authorization: `Bearer ${token}`
                    },
                    data: myFormDate
                }
                const {data} = await axios.request(config)
                if(data.success){
                    toast.success(data.message, 
                        {richColors: true,
                            position: 'bottom-right'

                        });
                    resetForm()
                    setPreviewImageURL(null)
                }
                
      

            } catch(error){
                console.log(error);
                
            }

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
            
        }

    })


  return (
    <div className="w-full max-w-xl mx-auto py-8">
        <form onSubmit={formik.handleSubmit}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* ================= Header ================= */}
        <div className="flex items-center gap-3 p-5">

          {/* Profile Image */}
          <img
            src={profilePhoto || userInfo.photo}
            alt={userInfo.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100"
          />

          <div>
            <h3 className="font-semibold text-gray-900">
              Tina
            </h3>

            <button
              type="button"
              className="flex items-center gap-1 mt-0.5 text-xs text-gray-500 hover:text-blue-600 transition"
            >
              <Globe size={12} />
              Public
            </button>
          </div>
        </div>

        {/* ================= Caption ================= */}
        <div className="px-5">

          <textarea
            placeholder="What's on your mind"
            value={formik.values.body}
            name="body"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows="4"
            className="w-full resize-none border-0 outline-none text-gray-800 text-lg placeholder:text-gray-400 leading-7"
          />

        </div>

        {/* ================= Image Preview ================= */}

       {
        previewImageURL && (
             <div className="px-5 pb-4">

          <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">

            <img
              src={previewImageURL}
              alt="Preview"
              className="w-full max-h-[400px] object-cover"
            />

            {/* Remove Image */}
            <button
              type="button"
              onClick={()=>{
                setPreviewImageURL(null)
                formik.setFieldValue('image', null)
              }}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition"
            >
              <X size={18} />
            </button>

          </div>

        </div>
        )
       }

        {/* ================= Add To Post ================= */}
       
       {
        ! previewImageURL &&(
             <div className="px-5 pb-4">

          <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">

            <span className="text-sm font-semibold text-gray-700">
              Add to your post
            </span>

            <div className="flex items-center gap-1">

            <label for="uploadImageID" className=" cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-50 transition"><Upload /></label>
              {/* Photo */}
              <input
              style={{display:"none",visibility:"none"}}
              id="uploadImageID"
                type="file"
                name="image"
                title="Add photo"
                accept="image/*"
                // value={formik.values.image}
                onChange={(e)=>{
                    const image = e.target.files[0] 
                    formik.setFieldValue('image', image)
                    const imageURL = URL.createObjectURL(image)
                    setPreviewImageURL(imageURL)
                }}
                onBlur={formik.handleBlur}
                className="w-10 h-10 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-50 transition"
              >
                {/* <Image size={21} /> */}
              </input>

              {/* Emoji */}
              {/* <button
                type="button"
                title="Add emoji"
                className="w-10 h-10 rounded-full flex items-center justify-center text-yellow-500 hover:bg-yellow-50 transition"
              >
                <Smile size={21} />
              </button> */}

              {/* Add */}
              {/* <button
                type="button"
                title="More options"
                className="w-10 h-10 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-50 transition"
              >
                <Plus size={21} />
              </button> */}

            </div>

          </div>

        </div>
        )
       }

       <div className="p-2 space-y-2">
        {
        formik.errors.body && formik.touched.body ? (
            <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">{formik.errors.body}</p>
        ): ("")
       }
       {
        formik.errors.image && formik.touched.image ? (
            <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">{formik.errors.image}</p>
        ): ("")
       }
       </div>


        {/* ================= Post Button ================= */}
        <div className="px-5 pb-5">

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition shadow-sm"
          >
            <Send size={18} />
            Post
          </button>

        </div>

      </div>
        </form>

      {/* Main Card */}
      

    </div>
  );
}