import axios from 'axios';

const auth = {
  login: async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth', data);
      const { status, data: { user } } = response;
      if (status === 200) return user;
      return { message: 'user not found' };
    } catch (e) {
      console.log(e);
    }
  }
}

export default auth;
