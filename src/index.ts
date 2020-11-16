import * as ES from "./event-store"
import {runTournament} from "./table-tennis/tournament"


ES.initSink()
  .then((sink) => runTournament(sink))
  .catch(err => console.error(err))
