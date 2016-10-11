module.exports = {
  default: [
    'build',
    'server',
    'watch'
  ],

  build: [
    'clean',
    // 'buildCSS',
    'buildJS'
  ],

  deploy: [
    'clean',
    'webpack:production',
    'ssh_deploy:production'
  ],

  rollback: [
    'ssh_rollback:production'
  ],

  buildJS: [
    'webpack:local'
  ],

  buildCSS: [
//    'buildAppCSS',
//    'buildLibCSS'
  ],

  buildAppCSS: [
    'sass_globbing',
    'sass:appCSS'
  ],

  buildLibCSS: [
    'sass:libCSS'
  ],

  server: [
    'connect'
  ]
}
