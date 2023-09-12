import { useNavigate } from "react-router-dom";

export default function PostCard(props) {
  const navigate = useNavigate();
  const capitalLetter = props.post.name.charAt(0).toUpperCase() || "";

  function showPost() {
    navigate(`/posts/${props.post._id}`);
  }

  return (
    <div className="rounded-xl group relative hover:shadow-card hover:cursor-pointer card overflow-hidden" onClick={showPost}>
      <img className="w-full h-auto object-cover rounded-xl" src={props.post.photo} alt={props.post.prompt} draggable="false" />

      <div className="group-hover:flex justify-center items-center flex-col hidden absolute bottom-0 left-0 bg-gray-800 bg-opacity-50 backdrop-blur p-4 w-full text-center">
        <p className="text-white text-sm">{props.post.prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-animate flex justify-center items-center text-white text-xs font-bold">{capitalLetter}</div>
              <p className="text-white text-sm">{props.post.name}</p>
          </div>
        </div>
      </div>
    </div>
    
  );
}