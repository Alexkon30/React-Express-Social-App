import { makeAutoObservable } from 'mobx'

export default class ClientStore {

  constructor() {
    makeAutoObservable(this)
  }

  client = {
    id: '',
    name: '',
    surname: '',
    biography: '',
    birthday: '',
    dateOfRegistration: '',
    posts: [],
    friends: []
  }

  setClientAttr(attr, value) {
    this.client[attr] = value
  }

  setClient(obj) {
    this.client = obj
  }

  clearClient() {
    this.client = {
      id: '',
      name: '',
      surname: '',
      biography: '',
      birthday: '',
      dateOfRegistration: '',
      posts: [],
      friends: []
    }
  }
}
