export default class Product {
    name: string = '';
    price: number = 0;
    _id: string = '';
      
    constructor(name: string, price: number, id: string) {
      this.name = name;
      this.price = price;
      this._id = id;
    }
  }
  