import axios from 'axios';

export function useSendMessage() {
  const sendMessage = async (conversation, body) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/messages',
        JSON.stringify({ conversationId: conversation._id, body }),
        config
      );

      return data;
    } catch (err) {
      throw new Error(err.response.statusText);
    }
  };

  return sendMessage;
}

export function useGetConversation() {
  const getConversation = async (id) => {
    try {
      const { data } = await axios.get(`/conversations/${id}`);

      return data;
    } catch (err) {
      // throw new Error(err.response.statusText);
      console.log(err);
    }
  };

  return getConversation;
}

export function useGetConversations() {
  console.log('am i in here');
  const getConversations = async () => {
    try {
      const { data } = await axios.get('/conversations');

      return data;
    } catch (err) {
      // throw new Error(err.response.statusText);
      console.log(err);
    }
  };

  return getConversations;
}

export function useStartConversation() {
  const startConversation = async (userId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/conversations',
        JSON.stringify({ user: userId }),
        config
      );

      return data;
    } catch (err) {
      // throw new Error(err.response.statusText);
      console.log(err);
    }
  };

  return startConversation;
}
