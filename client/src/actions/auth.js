import axios from 'axios';

export function useLogin() {
  const login = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/auth/loginx',
        JSON.stringify({ email, password }),
        config
      );

      return data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  };
  return login;
}

export function useRegister() {
  const login = async (username, email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        '/auth/register',
        JSON.stringify({ username, email, password }),
        config
      );

      return data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  };
  return login;
}
