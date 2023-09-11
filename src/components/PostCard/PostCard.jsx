export default function PostCard(props) {

  return (
    <div className="rounded-xl group relative hover:shadow-card hover:cursor-pointer card">
      <img className="w-full h-auto object-cover rounded-xl" src={props.post.photo} alt={props.post.prompt} draggable="false" />

      <div className="group-hover:flex justify-center items-center flex-col hidden absolute bottom-0 left-0 bg-gray-800 bg-opacity-50 backdrop-blur p-4 w-full text-center">
        <p className="text-white text-sm">{props.post.prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-[#6469ff] flex justify-center items-center text-white text-xs font-bold">A</div>
              <p className="text-white text-sm">{props.post.user}</p>
          </div>
        </div>
      </div>
    </div>
  );
}