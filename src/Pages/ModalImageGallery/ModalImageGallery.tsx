import  { useState, useEffect } from 'react';
import './style.css';

const URL = 'https://dummyjson.com/product';

export default function ModalImageGallery() {
  const [imagesData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getImage() {
      try {
        const response = await fetch(URL);
        const result = await response.json();
        setImageData(result.products);
      } catch (error) {
        console.log('error');
      } finally {
        setIsLoading(false);
      }
    }

    getImage();
  }, []);

  return (
    <div>
      <h1>Image Pop up</h1>
      
    </div>
  );
}