const BroccoliWebGLTranspiler = require('broccoli-webgl-transpiler').default;

const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = class WebGLPreprocessor {
  constructor() {
    this.name = 'ember-cli-webgl';
    this.ext = 'glsl';
  }

  toTree(inputNode) {
    const js = funnel(inputNode, {
      exclude: ['**/*.glsl'],
      annotation: 'JS files',
    });

    const uncompiledGLSL = funnel(inputNode, {
      include: ['**/*.glsl'],
      annotation: 'uncompiled GLSL files'
    });

    const compiledGLSL = new BroccoliWebGLTranspiler(uncompiledGLSL, {
      include: ['**/*'],
      annotation: 'compiled GLSL files'
    });

    return mergeTrees([js, compiledGLSL], {
      overwrite: true,
      annotation: 'merged JS & compiled GLSL',
    });
  }
}

