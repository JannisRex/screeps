let helperTower = require('helper.tower')
let helperControl = require('helper.control')

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
