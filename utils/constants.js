const SRC_PATH = 'src'
const MODULES_PATH = `${SRC_PATH}/components`
const TEMPLATES = [
  {
    folder: '/',
    file: '.js',
    template: 'root'
  },
  {
    folder: '/__styles__/',
    file: '.styles.js',
    template: 'styles'
  },
  {
    folder: '/__test__/',
    file: '.test.js',
    template: 'test'
  },
]

module.exports = {
  SRC_PATH,
  MODULES_PATH,
  TEMPLATES
}
