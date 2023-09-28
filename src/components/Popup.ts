class Popup {
  private readonly popupElement: HTMLElement | null

  constructor (popupSelector: string) {
    this.popupElement = document.querySelector(popupSelector)
  }

  handleCloseByEvent = (event: MouseEvent | KeyboardEvent): void => {
    const targetElement = event.target
    const isClickOnPopup = targetElement === event.currentTarget
    const isClickByCloseButton = targetElement instanceof Element && targetElement?.classList.contains('popup__close-button')
    const isEcapeKeyDownEvent = event instanceof KeyboardEvent && event?.key === 'Escape'
    if (isClickOnPopup || isClickByCloseButton || isEcapeKeyDownEvent) {
      this.close()
    }
  }

  setClickListener = (): void => {
    this.popupElement?.addEventListener('click', this.handleCloseByEvent)
  }

  open = (): void => {
    this.popupElement?.classList.add('popup_opened')
    document.addEventListener('keydown', this.handleCloseByEvent)
  }

  close = (): void => {
    document.removeEventListener('keydown', this.handleCloseByEvent)
    this.popupElement?.classList.remove('popup_opened')
  }
}

export default Popup
