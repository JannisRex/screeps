let helper = {
  parts: function () {
    let availableEnergy = Game.spawns.S1.room.energyAvailable
    let availableParts = require('config').maxCreepParts
    let creepParts = [ ]

    // if theres still 'room' to make 2xCarry + 2xMove
    // and enough energy in storage
    while (availableParts >= 4 && availableEnergy >= 200) {
    // pushing parts to array, which will be used to spawn creep
      creepParts.push(MOVE)
      creepParts.push(MOVE)
      creepParts.push(CARRY)
      creepParts.push(CARRY)

      availableParts = availableParts - 4
      availableEnergy = availableEnergy - 200
    }

    return creepParts || [CARRY, MOVE]
  },

  // check for Miners that need
  // additional helpers and assign
  assignMiner: function () {
    let creep = this.creep

    // all the miners that have currentHelpers < neededHelpers
    let miner = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
      filter: function (miner) {
        if (miner.memory.role === 'miner' && miner.memory.helpers.length < miner.memory.helpersNeeded) {
          return true
        }

        return false
      }
    })

    if (miner === undefined) {
      return
    }

    creep.memory.miner = miner.id
    miner.memory.helpers.push(creep.id)
  },

  action: function () {
    let creep = this.creep

    if (creep.memory.courier !== undefined && creep.memory.courier === true) {
      creep.memory.courier = false
      return
    }

    // If this helper isn't assigned to a miner, find one and assign him to it. If it is assigned to a miner,
    // then find that miner by his id
    if (creep.memory.miner === undefined) {
      this.assignMiner()
    }

    let miner = Game.getObjectById(creep.memory.miner)

    if (miner === null) {
      creep.suicide() // there is no other way
      return
    }

    // If creep is not full, pick up more shit
    if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
      if (creep.pos.isNearTo(miner)) {
        let energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1)[0]
        creep.pickup(energy)
      } else if (miner.memory.isNearSource) {
        creep.moveTo(miner)
      }

      return
    }

    let target = null // target for homePath

    if (!target) {
      let possibleTargets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_TOWER ||
              structure.structureType === STRUCTURE_STORAGE ||
              structure.structureType === STRUCTURE_CONTAINER) &&
              structure.store[RESOURCE_ENERGY] < structure.store.getCapacity()
        }
      })

      // order by distance
      possibleTargets = _.sortBy(possibleTargets, t => creep.pos.getRangeTo(t))

      // check by ascending distance, if
      // structure can store all the creep has
      for (let i in possibleTargets) {
        if (possibleTargets[i]) {
          if (possibleTargets[i].store[RESOURCE_ENERGY] > creep.store[RESOURCE_ENERGY]) {
            target = possibleTargets[i]
            break
          }
        }
      }
      target = possibleTargets[0]
    }

    // get directions from path
    let targetDirection = creep.pos.findPathTo(target, { ignoreCreeps: true })[0].direction

    // here we check for another helper which is on the same way
    // as this current helper, + has space + actually has correct role
    let leftDir = targetDirection - 1
    let rightDir = targetDirection + 1

    // here we're checking for the directions
    // Top - TopRight - Right - BottomRight - Bottom [...]
    // and have to adjust with +8 or -8

    if (leftDir < 1) {
      leftDir = leftDir + 8
    }
    if (leftDir > 8) {
      leftDir = leftDir - 8
    }

    if (rightDir < 1) {
      rightDir = rightDir + 8
    }
    if (rightDir > 8) {
      rightDir = rightDir - 8
    }

    // here we apply the directions and check
    // if they fit with the courier and hes therefore
    // going in the same direciton
    let courier = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
      filter: function (possibleTarget) {
        return (
          possibleTarget.memory.role === creep.memory.role
          && possibleTarget.store[RESOURCE_ENERGY] < possibleTarget.store.getCapacity()
          && creep.pos.inRangeTo(possibleTarget, 1)
          && (
            creep.pos.getDirectionTo(possibleTarget) === targetDirection
          || creep.pos.getDirectionTo(possibleTarget) === leftDir
          || creep.pos.getDirectionTo(possibleTarget) === rightDir
          )
        )
      }
    })

    // If we found a courier, make that courier our new target
    if (courier !== null && !creep.pos.isNearTo(target)) {
      target = courier
      target.memory.courier = true
    }

    // If we're near to the target, either give it our energy or drop it
    if (creep.pos.isNearTo(target)) {
      if (target.store[RESOURCE_ENERGY] < target.store.getCapacity()) {
        creep.transferEnergy(target)
      } else {
        creep.dropEnergy()
      }
    } else {
      creep.moveTo(target)
    }
  }
}

module.exports = helper
