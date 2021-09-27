import React from "react";
import blackImagePath from '../../images/Avatar.jpg';

function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-img" src={blackImagePath} alt="Аватар профиля" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title"></h1>
          <p className="profile__subtitle"></p>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
        </ul>
      </section>
    </main>
  )
}

export default Main