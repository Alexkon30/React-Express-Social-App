import { makeAutoObservable } from 'mobx'
import FormStore from './formStore'
import UserStore from './userStore'
import ClientStore from './clientStore'

class MainStore {
  mode = 'login'
  isAuth = false
  isLoad = false
  messages = []

  constructor() {
    makeAutoObservable(this)

    this.FormStore = new FormStore()
    this.UserStore = new UserStore()
    this.ClientStore = new ClientStore()
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
    this.messages.push(msgObj)
  }

  removeMessageById(msgId) {
    this.messages = this.messages.filter(msg => msg.id !== msgId)
  }

  setMessages(array) {
    this.messages = array
  }
}

export default new MainStore()
