import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerPlayer: Scalars['String'];
  createTournament: Scalars['String'];
};


export type MutationRegisterPlayerArgs = {
  name: Scalars['String'];
  country: Scalars['String'];
};


export type MutationCreateTournamentArgs = {
  name: Scalars['String'];
  players: Array<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  players?: Maybe<Array<Maybe<Player>>>;
  tournaments?: Maybe<Array<Maybe<Tournament>>>;
  tournament?: Maybe<Tournament>;
};


export type QueryTournamentArgs = {
  key: Scalars['ID'];
};

export type Player = {
  __typename?: 'Player';
  key: Scalars['ID'];
  name: Scalars['String'];
  country: Scalars['String'];
};

export type Tournament = {
  __typename?: 'Tournament';
  key: Scalars['ID'];
  name: Scalars['String'];
  matches?: Maybe<Array<Match>>;
  winner?: Maybe<Player>;
};

export type Match = {
  __typename?: 'Match';
  key: Scalars['ID'];
  player1: Player;
  player2: Player;
  games?: Maybe<Array<Score>>;
  score?: Maybe<Score>;
};

export type Game = {
  __typename?: 'Game';
  key: Scalars['ID'];
  score: Score;
  winner?: Maybe<Player>;
};

export type Score = {
  __typename?: 'Score';
  player1: Scalars['Int'];
  player2: Scalars['Int'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Query: ResolverTypeWrapper<{}>;
  Player: ResolverTypeWrapper<Player>;
  Tournament: ResolverTypeWrapper<Tournament>;
  Match: ResolverTypeWrapper<Match>;
  Game: ResolverTypeWrapper<Game>;
  Score: ResolverTypeWrapper<Score>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Mutation: {};
  String: Scalars['String'];
  ID: Scalars['ID'];
  Query: {};
  Player: Player;
  Tournament: Tournament;
  Match: Match;
  Game: Game;
  Score: Score;
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  registerPlayer?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRegisterPlayerArgs, 'name' | 'country'>>;
  createTournament?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateTournamentArgs, 'name' | 'players'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  players?: Resolver<Maybe<Array<Maybe<ResolversTypes['Player']>>>, ParentType, ContextType>;
  tournaments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tournament']>>>, ParentType, ContextType>;
  tournament?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryTournamentArgs, 'key'>>;
}>;

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = ResolversObject<{
  key?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TournamentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tournament'] = ResolversParentTypes['Tournament']> = ResolversObject<{
  key?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  matches?: Resolver<Maybe<Array<ResolversTypes['Match']>>, ParentType, ContextType>;
  winner?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MatchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Match'] = ResolversParentTypes['Match']> = ResolversObject<{
  key?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  player1?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  player2?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  games?: Resolver<Maybe<Array<ResolversTypes['Score']>>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Score']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = ResolversObject<{
  key?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Score'], ParentType, ContextType>;
  winner?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Score'] = ResolversParentTypes['Score']> = ResolversObject<{
  player1?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  player2?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Tournament?: TournamentResolvers<ContextType>;
  Match?: MatchResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  Score?: ScoreResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
