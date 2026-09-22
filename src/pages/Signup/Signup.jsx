import axios from "axios"
import { useFormik } from "formik"
import * as yup from 'yup'



import {
  User,
  Mail,
  AtSign,
  Lock,
  Calendar,
  UserRound,
  UserPlus,
  LoaderCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";

export default function Signup() {

  const [isUsernameExist, setUsernameExist] = useState(false)
  const [isEmailExist, setEmailExist] = useState(false)
  const navigate = useNavigate()

//  function validateValue(values){

//   const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/gm;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;
//     const errors = {}

//     if(values.name === ""){
//       errors.name = 'name required'
//     }else if(values.name.length < 3){
//       errors.name = 'name is at least 3'
//     }

//     if(values.username === ""){
//       errors.username = 'username required'
//     }else if(values.username.length < 3){
//       errors.username = 'username is at least 3'
//     }

//     if(values.email === ""){
//       errors.email = 'email required'
//     }else if(! emailRegex.test(values.email)){
//       errors.email = 'email is invalid'
//     }

//      if(values.password === ""){
//       errors.password = 'password required'
//     }else if(! passwordRegex.test(values.password)){
//       errors.password = 'password is invalid, you should use one uppercase letter, one lowercase letter, one number, one special character, and a minimum of 8 characters'
//     }

//     if(values.rePassword === ""){
//       errors.rePassword = 'confirm password is required'
//     }else if(values.rePassword != values.password){
//       errors.rePassword = 'password and confirm password should be the same'
//     }

//      if(values.gender === ""){
//       errors.gender = 'gender is required'
//     }else if(!['male', 'female'].includes(values.gender)){
//       errors.gender = 'gender can be one of the male or female'
//     }

//      if(values.dateOfBirth === ""){
//       errors.dateOfBirth = 'date of birth is required'
//     }


//       return errors
//   }

function handleEmailChange(e){
  setFieldValue('email', e.target.value)
  setEmailExist(false)
}
function handleUsernameChange(e){
  setFieldValue('username', e.target.value)
  setUsernameExist(false)
}

const schema =yup.object({

  name: yup.string().required('name is required')
  .min(3, 'name is at least 3')
  .max(25,'name can not be more than 25 '),

   username: yup.string().required('username is required')
  .min(3, 'username is at least 3')
  .max(25,'username can not be more than 25 '),

  email: yup.string().required('email is required').email('email is invalid'),

  password: yup.string().required('password is required')
  .matches(passwordRegex,'password is invalid, you should use one uppercase letter, one lowercase letter, one number, one special character, and a minimum of 8 characters'),

  rePassword: yup.string().required('confirm password')
  .oneOf([yup.ref('password')], 'password and confirm password should be the same'),

  gender: yup.string().required('gender is required')
  .oneOf(['male','female'], 'gender must be either male or female'),

  dateOfBirth: yup.string().required('date of birth is required')

})

   const {values, handleChange,handleSubmit,handleBlur,errors, touched, setFieldValue, isSubmitting, isValid,dirty} = useFormik({
    initialValues:{
      name:'',
      username:'',
      email:'',
      password:'',
      rePassword:'',
      dateOfBirth:'',
      gender:'',
    },
    // validate: validateValue,
    validationSchema: schema,


    //  onSubmit: async function (values){
    //   console.log("VALUES:", values)
    //   const options = await fetch(`https://route-posts.routemisr.com/users/signup`,{
    //     method: 'POST',
    //     // url: 'https://route-posts.routemisr.com/users/signup',
    //     headers:  {'Content-Type': 'application/json'},
    //     //  data: values,
    //      body: JSON.stringify(values)
    //   })
    onSubmit: async (values)=>{
      console.log("VALUES:", values)
     try{
       const options = {
        method: 'POST',
        url: 'https://route-posts.routemisr.com/users/signup',
        headers:  {'Content-Type': 'application/json'},
         data: values}


      
      const {data} = await axios.request(options)
      console.log('data',data);

      if(data.success){
        toast.success('Acount created')

        setTimeout(()=>{
          navigate('/login')
        },3000)
      }
     }catch(error){
      // console.log('errorrr',error.response.data.message);
      if(error.response.data.message === 'user already exists.'){
        setEmailExist(true)
      }
      if(error.response.data.message === 'username already exists.'){
        setUsernameExist(true)
      }
      
     }
      
   }
  })



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white mb-4">
            <UserPlus size={28} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Create your account
          </h1>

          <p className="text-gray-500 mt-2">
            Join our community and connect with friends
          </p>
        </div>
        {/* <form action="" onSubmit={handleSubmit}> */}
           {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name + Username */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name" >
                  Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={values.name} onChange={handleChange} onBlur={handleBlur} id="name" name="name"
                  />
                 
                </div>
                 {errors.name && touched.name ?(
                    <p className="bg-red-200 rounded-md px-3 mt-1 py-1 text-sm font-medium text-red-800">{errors.name}</p>
                  ):("")}
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">
                  Username
                </label>

                <div className="relative">
                  <AtSign
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={values.username} onChange={handleUsernameChange} onBlur={handleBlur} id="username"
                  />
                 
                </div>
                 {errors.username && touched.username?(
                    <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">{errors.username}</p>
                  ):("")}
                  {
                    isUsernameExist && <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">
                      username already exist</p>
                  }
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email" >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={values.email} onChange={handleEmailChange} onBlur={handleBlur} id="email"
                />
               
              </div>
               {errors.email && touched.email?(
                    <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">{errors.email}</p>
                  ):("")}
                {
                    isEmailExist && <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">
                      email already exist</p>
                  }
            </div>

            {/* Password + Repassword */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password" >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={values.password} onChange={handleChange} onBlur={handleBlur} id="password"
                  />
                  
                </div>
                {errors.password && touched.password?(
                    <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">{errors.password}</p>
                  ):("")}
              </div>

              {/* Repassword */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="rePassword" >
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="password"
                    name="rePassword"
                    placeholder="Confirm password"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={values.rePassword} onChange={handleChange} onBlur={handleBlur} id="rePassword"
                  />
                  
                </div>
                {errors.rePassword && touched.rePassword?(
                    <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">{errors.rePassword}</p>
                  ):("")}
              </div>
            </div>

            {/* Date of Birth + Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="dateOfBirth" >
                  Date of Birth
                </label>

                <div className="relative">
                  <Calendar
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    name="dateOfBirth"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={values.dateOfBirth} onChange={handleChange} onBlur={handleBlur} id="dateOfBirth"
                  />
                  
                </div>
                {errors.dateOfBirth && touched.dateOfBirth ?(
                    <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">{errors.dateOfBirth}</p>
                  ):("")}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="gender" >
                  Gender
                </label>

                <div className="relative">
                  <UserRound
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />

                  <select
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none"
                    value={values.gender} onChange={handleChange} onBlur={handleBlur} id="gender" name="gender"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                </div>
                {errors.gender && touched.gender?(
                    <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">{errors.gender}</p>
                  ):("")}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 accent-blue-600"
              />

              <p className="text-sm text-gray-500 leading-5">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Privacy Policy
                </button>
              </p>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={!(dirty && isValid)}
              className="w-full h-12 rounded-xl text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold transition flex items-center justify-center gap-2 shadow-sm disabled:bg-blue/70 disabled:cursor-not-allowed"
            >
              {/* <UserPlus size={20} /> */}
              {
                isSubmitting? <LoaderCircle className="animate-spin d mx " /> : 'Create Account'
              }
            </button>
          </form>

          {/* Login */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button className="text-blue-600 font-semibold hover:underline">
                <Link to="/login">Login</Link>
                
              </button>
            </p>
          </div>
        </div>
        {/* </form> */}

       
      </div>
    </div>
  );
}
