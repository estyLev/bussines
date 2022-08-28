import React from "react";
import { MDBBtn } from "mdbreact";
import "./style.css";
import Form from "./Form";
import productService from "../service/productRequest";
import { Product } from "../Data";

type MyState = {
  flagDlete: boolean;
  flagAdd: boolean;
  flagEdit: boolean;
};

class Manager extends React.Component<{}, MyState> {
  state: MyState = {
    flagDlete: false,
    flagAdd: false,
    flagEdit: false,
  };

  name: string = "";
  id: string = "";
  price: number = 0;
  category: number = 0;
  units: number = 0;
  src: string = "/bussines/logo.png";

  deleteEvent = () => {
    this.setState({
      flagDlete: !this.state.flagDlete,
      flagAdd: false,
      flagEdit: false,
    });
  };
  addEvent = () => {
    this.setState({
      flagAdd: !this.state.flagAdd,
      flagEdit: false,
      flagDlete: false,
    });
  };
  editEvent = () => {
    this.setState({
      flagEdit: !this.state.flagEdit,
      flagDlete: false,
      flagAdd: false,
    });
  };
  addProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.id = ((event.target as HTMLFormElement)[0] as HTMLInputElement).value;
    this.name = (
      (event.target as HTMLFormElement)[1] as HTMLInputElement
    ).value;

    this.category = Number(
      ((event.target as HTMLFormElement)[2] as HTMLInputElement).value
    );
    this.price = Number(
      ((event.target as HTMLFormElement)[3] as HTMLInputElement).value
    );
    this.units = Number(
      ((event.target as HTMLFormElement)[4] as HTMLInputElement).value
    );
    let product = new Product(
      this.id,
      this.name,
      this.category,
      this.price,
      this.units,
      this.src
    );
    productService
      .addProduct(product)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: Error) => console.log(err));

    this.setState({ flagAdd: false });
  };

  deleteProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.id = ((event.target as HTMLFormElement)[0] as HTMLInputElement).value;
    productService
      .deleteProduct(this.id)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: Error) => console.log(err));

    this.setState({ flagDlete: false });
  };
  product: Product = new Product("", "", 0, 0, 0, "");
  editProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.id = ((event.target as HTMLFormElement)[0] as HTMLInputElement).value;
    productService.getProductById(this.id).then((res: any) => {
      console.log(res);

      this.name = (
        (event.target as HTMLFormElement)[1] as HTMLInputElement
      ).value;

      this.category = Number(
        ((event.target as HTMLFormElement)[2] as HTMLInputElement).value
      );

      this.price = Number(
        ((event.target as HTMLFormElement)[3] as HTMLInputElement).value
      );
      this.units = Number(
        ((event.target as HTMLFormElement)[4] as HTMLInputElement).value
      );
      if (this.name == "") this.name = res[0]?.name;
      if (this.price == 0) this.price = res[0]?.price;
      if (this.category == 0) this.category = res[0]?.categoryCode;
      if (this.units == 0) this.units = res[0]?.units;
      this.src = res[0]?.src;
      this.product = new Product(
        this.id,
        this.name,
        this.category,
        this.price,
        this.units,
        this.src
      );
      productService
        .editProduct(this.product, this.id)
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: Error) => console.log(err));

      this.setState({ flagEdit: false });
    });
  };
  render() {
    return (
      <>
        <input
          type="button"
          value="delete"
          onClick={this.deleteEvent}
          className="btn"
        />
        <input
          type="button"
          value="add"
          onClick={this.addEvent}
          className="btn"
        />
        <input
          type="button"
          value="edit"
          onClick={this.editEvent}
          className="btn"
        />
        <br />
        <br />
        {this.state.flagDlete && (
          <form onSubmit={this.deleteProduct}>
            <input type="text" placeholder="enter id product to delete"></input>
            <br />
            <button type="submit" className="btn">
              ok
            </button>
          </form>
        )}
        {this.state.flagAdd && (
          <>
            {" "}
            <h2>add form</h2> <Form onsubmit={this.addProduct}></Form>
          </>
        )}
        {this.state.flagEdit && (
          <>
            {" "}
            <h2>edit form</h2> <Form onsubmit={this.editProduct}></Form>
          </>
        )}
      </>
    );
  }
}
export default Manager;
