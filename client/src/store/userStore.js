export default class UserStore {
  user = {
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

  setUserAttr(attr, value) {
    this.user[attr] = value
  }

  setUser(obj) {
    this.user = obj
  }

  clearUser() {
    this.user = {
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
