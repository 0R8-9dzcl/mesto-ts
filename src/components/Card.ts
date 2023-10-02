import { type ICard } from '../utils/interfaces'
import imageNotFound from '../images/no-image.webp'

class Card {
  private readonly name: string
  private link: string
  private readonly handleImageClick: (cardData: ICard) => void
  private readonly cardElement: HTMLLIElement | null
  private readonly nameElement: HTMLHeadingElement | null
  private readonly imageElement: HTMLImageElement | null
  private readonly imageButtonElement: HTMLButtonElement | null
  private readonly deleteButtonElement: HTMLButtonElement | null

  constructor (cardData: ICard, cardTemplateSelector: string, handleImageClick: (cardData: ICard) => void) {
    this.name = cardData.name ?? ''
    this.link = cardData.link ?? ''
    this.handleImageClick = handleImageClick
    this.cardElement = this.getPlaceElement(cardTemplateSelector)
    this.nameElement = this.cardElement?.querySelector('.card__title') as HTMLHeadingElement
    this.imageElement = this.cardElement?.querySelector('.card__photo') as HTMLImageElement
    this.imageButtonElement = this.cardElement?.querySelector('.card__button') as HTMLButtonElement
    this.deleteButtonElement = this.cardElement?.querySelector('.card__delete') as HTMLButtonElement
  }

  getPlaceElement = (selector: string): HTMLLIElement | null => {
    const cardTemplate = document.querySelector(selector)
    if (cardTemplate != null && cardTemplate instanceof HTMLTemplateElement) {
      const templateContent = cardTemplate.content
      const card = templateContent?.querySelector('.card')?.cloneNode(true)
      return card as HTMLLIElement | null
    }
    return null
  }

  private readonly onImageClick = (): void => {
    this.handleImageClick({ name: this.name, link: this.link })
  }

  private readonly onDeleteClick = (): void => {
    this.removeEventListeners()
    this.cardElement?.remove()
  }

  private readonly setEventListeners = (): void => {
    this.imageButtonElement?.addEventListener('click', this.onImageClick)
    this.deleteButtonElement?.addEventListener('click', this.onDeleteClick)
  }

  private readonly removeEventListeners = (): void => {
    this.imageButtonElement?.removeEventListener('click', this.onImageClick)
    this.deleteButtonElement?.removeEventListener('click', this.onDeleteClick)
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

  generateCard = (): HTMLLIElement => {
    this.setCardData()

    this.setEventListeners()

    return this.cardElement as HTMLLIElement
  }
}

export default Card
