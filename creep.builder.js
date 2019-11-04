let builder = {
  parts: function () {
    let availableEnergy = Game.spawns.S1.room.energyAvailable
    let availableParts = require('config').maxCreepParts
    let creepParts = [WORK, WORK, CARRY, MOVE]

    // if theres still 'room' to make 2xWork + 1xCarry + 1xMove
    // and enough energy in storage
    while (availableParts - 4 >= 4 && availableEnergy - 300 >= 300) {
    // pushing parts to array, which will be used to spawn creep
      creepParts.push(WORK)
      creepParts.push(WORK)
      creepParts.push(MOVE)
      creepParts.push(CARRY)

      availableParts = availableParts - 4
      availableEnergy = availableEnergy - 300
    }

    return creepParts || [WORK, MOVE]
  },

  onSpawn: function () {
    let creep = this.creep

    creep.memory.onCreated = true
  },


  action: function () {
  }
}

module.exports = builder
