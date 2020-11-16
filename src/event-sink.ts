import {BaseEvent} from "./types"

/**
 * Simple Event sink; just sends events.
 */
export type EventSink = (event: BaseEvent) => Promise<void>