import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { isValidToken, setupLocalStorage } from "@/auth/utils";
import { loginAuth } from "@/dataProvider/authApi";
import snackbarUtils from "@/utils/snackbar-utils";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;
    var userId = localStorage.getItem("userId");
    var access_token = localStorage.getItem("access_token");

    try {
      isAuthenticated = userId && isValidToken(access_token);
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: userId,
        username: "No Name",
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (username, password) => {
    try {
      const responseLogin = await loginAuth({ username, password });

      if (responseLogin.status < 400) {
        setupLocalStorage(responseLogin.data.accessToken);
        localStorage.setItem("userId", responseLogin.data.userId);
        snackbarUtils.success("Đăng nhập thành công");
        const user = {
          id: responseLogin?.data?.userId,
          username: username,
        };

        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user,
        });
      }

      return responseLogin;
    } catch (err) {
      console.error(err);
    }
  };
  const signOut = () => {
    setupLocalStorage("");
    localStorage.removeItem("userId");
    localStorage.removeItem("access_token");
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
