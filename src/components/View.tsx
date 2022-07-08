import React, { ChangeEvent } from "react";
import { producstList, Product } from "../Data";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { any } from "ramda";

type MyState = {
  currentProducts: Array<Product>; 
};

class View extends React.Component<{},MyState> {
  /**
   *
   */
  constructor(props:any) {
    super(props);
    localStorage.setItem('products',JSON.stringify(producstList.getProducts));
    console.log(localStorage.getItem('products'));
    
    
  }
  
   state: MyState = { 
    currentProducts: producstList.getProducts
  };

 search =(event:ChangeEvent)=>{
  let str=(event.target as HTMLInputElement).value.toUpperCase();
 let temp= producstList.getProducts.filter(p=> p.getName.toUpperCase().indexOf(str)>-1)
 this.setState({currentProducts:temp})
  

 }
 
  
  render() {
    return (
      <>
      <input type="text" name="" id="search" placeholder="Search..." onChange={this.search}/>
        <MDBTable hover>
          <MDBTableHead>
            <tr>
              <th>name</th>
              <th>code</th>
              <th>categoryCode</th>
              <th>price</th>
              <th>units</th>
              <th>picture</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
            this.state.currentProducts != undefined &&
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
                      <img src={item.getPicture} className="pic"></img>
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
