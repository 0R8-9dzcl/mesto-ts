import { type IProfileSelectors, type IProfile } from '../utils/interfaces'

class ProfileInfo {
  private readonly aboutElement: HTMLParagraphElement | null
  private readonly avatarElement: HTMLImageElement | null
  private readonly nameElement: HTMLHeadingElement | null
  private profileId: string

  constructor ({ nameSelector, avatarSelector, aboutSelector }: IProfileSelectors) {
    this.aboutElement = document.querySelector(aboutSelector)
    this.avatarElement = document.querySelector(avatarSelector)
    this.nameElement = document.querySelector(nameSelector)
  }

  getProfileInfo = (): IProfile => {
    return {
      about: this.aboutElement?.textContent ?? '',
      avatar: this.avatarElement?.src ?? '',
      name: this.nameElement?.textContent ?? ''
    }
  }

  getId = (): string => this.profileId

  setProfileInfo = ({ name = '', about = '', avatar = '', _id = '' }: IProfile): void => {
    if (this.aboutElement instanceof HTMLParagraphElement && about.length > 0) {
      this.aboutElement.textContent = about
    }
    if (this.avatarElement instanceof HTMLImageElement && avatar.length > 0) {
      this.avatarElement.src = avatar
    }
    if (this.nameElement instanceof HTMLHeadingElement && name.length > 0) {
      this.nameElement.textContent = name
    }
    this.profileId = _id
  }
}

export default ProfileInfo
