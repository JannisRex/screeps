/* Builds a construction site.
 * If no Energy, creep mines.
 *
 * Returns:
 * 0: Normal tick
 * 1: Switch Mode
 * 2: Nothing to do
 */
module.exports = function (creep) {
  let targets = creep.room.find(FIND_CONSTRUCTION_SITES)
  if (targets.length) {
    let workOrder = creep.build(targets[0])
    if (workOrder === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0])
    } else if (workOrder === ERR_NOT_ENOUGH_RESOURCES) {
      creep.memory.mode = 'mine'
      return 1
    }

    return 0
  }

  return 2
}
