import React from "react";

interface ICardGallery {
  imagePath: string;
  title: string;
  onAction?: any;
  zoom?: boolean;
  isGallery?: boolean;
}

const CardGallery = ({ imagePath, title, onAction, zoom = false, isGallery }: ICardGallery) => {
  return (
    <div className="c-card__gallery" onClick={onAction}>
      {zoom && (
        <div className="c-card__gallery--zoom">
          <i className="icofont-ui-zoom-in"></i>
        </div>
      )}

      <img src={imagePath} alt={title} className={isGallery ? "img-gallery" : ""} />
    </div>
  );
};

export default CardGallery;
