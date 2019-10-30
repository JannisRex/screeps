/* Upgrades a controller.
 * If no Energy, creep mines.
 *
 * Returns:
 * 0: Normal Work
 * 1: Switch Mode
 */

module.exports = function (creep) {
  let workOrder = creep.upgradeController(creep.room.controller)

  if (workOrder === ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller)
  } else if (workOrder === ERR_NOT_ENOUGH_RESOURCES) {
    creep.memory.mode = 'mine'
    return 1
  } else if (workOrder !== OK) {
    console.log(creep.name + ' upgrade error ' + workOrder)
  }

  return 0
}
