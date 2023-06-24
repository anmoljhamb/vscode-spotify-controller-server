# VSCode Spotify Controller Server

The VSCode Spotify Controller Server is a Node.js server built with TypeScript and Express. It acts as a middleware component for the VSCode Spotify Extension, handling authentication and token management with the Spotify Web API.

## Purpose

The server provides the necessary endpoints for the extension to obtain and refresh access tokens, enabling seamless integration with the Spotify Web API. It allows users to authenticate their Spotify account, obtain access tokens, and refresh tokens when needed.

## Routes

The server exposes the following routes:

-   `/auth/grant`: This route is used by the extension to exchange the authorization code obtained after a successful login for an access token and refresh token. The authorization code should be sent as a GET parameter in the request URL (`/auth/grant?code=<authorization_code>`). Upon successful authentication, the server responds with the access token and refresh token.

-   `/auth/refreshToken`: This route is a POST method used to refresh the access token. The client should provide the refresh token in the request body, and the server responds with the refreshed access token.

## Hosting Your Own Instance

If you wish to host your own instance of the server, follow these steps:

1. Create a Spotify application in the Spotify Developer Console.
2. Add the generated Client ID and Client Secret as environment variables on your server.
3. Rename the `.env.example` file to `.env` and populate it with your Spotify application credentials.
4. In your Spotify Developer Console, add `http://localhost:61234/auth/callback` as a redirect URI in your application settings. This is the URL where the server listens for authentication callbacks from Spotify.

## Getting Started

To run the server locally, make sure you have Node.js installed, then follow these steps:

1. Clone this repository.
2. Install dependencies by running `yarn`.
3. Start the server using `yarn run start` or `yarn run dev` to run in development mode.

## Contributing

Contributions to the VSCode Spotify Controller Server are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/anmoljhamb/vscode-spotify-controller-server).

## Extension Repository

To learn more about the VSCode Spotify Extension and its features, visit the [GitHub repository](https://github.com/anmoljhamb/vscode-spotify-controller).
