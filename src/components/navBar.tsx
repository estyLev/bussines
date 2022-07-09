import React from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from "mdbreact";
import { NavLink } from "react-router-dom";
import './style.css'




const BreadcrumbPage = () => {
  return (
   
      
      <MDBBreadcrumb color="default-color" className="nav" >
        <img src="/bussines/logo.png" width={"150px"}></img>
        <NavLink to="/HomePage" className="white-text"> Home</NavLink>
        <NavLink to="/About" className="white-text">  About</NavLink>
        <NavLink to="/View" className="white-text">  View</NavLink>
        <NavLink to="/LoginManager" className="white-text">  Manager</NavLink>

      </MDBBreadcrumb>
    
  );
};

export default BreadcrumbPage;