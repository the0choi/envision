import { useState, useEffect } from "react";
import * as postsAPI from '../../utilities/posts-api';
import Loader from '../../components/Loader/Loader';
import PostCard from '../../components/PostCard/PostCard';
import SearchForm from '../../components/SearchForm/SearchForm.jsx';
import Footer from '../../components/Footer/Footer';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const result = await postsAPI.getPosts();
      setAllPosts(result.reverse());
      setLoading(false);

    } catch (err) {
      console.error(err);
    }
  }

  useEffect( () => {
    fetchPosts();
  }, []);

    return (
      <>
        <div className="w-2/3 mx-auto mt-10 xs-width">
          <div>
            <h1 className="text-white text-4xl font-bold">Community Artwork</h1>
            <p className="text-white text-gray-500 my-5">Explore the world's imagination. Vision empowers anyone to create beautiful art and images in seconds. </p>
          </div>

          <SearchForm
            searchText={searchText}
            setSearchText={setSearchText}
            searchTimeout={searchTimeout} 
            setSearchTimeout={setSearchTimeout}
            searchedResults={searchedResults}
            setSearchedResults={setSearchedResults}
            allPosts={allPosts} 
            setAllPosts={setAllPosts}
            />

          <div>
            {loading ? 
              <Loader /> 
            :
            <>
              {!searchText ? 
                <></>
              :
              <>
                {searchedResults.length === 0 ? 
                  <h2 className="text-gray-500 font-bold text-xl mt-10 mb-96">No results found</h2>
                :
                  <>
                    {searchText && (
                      <h2 className="text-gray-500 text-xl mb-3">Showing results for <span className="text-white font-bold">{searchText}</span></h2>
                    )}
                  </>
                }
              </>
              }
              
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ?
                  searchedResults.map( (post) => <PostCard key={post._id} post={post} />)
                : 
                  allPosts.map( (post) => <PostCard key={post._id} post={post} />)
                }
              </div>
            </>
            }
          </div>
        </div>
        <Footer />
      </>
    );
  }