import './index.css'
import { popupConfig, openPopupButtons, profileSelectors, placeTemplateSelector, cardConfig } from '../utils/elements'
import PopupWithForm from '../components/PopupWithForm'
import ProfileInfo from '../components/ProfileInfo'
import { type INewCard, type ICard, type IProfile } from '../utils/interfaces'
import { type inputValues } from '../utils/types'
import Card from '../components/Card'
import PopupWithImage from '../components/PopupWithImage'
import Api from '../components/Api'

const profile = new ProfileInfo(profileSelectors)

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-23',
  // 'http://localhost:3333',
  {
    'Content-Type': 'application/json; charset = utf-8',
    authorization: '577b546f-6478-4029-92a1-5665bab78a44'
  }
)

const imagePopup = new PopupWithImage(popupConfig.imagePopupSelector)

const handleImagePopupOpen = (placeData: INewCard): void => {
  imagePopup.setImageData(placeData)
  imagePopup.open()
}

const createPlace = (placeData: ICard): Card => {
  const id: string = profile.getId()
  const newPlace = new Card(placeData, id, placeTemplateSelector, handleImagePopupOpen, cardConfig)
  return newPlace
}

const placeContainer: HTMLUListElement | null = document.querySelector('.cards__list')

const renderCardList = (cards: ICard[]): void => {
  cards.forEach((placeData, index) => {
    const newPlace = createPlace(placeData)
    const generatedPlace = newPlace.generateCard()
    if (placeContainer != null) {
      const timer = setTimeout(() => {
        placeContainer.append(generatedPlace)
        newPlace.showCard()
        clearTimeout(timer)
      }, 300 * (index + 1))
    }
  })
}

Promise.all([api.getAllCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    renderCardList(cards)
    profile.setProfileInfo(userData)
  })
  .catch(console.log)

const handleProfileSubmit = (newProfileData: IProfile): void => {
  profile.setProfileInfo(newProfileData)
}
const handleNewPlaceSubmit = (newPlaceData: INewCard): void => {
  // const newPlace = createPlace(newPlaceData)
  // const generatedPlace = newPlace.generateCard()
  // if (placeContainer != null) {
  //   placeContainer.prepend(generatedPlace)
  //   newPlace.showCard()
  // }
}

const avatarPopup = new PopupWithForm(popupConfig.avatarPopupSelector, handleProfileSubmit)
const newPlacePopup = new PopupWithForm(popupConfig.newPlacePopupSelector, handleNewPlaceSubmit)
const profilePopup = new PopupWithForm(popupConfig.profilePopupSelector, handleProfileSubmit)

const handleAvatarPopupOpen = (): void => {
  avatarPopup.open()
}
const handleNewPlacePopupOpen = (): void => {
  newPlacePopup.open()
}
const handleProfilePopupOpen = (): void => {
  const profileData = profile.getProfileInfo() as inputValues
  profilePopup.setInputValues(profileData)
  profilePopup.open()
}

avatarPopup.setEventListeners()
newPlacePopup.setEventListeners()
profilePopup.setEventListeners()
imagePopup.setEventListeners()

openPopupButtons.avatarButton?.addEventListener('click', handleAvatarPopupOpen)
openPopupButtons.newPlaceButton?.addEventListener('click', handleNewPlacePopupOpen)
openPopupButtons.profileButton?.addEventListener('click', handleProfilePopupOpen)
