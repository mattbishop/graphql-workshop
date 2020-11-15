import {BaseEvent} from "./types"


/**
 * Provides a sharded event sink. Measure is the Measurement instance to track perf with.
 */
export type SinkProvider = (shard: string) => Promise<EventSink>

/**
 * Simple Event sink; just sends events
 */
export type EventSink = (event: BaseEvent) => Promise<void>