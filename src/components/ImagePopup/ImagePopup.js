import React from "react";
import blackImagePath from '../../images/Avatar.jpg';

function ImagePopup() {
  return (
    <div className="popup popup_open_background-image">
      <div className="popup__background-image-container">
        <button className="popup__close-button" type="button"></button>
        <h2 className="popup__image-title"></h2>
        <img className="popup__background-image"
          src={blackImagePath}
          alt="Изображение карточки" />
      </div>
    </div>
  )
}

export default ImagePopup