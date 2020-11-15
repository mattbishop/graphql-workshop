import {EventSink} from "../event-sink"
import {MatchCompleted, MatchEntity, MatchStarted} from "./events"
import {playGame} from "./game-play"
import {chance, Match, oppositePlayer, Player} from "./table-tennis"


export async function playMatch(sink: EventSink, match: Match, tourneyKey: string, matchNumber: number): Promise<string> {
  const entity = new MatchEntity(`${tourneyKey}~${matchNumber}`)
  const [player1, player2] = match.players

  console.info(`starting match ${matchNumber}, ${player1} vs. ${player2}`)

  await sink(new MatchStarted(entity, tourneyKey, player1, player2))

  // pick a starting server
  let server = chance.bool()
    ? Player.ONE
    : Player.TWO

  let gameNumber = 1
  const wins = [0, 0]

  while (gameNumber <= 3 || Math.abs(wins[0] - wins[1]) < 2) {
    const game = await playGame(sink, entity.key, gameNumber++, [player1, player2], server)
    wins[game.winner]++
    console.info(`    Game ${gameNumber - 1} won by ${match.players[game.winner]}`)
    server = oppositePlayer(server)
  }

  const winner = wins[Player.ONE] > wins[Player.TWO] ? Player.ONE : Player.TWO
  const winnerKey = match.players[winner]
  await sink(new MatchCompleted(entity, winnerKey))
  console.info(`(${entity.key}) Winner: ${winnerKey} ${wins[Player.ONE]} to ${wins[Player.TWO]}`)

  return winnerKey
}

