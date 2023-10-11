import { type ISelectors, type IOpenPopupButtons, type IProfileSelectors, type ICardSelectors } from './interfaces'

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
// Параметры карточек
export const cardSelectors: ICardSelectors = {
  titleSelector: '.card__title',
  imageSelector: '.card__photo',
  buttonSelector: '.card__button',
  trashButtonSelector: '.card__delete',
  likeCounterSelector: '.card__like-counter',
  likeSelector: '.card__like',
  likeActiveClass: 'card__like_active'
}
export const profileSelectors: IProfileSelectors = {
  avatarSelector: '.profile__avatar',
  nameSelector: '.profile__name',
  aboutSelector: '.profile__caption'
}

export const placeTemplateSelector: string = '.template-card'
export const placeContainerSelector: string = '.cards__list'
