import React from 'react'
import Header from './Header/Header.js'
import Main from './Main/Main.js'
import Footer from './Footer/Footer.js'
import ImagePopup from './ImagePopup/ImagePopup.js'
import api from '../utils/Api.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.js'

function App() {

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' })
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  // const [isConfirmationPopupOpen, setisConfirmationPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

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
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleUpdateAvatar(url) {
    api.changeAvatar(url)
      .then((res) => {
        setUserAvatar(res.avatar)
        console.log(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }

  React.useState(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }, [])

  React.useEffect(() => {
    api.getCardItems()
      .then((cardsData) => {
        setCards(cardsData)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.unlikeCard(card._id).then((newCard) => {
        setCards((prevState) => prevState.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
    }
    else {
      api.likeCard(card._id).then((newCard) => {
        setCards((prevState) => prevState.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => card._id !== c._id))
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleAddPlace(card) {
    api.addNewCard(card)
    setCards([card, ...cards]);
    closeAllPopups()
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
          onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards}
          onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} avatarUrl={userAvatar} onAvatarChange={handleChangeAvatar} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        {/* <PopupWithForm name="confirm-deletion" title="Вы уверены?" isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} /> */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

