export default class UserDto {
    name: string = '';
    email: string = '';
    role: string = '';
    _id: string = '';
      
    constructor(name: string, email: string, role: string, id: string) {
      this.name = name;
      this.email = email;
      this.role = role;
      this._id = id;
    }
  }
  