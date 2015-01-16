#!/usr/bin/env node

var adventure = require('adventure');
var shop = adventure('CLUE-adventure');

var problems = [ 'dinosaurs', 'robots', 'wowsers', 'tweet' ];
problems.forEach(function (prob) {
    shop.add(prob, function () { return require('./problems/' + prob) });
});

shop.execute(process.argv.slice(2));
