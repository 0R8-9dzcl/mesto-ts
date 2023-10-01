abstract class Popup {
  protected readonly popupElement: HTMLElement | null

  constructor (popupSelector: string) {
    this.popupElement = document.querySelector(popupSelector)
    this.close = this.close.bind(this)
    this.handleCloseByEvent = this.handleCloseByEvent.bind(this)
  }

  private handleCloseByEvent (event: MouseEvent | KeyboardEvent): void {
    const targetElement = event.target
    const isClickOnPopup = targetElement === event.currentTarget
    const isClickByCloseButton = targetElement instanceof Element && targetElement?.classList.contains('popup__close-button')
    const isEcapeKeyDownEvent = event instanceof KeyboardEvent && event?.key === 'Escape'
    if (isClickOnPopup || isClickByCloseButton || isEcapeKeyDownEvent) {
      this.close()
    }
  }

  setEventListeners (): void {
    this.popupElement?.addEventListener('mousedown', this.handleCloseByEvent)
  }

  open (): void {
    this.popupElement?.classList.add('popup_opened')
    document.addEventListener('keydown', this.handleCloseByEvent)
  }

  protected close (): void {
    document.removeEventListener('keydown', this.handleCloseByEvent)
    this.popupElement?.classList.remove('popup_opened')
  }
}

export default Popup
