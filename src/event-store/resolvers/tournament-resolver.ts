import {Match, Maybe, Player, Tournament, TournamentResolvers} from "../../graphql/gen/types"
import {SendToESƒ} from "../index"
import {detailsProjection} from "./get-projection"

export function initTournamentResolver(sendƒ: SendToESƒ): TournamentResolvers {
  return {
    name:     (p) => getName(sendƒ, p),
    matches:  (p) => getMatches(sendƒ, p),
    winner:   (p) => getWinner(sendƒ, p)
  }
}

async function getName(sendƒ:   SendToESƒ,
                       parent:  Tournament): Promise<string> {
  const {key} = parent
  const {name} = await detailsProjection(sendƒ, "tournament", key)
  return name
}

async function getMatches(sendƒ:  SendToESƒ,
                          parent: Tournament): Promise<Maybe<Match[]>> {
  const {key} = parent
  const {matches} = await detailsProjection(sendƒ, "tournament", key)
  if (matches?.length) {
    return matches.map((matchKey: string) => ({key: matchKey}))
  }
  return null
}

async function getWinner(sendƒ:   SendToESƒ,
                         parent:  Tournament): Promise<Maybe<Player>> {
  const {key} = parent
  const {winner} = await detailsProjection(sendƒ, "tournament", key)
  if (winner) {
    return {
      key: winner
    } as Player
  }
  return null
}