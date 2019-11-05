let upgrader = {
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

  // puts creep in withdraw mode untill it is full
  // or there is no energy stored, then mb mine?
  // (JUST IDLING NOW)
  withDrawEnergy: function () {
    let creep = this.creep

    if (creep.memory.preferredStructures === undefined) {
      creep.memory.preferredStructures = null
    }

    let targets = creep.memory.preferredStructures

    if (!targets) {
      let structures = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_STORAGE ||
                    structure.structureType === STRUCTURE_CONTAINER ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_EXTENSION) &&
                    structure.store[RESOURCE_ENERGY] >= 45
        }
      })
      // order by distance
      structures = _.sortBy(structures, t => creep.pos.getRangeTo(t))
      targets = structures
    }

    if (!targets.length) {
      let spawns = creep.room.find(FIND_MY_SPAWNS)
      if (spawns instanceof Array) {
        targets = spawns
      }
    } if (targets.length > 0) {
      let target = targets[0]
      let workOrder = creep.withdraw(target, RESOURCE_ENERGY)
      if (workOrder === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#FF4500', opacity: 0.5 } })
      } else if (workOrder === ERR_FULL) {
        creep.say('❌full❌')
      }
    } else {
      this.rest()
    }
  },

  action: function () {
    let creep = this.creep

    let workOrder = creep.upgradeController(creep.room.controller)

    if (workOrder === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ff80ed', opacity: 0.5 } })
    } else if (workOrder === ERR_NOT_ENOUGH_RESOURCES) {
      creep.say('🤷‍♀️ no energy')
      this.withDrawEnergy()
    } else {
      console.log(creep.name + ' upgrade error ' + workOrder)
      this.rest()
    }
  }
}

module.exports = upgrader
