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

function getCountOfType(type, checkQue) {
  let thisRoom = Game.rooms[Game.spawns.S1.room.name]

  let count = thisRoom.find(FIND_MY_CREEPS, {
    filter: function (creep) {
      if (creep.memory.role === type) {
        return true
      }

      return false
    }
  }).length

  if (checkQue === undefined) {
    checkQue = false
  }

  if (checkQue) {
    let mySpawns = Game.spawns

    for (let i in mySpawns) {
      if (mySpawns[i]) {
        let spawn = mySpawns[i]
        if (spawn.spawning !== null
        && spawn.spawning !== undefined
        && Memory.creeps[spawn.spawning.name].role === type) {
          count = count + 1
        }
      }
    }
  }

  return count
}

module.exports = {
  maxCreepParts: 13, // upper border for dynamic sizing
  spawnPriority: [ 'charger', 'upgrader', 'builder', 'repairer'],
  targetCounts: {
    charger: howManyChargers(),
    upgrader: howManyUpgraders(),
    builder: howManyBuilders(),
    repairer: howManyRepairers()
  },
  getCount: getCountOfType,
  spawnOrder: ['miner', 'miner', 'builder']
}
