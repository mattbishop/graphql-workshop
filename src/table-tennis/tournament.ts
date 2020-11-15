

/*
  data model: https://www.npmjs.com/package/rebracket

  32 players, single elimination

  Round 1 (32)
  Round 2 (16)
  Quarterfinals (8)
  Semifinals (4)
  Final (2)

  Match # will indicate what round it's in

  Matches 1-16 are Round 1
  Matches 17-25 are Round 2
  Matches 26-30 are Quarterfinals
  Matches 31 & 32 are Semifinals
  Match 33 is the Final
 */

import {EventSink} from "../event-sink"
import {TournamentCompleted, TournamentCreated, TournamentEntity} from "./events"
import {playMatch} from "./match-play"
import {registerPlayer} from "./player-registration"
import {chance, keyify, Match} from "./table-tennis"

const kinds = ["Open", "Invitational", "Championship", "Games", "Tournament"]

export async function runTournament(sink: EventSink): Promise<void> {
  const tourneyName = `${chance.city()} ${chance.company()} ${chance.year({min: 1900, max: 2100})} ${chance.pickone(kinds)}`
  console.log(`starting ${tourneyName}, creating players...`)
  let players = Array.from(Array(16), ()=> ({
    name: chance.name(),
    country: chance.country()
  }))
  const playerKeys = await Promise.all(players.map(({name, country}) => registerPlayer(sink, name, country)))

  const tourneyKey = keyify(tourneyName)
  console.log(`Tournament key: ${tourneyKey}`)
  const entity: TournamentEntity = new TournamentEntity(tourneyKey)
  await sink(new TournamentCreated(entity, tourneyName, playerKeys))

  let matchNumber = 1
  while (playerKeys.length > 1) {
    const matches: Match[] = []
    for (let p = 0; p < playerKeys.length; p += 2) {
      matches.push({players: [playerKeys[p], playerKeys[p + 1]]})
    }

    //playerKeys = await Promise.all(matches.map(match => playMatch(sink, match, tourneyKey, matchNumber++)))
    // can't Promise.all() with benchmarks.
    playerKeys.length = 0
    for (let match of matches) {
      const w = await playMatch(sink, match, tourneyKey, matchNumber++)
      playerKeys.push(w)
    }
  }

  // last player is the winner
  await sink(new TournamentCompleted(entity, playerKeys[0]))
}