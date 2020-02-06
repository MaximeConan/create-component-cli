const every = require('lodash/every')
const replace = require('lodash/replace')
const split = require('lodash/split')
const upperCase = require('lodash/upperCase')
const upperFirst = require('lodash/upperFirst')

const replaceAll = (str, replacement, pattern) =>
  replace(str, new RegExp(pattern, 'gi'), match =>
    isFullUppercase(match) ? upperCase(replacement) : isFirstUppercase(match) ? upperFirst(replacement) : replacement
  )
const isFullUppercase = str => every(split(str, ''), isCharUppercase)
const isFirstUppercase = str => isCharUppercase(str[0])
const isCharUppercase = char => upperFirst(char) === char

module.exports = {
  replaceAll,
}
