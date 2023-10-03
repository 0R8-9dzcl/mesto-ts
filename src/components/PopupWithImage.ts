import { type INewCard } from '../utils/interfaces'
import Popup from './Popup'

class PopupWithImage extends Popup {
  private readonly popupImageElement: HTMLImageElement | null
  private readonly popupCaptionElement: HTMLParagraphElement | null

  constructor (popupSelector: string) {
    super(popupSelector)
    this.popupImageElement = this.popupElement?.querySelector('.popup__img') as HTMLImageElement
    this.popupCaptionElement = this.popupElement?.querySelector('.popup__img-caption') as HTMLParagraphElement
  }

  setImageData = ({ name = '', link = '' }: INewCard): void => {
    if (this.popupImageElement instanceof HTMLImageElement && this.popupCaptionElement instanceof HTMLParagraphElement) {
      this.popupImageElement.src = link
      this.popupImageElement.alt = name
      this.popupCaptionElement.textContent = name
    }
  }
}

export default PopupWithImage
