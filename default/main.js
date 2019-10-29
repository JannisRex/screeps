let libControl = require('index').lib.control
let libSafemode = require('index').lib.safemode

module.exports.loop = function () {
  const spawnUnits = true
  if (spawnUnits) {
  // lowest gets called first @beginning
    libControl.spawnBuilder()
    libControl.spawnUpgrader()
    libControl.spawnMiner()
  }

  // while not spawning, to prevent undefined
  // or ref errors
  if (!Game.spawns.S1.spawns) {
    libControl.assignRoles()
    libControl.clearDeadMemory()
  }

  // Eventhandler
  const autoSafeMode = false
  if (autoSafeMode) {
    libSafemode.hostileCheck()
  }


  // helperTower.attackClosest(TOWERID)
  // helperTower.repairClosest(TOWERID)
}
