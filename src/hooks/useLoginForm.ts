import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useAuthDB } from '../database/hooks';

export const useLoginForm = (onSuccess: () => void) => {
  const { login } = useAuth();
  const { getUserByEmail } = useAuthDB();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    let newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      const user = await getUserByEmail(email);

      if (user) {
        if (user.password === password) {
          login({
            id: user.id,
            email: user.email,
            name: user.name
          });
          onSuccess();
        } else {
          Alert.alert("Error", "Invalid password");
        }
      } else {
        Alert.alert("Error", "User not found");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (field: 'email' | 'password') => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    errors,
    handleLogin,
    clearError
  };
};
