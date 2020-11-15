import {AxiosResponse} from "axios"
import {BaseEntity, BaseEvent} from "../types"
import {getStreamId, SendToESƒ} from "./index"


export async function readEventStream(sendƒ:  SendToESƒ,
                                      entity: BaseEntity): Promise<BaseEvent[]> {
  const streamId = getStreamId(entity)

  const response: AxiosResponse = await sendƒ({
    method: "GET",
    url:    `/streams/${streamId}/head/backward/4096`,
    params: {
      embed: "body"
    }
  })

  if (response.status === 404) {
    return []
  }

  if (response.status === 200) {
    return response.data.entries
      .map((entry: any) => {
        let {eventType, eventId, author, data}: any = entry
        if (typeof data !== "undefined") {
          data = JSON.parse(data)
        }
        return {
          entity,
          id: eventId,
          event: eventType,
          actor: author.name,
          data
        }
      })
  }
  throw new Error(`replay-events status: ${response.status} ${response.statusText}, message: ${response.data}`)
}