/* Puts a creep in mine mode until it is full.
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
  let target = creep.memory.preferredSource
  if (target instanceof Array) {
    target = creep.room.lookForAt(LOOK_SOURCES, target[0], target[1])[0]
    // room.lookForAt(type, x, y)(type, target)
    // essentially just passing type and target, which
    // then will be an array itself, hence the [0]
  } else if (target) {
    target = Game.getObjectById(target)
  }

  if (!target) {
    let sources = creep.room.find(FIND_SOURCES)
    target = sources[0]
  }

  let workOrder = creep.harvest(target)
  if (workOrder === ERR_NOT_IN_RANGE) {
    // TODO: make pathfind job
    let moveOpts = opts.moveOpts || {}
    creep.moveTo(target, moveOpts)
  } else if (workOrder) {
    if (workOrder !== ERR_BUSY) {
      console.log(creep.name + ' Mine error: ' + workOrder)
    }
  } else if (creep.carry.energy === creep.carryCapacity) {
    creep.say('✖ full ✖')
    creep.memory.mode = 'work'
    return 1
  }

  return 0
}
