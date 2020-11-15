import {BaseEntity, BaseEvent} from "../types"


export interface ESClient {
  appendEvent(evt: BaseEvent): Promise<string>
  replayEvents(entity: BaseEntity): Promise<BaseEvent[]>
}
