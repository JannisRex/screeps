/* Charges up a spawn or container.
 * If no Energy, creep mines.
 *
 * Returns:
 * 0: Normal
 * 1: Switch Mode
 * 2: Nothing to do
 */

module.exports = function (creep) {
  let targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity
    }
  })
  if (targets.length > 0) {
    let workOrder = creep.transfer(targets[0], RESOURCE_ENERGY)
    if (workOrder === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0])
    } else if (workOrder === ERR_NOT_ENOUGH_RESOURCES) {
      creep.memory.mode = 'mine'
      return 1
    }
  } else {
    return 2
  }
  return 0
}
