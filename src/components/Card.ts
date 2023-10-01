import { type IPlace } from '../utils/interfaces'

class Card {
  private readonly name: string
  private readonly link: string
  private readonly handleImageClick: (placeData: IPlace) => void
  private readonly placeElement: HTMLLIElement | null
  private readonly nameElement: HTMLHeadingElement | null
  private readonly imageElement: HTMLImageElement | null
  private readonly imageButtonElement: HTMLButtonElement | null
  private readonly deleteButtonElement: HTMLButtonElement | null

  constructor (placeData: IPlace, cardTemplateSelector: string, handleImageClick: (placeData: IPlace) => void) {
    this.name = placeData.name ?? ''
    this.link = placeData.link ?? ''
    this.handleImageClick = handleImageClick
    this.placeElement = this.getPlaceElement(cardTemplateSelector)
    this.nameElement = this.placeElement?.querySelector('.card__title') as HTMLHeadingElement
    this.imageElement = this.placeElement?.querySelector('.card__photo') as HTMLImageElement
    this.imageButtonElement = this.placeElement?.querySelector('.card__button') as HTMLButtonElement
    this.deleteButtonElement = this.placeElement?.querySelector('.card__delete') as HTMLButtonElement
  }

  getPlaceElement = (selector: string): HTMLLIElement | null => {
    const placeTemplate = document.querySelector(selector)
    if (placeTemplate != null && placeTemplate instanceof HTMLTemplateElement) {
      const templateContent = placeTemplate.content
      const place = templateContent?.querySelector('.card')?.cloneNode(true)
      return place as HTMLLIElement | null
    }
    return null
  }

  private readonly onImageClick = (): void => {
    this.handleImageClick({ name: this.name, link: this.link })
  }

  private readonly onDeleteClick = (): void => {
    this.removeEventListeners()
    this.placeElement?.remove()
  }

  private readonly setEventListeners = (): void => {
    this.imageButtonElement?.addEventListener('click', this.onImageClick)
    this.deleteButtonElement?.addEventListener('click', this.onDeleteClick)
  }

  private readonly removeEventListeners = (): void => {
    this.imageButtonElement?.removeEventListener('click', this.onImageClick)
    this.deleteButtonElement?.removeEventListener('click', this.onDeleteClick)
  }

  generatePlace = (): HTMLLIElement => {
    if (this.nameElement instanceof HTMLHeadingElement) {
      this.nameElement.textContent = this.name
    }
    if (this.imageElement instanceof HTMLImageElement) {
      this.imageElement.src = this.link
    }

    this.setEventListeners()

    return this.placeElement as HTMLLIElement
  }
}

export default Card
