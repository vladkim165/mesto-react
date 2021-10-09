import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import api from '../../utils/Api.js';
import Card from '../Card/Card.js'

function Main(props) {

  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  const userContext = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    api.getCardItems()
      .then((cardsData) => {
        setCards(cardsData)
      })
  }, [])

  React.useEffect(() => {
    setUserName(userContext.name)
    setUserDescription(userContext.about)
    setUserAvatar(userContext.avatar)
  }, [userContext])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === userContext._id);

    if (isLiked) {
      api.unlikeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    }
    else {
      api.likeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    }

  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => card._id !== c._id))
    })
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-img" src={userAvatar} alt="Аватар профиля" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <p className="profile__subtitle">{userDescription}</p>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((cardData) => {
            return (
              <Card card={cardData} key={cardData._id} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main

