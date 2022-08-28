import { type } from "os";
import React from "react";
import { Product } from "../Data";

type submitProps = {
  onsubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
function Form({ onsubmit }: submitProps) {
  return (
    <>
      <form onSubmit={onsubmit}>
        <input type="text" placeholder="enter product id" id="id"></input>
        <br />
        <input type="text" placeholder="enter product name" id="name"></input>
        <br />

        <input
          type="number"
          placeholder="enter product category code"
          id="categoryCode"
        ></input>
        <br />
        <input
          type="number"
          placeholder="enter product price"
          id="price"
        ></input>
        <br />
        <input
          type="number"
          placeholder="enter product units"
          id="units"
        ></input>
        <br />
        <button type="submit" className="btn">
          ok
        </button>
      </form>
    </>
  );
}
export default Form;
