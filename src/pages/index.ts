import './index.css'
import { popupConfig, profileButtons } from '../utils/elements'
import Popup from '../components/Popup'

const avatarPopup = new Popup(popupConfig.avatarPopupSelector)

avatarPopup.setClickListener()
profileButtons.avatarButton?.addEventListener('click', avatarPopup.open)
