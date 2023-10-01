import { type IPlace } from '../utils/interfaces'

class Card {
  private readonly name: string
  private readonly link: string
  private readonly handleImageClick: () => null
  private readonly placeElement: HTMLLIElement | null
  private readonly nameElement: HTMLHeadingElement | null
  private readonly imageElement: HTMLImageElement | null
  private readonly imageButtonElement: HTMLButtonElement | null

  constructor (placeData: IPlace, cardTemplateSelector: string, handleImageClick: () => null) {
    this.name = placeData.name ?? ''
    this.link = placeData.link ?? ''
    this.handleImageClick = handleImageClick
    this.placeElement = this.getPlaceElement(cardTemplateSelector)
    this.nameElement = this.placeElement?.querySelector('.card__title') as HTMLHeadingElement
    this.imageElement = this.placeElement?.querySelector('.card__photo') as HTMLImageElement
    this.imageButtonElement = this.placeElement?.querySelector('.card__button') as HTMLButtonElement
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

  generatePlace = (): HTMLLIElement => {
    if (this.nameElement instanceof HTMLHeadingElement) {
      this.nameElement.textContent = this.name
    }
    if (this.imageElement instanceof HTMLImageElement) {
      this.imageElement.src = this.link
    }

    return this.placeElement as HTMLLIElement
  }
}

export default Card
