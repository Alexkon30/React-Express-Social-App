import { makeAutoObservable } from 'mobx'
import FormStore from './formStore'
import UserStore from './userStore'
import ClientStore from './clientStore'

class MainStore {
  mode = 'login'
  isAuth = false
  isLoad = false
  messages = []
  // checked = false

  // setChecked(bool) {
  //   this.checked = bool
  // }

  constructor() {
    makeAutoObservable(this)

    this.FormStore = new FormStore()
    this.UserStore = new UserStore()
    this.ClientStore = new ClientStore()
  }

  // FormStore = new FormStore()
  // UserStore = new UserStore()
  // ClientStore = new ClientStore()

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

  setMessages(newMessagesArray) {
    this.messages = newMessagesArray
  }
}

export default new MainStore()
