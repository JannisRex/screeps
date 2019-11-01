/* Puts a creep in withdraw mode until it is full.
 * or it cant get from store, so it mines
 * Then puts it in work mode.
 * opts:
 * { moveOpts: passed to creep.moveTo }
 *
 * Returns:
 * 0: Normal tick
 * 1: Switch Mode
 */

module.exports = function (creep, opts) {
  opts = opts || {}
  let maxCapacity = creep.store.getCapacity()
  let targets = creep.memory.preferredStructures

  if (!targets) {
    let structures = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_STORAGE ||
                    structure.structureType === STRUCTURE_CONTAINER ||
                    structure.structureType === STRUCTURE_EXTENSION) &&
                    structure.store[RESOURCE_ENERGY] >= 45
      }
    })
    targets = structures
  }

  if (targets.length > 0) {
    let workOrder = creep.withdraw(targets[0], RESOURCE_ENERGY)
    if (workOrder === ERR_NOT_IN_RANGE) {
    // TODO: make pathfind job
      let moveOpts = opts.moveOpts || {}
      creep.moveTo(target, moveOpts)
    } else if (workOrder === ERR_NOT_ENOUGH_RESOURCES) {
      targets.shift()
      return 0
    } else if (creep.carry.energy === creep.carryCapacity) {
      creep.say('✖ full ✖')
      creep.memory.mode = 'work'
      return 1
    }
  } else if (!targets.length) {
    creep.say('🤷‍♀️ no energy')
    creep.memory.mode = 'mine'
    return 1
  } else if (workOrder) {
    if (workOrder !== ERR_BUSY) {
      console.log(creep.name + ' Mine error: ' + workOrder)
    }
  }
  return 0
}
