import axios from 'axios';

export function useLogout() {
  const logout = async () => {
    try {
      await axios.get('/auth/logout');
    } catch (err) {
      throw new Error('Logout Failed');
    }
  };
  return logout;
}
