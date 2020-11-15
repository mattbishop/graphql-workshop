fromCategory("tournament")
  .when({
    $init: () => ({}),

    "tournament-created": (state, event) => {
      const {key, name} = event.data
      state[event.streamId] = {
        key,
        name,
        completed: false
      }
    },

    "tournament-completed": (state, event) => {
      state[event.streamId].completed = true
    }
  })
