# Spotify Saved Tracks Exporter

This Node.js script retrieves all the songs you have saved in your Spotify library and exports them to a `.txt` file. The exported file contains track names, artists, and album information.

## Features

- Fetches up to 50 tracks at a time using the Spotify Web API.
- Saves the data to a local `.txt` file with the track's name, artist(s), and album name.

## Requirements

- **Node.js** (v14+ recommended)
- **Spotify Developer Account** with an application created to get your API credentials.

## Setup

1. **Clone the repository:**
2. **Install dependencies:**
3. **Create a Spotify Developer App:**

- Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
- Create a new application and note down your `Client ID` and `Client Secret`.
- Add `http://localhost:3000/callback` as your **Redirect URI**.

4. **Obtain Authorization Code:**

- To obtain the `authorization_code`, visit the [following URL](https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-library-read) in your browser:
- Replace `YOUR_CLIENT_ID` with your Spotify App's Client ID.
- After logging in, Spotify will redirect to `http://localhost:3000/callback?code=YOUR_AUTHORIZATION_CODE`. Copy the `code` from the URL.

5. **Set up environment variables:**

- Create a `.env` file in the project root:

- Add your Spotify API credentials and authorization code to the `.env` file:

```
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-client-secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
SPOTIFY_AUTH_CODE=your-authorization-code
```

- Replace `your-client-id`, `your-client-secret`, and `your-authorization-code` with the actual values from the previous steps.

## How to Run

Once you have set up your environment variables and installed the dependencies, run the script:

The script will:

1. Authenticate with the Spotify API using your `authorization_code`.
2. Retrieve all saved tracks from your library.
3. Save the track data to a `.txt` file at `/your_path/spotify_tracks.txt`.

## Notes

- The `authorization_code` is valid only for a short time. Once exchanged for an access token, it will not be needed again unless the token expires.
- You can customize the path where the file is saved by changing the `filePath` variable.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more information.
