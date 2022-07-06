import React from "react";
import FormPage from "./Login";
import { producstList } from "../Data";
import { MDBBtn } from "mdbreact";


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

  name:string="";
  id:number=0;
  price:number=0;
  category:number=0;
  units:number=0;
  src:string="logo.png"

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
  addProduct = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.name=((event.target as HTMLFormElement)[0] as HTMLInputElement).value;
    this.id=Number(((event.target as HTMLFormElement)[1] as HTMLInputElement).value);
    this.category=Number(((event.target as HTMLFormElement)[2] as HTMLInputElement).value);
    this.price=Number(((event.target as HTMLFormElement)[3] as HTMLInputElement).value);
    this.units=Number(((event.target as HTMLFormElement)[4] as HTMLInputElement).value);

    producstList.addProduct(this.name,this.id,this.category,this.price,this.units,this.src)
    console.log(producstList.getProducts);
    
    this.setState({flagAdd:false})
  };

  deleteProduct = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.id=Number(((event.target as HTMLFormElement)[0] as HTMLInputElement).value);
    producstList.removeProduct(this.id)
    this.setState({flagDlete:false})

  }
  editProduct=(event : React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    this.name=((event.target as HTMLFormElement)[0] as HTMLInputElement).value;
    this.id=Number(((event.target as HTMLFormElement)[1] as HTMLInputElement).value);
    this.category=Number(((event.target as HTMLFormElement)[2] as HTMLInputElement).value);
    this.price=Number(((event.target as HTMLFormElement)[3] as HTMLInputElement).value);
    this.units=Number(((event.target as HTMLFormElement)[4] as HTMLInputElement).value);

   producstList.getProductByCode(this.id).setName=this.name;
   producstList.getProductByCode(this.id).setPrice=this.price;
   producstList.getProductByCode(this.id).setUnits=this.units;

   
    
    this.setState({flagEdit:false})
  }
  render() {
    return (
      <>
        <input type="button" value="delete" onClick={this.deleteEvent} />
        <input type="button" value="add" onClick={this.addEvent} />
        <input type="button" value="edit" onClick={this.editEvent} />
        <br />
        {this.state.flagDlete && (<form onSubmit={this.deleteProduct}>
          <input type="number" placeholder="enter id product to delete"></input><br />
          <button type="submit">ok</button>
        </form>)}
        {this.state.flagAdd && (
          <form onSubmit={this.addProduct}>
            <input type="text" placeholder="enter product name" id="name"></input>
            <br />
            <input type="number" placeholder="enter product id " id="id"></input>
            <br />
            <input
              type="number"
              placeholder="enter product category code" id="categoryCode"
            ></input>
            <br />
            <input type="number" placeholder="enter product price" id="price"></input>
            <br />
            <input type="number" placeholder="enter product units" id="units"></input>
            <br />
            <button type="submit">ok</button>
          </form>
        )}
        {this.state.flagEdit && (
          <form onSubmit={this.editProduct}>
            <input type="text" placeholder="enter product name" id="name"></input>
            <br />
            <input type="number" placeholder="enter product id " id="id"></input>
            <br />
            <input
              type="number"
              placeholder="enter product category code" id="categoryCode"
            ></input>
            <br />
            <input type="number" placeholder="enter product price" id="price"></input>
            <br />
            <input type="number" placeholder="enter product units" id="units"></input>
            <br />
            <button type="submit">ok</button>
          </form>          )}
      </>
    );
  }
}
export default Manager;
