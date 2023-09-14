import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as usersService from '../../utilities/users-service';
import ShowCard from "../../components/ShowCard/ShowCard";

export default function ShowPostPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [AIDescription, setAIDescription] = useState("Curious to see what AI knows about this image? Click 'AI Interpret' to get started.")

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

  async function handleInterpret() {
    setAIDescription('Generating, please wait...')
    try {
      const token = usersService.getToken();
      const response = await fetch(`/api/posts/interpret/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAIDescription(result.content);
      }

    } catch (err) {
      setAIDescription('Error while generating. Please try again.')
      console.error(err);
    }
  }

  return (
    <div className="w-2/3 mx-auto mt-10">
      <div>
        <p className="w-fit mb-5 bg-gray-600 rounded-lg py-1 px-2 text-white hover:cursor-pointer font-bold hover:bg-opacity-80 duration-300" onClick={handleReturn}>⏎ Home</p>
        <h1 className="text-white text-4xl font-bold">View Artwork</h1>
          {post && <ShowCard key={post._id} post={post} />}
      </div>

      <div className="w-full border-b border-white my-10"></div>

      <div className="flex flex-col items-center px-10">
        <div className="flex justify-center items-center rounded-lg py-4 px-4 bg-gray-700 w-44 hover:cursor-pointer transition ease-in-out hover:scale-105 hover:bg-gray-600 duration-200" onClick={handleInterpret}>
          <box-icon name='message-alt-edit' type='solid' animation='tada' color='#ffffff' ></box-icon>
          <p className="text-white text-lg font-bold ml-2 mr-1">AI Interpret</p>
        </div>

        <div className="w-2/3 min-h-full h-full py-4 px-4 mt-10 mb-20 rounded-xl bg-[#1c1c1c] text-gray-200 border border-white border-1 border-opacity-30">
        {AIDescription}
        </div>
      </div>

    </div>
  );
}