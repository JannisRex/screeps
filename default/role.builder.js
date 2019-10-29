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
      if (creep.withdraw(energyStorage[0], RESOURCE_ENERGY, maxCapacity) === ERR_NOT_IN_RANGE) {
        creep.moveTo(energyStorage[0], {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        })
      }
    }
  }
}

module.exports = roleBuilder
