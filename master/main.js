let helperControl = require('./index.js/control')

module.exports.loop = function () {
  const spawnUnits = true
  if (spawnUnits) {
    helperControl.spawnHarvester()
    helperControl.spawnUpgrader()
    helperControl.spawnBuilder()
  }

  // helperTower.attackClosest(TOWERID)
  // helperTower.repairClosest(TOWERID)
}
