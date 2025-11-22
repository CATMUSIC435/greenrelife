// src/context/UserContext.tsx
import type { ReactNode } from 'react';
import React, { createContext, useEffect, useState } from 'react';

type User = {
  id: number;
  username: string;
  email: string;
  name?: string;
};

type UserContextType = {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    const res = await fetch('https://greenrelife.dxmd.vn/wp-json/jwt-auth/v1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Login failed');
    }

    const data = await res.json();
    localStorage.setItem('wp_token', data.token);
    setToken(data.token);
    // eslint-disable-next-line ts/no-use-before-define
    fetchUser(data.token);
  };

  const logout = () => {
    localStorage.removeItem('wp_token');
    setUser(null);
    setToken(null);
  };

  const fetchUser = async (token: string) => {
    try {
      const res = await fetch('https://your-domain.com/wp-json/wp/v2/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  useEffect(() => {
    // Lấy token từ localStorage
    const t = localStorage.getItem('wp_token');
    if (t) {
      setToken(t);
      fetchUser(t);
    }
  }, []);

  return (
    <UserContext value={{ user, token, login, logout }}>
      {children}
    </UserContext>
  );
};
