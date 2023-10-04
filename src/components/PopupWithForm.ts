import { type inputValues } from '../utils/types'
import Popup from './Popup'

class PopupWithForm extends Popup {
  private readonly formElement: HTMLFormElement | null
  private readonly inputList: HTMLInputElement[]
  private readonly initSubmitText: string
  private readonly loadingSubmitText: string
  private readonly submitButtonElement: HTMLButtonElement
  private isLoading: boolean

  private submitCallback: (inputData: inputValues) => Promise<any>

  constructor (
    popupSelector: string,
    loadingSubmitText: string,
    submitCallback: (inputData: inputValues) => Promise<any>
  ) {
    super(popupSelector)
    this.formElement = this.popupElement?.querySelector('.popup__form') as HTMLFormElement
    this.inputList = Array.from(this.formElement?.querySelectorAll('.popup__input '))
    this.submitButtonElement = this.popupElement?.querySelector('.popup__submit') as HTMLButtonElement

    if (typeof this.submitButtonElement.textContent === 'string') {
      this.initSubmitText = this.submitButtonElement.textContent
      this.loadingSubmitText = loadingSubmitText
    }

    this.submitCallback = submitCallback
    this.isLoading = false
  }

  resetSubmitCallback = (newCallback: () => Promise<any>): void => {
    this.submitCallback = newCallback
  }

  setInputValues = (inputValues: inputValues): void => {
    this.inputList.forEach((input) => {
      input.value = inputValues[input.name]
    })
  }

  private readonly getInputValues = (): inputValues => {
    const inputValues: inputValues = {}
    this.inputList.forEach((input) => {
      inputValues[input.name] = input.value
    })
    return inputValues
  }

  private readonly setSubmitButtonState = (state: string): void => {
    this.submitButtonElement.textContent = state
    this.submitButtonElement.disabled = this.isLoading
  }

  private readonly setIsLoading = (state: boolean): void => {
    this.isLoading = state
    if (this.isLoading) {
      this.setSubmitButtonState(this.loadingSubmitText)
    } else {
      this.setSubmitButtonState(this.initSubmitText)
    }
  }

  private readonly handleSubmit = (event: Event): void => {
    event.preventDefault()
    this.setIsLoading(true)
    this.submitCallback(this.getInputValues())
      .then(() => {
        this.close()
      })
      .finally(() => {
        this.setIsLoading(false)
      })
  }

  setEventListeners = (): void => {
    super.setEventListeners()
    this.formElement?.addEventListener('submit', this.handleSubmit)
  }
}

export default PopupWithForm
