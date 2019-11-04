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
      for (let creepType in config.availableCreeps) {
        if (typeof creepType === 'string') {
          console.log('CREEPTYPE: ', creepType)
          let count = config.getCount(creepType, true)
          let preferredCount = config.spawnCount[type]
          console.log('COUNT ^: ', count)

          if (count < preferredCount) {
            console.log('PUSHING TO QUE: ', type)
            Memory.spawnQue.push(type)
          }
        }
      }
    }
  }

}
