let conveyor = {
  parts: function () {
    let availableEnergy = Game.spawns.S1.room.energyAvailable
    let availableParts = require('config').maxCreepParts
    let creepParts = [CARRY, CARRY, MOVE, MOVE]

    // if theres still 'room' to make 2xWork + 1xCarry + 1xMove
    // and enough energy in storage
    while (availableParts - 4 >= 4 && availableEnergy - 200 >= 200) {
    // pushing parts to array, which will be used to spawn creep
      creepParts.push(CARRY)
      creepParts.push(CARRY)
      creepParts.push(MOVE)
      creepParts.push(MOVE)

      availableParts = availableParts - 4
      availableEnergy = availableEnergy - 200
    }

    return creepParts || [CARRY, MOVE]
  },

  withDrawEnergy: function (creep) {
    // unlike Hauler or Upgrader, we
    // dont filter for anything but spawns here
    let structureInRange = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (structure) => {
        return structure.store[RESOURCE_ENERGY] > 0
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
        return
      }
    } else {
      this.rest()
    }
  },

  action: function () {
    let creep = this.creep

    if (creep.store[RESOURCE_ENERGY] === 0) {
      this.withDrawEnergy(creep)
    } else {
      let target = null

      if (!target) {
        // get closest Builder with !energyMax
        let targetBuilder = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
          filter: function (creep) {
            return creep.memory.role === 'builder'
            && creep.energy < (creep.energyCapacity - creep.energyCapacity / 10)
          }
        })

        if (targetBuilder) {
          target = targetBuilder
        }
      }

      if (!target) {
        // if there is no builder who needs help
        // just haul the energy to Extensions
        let extension = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: function (structure) {
            return structure.structureType === STRUCTURE_EXTENSION &&
            structure.store[RESOURCE_ENERGY] < structure.energyCapacity
          }
        })

        if (extension) {
          target = extension
        }
      }

      if (target) {
        if (target.store[RESOURCE_ENERGY] < target.getCapacity()) {
          creep.say('🔋 omw')
          let workOrder = creep.transfer(target, RESOURCE_ENERGY)
          if (workOrder === ERR_NOT_IN_RANGE) {
            creep.moveTo(target)
          }
        } else {
          creep.say('TARGET FULL')
          return
        }
      } else {
        // should (l i t e r a l l y) never happen
        this.rest()
      }
    }
  }
}
module.exports = conveyor
