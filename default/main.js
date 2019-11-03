let creepHandler = require('index').lib.helper
let creepSpawner = require('index').lib.spawner
let assignRoles = require('index').functions.assignRoles
let cleanupDeadCreeps = require('index').functions.cleanupDeadCreeps


module.exports.loop = function () {
  let spawn = Game.spawns.S1

  // TODO: deal with multiple spawns
  spawn.memory.slaves = spawn.memory.slaves || {}
  cleanupDeadCreeps()

  creepHandler.__constructor()
  creepHandler.doThisThing()

  creepSpawner.spawnQue()

  assignRoles(Game.creeps)
}
