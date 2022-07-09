//------------------------------
//classes
//------------------------------
export class  Product {
  private name: string;
  private code: number;
  private categoryCode: number;
  private price: number;
  private units: number;
  private picture: string;


  constructor(
    name: string,
    code: number,
    categoryCode: number,
    price: number,
    units: number,
    picture:string
  ) {
    this.name = name;
    this.code = code;
    this.categoryCode = categoryCode;
    this.price = price;
    this.units = units;
    this.picture=picture
  }

  public get getName(): string {
    return this.name;
  }

  public set setName(name: string) {
    this.name = name;
  }

  public get getPrice(): number {
    return this.price;
  }
  public set setPrice(price: number) {
    this.price = price;
  }

  public get getCategoryCode(): number {
    return this.categoryCode;
  }

  public get getCode(): number {
    return this.code;
  }

  public get getUnits(): number {
    return this.units;
  }
  public set setUnits(units: number) {
    this.units = units;
  }

  public get getPicture(): string {
    return this.picture;
  }
  public set setPicture(picture: string) {
    this.picture = picture;
  }

  addToStack = (sum: number) => {
    if (this.units + sum > 0) this.units += sum;
  };
}

export class ProducstList {
  private productsList: Array<Product> = [];

  constructor() {}

  public get getProducts(): Array<Product> {
    return this.productsList;
  }

  addProduct = (
    name: string,
    code: number,
    categoryCode: number,
    price: number,
    units: number,
    picture:string
  ) => {
    let product = new Product(name, code, categoryCode, price, units,picture);
    this.productsList.push(product);
  };

  removeProduct = (code:number) => {
    let index = this.productsList.findIndex((x) => x.getCode === code);
    this.productsList.splice(index, 1);
  };

  getProductByCode = (code:number) => {
    let index = this.productsList.findIndex((x) => x.getCode === code);
    return this.productsList[index];
  };

  getProductByCategoryCode = (code:number) => {
    let index = this.productsList.findIndex((x) => x.getCategoryCode === code);
    return this.productsList[index];
  };

  getProductByPrice = (price:number, range:number) => {
    let products = this.productsList.filter(
      (x) => x.getPrice - price <= range && x.getPrice - price >= -range
    );
    return products;
  };
  getoutOfStackProducts = () => {
    let products = this.productsList.filter((x) => x.getUnits < 3);
    return products;
  };
}

export class Category {

  constructor(private categoryCode:number,private categoryName:string) {
    this.categoryCode = categoryCode;
    this.categoryName = categoryName;
  }

  public get getCategoryName(): string {
    return this.categoryName;
  }

  public set setCategoryName(name: string) {
    this.categoryName = name;
  }

  public get getCategoryCode(): number {
    return this.categoryCode;
  }

}
export class CategoryList {

  private categoryList:Array<Category> = [];

  public get gerCategoryList():Array<Category>{
      return this.categoryList;
  }

  addCategory = (categoryCode:number, categoryName:string) => {
    let category = new Category(categoryCode, categoryName);
    this.categoryList.push(category);
  };
}

export class Manager {

  constructor(private id:number,private name:string) {
    this.id = id;
    this.name = name;
  }

  public get getId():number {
    return this.id;
  }
  public get getName():string {
    return this.name;
  }
}

//------------------------------
//fiels
//------------------------------
let producstList = new ProducstList();
let manager = new Manager(1234, "esty")
let categoryList = new CategoryList()

categoryList.addCategory(10, "computers")
categoryList.addCategory(20, "usb-drives")

producstList.addProduct("dell-computer", 1, 10, 3500, 30,"/bussines/laptop-154091.png")
producstList.addProduct("lenovo-computer-2000", 2, 10, 2500, 25,"/bussines/macbook-926425_1920.png")
producstList.addProduct("sandisk-usb 8gb", 3, 20, 30, 2,"/bussines/stock-photo-usb-flash-drive-closeup-on-white-background-10172347.jpg")
producstList.addProduct("sandisk-cabel", 4, 20, 45, 3,"/bussines/stock-photo-usb-cable-plug-isolated-on-white-background-146098022.jpg ")
producstList.addProduct("lenovo-computer-2012", 5, 10, 3000, 10,"/bussines/stock-photo-thin-laptop-on-office-desk-61225804.jpg")
producstList.addProduct("dell-touch-cocmputer", 6, 10, 6000, 1,"/bussines/sale.png")
producstList.addProduct("cemara", 6, 10, 6000, 1,"/bussines/shutterstock_67026268.jpg")
producstList.addProduct("smartphone", 6, 10, 6000, 1,"/bussines/shutterstock_28846064.jpg")
producstList.addProduct("mouse", 6, 10, 6000, 1,"/bussines/shutterstock_139516253 (1).jpg")


export {producstList};
