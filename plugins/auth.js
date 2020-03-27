export default function ({ $axios }, inject) {
  const auth = () => $axios.create({
    baseURL: process.env.AUTH_URL,
    timeout: 5000
  });

  const login = ({ username, password }) => (
    auth().post('login', { username, password })
  )

  const signIn = ({ username, email, password }) => (
    auth().post('signin', { username, email, password })
  )

  inject('auth', { login, signIn })
}