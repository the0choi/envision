import { useState } from 'react';

export default function SearchForm(props) {

  function handleChange(evt) {
    clearTimeout(props.searchTimeout);
    props.setSearchText(evt.target.value);

    props.setSearchTimeout(
      setTimeout(() => {
        const searchResult = props.allPosts.filter((post) => post.name.toLowerCase().includes(props.searchText.toLowerCase()) || post.prompt.toLowerCase().includes(props.searchText.toLowerCase()));
        props.setSearchedResults(searchResult);
      }, 500),
    );
  }

  return (
    <div className="w-1/2 my-10 rounded-xl">
        <input className="w-full py-4 px-4 my-1 rounded-xl bg-[#1c1c1c] text-white border border-white border-1 border-opacity-30" type="text" name="email" placeholder="Search..." value={props.searchText} onChange={handleChange} required />
    </div>
  );
}