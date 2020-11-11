# graphql-workshop
GraphQL / Event Modeling workshop project

## Installation

* NodeJS 12 or greater: ()[https://nodejs.org]
* Install JS modules:
```sh
npm install
```
* Docker 2.5 or greater: ()[https://docker.com/products/docker-desktop]
* Event Store 5.0.8 (specifically) via docker command:

```sh
docker run --name eventstore-workshop -it -p 2113:2113 -p 1113:1113 eventstore/eventstore:5.0.8-xenial -e EVENT-STORE_DEV=true -e EVENTSTORE_RUN_PROJECTIONS=All -e EVENTSTORE_START_STANDARD_PROJECTIONS=true
```
