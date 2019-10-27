let helperConstants = {

  getEnergyAvailable: function () {
    let energyAvailable = 0
    energyAvailable = Game.spawns['S1'].store[RESOURCE_ENERGY]

    return energyAvailable
  }

}

module.exports = {
    energyAvailable: helperConstants.getEnergyAvailable()
}
