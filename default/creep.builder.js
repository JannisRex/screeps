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

  withDrawEnergy: function (creep) {
    let structureInRange = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_STORAGE ||
                    structure.structureType === STRUCTURE_CONTAINER ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_EXTENSION) &&
                    structure.store[RESOURCE_ENERGY] > 0 && creep.pos.inRangeTo(structure, 4)
      }
    })

    // if a structure with energy is in
    // a range of 5 (reachable by creep)
    if (structureInRange) {
      let target = structureInRange
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

  repairStructures: function (creep) {
    // checking damaged ramparts first and then
    // repair them starting from the most damaged
    let brokenRamps = creep.room.find(FIND_MY_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_RAMPART &&
          structure.hits < (structure.hitsMax / 2))
      }
    })

    // compares CURRENT element with
    // NEXT element in array and sorts
    // so we repair most damaged first
    brokenRamps.sort((a, b) => {
      return (a.hits - b.hits)
    })

    if (brokenRamps.length > 0) {
      let target = brokenRamps[0]
      let workOrder = creep.repair(target)

      if (workOrder === ERR_NOT_IN_RANGE) {
        creep.moveTo(target)
      } else if (target.hits > (target.hitsMax / 2 + target.hitsMax / 4)) {
        // if hitpoints are >75% so he doesnt
        // start and stop repairing like a mongoloid
        // after return it wont get into brokenRamps array
        // so we iterate through all
        return
      } else if (workOrder !== OK) {
        console.log(creep.name + ' ERROR')
      }
    }

    // now we check for other buildings (tower, container ...)
    // which lost more than half HP
    let brokenStructures = creep.room.find(FIND_MY_STRUCTURES, {
      filter: (structure) => {
        return (structure.hits < structure.hitsMax / 2)
      }
    })

    if (brokenStructures.length > 0) {
      let structureToRepair = brokenStructures[0]
      let workOrder = creep.repair(structureToRepair)

      if (workOrder === ERR_NOT_IN_RANGE) {
        creep.move(structureToRepair)
      } else if (target.hits > (target.hitsMax / 2 + target.hitsMax / 4)) {
        // if hitpoints are >75% so he doesnt
        // start and stop repairing like a mongoloid
        // after return it wont get into brokenRamps array
        // so we iterate through all
        return
      } else if (workOrder !== OK) {
        console.log(creep.name + ' ERROR')
      }
    }
  },

  action: function () {
    let creep = this.creep

    // since we cant create a workOrder before
    // finding each structure and filtering, we start
    // with check for creep.energy to save cpu
    if (creep.store[RESOURCE_ENERGY] === 0) {
      this.withDrawEnergy(creep)
    } else {
      // if the worker got energy, we check
      // what needs to be done (repair or build)
      this.repairStructures(creep)
    }
  }
}

module.exports = builder
