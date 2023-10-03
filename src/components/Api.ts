import { HttpMethod } from '../utils/enums'
import { type ICard, type IProfile } from '../utils/interfaces'
import { type inputValues } from '../utils/types'

class Api {
  private readonly url: string
  private readonly headers: HeadersInit
  private authHeaders: HeadersInit
  constructor (baseUrl: string, headers: HeadersInit) {
    this.url = baseUrl
    this.headers = headers
    this.authHeaders = headers
  }

  setAuthHeaders = (token: string): void => {
    this.authHeaders = {
      ...this.headers,
      authorization: `Bearer ${token}`
    }
  }

  private readonly ckeckOk = async (res: Response): Promise<any> => {
    if (res.ok) {
      return await res.json()
    } else {
      return await Promise.reject(new Error(`Ошибка: ${res.status}`))
    }
  }

  private readonly fetcher = async (method: HttpMethod, path: string, body?: inputValues, notSave?: string): Promise<any> => {
    const reqOptions: RequestInit = {
      method,
      headers: notSave !== undefined ? this.headers : this.authHeaders
    }
    if (body !== undefined) reqOptions.body = JSON.stringify(body)

    return await fetch(`${this.url}${path}`, reqOptions).then(this.ckeckOk)
  }

  getUserInfo = async (): Promise<IProfile> => await this.fetcher(HttpMethod.GET, '/users/me')

  registerUser = async (regData: inputValues): Promise<any> => await this.fetcher(HttpMethod.POST, '/signup', regData, 'notSave')

  loginUser = async (loginData: inputValues): Promise<any> => await this.fetcher(HttpMethod.POST, '/signin', loginData, 'notSave')

  getAllCards = async (): Promise<ICard[]> => await this.fetcher(HttpMethod.GET, '/cards')

  updateUserInfo = async (userData: inputValues): Promise<IProfile> => await this.fetcher(HttpMethod.PATCH, '/users/me', userData)

  updateUserAvatar = async (userData: inputValues): Promise<IProfile> => await this.fetcher(HttpMethod.PATCH, '/users/me/avatar', userData)

  addNewCard = async (cardData: inputValues): Promise<ICard> => await this.fetcher(HttpMethod.POST, '/cards', cardData)

  deleteCard = async (id: string): Promise<ICard> => await this.fetcher(HttpMethod.DELETE, `/cards/${id}`)

  changeLikeCardStatus = async (id: string, isLiked: boolean): Promise<any> => {
    const fetchMethod: HttpMethod = isLiked ? HttpMethod.PUT : HttpMethod.DELETE
    return await this.fetcher(fetchMethod, `/cards/${id}/likes`)
  }
}

export default Api
