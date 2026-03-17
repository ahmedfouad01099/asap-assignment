import { useCallback } from 'react';
import { DB } from './index';

// Auth Hooks
export const useAuthDB = () => {
  const getUserByEmail = useCallback(async (email: string) => {
    const users = await DB.selectAll<any>(
      "SELECT id, email, name, password FROM Users WHERE email = ?",
      [email.toLowerCase().trim()]
    );
    return users.length > 0 ? users[0] : null;
  }, []);

  return { getUserByEmail };
};
