const { withProjectBuildGradle } = require('@expo/config-plugins')

const MARKER = 'async-storage-local-maven'

/**
 * @react-native-async-storage/async-storage v3 resolves `storage-android` from a
 * Maven repo shipped under `android/local_repo`. Gradle must know that path.
 */
function withAsyncStorageMavenRepo(config) {
  return withProjectBuildGradle(config, cfg => {
    if (cfg.modResults.language !== 'groovy') return cfg
    if (cfg.modResults.contents.includes(MARKER)) return cfg

    cfg.modResults.contents = cfg.modResults.contents.replace(
      /allprojects\s*\{\s*\n\s*repositories\s*\{/,
      `allprojects {
  repositories {
    // ${MARKER}: @react-native-async-storage/async-storage v3+
    maven { url = uri("\${rootDir}/../node_modules/@react-native-async-storage/async-storage/android/local_repo") }`,
    )
    return cfg
  })
}

module.exports = withAsyncStorageMavenRepo
