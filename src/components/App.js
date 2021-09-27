import blackImagePath from '../images/Avatar.jpg'
import Header from './Header/Header.js'
import Main from './Main/Main.js'
import Footer from './Footer/Footer.js'

function App() {
  return (
    <>
      <div className="page">
        <Header />
        <Main />
        <div className="popup popup_profile">
          <div className="popup__container">
            <form className="form" name="edit-form" noValidate>
              <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
              <h2 className="form__header">Редактировать профиль</h2>
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
              <button className="form__save-button" type="submit" aria-label="Сохранить">Сохранить</button>
            </form>
          </div>
        </div>
        <div className="popup popup_open_add-form">
          <div className="popup__container">
            <form className="form" name="add-form" noValidate>
              <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
              <h2 className="form__header">Новое место</h2>
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
              <button className="form__save-button" type="submit" aria-label="Создать">Создать</button>
            </form>
          </div>
        </div>
        <div className="popup popup_open_background-image">
          <div className="popup__background-image-container">
            <button className="popup__close-button" type="button"></button>
            <h2 className="popup__image-title"></h2>
            <img className="popup__background-image"
              src={blackImagePath}
              alt="Изображение карточки" />
          </div>
        </div>
        <div className="popup popup_delete-confirmation">
          <div className="popup__container">
            <form className="form" name="confirm-form" noValidate>
              <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
              <h2 className="form__header">Вы уверены?</h2>
              <button className="form__save-button" type="submit" aria-label="Создать">Да</button>
            </form>
          </div>
        </div>
        <div className="popup popup_change-avatar">
          <div className="popup__container">
            <form className="form" name="change-avatar-form" noValidate>
              <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
              <h2 className="form__header">Обновить аватар</h2>
              <section className="form__section">
                <input className="form__field form__field_input_link" type="url" name="link" id="link-input"
                  placeholder="Ссылка на картинку" required autoComplete="off" />
                <span className="form__field-error" id="link-input-error"></span>
              </section>
              <button className="form__save-button" type="submit" aria-label="Сохранить">Сохранить</button>
            </form>
          </div>
        </div>
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
