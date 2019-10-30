function howManyChargers() {
  return 2
}

function howManyUpgraders() {
  return 2
}

function howManyBuilders() {
  return 2
}
module.exports = {
  spawnPriority: [ 'charger', 'upgrader', 'builder' ],
  targetCounts: {
    charger: howManyChargers(),
    upgrader: howManyUpgraders(),
    builder: howManyBuilders()
  }
}
