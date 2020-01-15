# Streamchange Giveaway

Web application for organizing lotteries and contests on Youtube live streams.

Built application consists only of static .js and .html files. No backend needed.
## Features

* Downloading all necessary data only from Youtube Data API v3
* Creating a participant list based on chat messages
* Storing participant's short notes along with their names

## Quick start

1. Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2. Clone this repo using `git clone --depth=1 https://github.com/sebastian-j/streamchange-giveaway.git <YOUR_PROJECT_NAME>`
3. Run `npm install` in order to install dependencies
4. Run `npm run start` to start development server running on `http://localhost:3000`

### Building

```shell
npm run build
```
Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the `build` folder.

Upload the contents of `build` to your web server to see your work live!