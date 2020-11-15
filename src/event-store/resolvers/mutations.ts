import {PlayerEntity, PlayerRegistered, TournamentCreated, TournamentEntity} from "../../table-tennis/events"
import {MutationCreateTournamentArgs, MutationRegisterPlayerArgs, MutationResolvers} from "../../graphql/gen/types"
import {keyify} from "../../table-tennis/table-tennis"
import {appendEvent} from "../append-event"
import {SendToESƒ} from "../index"
import {readEventStream} from "../stream-events"


export function initMutations(sendƒ: SendToESƒ): MutationResolvers {
  return {
    createTournament: (_, a) => createTournament(sendƒ, a),
    registerPlayer: (_, a) => registerPlayer(sendƒ, a)
  }
}

async function createTournament(sendƒ:  SendToESƒ,
                                args:   MutationCreateTournamentArgs): Promise<string> {
  const {name, players} = args
  const key = keyify(name)
  const entity: TournamentEntity = new TournamentEntity(key)
  const existingEvents = await readEventStream(sendƒ, entity)
  if (existingEvents.length) {
    throw new Error(`tournament ${name} already created! key: ${key}`)
  }
  return await appendEvent(sendƒ, new TournamentCreated(entity, name, players))
}

async function registerPlayer(sendƒ:  SendToESƒ,
                              args:   MutationRegisterPlayerArgs): Promise<string> {
  const {name, country} = args
  const key = keyify(name)
  const entity = new PlayerEntity(key)
  const existingEvents = await readEventStream(sendƒ, entity)
  if (existingEvents.length) {
    throw new Error(`player ${name} already created! key: ${key}`)
  }
  return await appendEvent(sendƒ, new PlayerRegistered(entity, name, country))
}
