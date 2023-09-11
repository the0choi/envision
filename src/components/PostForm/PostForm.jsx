import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as usersService from '../../utilities/users-service';
import getRandomPrompt from "../../utilities/getRandomPrompt";
import Loader from "../../components/Loader/Loader";

export default function PostForm(props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(evt) {
    setForm({...form, [evt.target.name]: evt.target.value});
  }

  function handleSurpriseMe(evt) {
    evt.preventDefault();
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt});
  }

  async function generateImage() {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const token = usersService.getToken();
        const response = await fetch('/api/posts/generateImage', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: data[0].url });
      } catch (err) {
        console.error(err);
      }
      setGeneratingImg(false);
    } else {
      alert('Please provide a prompt');
    }
  }
  
  async function handleSubmit(evt) {
    evt.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const token = usersService.getToken();
        const response = await fetch('/api/posts/create', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });
        await response.json();
        navigate('/');
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    } else {
      alert('Please generate an image with a prompt');
    }
  }

  return (
    <div className="my-10 flex flex-col gap-5">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="flex gap-5">
            <div className="flex flex-col">
              <div className="mb-2">
                <label className="text-white ml-3 pr-3">Enter a prompt</label>
                <button onClick={handleSurpriseMe} className="inline-block font-bold text-xs bg-gray-50 py-1 px-2 rounded-sm text-black surprise-btn">
                  Surprise me!
                </button>
              </div>
              <textarea className="w-96 h-full py-4 px-4 my-1 rounded-xl bg-[#1c1c1c] text-white" name="prompt" placeholder="Start with a detailed description..." value={form.prompt} onChange={handleChange} />
              <button className="w-96 py-4 px-4 my-2 border-solid border-transparent rounded-xl bg-white text-white font-bold btn-hover" type="button" onClick={generateImage} >{generatingImg ? 'Generating...' : 'Generate'}</button>
            </div>
            <div className="relative bg-gray-50 border border-gray-300 rounded-xl w-96 h-96 my-1 flex justify-center items-center overflow-hidden">
              { form.photo ? 
                <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" draggable="false"/>
              : 
              <img src="https://i.imgur.com/oqjGrQ1.gif" alt="preview" className="w-full h-full object-contain opacity-40" draggable="false" />
              }

              {generatingImg && 
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              }
            </div>
          </div>

          <div className="mt-10">
            <p className="mt-2 text-white">Share your image with the community!</p>
            <button type="submit" className="mt-3 text-white bg-[#6469ff] font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center btn-hover">
              {loading ? 'Sharing...' : 'Share'}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}