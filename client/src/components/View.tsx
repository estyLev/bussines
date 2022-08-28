import React, { ChangeEvent } from "react";
import { ProducstList, producstList, Product } from "../Data";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { any } from "ramda";
import { wait } from "@testing-library/user-event/dist/utils";
import productService from "../service/productRequest";

type MyState = {
  currentProducts: Array<Product>;
  selectedOption: string;
  searchEvent: (event: React.ChangeEvent<Element>) => void;
  flagPrice: boolean;
  range: number;
};

class View extends React.Component<{}, MyState> {
  /**
   *
   */
  constructor(props: any) {
    super(props);
    localStorage.setItem(
      "products",
      JSON.stringify(this.state.currentProducts)
    );
    console.log(localStorage.getItem("products"));
    this.setProduct();
    this.searchList.setProduct();
  }

  state: MyState = {
    currentProducts: [],
    selectedOption: "",
    searchEvent: function (event: ChangeEvent<Element>): void {
      throw new Error("Function not implemented.");
    },
    flagPrice: false,
    range: 0,
  };
  searchList = producstList;
  setProduct = () => {
    productService
      .getAllProducts()
      .then((res: Array<any>) => {
        let temp: Array<Product> = [];
        for (let i = 0; i < res.length; i++) {
          let item = res[i];

          let product = new Product(
            item._id,
            item.name,
            item.categoryCode,
            item.price,
            item.unit,
            item.src
          );
          temp.push(product);
        }
        this.setState({ currentProducts: temp });
      })
      .catch((err: Error) => console.log(err));
  };

  selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    this.setState({ selectedOption: value });

    if (value == "name") {
      this.setState({ searchEvent: this.searchByName });
      this.setState({ flagPrice: false });
    } else if (value == "code") {
      this.setState({ searchEvent: this.searByCode });
      this.setState({ flagPrice: false });
    } else if (value == "category") {
      this.setState({ searchEvent: this.searchByCategory });
      this.setState({ flagPrice: false });
    } else if (value == "price") {
      this.setState({ searchEvent: this.searchByPrice });
      this.setState({ flagPrice: true });
    } else {
      this.searchOutOfStack();
      this.setState({ flagPrice: false });
    }
  };

  searchByName = (event: React.ChangeEvent<Element>) => {
    let str = (event.target as HTMLInputElement).value.toUpperCase();
    let temp = this.searchList.getProducts.filter(
      (p) => p.getName.toUpperCase().indexOf(str) > -1
    );
    this.setState({ currentProducts: temp });
  };
  searByCode = (event: React.ChangeEvent<Element>) => {
    let code = (event.target as HTMLInputElement).value;
    let temp = this.searchList.getProducts.filter((p) => p.getCode == code);
    this.setState({ currentProducts: temp });
  };
  searchByCategory = (event: React.ChangeEvent<Element>) => {
    let code = Number((event.target as HTMLInputElement).value);
    let temp = this.searchList.getProducts.filter(
      (p) => p.getCategoryCode == code
    );
    this.setState({ currentProducts: temp });
  };
  searchByPrice = (event: React.ChangeEvent<Element>) => {
    let price = Number((event.target as HTMLInputElement).value);
    let temp = this.searchList.getProductByPrice(price, this.state.range);

    this.setState({ currentProducts: temp });
  };
  searchOutOfStack = () => {
    let temp = this.searchList.getoutOfStackProducts();
    this.setState({ currentProducts: temp });
  };
  changeRange = (event: React.ChangeEvent<Element>) => {
    let newRange = Number((event.target as HTMLInputElement).value);
    this.setState({ range: newRange });
  };

  render() {
    return (
      <>
        <div id="contiener">
          <select onChange={this.selectChange} id="select">
            <option selected disabled>
              search by ...
            </option>
            <option value="name">name</option>
            <option value="code">code</option>
            <option value="category">category</option>
            <option value="price">price</option>
            <option value="out of stack">out of stack</option>
          </select>
          {this.state.selectedOption && (
            <p id="result">search by: {this.state.selectedOption}</p>
          )}
        </div>
        {this.state.flagPrice && (
          <>
            <br />
            <input
              type="number"
              onChange={this.changeRange}
              placeholder="enter a range"
            ></input>{" "}
            <br />
          </>
        )}
        <input
          type="text"
          name=""
          id="search"
          placeholder="Search..."
          onChange={this.state.searchEvent}
        />

        <MDBTable hover>
          <MDBTableHead>
            <tr>
              <th>name</th>
              <th>id</th>
              <th>categoryCode</th>
              <th>price</th>
              <th>units</th>
              <th>picture</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {this.state.currentProducts != undefined &&
              this.state.currentProducts.length > 0 &&
              this.state.currentProducts.map((item) => (
                <>
                  <tr>
                    <td>{item.getName}</td>
                    <td>{item.getCode}</td>
                    <td>{item.getCategoryCode}</td>
                    <td>{item.getPrice}</td>
                    <td>{item.getUnits}</td>
                    <td>
                      <img src={item.getsrc} className="pic"></img>
                    </td>
                  </tr>
                </>
              ))}
          </MDBTableBody>
        </MDBTable>
      </>
    );
  }
}
export default View;
