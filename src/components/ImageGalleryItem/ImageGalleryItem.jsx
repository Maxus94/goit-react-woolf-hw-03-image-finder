import css from './ImageGalleryItem.module.css';

// const openModal = (picture) => {

// }

export const ImageGalleryItem = ({ picture, toggleModal, handleModalImage }) => {
  return (
    <img
      className={css.ImageGalleryItemImage}
      src={picture.webformatURL}
      alt={picture.tags}
      onClick={()=>handleModalImage(picture.largeImageURL)}
      //onClick={() => openModal(picture.largeImageURL)}
    />
  );
};
