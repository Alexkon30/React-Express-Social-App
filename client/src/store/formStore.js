// import { makeAutoObservable } from 'mobx'

export default class FormStore {
  form = {
    username: '',
    email: '',
    password: '',
    confirmedPass: '',
    agreement: false
  }

  // constructor() {
  //   makeAutoObservable(this)
  // }

  setFormAttr(attr, value) {
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
