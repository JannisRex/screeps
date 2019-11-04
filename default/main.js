let creepHandler = require('index').lib.helper
let creepSpawner = require('index').lib.spawner
let assignRoles = require('index').functions.assignRoles
let cleanupDeadCreeps = require('index').functions.cleanupDeadCreeps

module.exports.loop = function () {
  creepHandler.__constructor()
  creepHandler.doThisThing()

  creepSpawner.spawnQue()

  assignRoles(Game.creeps)
  cleanupDeadCreeps()
}
