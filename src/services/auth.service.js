import axios from 'axios';

const auth = {
  login: async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth',
        data,
        { withCredentials: true }
      );
      const { status, data: { success, token } } = response;
      if (status === 200) return { success, token };
      return { message: 'user not found' };
    } catch (e) {
      console.log(e);
    }
  }
}

export default auth;
