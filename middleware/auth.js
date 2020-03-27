export default function ({ store, redirect }) {
  if (store.getters['auth/noAuth']) {
    return redirect({
      name: 'login'
    })
  }
}