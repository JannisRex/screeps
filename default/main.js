let Handler = require('main.help')
let assignRoles = require('assignRoles')

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

  Handler.__constructor()
  Handler.doThisThing()

  assignRoles()
}
