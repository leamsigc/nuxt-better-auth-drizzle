import globalMessage from './global.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackWarn: false,
  missingWarn: false,
  messages: globalMessage
}))