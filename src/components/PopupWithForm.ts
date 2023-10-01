import { type inputValues } from '../utils/types'
import Popup from './Popup'

class PopupWithForm extends Popup {
  private readonly formElement: HTMLFormElement | null
  private readonly inputList: HTMLInputElement[]
  private submitCallback: (inputData: inputValues) => void

  constructor (popupSelector: string, submitCallback: (inputData: inputValues) => void) {
    super(popupSelector)
    this.formElement = this.popupElement?.querySelector('.popup__form') as HTMLFormElement
    this.inputList = Array.from(this.formElement?.querySelectorAll('.popup__input '))
    this.submitCallback = submitCallback
  }

  resetSubmitCallback = (newCallback: () => void): void => {
    this.submitCallback = newCallback
  }

  setInputValues = (inputValues: inputValues): void => {
    console.log(inputValues)
    this.inputList.forEach((input) => {
      console.log(input)
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

  private readonly handleSubmit = (event: Event): void => {
    event.preventDefault()
    this.submitCallback(this.getInputValues())
    this.close()
  }

  setEventListeners = (): void => {
    super.setEventListeners()
    this.formElement?.addEventListener('submit', this.handleSubmit)
  }
}

export default PopupWithForm
