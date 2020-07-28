import React, {Component, createContext} from "react";

export const AuthContext = createContext(undefined, undefined)

class AuthContextProvider extends Component{
  state = {
    userName: '',
    title: '',
    token: '',
    isAuthenicated: false
  }

  toggleAuth = (props) => {
    this.setState({...props});
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
