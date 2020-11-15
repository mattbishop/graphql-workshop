import {BaseEntity, BaseEvent} from "../types"


// Player entity
export class PlayerEntity extends BaseEntity {
  constructor(name: string) {
    super("player", name)
  }
}

export class PlayerRegistered extends BaseEvent {
  constructor(player:   PlayerEntity,
              name:     string,
              country:  string) {
    super("player-registered", player)
  }
}


// Tournament Entity
export class TournamentEntity extends BaseEntity {
  constructor(readonly key: string) {
    super("tournament", key)
  }
}

export class TournamentCreated extends BaseEvent {
  constructor(entity:     TournamentEntity,
              name:       string,
              playerKeys: string[]) {
    super("tournament-created", entity)
  }
}

export class TournamentCompleted extends BaseEvent {
  constructor(entity:     TournamentEntity,
              winnerKey:  string) {
    super("tournament-completed", entity)
  }
}



// Match entity
export class MatchEntity extends BaseEntity {
  constructor(readonly key: string) {
    super("match", key)
  }
}


export class MatchStarted extends BaseEvent {
  constructor(entity:         MatchEntity,
              tournamentKey:  string,
              player1Key:     string,
              player2Key:     string) {
  super("match-started", entity)
  }
}

export class MatchCompleted extends BaseEvent {
  constructor(entity:     MatchEntity,
              winnerKey:  string) {
  super("match-completed", entity)
  }
}


// Game entity
export class GameEntity extends BaseEntity {
  constructor(readonly key: string) {
    super("game", key)
  }
}

export class GameStarted extends BaseEvent {
  constructor(game:     GameEntity,
              matchKey: string) {
    super("game-started", game)
  }
}

export class GameCompleted extends BaseEvent {
  constructor(game:   GameEntity,
              winner: string) {
    super("game-completed", game)
  }
}

export class BallServed extends BaseEvent {
  constructor(game:   GameEntity,
              player: number) {
    super("ball-served", game)
  }
}

export class BallOut extends BaseEvent {
  constructor(game:   GameEntity,
              player: number) {
    super("ball-out", game)
  }
}

export class BallReturned extends BaseEvent {
  constructor(game:   GameEntity,
              player: number) {
    super("ball-returned", game)
  }
}


