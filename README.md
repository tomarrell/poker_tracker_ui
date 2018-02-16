<p align="center">
  <img style="text-align: center" width="140" src="./favicon.ico" />
</p>

# Poker Tracker
A simple React application for tracking poker wins/losses. Includes a tiny Koa Node server to serve static assets while supporting SPA. This could alternatively be done with S3 + Cloudfront.

## Installation and Setup
Clone the repository locally.

Then install dependencies.
```
npm i
```

## Starting the application locally
To run a local instance of the application using webpack-dev-server use the command:
```
npm run dev
```

## Deployment
The application can be deployed anywhere that supports running a NodeJS server. We currently deploy to [now.sh](https://now.sh)

Deploy requirements:
- authenticated now.sh cli

1. `now switch pokertracker`
2. `npm run deploy`

## Starting production app locally
To run the NodeJS server locally and serve the static assets, run the following.
```
[PORT={PORT}] npm start
```

