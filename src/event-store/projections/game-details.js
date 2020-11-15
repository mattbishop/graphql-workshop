fromCategory("game")
  .foreachStream()
  .when({
    $init: () => ({
      score: {
        player1: 0,
        player2: 0
      }
    }),

    "game-started": (state, event) => {
      ({player1Key: state.player1,
        player2Key: state.player2
      } = event.data)
    },

    "ball-served": null, // player: number (should be key?)

    "ball-out": null, // player: number

    "ball-returned": null, // player: number

    "game-completed": (state, event) => {
      ({winner: state.winner} = event.data)
    }
  })
