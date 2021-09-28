import React from "react";
import api from '../../utils/Api.js';
import Card from '../Card/Card.js'

function Main(props) {

  const [userName, setUserName] = React.useState([])
  const [userDescription, setUserDescription] = React.useState([])
  const [userAvatar, setUserAvatar] = React.useState([])
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getCardItems()
      .then((cardsData) => {
        setCards(cardsData)
      })
  }, [])

  React.useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setUserName(userInfo.name)
        setUserDescription(userInfo.about)
        setUserAvatar(userInfo.avatar)
      })
  }, [])

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
              <Card card={cardData} key={cardData._id} onCardClick={props.onCardClick} />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main

