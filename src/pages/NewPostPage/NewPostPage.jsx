import PostForm from "../../components/PostForm/PostForm";

export default function NewPostPage() {

  return (
    <div className="w-2/3 mx-auto mt-10">
        <div>
          <h1 className="text-white text-4xl font-bold">Create Artwork</h1>
          <p className="text-white mt-2 text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum culpa illo alias nulla, atque officia sequi saepe cumque rem ipsam explicabo aliquid natus pariatur repudiandae adipisci, beatae odit. Delectus, ullam?</p>
        </div>

        <PostForm  />
        
    </div>
  );
}