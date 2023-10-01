import { type ISelectors, type IOpenPopupButtons, type IProfileSelectors } from './interfaces'

export const openPopupButtons: IOpenPopupButtons = {
  avatarButton: document.querySelector('.profile__button_type_avatar') as HTMLButtonElement,
  profileButton: document.querySelector('.profile__button_type_user') as HTMLButtonElement,
  newPlaceButton: document.querySelector('.profile__button_type_place') as HTMLButtonElement
}

export const popupConfig: ISelectors = {
  avatarPopupSelector: '.popup_avatar',
  profilePopupSelector: '.popup_profile',
  newPlacePopupSelector: '.popup_place',
  imagePopupSelector: '.popup_image',
  deletePopupSelector: '.popup_delete',
  openedPopupClass: 'popup_opened'
}

export const profileSelectors: IProfileSelectors = {
  avatarSelector: '.profile__avatar',
  nameSelector: '.profile__name',
  aboutSelector: '.profile__caption'
}

export const placeTemplateSelector: string = '.template-card'
