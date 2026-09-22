import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from '../../assets/component/context/UserContext'
import PostCard from "../../assets/component/PostCard/PostCard";
import PostForm from "../../assets/component/PostForm/PostForm";


export default function Home() {

  const {token} = useContext(UserContext);
  const [posts, setPosts] = useState(null)
  console.log(token);
  

    useEffect(()=>{
      async function getHomeFeed(){
        const config = {
          url: 'https://route-posts.routemisr.com/posts/feed?only=following&limit=10',
          method: 'GET',
          headers:{ authorization: `Bearer ${token}` },
        };
        const {data} = await axios.request(config);
        console.log('post',data.data.posts);
        setPosts(data.data.posts)
      }

      getHomeFeed()
    }, [token])

  return (
    <>
   {/* <div>homee</div> */}
   {/* <PostCard /> */}
   <PostForm />
   {
    posts ? posts.map((post)=> <PostCard postDetails={post} />): <h2 className="text-center">Loading</h2>
   }
    </>
  )
}
