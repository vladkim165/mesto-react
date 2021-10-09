import React from 'react'
import Header from './Header/Header.js'
import Main from './Main/Main.js'
import Footer from './Footer/Footer.js'
import PopupWithForm from './PopupWithForm/PopupWithForm.js'
import ImagePopup from './ImagePopup/ImagePopup.js'
import api from '../utils/Api.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js'

function App() {

  const [currentUser, setCurrentUser] = React.useState({})
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  // const [isConfirmationPopupOpen, setisConfirmationPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(data) {
    setSelectedCard(data)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  React.useState(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo)
      })
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
        <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
          children={(
            <>
              <section className="form__section">
                <input className="form__field form__field_input_name" type="text" name="name" id="name-input" required
                  autoComplete="off" minLength="2" maxLength="40" />
                <span className="form__field-error" id="name-input-error"></span>
              </section>
              <section className="form__section">
                <input className="form__field form__field_input_bio" type="text" name="info" id="bio-input" required
                  autoComplete="off" minLength="2" maxLength="200" />
                <span className="form__field-error" id="bio-input-error"></span>
              </section>
            </>
          )}
        />
        <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
          children={(
            <>
              <section className="form__section">
                <input className="form__field form__field_input_place-name" type="text" name="name" id="place-name-input"
                  placeholder="Название" required autoComplete="off" minLength="2" maxLength="30" />
                <span className="form__field-error" id="place-name-input-error"></span>
              </section>
              <section className="form__section">
                <input className="form__field form__field_input_link" type="url" name="link" id="url-input"
                  placeholder="Ссылка на картинку" required autoComplete="off" />
                <span className="form__field-error" id="url-input-error"></span>
              </section>
            </>
          )}
        />
        <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
          children={(
            <>
              <section className="form__section">
                <input className="form__field form__field_input_link" type="url" name="link" id="link-input"
                  placeholder="Ссылка на картинку" required autoComplete="off" />
                <span className="form__field-error" id="link-input-error"></span>
              </section>
            </>
          )}
        />
        {/* <PopupWithForm name="confirm-deletion" title="Вы уверены?" isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} /> */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

