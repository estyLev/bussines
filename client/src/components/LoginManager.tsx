import React from "react";
import { manager } from "../Data";
import Manager from "./Manager";
type MyState = {
  flag: boolean;
  formFlag: boolean;
};
class LoginManager extends React.Component<{}, MyState> {
  state: MyState = {
    flag: false,
    formFlag: true,
  };
  name: string = "";
  id: number = 0;
  submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.name = (
      (event.target as HTMLFormElement)[0] as HTMLInputElement
    ).value;
    this.id = Number(
      ((event.target as HTMLFormElement)[1] as HTMLInputElement).value
    );
    if (this.name == manager.getName && this.id == manager.getId) {
      this.setState({ flag: true, formFlag: false });
    } else alert("you have no premition");
  };

  render() {
    return (
      <>
        {this.state.formFlag && (
          <form onSubmit={this.submit}>
            <input type="text" id="name" placeholder="enter manager name" />
            <br />
            <input
              type="password"
              id="password"
              placeholder="enter manager password"
            />
            <br />
            <button type="submit" className="btn">
              ok
            </button>
          </form>
        )}

        {this.state.flag && <Manager></Manager>}
      </>
    );
  }
}
export default LoginManager;
