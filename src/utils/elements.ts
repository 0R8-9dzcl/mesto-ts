type ProfileButtons = Record<string, HTMLButtonElement | null>
type SelectorObject = Record<string, string>

export const profileButtons: ProfileButtons = {
  avatarButton: document.querySelector('.profile__button_type_avatar'),
  profileEditButton: document.querySelector('.profile__button_type_user'),
  addPlaceButton: document.querySelector('.profile__button_type_place')
}

export const popupConfig: SelectorObject = {
  avatarPopupSelector: '.popup_avatar',
  profileEditPopupSelector: '.popup_profile',
  addPlacePopupSelector: '.popup_place',
  imagePopupSelector: '.popup_image',
  deletePopupSelector: '.popup_delete',
  openedPopupClass: 'popup_opened'
}

export const profileSelectors: SelectorObject = {
  avatar: '.profile__avatar',
  name: '.profile__name',
  about: 'profile__caption'
}
