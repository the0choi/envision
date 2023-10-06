import { useNavigate } from "react-router-dom";
import * as postsAPI from '../../utilities/posts-api';
import * as usersService from '../../utilities/users-service';

export default function PostCard(props) {
  const navigate = useNavigate();
  const capitalLetter = props.post.name.charAt(0).toUpperCase() || "";

  // Format date into DD/MM/YYYY 
  const dateStr = new Date(props.post.createdAt);
  const day = dateStr.getDate().toString().padStart(2, '0');
  const month = (dateStr.getMonth() + 1).toString().padStart(2, '0');
  const year = dateStr.getFullYear();
  const readableDate = `${day}/${month}/${year}`;

  const user = usersService.getUser();
  const isUsersPost = (user._id === props.post.user) ? true : false;

  async function handleDelete(evt) {
    evt.preventDefault();

      try {
        const response = await postsAPI.deletePost(props.post._id);
        navigate('/');

      } catch (err) {
        console.error(err);
      }
  }

  function showUser() {
    navigate(`/users/${props.post.user}`);
  }

  return (
    <div className="flex xs-flex justify-center items-center mt-10 pl-10">
      <img className="h-fit w-auto object-cover rounded-xl transition ease-in-out hover:scale-105 hover:z-10 duration-300" src={props.post.photo} alt={props.post.prompt} draggable="false" />
      <div className="mt-5 flex flex-col justify-center gap-2 p-16">
        <box-icon name='message-detail' type='solid' color='#ffffff'></box-icon>
        <h1 className="text-white text-3xl font-bold mt-5">"{props.post.prompt}"</h1>
        <h1 className="text-white text-xl mt-5 mb-5">{readableDate}</h1>
        <div className="">
          <div className="flex items-center rounded-lg py-2 px-4 bg-animate w-36 hover:cursor-pointer transition ease-in-out hover:scale-105 duration-200" onClick={showUser}>
            <div className="w-10 h-10 rounded-full object-cover bg-gray-800 flex justify-center items-center text-white font-bold mx-2">{capitalLetter}</div>
            <p className="text-white text-lg font-bold">{props.post.name}</p>
          </div>
            
        </div>
        {isUsersPost &&
          <button className="text-white font-bold p-2 rounded-lg bg-red-600 w-24 mt-16  hover:bg-opacity-80 duration-300" onClick={handleDelete}>Delete</button>
        }
      </div>
      
    </div>
  );
}