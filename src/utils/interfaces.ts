export interface IProfile {
  name?: string
  avatar?: string
  about?: string
  _id?: string
}

export interface INewCard {
  name?: string
  link?: string
}
export interface ICard {
  name: string
  link: string
  likes: IProfile[]
  owner: IProfile
  _id: string
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

export interface ICardSelectors {
  titleSelector: string
  imageSelector: string
  buttonSelector: string
  trashButtonSelector: string
  likeSelector: string
  likeCounterSelector: string
  likeActiveClass: string
}
export interface ICardConfig {
  cardData: ICard
  userId: string
  cardTemplateSelector: string
  handleImageClick: (cardData: INewCard) => void
  handleLikeClick: (cardId: string, isLiked: boolean) => void
  handleDeleteClick: (cardId: string) => void
  cardSelectors: ICardSelectors
}

export interface IOpenPopupButtons {
  avatarButton: HTMLButtonElement
  profileButton: HTMLButtonElement
  newPlaceButton: HTMLButtonElement
}
