fromCategory("player")
  .when({
    $init: () => ({}),

    "player-registered": (state, event) => {
      const {key, name, country} = event.data
      state[event.streamId] = {
        key,
        name,
        country
      }
    }
  })
