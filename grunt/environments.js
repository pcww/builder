module.exports = function(grunt, options) {
  return {
    options: {
      host: '<%= secret.production.host %>',
      local_path: 'dist',
      port: '<%= secret.production.port %>',
      username: '<%= secret.production.username %>',
      agent: process.env.SSH_AUTH_SOCK,
      releases_to_keep: '3',
      // exclude: ['assets', '*.jpg'],
      zip_deploy: true
    },
    production: {
      options: {
        deploy_path: '<%= secret.production.deploy_path %>'
      }
    }
  }
}
