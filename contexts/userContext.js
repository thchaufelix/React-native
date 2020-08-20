import React, {Component, createContext} from "react";

export const AuthContext = createContext(undefined, undefined)

class AuthContextProvider extends Component{
  state = {
    userName: '',
    title: '',
    token: '',
    isAuthenicated: false
  }

  setUserInfo = (props) => {
    this.setState({...props});
  }

  render() {
    return (
      <AuthContext.Provider value={{...this.state, setUserInfo: this.setUserInfo}}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default AuthContextProvider
