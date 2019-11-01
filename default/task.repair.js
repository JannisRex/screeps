/* Repairs something if it can
 * If no Energy, creep mines.
 *
 * Returns:
 * 0: Normal tick
 * 1: Switch Mode
 * 2: Nothing to do
 */
module.exports = function (creep) {
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: object => object.hits < object.hitsMax
  })

  if (!targets.length) {
    return 2
  }

  if (targets.length > 0) {
    let workOrder = creep.repair(targets[0])
    if (workOrder === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0])
    } else if (workOrder === ERR_NOT_ENOUGH_RESOURCES) {
      creep.mode = 'withdrawEnergy'
      return 1
    } else if (workOrder !== OK) {
      console.log('Repair error: ' + workOrder)
      creep.say(':(')
    }

    return workOrder
  } else {
    return 2
  }

  return 0
}
