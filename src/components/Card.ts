import { type IProfile, type INewCard, type ICardConfig } from '../utils/interfaces'
import imageNotFound from '../images/no-image.webp'

class Card {
  private readonly name: string
  private link: string
  private likes: IProfile[]
  private readonly cardId: string
  private readonly isOwner: boolean
  private isLiked: boolean
  private readonly userId: string

  private readonly handleImageClick: (cardData: INewCard) => void
  private readonly handleLikeClick: (cardId: string, isLiked: boolean) => void
  private readonly handleDeleteClick: (cardId: string) => void
  private readonly cardElement: HTMLLIElement | null
  private readonly nameElement: HTMLHeadingElement | null
  private readonly likesCounterElement: HTMLParagraphElement | null
  private readonly imageElement: HTMLImageElement | null
  private readonly imageButtonElement: HTMLButtonElement | null
  private readonly likeButtonElement: HTMLButtonElement | null
  private readonly deleteButtonElement: HTMLButtonElement | null
  private readonly likeActiveClass: string

  constructor ({
    cardData,
    userId,
    cardTemplateSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
    cardSelectors
  }: ICardConfig) {
    this.name = cardData.name
    this.link = cardData.link
    this.likes = cardData.likes
    this.cardId = cardData._id
    this.isOwner = cardData.owner?._id === userId
    this.userId = userId

    this.cardElement = this.getPlaceElement(cardTemplateSelector)

    this.handleImageClick = handleImageClick
    this.handleLikeClick = handleLikeClick
    this.handleDeleteClick = handleDeleteClick

    this.nameElement = this.cardElement?.querySelector(cardSelectors.titleSelector) as HTMLHeadingElement
    this.imageElement = this.cardElement?.querySelector(cardSelectors.imageSelector) as HTMLImageElement
    this.imageButtonElement = this.cardElement?.querySelector(cardSelectors.buttonSelector) as HTMLButtonElement
    this.deleteButtonElement = this.cardElement?.querySelector(cardSelectors.trashButtonSelector) as HTMLButtonElement
    this.likeButtonElement = this.cardElement?.querySelector(cardSelectors.likeSelector) as HTMLButtonElement
    this.likesCounterElement = this.cardElement?.querySelector(cardSelectors.likeCounterSelector) as HTMLParagraphElement
    this.likeButtonElement = this.cardElement?.querySelector(cardSelectors.likeSelector) as HTMLButtonElement
    this.likeActiveClass = cardSelectors.likeActiveClass
  }

  private readonly getPlaceElement = (selector: string): HTMLLIElement | null => {
    const cardTemplate = document.querySelector(selector)
    if (cardTemplate != null && cardTemplate instanceof HTMLTemplateElement) {
      const templateContent = cardTemplate.content
      const card = templateContent?.querySelector('.card')?.cloneNode(true)
      return card as HTMLLIElement | null
    }
    return null
  }

  private readonly checkIsLiked = (): boolean => {
    return this.likes.some(like => like._id === this.userId)
  }

  private readonly onImageClick = (): void => {
    this.handleImageClick({ name: this.name, link: this.link })
  }

  private readonly onCardLike = (): void => {
    this.handleLikeClick(this.cardId, this.isLiked)
  }

  readonly deleteCard = (): void => {
    this.hideCard()
    this.removeEventListeners()
    const timer = setTimeout(() => {
      this.cardElement?.remove()
      clearTimeout(timer)
    }, 700)
  }

  private readonly onDeleteClick = (): void => {
    this.handleDeleteClick(this.cardId)
  }

  readonly upadateLikes = (updatedLikes: IProfile[]): void => {
    this.likes = updatedLikes
    this.upadateLikesStatus()
  }

  private readonly upadateLikesStatus = (): void => {
    this.isLiked = this.checkIsLiked()
    if (this.likesCounterElement instanceof HTMLParagraphElement) {
      this.likesCounterElement.textContent = this.likes.length.toString()
    }
    if (this.isLiked) {
      this.likeButtonElement?.classList.add(this.likeActiveClass)
    } else {
      this.likeButtonElement?.classList.remove(this.likeActiveClass)
    }
  }

  private readonly setEventListeners = (): void => {
    if (this.isOwner) {
      // вешаю слушатель на удаление если карточка моя
      this.deleteButtonElement?.addEventListener('click', this.onDeleteClick)
    }
    this.imageButtonElement?.addEventListener('click', this.onImageClick)
    this.likeButtonElement?.addEventListener('click', this.onCardLike)
  }

  private readonly removeEventListeners = (): void => {
    // слушатель на удаление без проверки на владельца, так как если я здесь, значит слушатель на удаление есть
    this.deleteButtonElement?.removeEventListener('click', this.onDeleteClick)
    this.imageButtonElement?.removeEventListener('click', this.onImageClick)
    this.likeButtonElement?.removeEventListener('click', this.onCardLike)
  }

  private readonly setCardData = (): void => {
    if (this.nameElement instanceof HTMLHeadingElement) {
      this.nameElement.textContent = this.name
    }
    if (this.imageElement instanceof HTMLImageElement) {
      this.imageElement.src = this.link

      this.imageElement.onerror = (): void => {
        if (this.imageElement instanceof HTMLImageElement) {
          this.imageElement.src = imageNotFound
          this.link = imageNotFound
        }
      }
    }
  }

  readonly showCard = (delayMultiplier: number): void => {
    const timer = setTimeout(() => {
      this.cardElement?.classList.add('card_visible')
      clearTimeout(timer)
    }, 310 * delayMultiplier)
  }

  private readonly hideCard = (): void => {
    this.cardElement?.classList.remove('card_visible')
  }

  private readonly removeDeleteCardButton = (): void => {
    this.deleteButtonElement?.remove()
  }

  generateCard = (delayMultiplier: number): HTMLLIElement => {
    this.setCardData()
    this.upadateLikesStatus()
    if (!this.isOwner) {
      this.removeDeleteCardButton()
    }

    this.setEventListeners()
    this.showCard(delayMultiplier)

    return this.cardElement as HTMLLIElement
  }
}

export default Card
