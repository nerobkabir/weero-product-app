import { createContext, useReducer, useEffect, useCallback } from 'react';
import { authAPI } from '../utils/api';

export const AuthContext = createContext(null);

// ── Action types ──────────────────────────────────────────────────────────────
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  AUTH_ERROR: 'AUTH_ERROR',
};

// ── Initial state ─────────────────────────────────────────────────────────────
const initialState = {
  user: JSON.parse(localStorage.getItem('weero-user')) || null,
  token: localStorage.getItem('weero-token') || null,
  isAuthenticated: !!localStorage.getItem('weero-token'),
  loading: true,
  error: null,
};

// ── Reducer ───────────────────────────────────────────────────────────────────
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.AUTH_ERROR:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// ── Helper: persist to localStorage ──────────────────────────────────────────
const persistAuth = (token, user) => {
  localStorage.setItem('weero-token', token);
  localStorage.setItem('weero-user', JSON.stringify(user));
};

const clearAuth = () => {
  localStorage.removeItem('weero-token');
  localStorage.removeItem('weero-user');
};

// ── Provider ──────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('weero-token');
      if (!token) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return;
      }
      try {
        const res = await authAPI.getMe();
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user: res.data.data, token },
        });
      } catch {
        clearAuth();
        dispatch({ type: AUTH_ACTIONS.AUTH_ERROR, payload: 'Session expired' });
      }
    };

    loadUser();
  }, []);

  // ── Register ────────────────────────────────────────────────────────────────
  const register = useCallback(async (name, email, password) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await authAPI.register({ name, email, password });
      const { token, data: user } = res.data;
      persistAuth(token, user);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: { user, token } });
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed';
      dispatch({ type: AUTH_ACTIONS.AUTH_ERROR, payload: message });
      return { success: false, message };
    }
  }, []);

  // ── Login ───────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await authAPI.login({ email, password });
      const { token, data: user } = res.data;
      persistAuth(token, user);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: { user, token } });
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed';
      dispatch({ type: AUTH_ACTIONS.AUTH_ERROR, payload: message });
      return { success: false, message };
    }
  }, []);

  // ── Logout ──────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    clearAuth();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};