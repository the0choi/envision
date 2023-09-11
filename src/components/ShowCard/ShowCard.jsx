
export default function PostCard(props) {
  const capitalLetter = props.post.name.charAt(0).toUpperCase() || "";

  return (
    <>
      <div className="mt-5 flex flex-col justify-center items-left gap-2">
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full object-cover bg-[#6469ff] flex justify-center items-center text-white font-bold">{capitalLetter}</div>
            <p className="text-white text-lg">{props.post.name}</p>
        </div>
        <p className="text-white my-5">Description: {props.post.prompt}</p>
      </div>
      <img className="h-96 w-auto object-cover rounded-xl" src={props.post.photo} alt={props.post.prompt} draggable="false" />
    </>
  );
}