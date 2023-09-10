import { useState, useEffect } from "react";
import Loader from '../../components/Loader/Loader';
import PostCard from '../../components/PostCard/PostCard';
import PostForm from '../../components/PostForm/PostForm';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");

  function RenderCards({data, title}) {
    if (data?.length > 0) {
      return data.map( (post) => <PostCard key={post._id} data={...post} />)
    }

    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
    )
  }

    return (
      <div className="w-4/5 mx-auto mt-10">

        <div>
          <h1 className="text-white text-4xl font-bold">View Community Artwork</h1>
          <p className="text-white mt-2 text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum culpa illo alias nulla, atque officia sequi saepe cumque rem ipsam explicabo aliquid natus pariatur repudiandae adipisci, beatae odit. Delectus, ullam?</p>
        </div>
       
          <PostForm />

        <div>
          {loading ? 
            <Loader /> 
          :
          <>
            {searchText && (
              <h2 className="text-gray-500 text-xl mb-3">Showing results for <span className="text-black">{searchText}</span></h2>
            )}

            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">

            </div>
          </>
          }
        </div>

      </div>
    );
  }