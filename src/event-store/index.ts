import {AxiosRequestConfig, AxiosResponse} from "axios"
import {EventSink} from "../event-sink"
import {BaseEntity} from "../types"
import {appendEvent} from "./append-event"
import {createESConnection} from "./connect-es"
import {ESClient} from "./es-client"
import {readEventStream} from "./stream-events"


export async function initSink(): Promise<EventSink> {
  return async (evt) => {
    await getESClient().appendEvent(evt)
  }
}

let esClient: ESClient
function getESClient(): ESClient {
  if (!esClient) {
    esClient = initESClient()
  }
  return esClient
}

function initESClient(): ESClient {
  const sendƒ = createESConnection("http://localhost:2113")
  return {
    appendEvent: (e) => appendEvent(sendƒ, e),
    replayEvents: (e) => readEventStream(sendƒ, e)

  }
}

export function getStreamId({name, key}: BaseEntity): string {
  return `${name}-${key}`
}


export type SendToESƒ = (request: AxiosRequestConfig) => Promise<AxiosResponse>