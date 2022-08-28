import getAllProducts from "./service/productRequest";
import productService from "./service/productRequest";

//------------------------------
//classes
//------------------------------
export class Product {
  private name: string;
  private code: string;
  private categoryCode: number;
  private price: number;
  private units: number;
  private src: string;

  constructor(
    code: string,
    name: string,
    categoryCode: number,
    price: number,
    units: number,
    src: string
  ) {
    this.code = code;
    this.name = name;
    this.categoryCode = categoryCode;
    this.price = price;
    this.units = units;
    this.src = src;
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

  public get getCode(): string {
    return this.code;
  }

  public get getUnits(): number {
    return this.units;
  }
  public set setUnits(units: number) {
    this.units = units;
  }

  public get getsrc(): string {
    return this.src;
  }
  public set setsrc(src: string) {
    this.src = src;
  }

  addToStack = (sum: number) => {
    if (this.units + sum > 0) this.units += sum;
  };
}

export class ProducstList {
  private productsList: Array<Product> = [];

  constructor() {
    this.setProduct();
  }

  public get getProducts(): Array<Product> {
    return this.productsList;
  }

  addProduct = (
    code: string,
    name: string,
    categoryCode: number,
    price: number,
    units: number,
    src: string
  ) => {
    let product = new Product(code, name, categoryCode, price, units, src);
    this.productsList.push(product);
  };

  removeProduct = (code: string) => {
    let index = this.productsList.findIndex((x) => x.getCode === code);
    this.productsList.splice(index, 1);
  };

  getProductByCode = (code: string) => {
    let index = this.productsList.findIndex((x) => x.getCode === code);
    return this.productsList[index];
  };

  getProductByCategoryCode = (code: number) => {
    let index = this.productsList.findIndex((x) => x.getCategoryCode === code);
    return this.productsList[index];
  };

  getProductByPrice = (price: number, range: number) => {
    let products = this.productsList.filter(
      (x) => x.getPrice - price <= range && x.getPrice - price >= -range
    );
    return products;
  };
  getoutOfStackProducts = () => {
    let products = this.productsList.filter((x) => x.getUnits < 3);
    return products;
  };

  setProduct = () => {
    productService
      .getAllProducts()
      .then((res: Array<any>) => {
        this.productsList = [];
        for (let i = 0; i < res.length; i++) {
          let item = res[i];

          producstList.addProduct(
            item._id,
            item.name,
            item.categoryCode,
            item.price,
            item.unit,
            item.src
          );
        }
      })
      .catch((err: Error) => console.log(err));
  };
}

export class Category {
  constructor(private categoryCode: number, private categoryName: string) {
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
  private categoryList: Array<Category> = [];

  public get gerCategoryList(): Array<Category> {
    return this.categoryList;
  }

  addCategory = (categoryCode: number, categoryName: string) => {
    let category = new Category(categoryCode, categoryName);
    this.categoryList.push(category);
  };
}

export class Manager {
  constructor(private id: number, private name: string) {
    this.id = id;
    this.name = name;
  }

  public get getId(): number {
    return this.id;
  }
  public get getName(): string {
    return this.name;
  }
}

export class user {
  constructor(
    private _id: number,
    private password: string,
    private role: number,
    private firstName: string,
    private lastName: string,
    private email: string,
    private address:Address
  ) {
    this._id = _id;
    this.password = password;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address=address;
  }
}

export class Address{
  
  constructor(private street:string,private city:string,private numBuild:number) {
   this.city=city;
   this.street=street;
   this.numBuild=numBuild;
  }
}

//------------------------------
//fiels
//------------------------------

let manager = new Manager(4321, "esty");
let categoryList = new CategoryList();
let producstList = new ProducstList();

export { manager, producstList };
