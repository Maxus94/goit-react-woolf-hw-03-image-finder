import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  picture,
  toggleModal,
  handleModalImage,
}) => {
  return (
    <img
      className={css.ImageGalleryItemImage}
      src={picture.webformatURL}
      alt={picture.tags}
      onClick={() => handleModalImage(picture.largeImageURL)}
    />
  );
};
