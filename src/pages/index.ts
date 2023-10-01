import './index.css'
import { popupConfig, openPopupButtons, profileSelectors } from '../utils/elements'
import PopupWithForm from '../components/PopupWithForm'
import ProfileInfo from '../components/ProfileInfo'
import { type IPlace, type IProfile } from '../utils/interfaces'
import { type inputValues } from '../utils/types'

const profile = new ProfileInfo(profileSelectors)

const handleProfileSubmit = (newProfileData: IProfile): void => {
  profile.setProfileInfo(newProfileData)
}
const handleNewPlaceSubmit = (newPlaceData: IPlace): void => {
  console.log(newPlaceData)
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

openPopupButtons.avatarButton?.addEventListener('click', handleAvatarPopupOpen)
openPopupButtons.newPlaceButton?.addEventListener('click', handleNewPlacePopupOpen)
openPopupButtons.profileButton?.addEventListener('click', handleProfilePopupOpen)
