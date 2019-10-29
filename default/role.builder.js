let roleBuilder = {

  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false
      creep.say('🚚 acquiring')
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true
      creep.say('🚧 build')
    }

    if (creep.memory.building) {
      let targets = creep.room.find(FIND_CONSTRUCTION_SITES)
      if (targets.length) {
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: {
              stroke: '#FFA500'
            }
          })
        }
      }
    } else {
      let maxCapacity = creep.store.getCapacity()
      let energyStorage = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN) &&
                            structure.store[RESOURCE_ENERGY] >= 45
        }
      })
      let minersAlive = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner')

      // gather energy from clostest storage if
      // there is any miner (to not get Energy to 0)
      if (minersAlive.length > 0) {
        if (creep.withdraw(energyStorage[0], RESOURCE_ENERGY, maxCapacity) === ERR_NOT_IN_RANGE) {
          creep.moveTo(energyStorage[0], {
            visualizePathStyle: {
              stroke: '#ffffff'
            }
          })
        }
      } else {
        let sources = creep.room.find(FIND_SOURCES)
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0], {
            visualizePathStyle: {
              stroke: '#ffffff'
            }
          })
        }
      }
    }
  }
}

module.exports = roleBuilder
