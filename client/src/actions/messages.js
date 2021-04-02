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
      throw new Error('Failed to Send Message');
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
      throw new Error('Failed to Get Conversation');
    }
  };

  return getConversation;
}

export function useGetConversations() {
  const getConversations = async () => {
    try {
      const { data } = await axios.get('/conversations');

      return data;
    } catch (err) {
      throw new Error('Failed to Get Conversations');
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
      throw new Error('Failed to Start Conversation');
    }
  };

  return startConversation;
}
