
import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router"
// import { useContext } from "react"
// import { UserContext } from "../../assets/component/context/UserContext"
import * as yup from 'yup'


// export default function Login() {
//   const { setToken } = useContext(UserContext)
//   const navigate = useNavigate()

//   const { values, handleChange, handleSubmit, handleBlur } = useFormik({
//     initialValues: { email: '', password: '' },
//     validate: (formValues) => {
//       const errors = {}
//       if (!formValues.email.trim()) errors.email = 'email required'
//       if (!formValues.password) errors.password = 'password required'
//       return errors
//     },
//     onSubmit: async (formValues, { setSubmitting, setStatus }) => {
//       try {
//         const { data } = await axios.post(
//           'https://route-posts.routemisr.com/users/signin',
//           formValues,
//           { headers: { 'Content-Type': 'application/json' } },
//         )
//         const token = data?.token || data?.data?.token
//         if (!token) throw new Error('The login response did not include a token.')

//         localStorage.setItem('token', token)
//         setToken(token)
//         navigate('/app')
//       } catch (error) {
//         setStatus(error.response?.data?.message || error.message)
//       } finally {
//         setSubmitting(false)
//       }
//     },
//   })

//   return (
//     <main className="login-page">
//       <section className="login-form">
//         <p className="form-kicker">welcome back</p>
//         <h1>Log in to your account</h1>
//         <p className="form-copy">Stay close to the people and moments that matter.</p>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email">email</label>
//             <input type="email" id="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
//           </div>
//           <div>
//             <label htmlFor="password">password</label>
//             <input type="password" id="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
//           </div>
//           <button type="submit">log in</button>
//         </form>
//         <p className="form-footer">New here? <Link to="/signup">Create an account</Link></p>
//       </section>
//       <section className="login-hero" aria-label="A warm social connection">
//         <span>your people, your space</span>
//       </section>
//     </main>
//   )
// }


import { Mail, Lock, LogIn, LoaderCircle } from "lucide-react";
import { toast } from "sonner"
import { useContext, useState } from "react";
import { UserContext } from "../../assets/component/context/UserContext";

export default function Login() {

  const {setToken} = useContext(UserContext)
  const [wrongPassword, setHasWrongPassword] = useState(false)

  //  const { setToken } = useContext(UserContext)
  const navigate = useNavigate()
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;


  // const { values, handleChange, handleSubmit, handleBlur } = useFormik({
  //   initialValues: { email: '', password: '' },
  //   validate: (formValues) => {
  //     const errors = {}
  //     if (!formValues.email.trim()) errors.email = 'email required'
  //     if (!formValues.password) errors.password = 'password required'
  //     return errors
  //   },
  //   onSubmit: async (formValues, { setSubmitting, setStatus }) => {
  //     try {
  //       const { data } = await axios.post(
  //         'https://route-posts.routemisr.com/users/signin',
  //         formValues,
  //         { headers: { 'Content-Type': 'application/json' } },
  //       )
  //       const token = data?.token || data?.data?.token
  //       if (!token) throw new Error('The login response did not include a token.')

  //       localStorage.setItem('token', token)
  //       setToken(token)
  //       navigate('/app')
  //     } catch (error) {
  //       setStatus(error.response?.data?.message || error.message)
  //     } finally {
  //       setSubmitting(false)
  //     }
  //   },
  // })


 

const schema =yup.object({

  email: yup.string().required('email is required').email('email is invalid'),

  password: yup.string().required('password is required')
  .matches(passwordRegex,'password is invalid, you should use one uppercase letter, one lowercase letter, one number, one special character, and a minimum of 8 characters')

})

   const formik = useFormik({
    initialValues:{
     
      email:'',
      password:'',
     
    },
    validationSchema: schema,


    onSubmit: async (values)=>{
      console.log("VALUES:", values)
     try{
       const options = {
        method: 'POST',
        url: 'https://route-posts.routemisr.com/users/signin',
        headers:  {'Content-Type': 'application/json'},
         data: values}


      
      const {data} = await axios.request(options)
      console.log('data',data);

      if(data.success){
        toast.success('user logged in successfully')
        const token = data.data.token
        setToken(token)
        localStorage.setItem('token',token)

        setTimeout(()=>{
          navigate('/app/')
        },3000)
      }
     }catch(error){
      // console.log('errorrr',error.response.data.message);
      if(error.response.data.message === 'incorrect email or password'){
        setHasWrongPassword(true)
      }
     
      
     }
      
   }
  })



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-5">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white mb-4">
            <LogIn size={28} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your account and continue connecting
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <form className="space-y-5" onSubmit={formik.handleSubmit}>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"  htmlFor="email">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400"
                   id="email" name="email" value={formik.values.email} 
                   onChange={(e)=>{formik.handleChange(e); setHasWrongPassword(false)}} onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.email && formik.touched.email?(
                    <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">{formik.errors.email}</p>
                  ):("")}
                
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700"  htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400"
                   id="password" name="password" value={formik.values.password} 
                   onChange={(e)=>{formik.handleChange(e); setHasWrongPassword(false)}} onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.password && formik.touched.password?(
                    <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">{formik.errors.password}</p>
                  ):("")}
                  {
                    wrongPassword && <p className="bg-red-200 rounded-md px-3 py-1 mt-1 text-sm font-medium text-red-800">
                      incorrect email or password</p>
                  }
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600 rounded"
              />

              <span className="text-sm text-gray-500">
                Remember me
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={!(formik.dirty && formik.isValid)}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition flex items-center justify-center gap-2 shadow-sm text-center disabled:bg-blue/70 disabled:cursor-not-allowed"
            >
               {
                formik.isSubmitting? <LoaderCircle className="animate-spin d mx " /> 
                : 'Login'
              }
              
            </button>
          </form>

          {/* Signup */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button className="text-blue-600 font-semibold hover:underline">
                <Link to="/signup">Create Account</Link>
                
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}