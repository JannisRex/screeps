const spawn = Game.spawns.S1
const terrain = new Room.Terrain(spawn.room.name)

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
    // console.log(i + ': ' + JSON.stringify(shortestPath[i]))
      // if the terrain at pos.x && pos.y is not wall
      if (terrain.get(shortestPath[i].x, shortestPath[i].y) !== 1) {
        let result = spawn.room.createConstructionSite(shortestPath[i].x, shortestPath[i].y, STRUCTURE_ROAD)

        if (result !== OK) {
          // console.log('ROAD BUILD ERROR: ', result)
        }
      }
    }
  },


  /* Executes .buildRoads() from
  * Spawn1 to all availables
  * Sources in the room.
  */
  buildToSources: function () {
    let sources = spawn.room.find(FIND_SOURCES)
    for (let i in sources) {
      if (sources[i]) {
        this.buildRoads(spawn.pos, sources[i].pos)
      }
    }
  }

}

module.exports = road
