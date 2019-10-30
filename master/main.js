let config = require('config')
let task = require('index')

function cleanupDeadCreeps() {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      console.log('Clearing non-existing creep memory: ', name)
      delete Memory.creeps[name]
    }
  }
}

module.exports.loop = function () {
  // TODO: deal with multiple spawns
  let spawn = Game.spawns.S1
  spawn.memory.slaves = spawn.memory.slaves || {}
  cleanupDeadCreeps()

  for (let type of config.spawnPriority) {
    if (spawn.spawning) {
      break
    }

    let count = config.targetCounts[type]
    // console.log("Need " + count + " of " + type);
    {
      let creeps = _.filter(Game.creeps, (creep) => creep.memory.role === type)
      // console.log("Have " + creeps.length);
      if (creeps.length < count) {
        console.log('spawning ' + type)
        let workOrder = task.slave.spawn(spawn, type)
        if (Number.isInteger(workOrder)) {
          console.log(workOrder)
        }

        // In all cases we should stop trying to spawn another thing
        // this tick.
        break
      }
    }
  }

  for (let n in Game.creeps) {
    if (Game.creeps[n]) {
      let c = Game.creeps[n]

      new task[c.memory.job](c).tick()
    }
  }
}
