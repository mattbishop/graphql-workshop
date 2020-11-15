import {deleteStreams} from "./delete-streams"


async function deletePlayers(): Promise<void> {
  return deleteStreams("player")
}


deletePlayers()
  .catch(e => console.log(e))