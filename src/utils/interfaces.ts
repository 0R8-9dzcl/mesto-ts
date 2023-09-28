export interface IProfile {
  name?: string
  avatar?: string
  about?: string
}

export interface IProfileSelectors {
  nameSelector: string
  avatarSelector: string
  aboutSelector: string
}

export interface ISelectors {
  avatarPopupSelector: string
  profilePopupSelector: string
  newPlacePopupSelector: string
  imagePopupSelector: string
  deletePopupSelector: string
  openedPopupClass: string
}

export interface IOpenPopupButtons {
  avatarButton: HTMLButtonElement
  profileButton: HTMLButtonElement
  newPlaceButton: HTMLButtonElement
}
