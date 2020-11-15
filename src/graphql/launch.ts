import * as fs from "fs"
import * as util from "util"
import {ApolloServer, gql} from "apollo-server"
import {createESConnection} from "../event-store/connect-es"
import {initMatchResolver} from "../event-store/resolvers/match-resolver"
import {initMutations} from "../event-store/resolvers/mutations"
import {initPlayerResolver} from "../event-store/resolvers/player-resolver"
import {initQueries} from "../event-store/resolvers/queries"
import {initTournamentResolver} from "../event-store/resolvers/tournament-resolver"
import {Resolvers} from "./gen/types"

const readFile = util.promisify(fs.readFile)


export async function initGraphQL(): Promise<void> {
  const sender = createESConnection("http://localhost:2113")
  const resolvers = {
    Query:      initQueries(sender),
    Mutation:   initMutations(sender),
    Tournament: initTournamentResolver(sender),
    Player:     initPlayerResolver(sender),
    Match:      initMatchResolver(sender)
  }
  await initApollo(resolvers)
}


async function initApollo(resolvers: Resolvers): Promise<void> {
  const schemaFile = await readFile("./src/graphql/table-tennis.graphql")
  const typeDefs = gql(schemaFile.toString())
  const apollo = new ApolloServer({typeDefs, resolvers})

  const serverInfo = await apollo.listen()
  console.info(JSON.stringify(serverInfo, null, "  "))
}

initGraphQL()
  .catch(e => console.error(e))