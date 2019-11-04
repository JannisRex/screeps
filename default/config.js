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

    for (let i in Memory.spawnQue) {
      if (Memory.spawnQue[i] === type) {
        count = count + 1
      }
    }
  }

  return count
}

function howManyMiner() {
  return 3
}

function howManyUpgrader() {
  return 1
}

function howManyBuilder() {
  return 1
}

function howManyRanger() {
  return 0
}

function howManyFighter() {
  return 0
}

function howManyHealer() {
  return 0
}

module.exports = {
  maxCreepParts: 13, // upper border for dynamic sizing
  getCount: getCountOfType,
  initialSpawnOrder: ['miner', 'miner', 'upgrader', 'miner', 'builder'],
  availableCreeps: ['miner', 'upgrader', 'builder', 'ranger', 'healer', 'fighter'],
  spawnCount: {
    miner: howManyMiner(),
    upgrader: howManyUpgrader(),
    builder: howManyBuilder(),
    ranger: howManyRanger(),
    healer: howManyHealer(),
    fighter: howManyFighter()
  }
}
