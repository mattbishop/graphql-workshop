fromCategory("player")
  .foreachStream()
  .when({
    $init: () => ({}),

    "player-registered": (state, event) => {
      ({
        key:      state.key,
        name:     state.name,
        country:  state.country
      } = event.data)
    }
  })
