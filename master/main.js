let helperTower = require('helper.tower')
let helperControl = require('helper.control')

let harvesterCount = 0
let builderCount = 0
let upgraderCount = 0

module.exports.loop = function () {
  const spawnUnits = true
  if (spawnUnits) {
    helperControl.spawnHarvester()
    helperControl.spawnUpgrader()
    helperControl.spawnBuilder()

    helperControl.assignRoles()
  }

  // helperTower.attackClosest(TOWERID)
  // helperTower.repairClosest(TOWERID)
}
