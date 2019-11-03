let creepHandler = require('main.help')
let assignRoles = require('assignRoles')
let creepSpawner = require('creep._Spawner')

function cleanupDeadCreeps() {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      console.log('Clearing non-existing creep memory: ', name)
      delete Memory.creeps[name]
    }
  }
}

module.exports.loop = function () {
  let spawn = Game.spawns.S1

  // TODO: deal with multiple spawns
  spawn.memory.slaves = spawn.memory.slaves || {}
  cleanupDeadCreeps()

  creepHandler.__constructor()
  creepHandler.doThisThing()

  creepSpawner.spawnQue()

  assignRoles()
}
