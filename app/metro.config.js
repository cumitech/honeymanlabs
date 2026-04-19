const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')
const { resolve: metroDefaultResolve } = require('metro-resolver').default

const config = getDefaultConfig(__dirname)
const { transformer, resolver } = config

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
}

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
  // Gradle/CMake churn under node_modules (e.g. merged_native_libs) can disappear mid-watch and crash Metro on Windows.
  blockList: [
    ...(resolver.blockList ?? []),
    /[/\\]android[/\\]build[/\\].*/,
    /[/\\]ios[/\\]build[/\\].*/,
    /[/\\]\.cxx[/\\].*/,
  ],
}

const withWind = withNativeWind(config, { input: './global.css' })
const finalConfig = withWind

const reactIsMain = require.resolve('react-is')
const previousResolveRequest = finalConfig.resolver.resolveRequest

finalConfig.resolver.resolveRequest = (context, moduleName, platform, ...args) => {
  if (moduleName === 'react-is') {
    return { type: 'sourceFile', filePath: reactIsMain }
  }
  if (previousResolveRequest) {
    return previousResolveRequest(context, moduleName, platform, ...args)
  }
  return metroDefaultResolve(
    Object.freeze({ ...context, resolveRequest: metroDefaultResolve }),
    moduleName,
    platform,
  )
}

module.exports = finalConfig
