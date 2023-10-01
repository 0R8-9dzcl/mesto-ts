import './index.css'
import { popupConfig, openPopupButtons, profileSelectors, placeTemplateSelector } from '../utils/elements'
import PopupWithForm from '../components/PopupWithForm'
import ProfileInfo from '../components/ProfileInfo'
import { type IPlace, type IProfile } from '../utils/interfaces'
import { type inputValues } from '../utils/types'
import Card from '../components/Card'
import PopupWithImage from '../components/PopupWithImage'

const profile = new ProfileInfo(profileSelectors)
const arr: IPlace[] = [
  {
    name: 'test',
    link: 'sdfsdfsdfsd'
  },
  {
    name: 'test',
    link: 'sdfsdfsdfsd'
  },
  {
    name: 'test',
    link: 'sdfsdfsdfsd'
  }
]

const imagePopup = new PopupWithImage(popupConfig.imagePopupSelector)

const handleImagePopupOpen = (placeData: IPlace): void => {
  imagePopup.setImageData(placeData)
  imagePopup.open()
}

const createPlace = (placeData: IPlace): HTMLLIElement => {
  const newPlace = new Card(placeData, placeTemplateSelector, handleImagePopupOpen).generatePlace()
  return newPlace
}

const placeContainer: HTMLUListElement | null = document.querySelector('.cards__list')
arr.forEach(placeData => {
  const newPlace = createPlace(placeData)
  if (placeContainer != null) {
    placeContainer.append(newPlace)
  }
})

const handleProfileSubmit = (newProfileData: IProfile): void => {
  profile.setProfileInfo(newProfileData)
}
const handleNewPlaceSubmit = (newPlaceData: IPlace): void => {
  const newPlace = createPlace(newPlaceData)
  if (placeContainer != null) {
    placeContainer.prepend(newPlace)
  }
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
