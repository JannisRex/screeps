let helperSafemode = {

  hostileCheck: function () {
    let myRoom = Game.spawns.S1.room.name
    let hostiles = Game.rooms[myRoom].find(FIND_HOSTILE_CREEPS)
    if (hostiles.length > 0) {
      Game.rooms[myRoom].controller.activateSafeMode()
    }
  }
}

module.exports = helperSafemode
