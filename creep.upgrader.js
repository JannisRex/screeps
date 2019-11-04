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

  withDrawEnergy: function () {
    let creep = this.creep

    if (creep.memory.preferredStructures === undefined) {
      creep.memory.preferredStructures = null
    }

    let targets = creep.memory.preferredStructures

    if (!targets) {
      let structures = creep.room.find(FIND_STRUCTURES, {
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

    if (targets.length > 0) {
      let workOrder = creep.withdraw(targets[0], RESOURCE_ENERGY)
      if (workOrder === ERR_NOT_IN_RANGE) {
        // TODO: make pathfind job
        let moveOpts = opts.moveOpts || {}
        creep.moveTo(target, moveOpts)
      }
    } else if (!targets.length) {
      this.rest()
    }
  },


  action: function () {
    let creep = this.creep

    let workOrder = creep.upgradeController(creep.room.controller)

    if (workOrder === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller)
    } else if (workOrder === ERR_NOT_ENOUGH_RESOURCES) {
      this.withDrawEnergy()
    } else {
      console.log(creep.name + ' upgrade error ' + workOrder)
    }
  }
}

module.exports = upgrader
