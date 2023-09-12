import { useEffect, useRef, useState } from 'react';

export default function ImageReel() {
  const [images, setImages] = useState({
    col1: [],
    col2: [],
    col3: []
  });

  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

  useEffect(() => {
    const imgs = [
      'https://res.cloudinary.com/dhc1ehxg4/image/upload/v1694414363/osomrxvvtn8qxy9dukai.png',
      'https://res.cloudinary.com/dhc1ehxg4/image/upload/v1694415463/edzhsett24v1o1wq86wu.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694415174/sedr1ezgwwt3hwwi1ci4.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694414289/ppbktq8rav6xk8t7idx6.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694428418/pvdaitv9wt5ixqn219hv.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694428510/kat5cqulo2ylm0h3mbwp.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694428778/ez9qt4274qmgmyuvc6ae.png'
    ];

    function shuffle(arr) {
      const shuffledArr = [...arr];
      for (let i = shuffledArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
      }
      return shuffledArr; 
    }

    setImages({
      col1: shuffle(imgs),
      col2: shuffle(imgs),
      col3: shuffle(imgs)
    });

  }, []);

  return (
    <div className="-z-10 absolute w-full h-full overflow-hidden">
      <div className="reel-container">
        <div className="column col-1 w-[300px]" ref={col1Ref}>
          {images.col1.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="img-reel" className="object-cover rounded-xl mb-8 w-full h-auto" />
          ))}
          {images.col1.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="img-reel" className="object-cover rounded-xl mb-8 w-full h-auto" />
          ))}
        </div>
        <div className="column col-2 w-[300px]" ref={col2Ref}>
          {images.col2.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="img-reel" className="object-cover rounded-xl mb-8 w-full h-auto" />
          ))}
          {images.col2.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="img-reel" className="object-cover rounded-xl mb-8 w-full h-auto" />
          ))}
        </div>
        <div className="column col-3 w-[300px]" ref={col3Ref}>
          {images.col3.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="img-reel" className="object-cover rounded-xl mb-8 w-full h-auto" />
          ))}
          {images.col3.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="img-reel" className="object-cover rounded-xl mb-8 w-full h-auto" />
          ))}
        </div>
      </div>
      
    </div>
    
  );
}