import {EventSink} from "../event-sink"
import {BallOut, BallReturned, BallServed, GameEntity} from "./events"
import {chance, oppositePlayer, Player, Rally} from "./table-tennis"


export async function playRally(sink:   EventSink,
                                game:   GameEntity,
                                server: Player): Promise<Rally> {

  const serveEvent = serveBall(game, server)
  await sink(serveEvent)

  const receiver = oppositePlayer(server)
  const rally = {winner: receiver, receiver}
  return serveEvent instanceof BallOut
    ? rally
    : rallyReturn(sink, game, rally)
}

async function rallyReturn(sink: EventSink, game: GameEntity, rally: Rally): Promise<Rally> {
  const rallyEvent = returnBall(game, rally.receiver)
  await sink(rallyEvent)

  const nextReceiver = oppositePlayer(rally.receiver)
  const nextRally = {winner: nextReceiver, receiver: nextReceiver}
  return (rallyEvent instanceof BallOut)
    ? nextRally
    : rallyReturn(sink, game, nextRally)
}

function serveBall(game: GameEntity, server: Player): BallServed | BallOut {
  return chance.bool({likelihood: 60})
    ? new BallServed(game, server)
    : new BallOut(game, server)
}

function returnBall(game: GameEntity, player: Player): BallReturned | BallOut {
  return chance.bool({likelihood: 50})
    ? new BallReturned(game, player)
    : new BallOut(game, player)
}

