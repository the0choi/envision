import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as usersService from '../../utilities/users-service';
import ShowCard from "../../components/ShowCard/ShowCard";

export default function ShowPostPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);

  async function fetchPost() {
    try {
      const token = usersService.getToken();
      const response = await fetch(`/api/posts/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setPost(result);
      }

    } catch (err) {
      console.error(err);
    }
  }

  useEffect( () => {
    fetchPost();
  }, []);

  function handleReturn() {
    navigate(`/`);
  }

  return (
    <div className="w-2/3 mx-auto mt-10">
        <div>
          <h1 className="text-white text-blue-500 hover:cursor-pointer font-bold mb-5" onClick={handleReturn}>⏎ Return</h1>
          <h1 className="text-white text-4xl font-bold">View Artwork</h1>
            {post && <ShowCard key={post._id} post={post} />}
        </div>


    </div>
  );
}