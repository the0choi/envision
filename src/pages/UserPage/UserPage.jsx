import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as usersService from '../../utilities/users-service';
import Loader from '../../components/Loader/Loader';
import PostCard from '../../components/PostCard/PostCard';

export default function UserPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({name: '', initial: ''});

  async function fetchPosts() {
    setLoading(true);
    try {
      const token = usersService.getToken();
      const response = await fetch(`/api/posts/user/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setUser({name: result[0].name, initial: result[0].name.charAt(0).toUpperCase()})
        setAllPosts(result.reverse());
        setLoading(false);
      }

    } catch (err) {
      console.error(err);
    }
  }

  useEffect( () => {
    fetchPosts();
  }, [id]);

    return (
      <div className="w-2/3 mx-auto mt-10">

        <div className="mt-5 flex flex-col justify-center items-center gap-2 bg-gray-500 rounded-lg py-10 bg-animate">
          <div className="flex items-center gap-8 justify-center">
              <div className="w-20 h-20 rounded-full object-cover bg-[rgb(16,16,16)] flex justify-center items-center text-white text-5xl font-bold">{user.initial}</div>
              <p className="text-white font-bold text-5xl">{user.name}</p>
          </div>
        </div>
        <p className="text-white text-xl my-10">View all of <span className="font-bold">{user.name}</span>'s artwork here.</p>
        <div>
          {loading ? 
            <Loader /> 
          :
          <>
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {allPosts.map( (post) => <PostCard key={post._id} post={post} />)}
            </div>
          </>
          }
        </div>
      </div>
    );
  }