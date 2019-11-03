function howManyChargers() {
  return 3
}

function howManyUpgraders() {
  return 2
}

function howManyBuilders() {
  return 2
}

function howManyRepairers() {
  return 0
}

function getCountOfType(type) {
  let thisRoom = Game.spawns.S1.room.name

  let count = thisRoom.find(FIND_MY_CREEPS, {
    filter: function (creep) {
      if (creep.memory.role === type) {
        return true
      }

      return false
    }
  }).length

  return count
}

module.exports = {
  spawnPriority: [ 'charger', 'upgrader', 'builder', 'repairer'],
  targetCounts: {
    charger: howManyChargers(),
    upgrader: howManyUpgraders(),
    builder: howManyBuilders(),
    repairer: howManyRepairers()
  },
  getCount: getCountOfType()
}
