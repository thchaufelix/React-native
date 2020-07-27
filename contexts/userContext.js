import React, {Component, createContext} from "react";

export const AuthContext = createContext()

class AuthContextProvider extends Component{
  state = {
    userName: 'tester 1231',
    title: 'Tester',
    token: '123abcd',
    isAuthenicated: false
  }

  toggleAuth = (props) => {
    this.setState({
      isAuthenicated: props.isAuthenicated,
      userName: props.userName,
      title: props.title
    });
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
