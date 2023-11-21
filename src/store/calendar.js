export default {
  state: {
    date: new Date()
  },
  mutations: {
    setDate(state, newDate) {
      state.date = newDate
    }
  }
}