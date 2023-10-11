class Section<Type> {
  private readonly placeContainer: HTMLUListElement | null
  private readonly renderer: (item: Type, delayMultiplier: number) => HTMLLIElement

  constructor (sectionSelector: string, renderer: (item: Type, delayMultiplier: number) => HTMLLIElement) {
    this.placeContainer = document.querySelector(sectionSelector)
    this.renderer = renderer
  }

  readonly renderItems = (items: Type[]): void => {
    items.forEach((item, index) => {
      const newItem = this.renderer(item, index + 1)
      const timer = setTimeout(() => {
        if (this.placeContainer != null) {
          this.placeContainer.append(newItem)
        }
        clearTimeout(timer)
      }, 300 * (index + 1))
    })
  }

  readonly insertItem = (item: HTMLLIElement): void => {
    if (this.placeContainer != null) {
      this.placeContainer.prepend(item)
    }
  }
}

export default Section
