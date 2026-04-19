/**
 * Full Expo config (replaces static-only `app.json` when present).
 * Merges `app.json` with Google Maps keys from `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`.
 */
const appJson = require('./app.json')
const withAsyncStorageMavenRepo = require('./plugins/withAsyncStorageMavenRepo')

const googleMapsKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || ''

const basePlugins = appJson.expo.plugins || []
const pluginsWithoutWebBrowser = basePlugins.filter(
  p => p !== 'expo-web-browser' && !(Array.isArray(p) && p[0] === 'expo-web-browser'),
)

module.exports = {
  expo: {
    ...appJson.expo,
    plugins: [
      'expo-web-browser',
      ...pluginsWithoutWebBrowser,
      withAsyncStorageMavenRepo,
      [
        'react-native-maps',
        {
          iosGoogleMapsApiKey: googleMapsKey,
          androidGoogleMapsApiKey: googleMapsKey,
        },
      ],
    ],
    android: {
      ...appJson.expo.android,
      config: {
        ...(appJson.expo.android && appJson.expo.android.config),
        googleMaps: {
          apiKey: googleMapsKey,
        },
      },
    },
    ios: {
      ...appJson.expo.ios,
      config: {
        ...(appJson.expo.ios && appJson.expo.ios.config),
        googleMapsApiKey: googleMapsKey,
      },
    },
  },
}
