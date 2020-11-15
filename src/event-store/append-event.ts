import {BaseEvent} from "../types"
import {getStreamId, SendToESƒ} from "./index"


export async function appendEvent(sendƒ:  SendToESƒ,
                                  evt:    BaseEvent): Promise<string> {
  const {
    entity,
    event,
    ...data
  } = evt

  const streamId = getStreamId(entity)
  // EventStore Projections do not provide the same streamId in projection handler() event data so we have to
  // pass it in as part of the event.
  // @ts-ignore
  data.key = entity.key
  const response = await sendƒ({
    method: "POST",
    url:    `/streams/${streamId}`,
    headers: {
      "ES-EventType": event
    },
    data
  })
  if (response.status === 201) {
    return streamId
  }
  throw new Error(response.statusText)
}