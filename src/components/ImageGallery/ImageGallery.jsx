import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css';

export const ImageGallery = ({pictures}) => {
  console.log(pictures);
  return <ul className={css.gallery}>
    {pictures.map(({id, previewURL})=><li  key={id} className={css.galleryItem}><ImageGalleryItem preview = {previewURL}/></li>)}
  </ul>;
};
