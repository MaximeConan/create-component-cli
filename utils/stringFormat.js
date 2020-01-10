const formatComponentName = componentName => {
  const capitalizedComponentName = capitalizeEachWord(componentName)
  const formattedComponentName = capitalizedComponentName.replace(/[^a-zA-Z0-9]/g, '')
  return formattedComponentName
}

const capitalizeEachWord = string => {
  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

module.exports = {
  formatComponentName
}