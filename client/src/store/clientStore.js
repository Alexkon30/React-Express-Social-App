import { makeAutoObservable } from 'mobx'

export default class ClientStore {
  client = {
    id: '',
    name: '',
    surname: '',
    biography: '',
    birthday: '',
    dateOfRegistration: '',
    dialogues: [],
    posts: [],
    friends: []
  }

  constructor() {
    makeAutoObservable(this)
  }

  setClientAttr(attr, value) {
    this.client[attr] = value
  }

  setClient(obj) {
    this.client = obj
  }

  clearUser() {
    this.client = {
      id: '',
      name: '',
      surname: '',
      biography: '',
      birthday: '',
      dateOfRegistration: '',
      dialogues: [],
      posts: [],
      friends: []
    }
  }
}
