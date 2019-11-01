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
  return 1
}

module.exports = {
  spawnPriority: [ 'charger', 'upgrader', 'builder', 'repairer' ],
  targetCounts: {
    charger: howManyChargers(),
    upgrader: howManyUpgraders(),
    builder: howManyBuilders(),
    repairer: howManyRepairers()
  }
}
