import React from "react";
import blackImagePath from '../../images/Avatar.jpg'

function Main() {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-img" src={blackImagePath} alt="Аватар профиля" />
        </div>
        <div className="profile__info">
          <h1 className="profile__title"></h1>
          <p className="profile__subtitle"></p>
          <button className="profile__edit-button" type="button"></button>
        </div>
        <button className="profile__add-button" type="button"></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
        </ul>
      </section>
    </main>
  )
}

export default Main