import { makeAutoObservable } from 'mobx'

export default class FormStore {

  constructor() {
    makeAutoObservable(this)
  }

  form = {
    username: '',
    email: '',
    password: '',
    confirmedPass: '',
    agreement: false
  }

  setAttr(attr, value) {
    this.form[attr] = value
  }

  setForm(obj) {
    this.form = obj
  }

  clearForm() {
    this.form = {
      username: '',
      email: '',
      password: '',
      confirmedPass: '',
      agreement: false
    }
  }

}
