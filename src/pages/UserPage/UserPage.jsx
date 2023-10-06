import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from '../../components/Loader/Loader';
import PostCard from '../../components/PostCard/PostCard';
import * as postsAPI from '../../utilities/posts-api';
import * as usersAPI from '../../utilities/users-api';

export default function UserPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({name: '', initial: ''});

  useEffect( () => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const result = await postsAPI.getUser(id);
  
        // User has no posts, so fetch user
        if (result.length === 0) {
          const responseUser = await usersAPI.checkUser(id);

          if (responseUser.ok) {
            const resultUser = await responseUser.json();
            setUser({name: resultUser.name, initial: resultUser.name.charAt(0).toUpperCase()})
            setLoading(false);
            return
          }

        } else {
          setUser({name: result[0].name, initial: result[0].name.charAt(0).toUpperCase()})
          setAllPosts(result.reverse());
          setLoading(false);
        }

      } catch (err) {
        console.error(err);
      }
    }
    
    fetchPosts();
  }, [id]);

    return (
      <div className="w-2/3 mx-auto mt-10 xs-width">
        <div className="mt-5 flex flex-col justify-center items-center gap-2 bg-gray-500 rounded-lg py-10 bg-animate relative h-48 mb-40">
          <div className="flex flex-col items-center gap-8 justify-center absolute top-24">
              <div className="w-36 h-36 rounded-full object-cover bg-white flex justify-center items-center text-black text-7xl font-bold hover:scale-110 duration-300"><span className="text-animate">{user.initial}</span></div>
              <p className="text-white font-bold text-3xl">{user.name}</p>
          </div>
        </div>
        <div>
          {loading ? 
            <Loader /> 
          :
          <>
            {allPosts.length === 0 ? 
            <div className="text-white text-xl mb-10"><span className="font-bold">{user.name}</span> has no posts yet.</div>
            :
            <>
              <p className="text-white text-xl mb-10">View all of <span className="font-bold">{user.name}</span>'s artwork here.</p>
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                  {allPosts.map( (post) => <PostCard key={post._id} post={post} />)}
              </div>
            </>
            }
            <div className="h-16 mt-20"></div>
            
          </>
          }
        </div>
      </div>
    );
  }