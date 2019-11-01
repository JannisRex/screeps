const spawn = Game.spawns.S1

let road = {

  /* Gets passed StartingX/Y and
  * DestinationX/Y. Will then
  * set construction sites at
  * path up to destination.
  */
  buildRoads: function (from, to, opts) {
    opts = opts || {}
    opts.ignoreCreeps = true

    let shortestPath = spawn.room.findPath(from, to, opts)
    for (let i in shortestPath) {
      if (shortestPath[i]) {
        let result = spawn.room.createConstructionSite(shortestPath[i].x, shortestPath[i].y, Game.STRUCTURE_ROAD)

        if (result !== OK) {
          console.log('ROAD BUILD ERROR: ', result)
        }
      }
    }
  },


  /* Executes .buildRoads() from
  * Spawn1 to all availables
  * Sources in the room.
  */
  buildToSources: function () {

  }

}

module.exports = road
