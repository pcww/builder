module.exports = function(grunt) {
  try {
    return grunt.file.readJSON('secret.json') || {}
  } catch (error) {
    return {}
  }
}
