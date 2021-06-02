module.exports = (string, separator) => {
  const split = string.split(separator)
  return [split.shift(), split.join(separator)]
}