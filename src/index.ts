import {EventSink, SinkProvider} from "./event-sink"
import * as ES from "./event-store"
import {runTournament} from "./table-tennis/tournament"


async function playTourney(sinkProvider: SinkProvider): Promise<void> {
  const sink = await sinkProvider("workshop")
  runTournament(sink)
}

const sinkProvider = ES.sinkProvider()
playTourney(sinkProvider)
  .catch(err => console.error(err))
