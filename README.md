# Streamchange

A set of web applications for Youtube streamers with an open source front-end. Written in JavaScript with React library.

[![CircleCI](https://circleci.com/gh/sebastian-j/streamchange-frontend.svg?style=shield)](https://circleci.com/gh/sebastian-j/streamchange-frontend)
[![Test Coverage](https://coveralls.io/repos/github/sebastian-j/streamchange-frontend/badge.svg?branch=master)](https://coveralls.io/github/sebastian-j/streamchange-frontend?branch=master)

## Technologies

- **Redux** - state of more complex components (containers) is stored in Redux store.
- **webpack** for running development server and building app to static files for production environment.
- **styled-components** - StreamChange extensively use styled-components with all its possibilities and has features which could not exist in an app styled with only plain CSS files.
- **Material-UI** - basic inputs (e.g. text fields, checkboxes, dropdown menus) comes from Material UI library.

## Features

##### App can download all the necessary data from Youtube Data API v3

If you have a quota limit large enough to handle app traffic, just paste your API key to `app/config.js`. For more than 10k quota points, you have to fill a very detailed form about your company and project. Form is available in Google Developer Console. You can also use other API with the same resource structure for chat messages and optional telemetry - just paste API URL in a config file.

##### Creating a participant list based on chat messages

The app processes messages from Youtube chat and creates participant list. Streamer can filter the list, search for participant by name, select/deselect participants, open participant's Youtube channel (even if it's impossible on official Youtube chat). The list is stored in an indexedDB table for increased stability.

##### Multi-language support

The app uses `react-intl` for translations. New languages can be easily added by writing new json file in `app/translations` folder with the same scheme as existing language files. Streamers can select preferred language at the first start or in the settings.

##### Light and dark modes with selectable theme color

StyleProvider pass `theme` prop to all styled components. Colors of styled components are adjusted according to this prop value. Streamers can choose light or dark theme at the first use or in app settings. Settings window also have color picker to choose custom color for text and borders.

##### Multiple raffle animations

Streamers can choose from multiple raffle animations.

## Quick start

1. Make sure that you have Node.js v10.13.0 and npm v5 or above installed.
2. Clone this repo using `git clone --depth=1 https://github.com/sebastian-j/streamchange-giveaway.git <YOUR_PROJECT_NAME>`
3. Run `npm install` in order to install dependencies
4. Set values of constants in `app/config.js`
5. Run `npm run start` to start development server running on `http://localhost:3000`

### Building

```shell
npm run build
```

Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the `build` folder.

Upload the contents of `build` to your web server to see your work live! Compiled files can be served from Amazon S3.

## Pages

* **/giveaway** - main app. After pasting correct stream URL, app switches into three-column view.
* **/giveaway-history** - shows table with winners previous raffles
* **/queue** - less popular app for organizing stream viewers in queue. Streamer can set keyword for joining the queue, queue capacity, inactivity time limit to kick from the queue and get a URL to queue preview for OBS or Xsplit.
