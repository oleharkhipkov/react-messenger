import axios from 'axios';

export function useSearchUsers() {
  const searchUsers = async (searchString) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/users',
        JSON.stringify({ searchString }),
        config
      );

      return data;
    } catch (err) {
      throw new Error('Failed to Search Users');
    }
  };

  return searchUsers;
}
