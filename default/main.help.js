let spawnOrder = require('config').spawnOrder
let getCount = require('config').getCount

module.exports = {

  __constructor: function () {
    if (Memory.helperInit !== undefined) {
      return
    }

    Memory.helperInit = true
    this.loop()
  },

  doThisThing: function () {
    this.spawnCreeps()
  },

  loop: function () {
    if (Memory.spawnQue === undefined) {
      Memory.spawnQue = [ ]
    }
    if (Memory.availableSources === undefined) {
      Memory.availableSources = { }
    }

    if (Memomry.spawnOrder === undefined) {
      Memory.spawnOrder = spawnOrder
    }
  },

  spawnCreeps: function () {
    let neededCreeps = Memory.spawnOrder

    // essentially all creeps alive
    // under my control
    let availableCreeps = { }

    for (let i in neededCreeps) {
      if (neededCreeps[i]) {
        let type = neededCreeps[i]

        if (availableCreeps[type] === undefined) {
          availableCreeps[type] = 0
        }

        let upperBorder = availableCreeps[i] + 1
        let match = getCount(type, true)

        if (upperBorder > match) {
          Memory.spawnQue.push(type)
        }

        availableCreeps[type] = availableCreeps[type] + 1
      }
    }
  }

}
