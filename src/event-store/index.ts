import {AxiosRequestConfig, AxiosResponse} from "axios"
import {EventSink, SinkProvider} from "../event-sink"
import {BaseEntity} from "../types"
import {appendEvent} from "./append-event"
import {createESConnection} from "./connect-es"
import {ESClient} from "./es-client"
import {readEventStream} from "./stream-events"


export function sinkProvider(measure: any): SinkProvider {
  return (shard) => initSink(measure, shard)
}

async function initSink(measure: any, shard: string): Promise<EventSink> {
  const ges = getESClient()

  const replayTag = `replayEvents(${shard})`
  const appendTag = `appendEvent(${shard})`

  return async (evt) => {
    measure.start(replayTag)
    await ges.replayEvents(evt.entity)
    measure.end(replayTag)

    measure.start(appendTag)
    await ges.appendEvent(evt)
    measure.end(appendTag)
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