import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signin = (fromData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(fromData);

    dispatch({ type: AUTH, data });

    navigate("/", {
      replace: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (fromData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(fromData);

    dispatch({ type: AUTH, data });

    navigate("/", {
      replace: true,
    });
  } catch (error) {
    console.log(error);
  }
};
