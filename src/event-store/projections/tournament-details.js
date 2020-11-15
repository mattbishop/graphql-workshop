fromAll()
  .partitionBy((event) => {
    // partition should look like a streamId to match other details projections
    switch (event.eventType) {
      case "tournament-created":
      case "tournament-completed":
        return `tournament-${event.data.key}`

      case "match-started":
        return `tournament-${event.data.tournamentKey}`

      default:
        return null
    }
  })
  .when({
    $init: () => ({
      matches: []
    }),

    "tournament-created": (state, event) => {
      ({key:  state.key,
        name: state.name
      } = event.data)
    },

    "match-started": (state, event) => {
      state.matches.push(event.data.key)
    },

    "tournament-completed": (state, event) => {
      ({winnerKey: state.winner} = event.data)
    }
  })
