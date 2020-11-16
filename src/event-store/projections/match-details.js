fromCategory("match")
  .foreachStream()
  .when({
    $init: () => ({}),

    "match-started": (state, event) => {
      ({name:       state.name,
        key:        state.key,
        player1Key: state.player1,
        player2Key: state.player2
      } = event.data)
    }
  })
