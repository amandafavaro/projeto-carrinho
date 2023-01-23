export default class User {
    name: string = '';
    email: string = '';
    password: string = '';
    role: string = '';
    _id: string = '';
      
    constructor(name: string, email: string, password: string, role: string, id: string) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.role = role;
      this._id = id;
    }
  }
  