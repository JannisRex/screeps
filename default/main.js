let config = require('index').lib.config
let task = require('index').slave
let towerControl = require('index').buildings.tower
let roadControl = require('index').buildings.road

function cleanupDeadCreeps() {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      console.log('Clearing non-existing creep memory: ', name)
      delete Memory.creeps[name]
    }
  }
}

module.exports.loop = function () {
  const spawn = Game.spawns.S1

  // TODO: deal with multiple spawns
  spawn.memory.slaves = spawn.memory.slaves || {}
  cleanupDeadCreeps()
  // roadControl.buildToSources()
  // towerControl.attackClosest($ID)
  // towerControl.repairClosest($ID)

  for (let type of config.spawnPriority) {
    if (spawn.spawning) {
      break
    }

    let count = config.targetCounts[type]
    {
      let creeps = _.filter(Game.creeps, (creep) => creep.memory.role === type)
      if (creeps.length < count) {
        if (task.slave.spawn(spawn, type) === OK) {
          // doesnt get called idk, if I dont
          // check it gets called indefinetely
          console.log('spawning ' + type)
        }
        // In all cases we should stop trying to spawn
        // another thing this tick.
        break
      }
    }
  }

  for (let name in Game.creeps) {
    if (Game.creeps[name]) {
      let creep = Game.creeps[name]
      if (creep.spawning || creep.memory.role === undefined) {
        continue
      }
      new task[creep.memory.job](creep).tick()
    }
  }
}
