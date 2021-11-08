import { makeAutoObservable } from 'mobx'
import FormStore from './formStore'
import UserStore from './userStore'
import ClientStore from './clientStore'

export default class MainStore {
  messages = []
  mode = 'login'
  isLoad = false
  token = ''

  constructor() {
    makeAutoObservable(this)
  }

  FormStore = new FormStore()
  UserStore = new UserStore()
  ClientStore = new ClientStore()

  get isAuth() {
    return !!this.token
  }

  login(newToken, user) {
    this.token = newToken
    localStorage.setItem('token', newToken)
    localStorage.setItem('userData', user)
  }

  checkToken() {
    let storageToken = localStorage.getItem('token')
    this.token = storageToken || ''
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    this.token = ''
  }

  setMode(newMode) {
    this.mode = newMode
  }

  setAuth(bool) {
    this.isAuth = bool
  }

  setLoad(bool) {
    this.isLoad = bool
  }

  addMessage(msgObj) {
    // console.log('push')
    this.messages.push(msgObj)
  }

  removeMessageById(msgId) {
    this.messages = this.messages.filter(msg => msg.id !== msgId)
  }

  setMessages(newMessagesArray) {
    this.messages = newMessagesArray
  }
}
