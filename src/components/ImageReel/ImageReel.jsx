import { useEffect, useRef, useState } from 'react';

export default function ImageReel() {
  const [images, setImages] = useState({
    col1: [],
    col2: [],
    col3: []
  });

  useEffect(() => {
    const imgs = [
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694414363/osomrxvvtn8qxy9dukai.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694428418/pvdaitv9wt5ixqn219hv.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694478938/eftyoyr9gdegbqfk6oaa.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694498056/dirkvk4gfv25nlie95dr.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694495275/rv3ponvh4oan8r59ajrs.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694501149/mqsgwbopu0weqci44rlz.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694501216/nufdmiuulbtdkrslfypn.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694512673/ywolix9h3d7qy7dpfzop.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694500637/hqtawenpnfhexlaq5dia.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694658873/f9hsjurgvlsb1tzr1iaa.png',
      'http://res.cloudinary.com/dhc1ehxg4/image/upload/v1694570376/rglkc3rqbjx2yqsacppa.png',
    ];

    // Shuffle algorithm that will randomise the images
    function shuffle(arr) {
      const shuffledArr = [...arr];
      for (let i = shuffledArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
      }
      return shuffledArr; 
    }

    const shuffled1 = shuffle(imgs);
    const shuffled2 = shuffle([...shuffled1]);
    const shuffled3 = shuffle([...shuffled2]);

    setImages({
      col1: shuffled1,
      col2: shuffled2,
      col3: shuffled3
    });

  }, []);

  return (
    <div className="-z-10 absolute w-full h-full overflow-hidden">
      <div className="reel-container">
        <div className="column col-1 w-[300px]">
          {images.col1.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="img-reel" className="object-cover rounded-xl mb-8 w-full h-auto" />
          ))}
          {images.col1.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="img-reel" className="object-cover rounded-xl mb-8 w-full h-auto" />
          ))}
        </div>
        <div className="column col-2 w-[300px]">
          {images.col2.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="img-reel" className="object-cover rounded-xl mb-8 w-full h-auto" />
          ))}
          {images.col2.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="img-reel" className="object-cover rounded-xl mb-8 w-full h-auto" />
          ))}
        </div>
        <div className="column col-3 w-[300px]">
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