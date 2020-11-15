import {
  Maybe,
  Player,
  QueryTournamentArgs,
  QueryResolvers,
  Tournament,
  Match
} from "../../graphql/gen/types"
import {SendToESƒ} from "../index"
import {detailsProjection, listProjection} from "./get-projection"


export function initQueries(sendƒ: SendToESƒ): QueryResolvers {
  return {
    players:      () => getPlayers(sendƒ),
    tournaments:  () => getTournaments(sendƒ),
    tournament:   (_, args) => getTournament(sendƒ, args)
  }
}

async function getPlayers(sendƒ: SendToESƒ): Promise<Player[]> {
  const players = await listProjection<Player>(sendƒ, "player")
  players.sort((p1, p2) => p1.name.localeCompare(p2.name))
  return players
}

async function getTournaments(sendƒ: SendToESƒ): Promise<Tournament[]> {
  const tournaments = await listProjection<Tournament>(sendƒ, "tournament")
  tournaments.sort((p1, p2) => p1.name.localeCompare(p2.name))
  return tournaments
}

async function getTournament(sendƒ: SendToESƒ,
                             args:  QueryTournamentArgs): Promise<Maybe<Tournament>> {
  const {key} = args
  const {name, winnerKey: winner, matches: matchKeys} = await detailsProjection(sendƒ, "tournament", key)
  const matches: Match[] = matchKeys.map((matchKey: string) => ({key: matchKey}))
  return {
    key,
    name,
    winner,
    matches
  }
}
