import PostForm from "../../components/PostForm/PostForm";

export default function NewPostPage() {

  return (
    <div className="w-2/3 mx-auto mt-10 xs-width">
        <div>
          <h1 className="text-white text-4xl font-bold">Create Artwork</h1>
          <p className="text-white text-gray-500 my-5">Turn imagination into art. Bring to life stunning artwork in seconds with the power of AI and your creativity. <br /> Can't think of a prompt? Use the 'surprise me!' button for suggestions.</p>
        </div>
        <PostForm  />
    </div>
  );
}