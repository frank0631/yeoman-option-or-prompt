'use strict'

var _ = require('lodash');

module.exports = function(prompts, callback) {
  // This method will only show prompts that haven't been supplied as options. This makes the generator more composable.
  var filteredPrompts = [];
  var props = {};

  prompts.forEach(function(prompt) {
    if(prompt.name in this.options){
        // Options supplied, add to props
        props[prompt.name] = this.options[prompt.name];
    }
    else{
      // No option supplied, user will be prompted
      filteredPrompts.push(prompt);
    }
  }, this);

  if (filteredPrompts.length) {
    this.prompt(filteredPrompts, function(mergeProps) {
      // Merge mergeProps into props/
      _.assign(props, mergeProps);
      callback && callback(props);
    });
  } else {
    // No prompting required call the callback right away.
    callback && callback(props);
  }
}
