# SVP

A localhost video player project for streaming a device's internal media through the home network using UI inspired by Netflix

## Setup

### Requirements

NodeJs: [v20](https://nodejs.org/en/download)

### Backend

install the dependencies using the command

```shell
$ npm ci
```

update the movies folder path by going to [app.service.ts](./backend/src/app.service.ts?:9:18) and update the `moviesFolder` with the absolute path of the media folder in your system

start the server by using the command

```shell
$ npm run start
```

### Frontend

install the dependencies using the command

```shell
$ npm ci
```

start the server by using the command

```shell
$ npm run start
```

access the running project as [localhost](http//:localhost:4200/)
