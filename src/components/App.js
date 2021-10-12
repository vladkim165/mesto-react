import React from 'react'
import Header from './Header/Header.js'
import Main from './Main/Main.js'
import Footer from './Footer/Footer.js'
import PopupWithForm from './PopupWithForm/PopupWithForm.js'
import ImagePopup from './ImagePopup/ImagePopup.js'
import api from '../utils/Api.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.js'

function App() {

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' })
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  // const [isConfirmationPopupOpen, setisConfirmationPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })
  const [userAvatar, setUserAvatar] = React.useState('')

  function handleChangeAvatar(url) {
    setUserAvatar(url)
  }

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

  function handleUpdateUser(user) {
    api.setUserInfo(user)
      .then((userInfo) => {
        setCurrentUser(userInfo)
        closeAllPopups()
      })
  }

  function handleUpdateAvatar(url) {
    api.changeAvatar(url)
    .then((res) => {
      setUserAvatar(res.avatar)
      console.log(res)
      closeAllPopups()
    })
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
          onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} avatarUrl={userAvatar}  onAvatarChange={handleChangeAvatar}/>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
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
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
        {/* <PopupWithForm name="confirm-deletion" title="Вы уверены?" isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} /> */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

