import {Player, PlayerResolvers} from "../../graphql/gen/types"
import {SendToESƒ} from "../index"
import {detailsProjection} from "./get-projection"


export function initPlayerResolver(sendƒ: SendToESƒ): PlayerResolvers {
  return {
    name: (p) => getName(sendƒ, p),
    country: (p) => getCountry(sendƒ, p)
  }
}

async function getName(sendƒ:   SendToESƒ,
                       parent:  Player): Promise<string> {
  const {key, name} = parent
  if (name) {
    return name
  }
  const player = await detailsProjection(sendƒ, "player", key)
  return player.name
}

async function getCountry(sendƒ:  SendToESƒ,
                          parent: Player): Promise<string> {
  const {key, country} = parent
  if (country) {
    return country
  }
  const player = await detailsProjection(sendƒ, "player", key)
  return player.country
}
