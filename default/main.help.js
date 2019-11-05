let config = require('config')

module.exports = {

  __constructor: function () {
    if (Memory.helperInit !== undefined) {
      return
    }

    Memory.helperInit = true
    this.initMemory()
  },

  doThisThing: function () {
    this.spawnCreeps()
  },

  initMemory: function () {
    if (Memory.spawnQue === undefined) {
      Memory.spawnQue = [ ]
    }
    if (Memory.availableSources === undefined) {
      Memory.availableSources = { }
    }

    if (Memory.initialSpawnOrder === undefined) {
      Memory.initialSpawnOrder = config.initialSpawnOrder
    }
  },

  initSpawnQueue: function () {
    if (Memory.spawnQueInit !== undefined) {
      return
    }

    let order = Memory.initialSpawnOrder

    for (let i in order) {
      if (order[i]) {
        console.log('PUSHING _', order[i], '_ TO INITIAL QUE')
        Memory.spawnQue.push(order[i])
      }
    }

    Memory.spawnQueInit = true
  },

  spawnCreeps: function () {
    this.initSpawnQueue()

    if (Memory.spawnQueInit) {
      for (let creepType of config.availableCreeps) {
        if (typeof creepType === 'string') {
          let count = config.getCount(creepType, true)
          let preferredCount = config.spawnCount[creepType]

          if (count < preferredCount) {
            console.log('PUSHING TO QUE: ', creepType)
            Memory.spawnQue.push(creepType)
          }
        }
      }
    }
  }

}
