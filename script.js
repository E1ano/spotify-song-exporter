const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Spotify API credentials and URL
const authUrl = 'https://accounts.spotify.com/api/token';
const apiUrl = 'https://api.spotify.com/v1/me/tracks?limit=50'; // Fetch up to 50 tracks at a time
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
const authorizationCode = process.env.SPOTIFY_AUTH_CODE;

// Define the absolute path where you want to save the file
const pathToSaveData = process.env.PATH_TO_SAVE_DATA;
const filePath = path.join(pathToSaveData, 'spotify_tracks.txt');

// Function to get an access token
async function getAccessToken() {
  try {
    const response = await axios.post(
      authUrl,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      'Error getting access token:',
      error.response ? error.response.data : error.message
    );
  }
}

// Function to fetch saved tracks
async function getSavedTracks(accessToken) {
  const tracks = [];
  let nextUrl = apiUrl;

  while (nextUrl) {
    try {
      const response = await axios.get(nextUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const items = response.data.items;
      tracks.push(...items);

      nextUrl = response.data.next; // Get the next page of results
    } catch (error) {
      console.error(
        'Error fetching tracks:',
        error.response ? error.response.data : error.message
      );
      break;
    }
  }

  return tracks;
}

// Function to save tracks to a text file
function saveTracksToFile(tracks) {
  const formattedTracks = tracks
    .map((item, index) => {
      const track = item.track;
      const artists = track.artists.map((artist) => artist.name).join(', ');
      const trackData = `${index + 1}. ${track.name} - ${artists} [${
        track.album.name
      }]`;

      return trackData;
    })
    .join('\n');

  if (formattedTracks) {
    fs.writeFileSync(filePath, formattedTracks, 'utf8');
  } else {
    console.log('An error occurred while saving tracks.');
  }
}

// Main function to run the script
async function exportSpotifySongs() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error('No access token obtained.');
    return;
  }

  const tracks = await getSavedTracks(accessToken);
  saveTracksToFile(tracks);
}

// Run the export function
exportSpotifySongs();
