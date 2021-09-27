import React from 'react'
import Header from './Header/Header.js'
import Main from './Main/Main.js'
import Footer from './Footer/Footer.js'
import PopupWithForm from './PopupWithForm/PopupWithForm.js'
import ImagePopup from './ImagePopup/ImagePopup.js'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)

  const [isOpen, setIsOpen] = React.useState(false)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setIsOpen(true)
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setIsOpen(true)
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setIsOpen(true)
  }

  function closeAllPopups() {
    if (isEditProfilePopupOpen) {
      setIsEditAvatarPopupOpen(false)
      setIsOpen(false)
    }
    if (isAddPlacePopupOpen) {
      setIsEditProfilePopupOpen(false)
      setIsOpen(false)
    }
    if (isEditAvatarPopupOpen) {
      setIsAddPlacePopupOpen(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
        <Footer />
        <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isOpen} onClose={closeAllPopups} />
        <PopupWithForm name="add-card" title="Новое место" isOpen={isOpen} onClose={closeAllPopups} />
        <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={isOpen} onClose={closeAllPopups} />
        <PopupWithForm name="confirm-deletion" title="Вы уверены?" isOpen={isOpen} onClose={closeAllPopups} />
        <ImagePopup />
      </div>
      <template className="card-template">
        <div className="card">
          <li className="element">
            <img className="element__image" />
            <button className="element__delete-button" type="button"></button>
            <div className="element__info">
              <h2 className="element__title"></h2>
              <div className="element__like-area">
                <button className="element__like-button" type="button"></button>
                <span className="element__like-counter">0</span>
              </div>
            </div>
          </li>
        </div>
      </template>
    </>
  );
}

export default App;
