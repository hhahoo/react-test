import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Typography,
  Box
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import axios from 'axios';

// styles
import useStyles from "./styles";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

import axiosInstance from "../../common/axios";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  async function getUserIdFromCube() {
    try {
      const response = await axios.get('https://sso.hyundai.net:8443/encriptloginprocess.aspx', {
        withCredentials: true,
        responseType: 'text'
      });

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");

      const value = xmlDoc.getElementsByTagName("MAIN_USER_ID")[0].childNodes[0].nodeValue;
      console.log(value);
      return value;
    } catch (error) {
      console.error('Error fetching XML data:', error);
      //setError(true);
      return null;
    }
  }

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(async () => {
    setIsLoading(true);
    var loginId = null;
    var isLoggedIn;
    var cubeUserId = await getUserIdFromCube();
    try {
      const data = {
        userId: cubeUserId
      };
      const response = await axiosInstance.post('/v1/login', data);
      if (response.status === 200) {
        isLoggedIn = true;
        loginId = response.data.result;
      } else {
        isLoggedIn = false;
      }
    } catch (error) {
      console.error('Error login API:', error);
      isLoggedIn = false;
      console.log("Login API call failed.")
    }
    loginUser(
      userDispatch,
      loginId,
      isLoggedIn,
      props.history,
      setIsLoading,
      setError,
    )
  }, []);
  return (
    <Box>
      <div className={classes.logotypeContainer}>
        <Typography className={classes.logotypeText}>Terminal Project Admin</Typography>
      </div>
      {isLoading ? (<CircularProgress size={26} className={classes.loginLoader} />) : null}
    </Box>
  );
}

export default withRouter(Login);
