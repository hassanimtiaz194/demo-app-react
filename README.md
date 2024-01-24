# Contestant Client App

A part of [Skild](https://www.skild.com/) applications. Contestants of the event log into this application to review the reviews, form teams, and submit their entry.

## Tech Stack

- The app is written in React
  - We use [hooks](https://reactjs.org/docs/hooks-intro.html) over classes
  - We use [JSX](https://reactjs.org/docs/introducing-jsx.html) over HTML
- UI framework: [Material UI](https://material-ui.com/)
- State management: [Redux](https://redux.js.org/)
  - We use [Saga](https://redux-saga.js.org/) to handle store side effects (getting data from backend and update the state accordingly)
  - We use [Reselect](https://github.com/reduxjs/reselect) to retrieve a data from the Redux store.

## Development

- There are `.env` and `.env.development` files to keep environmental variables for production and development respectively.
- There is a proxy server setup in `src/setupProxy.js` to get access "Referer" header. We need this because based on the domain name the server identifies on which event we are associated, so in order to test the app in development mode we have to add this.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
