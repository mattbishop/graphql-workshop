import {deleteStreams} from "./delete-streams"


async function deleteTournaments(): Promise<void> {
  return deleteStreams("tournament")
}


deleteTournaments()
  .catch(e => console.log(e))