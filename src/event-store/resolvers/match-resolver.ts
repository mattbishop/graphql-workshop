import {Match, MatchResolvers, Player} from "../../graphql/gen/types"
import {SendToESƒ} from "../index"
import {detailsProjection} from "./get-projection"


export function initMatchResolver(sendƒ: SendToESƒ): MatchResolvers {
  return {
    player1: (p) => getPlayer1(sendƒ, p),
    player2: (p) => getPlayer2(sendƒ, p),
  }
}

async function getPlayer1(sendƒ:  SendToESƒ,
                          parent: Match): Promise<Player> {
  const {key} = parent
  const {player1} = await detailsProjection(sendƒ, "match", key)
  return {
    key: player1
  } as Player
}

async function getPlayer2(sendƒ:  SendToESƒ,
                          parent: Match): Promise<Player> {
  const {key} = parent
  const {player2} = await detailsProjection(sendƒ, "match", key)
  return {
    key: player2
  } as Player
}
