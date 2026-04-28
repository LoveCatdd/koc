"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/index";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserInfo, logout, login as reduxLogin } from "@/store/user";
import type { User } from "@/types";
import type { ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContent: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userState.token && userState.pulling_info) {
      dispatch(fetchUserInfo(userState.token));
    }
  }, [dispatch, userState.token, userState.pulling_info]);

  const login = async (username: string, password: string) => {
    try {
      const result = await dispatch(reduxLogin({ username, password }));
      if (reduxLogin.fulfilled.match(result)) {
        await dispatch(fetchUserInfo(result.payload));
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Failed to login:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const user: User | null = userState.is_login
    ? {
        id: userState.id,
        username: userState.username,
        password: "",
        photo: userState.photo,
        rating: userState.rating,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token: userState.token || null,
        isLoading: userState.pulling_info,
        login,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthContent>{children}</AuthContent>
      </PersistGate>
    </Provider>
  );
};
