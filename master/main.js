let helperControl = require('index').lib.control

module.exports.loop = function () {
  const spawnUnits = true
  if (spawnUnits) {
    helperControl.spawnHarvester()
    helperControl.spawnUpgrader()
    helperControl.spawnBuilder()
  }

  helperControl.clearDeadMemory()

  // helperTower.attackClosest(TOWERID)
  // helperTower.repairClosest(TOWERID)
}
