import { makeAutoObservable } from 'mobx'

export default class UserStore {

  constructor() {
    makeAutoObservable(this)
  }

  user = {
    id: '',
    name: '',
    surname: '',
    biography: '',
    birthday: '',
    dateOfRegistration: '',
    dialogues: [],
    posts: [],
    friends: [],
    phone: '',
    site: ''
  }

  addPost(post) {
    this.user.posts.push(post)
  }

  deletePostById(id) {
    this.user.posts = this.user.posts.filter(post => post.id !== id)
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
      friends: [],
      phone: '',
      site: ''
    }
  }
}
