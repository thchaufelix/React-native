import React, {Component, createContext} from "react";

export const AuthContext = createContext()

class AuthContextProvider extends Component{
  state = {
    isAuthenicated: false
  }
  toggleAuth = () => {
    this.setState({isAuthenicated: !this.state.isAuthenicated})
  }
  render() {
    return (
      <AuthContext.Provider value={{...this.state, toggleAuth: this.toggleAuth}}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default AuthContextProvider
