import { useState } from 'react';

export default function SearchForm() {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  function handleChange(evt) {
    setSearchText(evt.target.value);
  }

  return (
    <div className="w-1/2 my-10 rounded-xl">
        <input className="w-full py-4 px-4 my-1 rounded-xl bg-[#1c1c1c] text-white" type="text" name="email" placeholder="Search..." value={searchText} onChange={handleChange} required />
    </div>
  );
}