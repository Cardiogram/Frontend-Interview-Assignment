[![Build Status](https://travis-ci.com/Cardiogram/frontend-interview-project.svg?branch=master)](https://travis-ci.com/Cardiogram/frontend-interview-project) [![Greenkeeper badge](https://badges.greenkeeper.io/Cardiogram/frontend-interview-project.svg)](https://greenkeeper.io/)

# Cardiogram Frontend Interview

Welcome to Cardiogram's frontend interview! You'll be using this repository as boilerplate towards your project. You should have received instructions on your assignment.

## Setup

Clone the repo and install dependencies

```bash
git clone git@github.com:Cardiogram/frontend-interview-assignment.git .
npm i
```

## Directory Layout

```
├── /src                         # ReactJS client, which contains most of our UI
│   ├── /components              # React components, reusable across all pages
│   ├── /models                  # Client side model definitions
│   ├── /pages                   # App route definitions
│   ├── /styles                  # Global styles
│   └── /index.js                # Client side entry point
│── /server                      # Express server (API endpoints)
│   └── index.js                 # Server entry point
└── /public                      # Static assets
```

## Development

### Running the client

```bash
npm run dev
```

This will start the Webpack Dev Server that serves assets in the `/src` directory (it will refresh the page on changes)

You can then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running the API server

```bash
npm run dev:server
```

This will start an [express](https://expressjs.com/) server on [http://localhost:5000](http://localhost:5000).

## Testing

```bash
npm run test
```

Runs the test watcher in an interactive mode.
By default, runs tests related to files changed since the last commit.
