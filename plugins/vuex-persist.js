import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    storage: localStorage,
    modules: ['auth']
  }).plugin(store);
}