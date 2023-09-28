import './index.css'
import { popupConfig, openPopupButtons } from '../utils/elements'
import Popup from '../components/Popup'

const avatarPopup = new Popup(popupConfig.avatarPopupSelector)
const newPlacePopup = new Popup(popupConfig.newPlacePopupSelector)
const profilePopup = new Popup(popupConfig.profilePopupSelector)

avatarPopup.setClickListener()
newPlacePopup.setClickListener()
profilePopup.setClickListener()

openPopupButtons.avatarButton?.addEventListener('click', avatarPopup.open)
openPopupButtons.newPlaceButton?.addEventListener('click', newPlacePopup.open)
openPopupButtons.profileButton?.addEventListener('click', profilePopup.open)
