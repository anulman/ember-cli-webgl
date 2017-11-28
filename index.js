/* eslint-env node */
'use strict';

const WebGLPreprocessor = require('./lib/preprocessor');

module.exports = {
  name: 'ember-cli-webgl',

  setupPreprocessorRegistry(type, registry) {
    registry.add('js', new WebGLPreprocessor(this.project.root));
  }
};
