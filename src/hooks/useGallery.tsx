import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useGallery = () => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // ...existing code...
  useEffect(() => {
    const getGallery = async () => {
      try {
        const snapshot = await getDocs(collection(db, "memories"));
        // Extract image URLs from each document
        const images = snapshot.docs
          .map((doc) => doc.data().imagesUrl)
          .filter(Boolean); // Remove undefined/null if any

        setGalleryImages(images[0]);
        // console.log(images);
        
      } catch (e) {
        console.error("Error fetching gallery:", e);
        setGalleryImages([]);
      }
    };
    getGallery();
  }, []);
  // ...existing code...

  return { galleryImages };
};

export default useGallery;
