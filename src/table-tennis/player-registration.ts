import {EventSink} from "../event-sink"
import {PlayerEntity, PlayerRegistered} from "./events"
import {keyify} from "./table-tennis"


export async function registerPlayer(sink: EventSink, name: string, country: string): Promise<string> {
  const key = keyify(name)
  const entity = new PlayerEntity(key)
  await sink(new PlayerRegistered(entity, name, country))
  return key
}