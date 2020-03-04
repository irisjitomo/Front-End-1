import axios from "axios";
import {AxiosWithAuth} from '../utils/axiosWithAuth';

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const register = creds => dispatch => {
  dispatch({ type: REGISTER_START });
  return AxiosWithAuth()
    .post("auth/register", creds, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data});
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REGISTER_FAILURE, payload: err });
    });
};

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    return AxiosWithAuth()
      .post("auth/login", creds, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        console.log(res);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.id });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  };