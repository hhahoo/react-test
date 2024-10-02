import React from "react";

import axiosInstance from "../common/axios";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, isLoggedIn, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (isLoggedIn) {
    setTimeout(() => {
      localStorage.setItem('id_token', 1)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/app/dashboard')
    }, 1000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(null);
    setIsLoading(false);
    history.push('/login-failed');
  }
}

async function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  await callLogoutApi();
  history.push("/login");
}

async function callLogoutApi() {
  console.log("call log out");
  try {
    await axiosInstance.get('/v1/logout');
    console.log("success log out");
  } catch (error) {
    console.log("logout error",error);
  }
}
