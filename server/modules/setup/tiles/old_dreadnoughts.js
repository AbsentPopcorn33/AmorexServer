let pickFromChanceSet = set => {
    while (Array.isArray(set)) {
        set = set[ran.chooseChance(...set.map(e => e[0]))][1];
    }
    return set;
},

spawnNatural = (tile, layeredSet, kind, bounds) => {
    if (!Config.ENABLE_FOOD) return;
    let o = new Entity(tile.randomInside());
    o.define(pickFromChanceSet(layeredSet));
    o.facing = ran.randomAngle();
    o.team = TEAM_ENEMIES;
    o.on('dead', () => tile.data[kind + 'Count']--);
    tile.data[kind + 'Count']++;
    o.confinement = bounds;
  
    
    const prefixes = ["Void", "Trans", "Rainbow", "Shadow", "Monochromatic", "Heavenly", "Withered", "Diamond", "Star", "Mythic", "Albino", "Ghost"];
    if (prefixes.some((prefix) => o.mockup.body.label.startsWith(prefix))) {
      log('polygons',`[POLYGON] Spawned: ${o.mockup.body.label}`);
      //log('logs',`[POLYGON] Spawned: ${o.mockup.body.label} at ${o.x} x, ${o.y} y!`)
    }
    return o;
},

labyrinthFoodTypes = [
    [18, [
        [1, 'egg'], [5, 'square'], [25, 'triangle'], [125, 'pentagon'], [56, 'hexagon'], [25, 'heptagon'], [14, 'octagon'], [7, 'nonagon']
    ]],
    [4, [
        /*[1, 'gem'],*/ [3, 'goldenSquare'], [9, 'goldenTriangle'], [9, 'goldenPentagon'], [5, 'goldenHexagon'], [3, 'goldenHeptagon'], [2, 'goldenOctagon'], [1, 'goldenNonagon']
    ]],
    [1, [
        [1, 'gem'], [3, 'shinySquare'], [9, 'shinyTriangle'], [9, 'shinyPentagon'], [5, 'shinyHexagon'], [3, 'shinyHeptagon'], [2, 'shinyOctagon'], [1, 'shinyNonagon']
    ]],
    [Math.pow(3, -1), [
        [1, 'jewel'], [3, 'legendarySquare'], [9, 'legendaryTriangle'], [9, 'legendaryPentagon'], [5, 'legendaryHexagon'], [3, 'legendaryHeptagon'], [2, 'legendaryOctagon'], [1, 'legendaryNonagon']
    ]],
    [Math.pow(3, -2), [
        [9, 'diamond'], [3, 'shadowSquare'], [9, 'shadowTriangle'], [9, 'shadowPentagon'], [5, 'shadowHexagon'], [3, 'ruby'], [3, 'shadowHeptagon'], [2, 'shadowOctagon'], [1, 'shadowNonagon']
    ]],
    [Math.pow(3, -3), [
        [11, 'polyStar6'], [9, 'rainbowSquare'], [24, 'rainbowTriangle'], [9, 'rainbowPentagon'], [5, 'rainbowHexagon'], [3, 'rainbowHeptagon'], [2, 'rainbowOctagon'], [1, 'rainbowNonagon']
    ]],
    [Math.pow(3, -4), [
        [9, 'transSquare'], [24, 'transTriangle'], [9, 'transPentagon'], [5, 'transHexagon'], [3, 'transHeptagon'], [2, 'transOctagon'], [1, 'transNonagon']
    ]],
    [Math.pow(3, -5,), [
        [9, 'voidSquare'], [24, 'voidTriangle'], [9, 'voidPentagon'], [5, 'voidHexagon'], [3, 'voidHeptagon'], [2, 'voidOctagon'], [1, 'voidNonagon']
    ]],
    [Math.pow(3, -5,), [
        [9, 'mythicSquare'], [24, 'mythicTriangle'], [9, 'mythicPentagon'], [5, 'mythicHexagon'], [3, 'mythicHeptagon'], [2, 'mythicOctagon'], [1, 'mythicNonagon']
    ]],
    [Math.pow(3, -6,), [
        [9, 'heavenSquare'], [24, 'heavenTriangle'], [9, 'heavenPentagon'], [5, 'heavenHexagon'], [3, 'heavenHeptagon'], [2, 'heavenOctagon'], [1, 'heavenNonagon']
    ]],
    [Math.pow(3, -6,), [
        [9, 'albinoSquare'], [24, 'albinoTriangle'], [9, 'albinoPentagon'], [5, 'albinoHexagon'], [3, 'albinoHeptagon'], [2, 'albinoOctagon'], [1, 'albinoNonagon']
    ]],
    [Math.pow(3, -6,), [
        [9, 'ghostSquare'], [24, 'ghostTriangle'], [9, 'ghostPentagon'], [5, 'ghostHexagon'], [3, 'ghostHeptagon'], [2, 'ghostOctagon'], [1, 'ghostNonagon']
    ]],
    [Math.pow(3, -7,), [
        [9, 'monochromeSquare'], [24, 'monochromeTriangle'], [9, 'monochromePentagon'], [5, 'monochromeHexagon'], [3, 'monochromeHeptagon'], [2, 'monochromeOctagon'], [1, 'monochromeNonagon']
    ]],
    [Math.pow(3, -8), [
        [12, 'sphere'], [10, 'cube'], [8, 'tetrahedron'], [6, 'octahedron'], [4, 'dodecahedron'], [2, 'icosahedron'], [1, 'tesseract']
    ]],
    [Math.pow(3, -10), [
        [10, 'notwzPentagon']
    ]],
],

labyrinthConfinement = {
    xMin: 0,
    xMax: 9000,
    yMin: 0,
    yMax: 9000
},
openConfinement = {
    xMin: 18000,
    xMax: 27000,
    yMin: 0,
    yMax: 9000
},

open = new Tile({
    color: "white",
    data: {
        allowMazeWallSpawn: true,
        foodSpawnCooldown: 0, foodCount: 0
    },
    init: tile => room.spawnableDefault.push(tile),
    tick: tile => {
        if (++tile.data.foodSpawnCooldown > Config.FOOD_SPAWN_COOLDOWN_LABY) {
            tile.data.foodSpawnCooldown = 0;
            if (tile.data.foodCount < Config.FOOD_CAP_LABY && Math.random() < Config.FOOD_SPAWN_CHANCE_LABY) {
                spawnNatural(tile, Config.FOOD_TYPES, 'food', openConfinement);
            }
        }
    }
}),

labyrinth = new Tile({
    color: "white",
    data: {
        allowMazeWallSpawn: true,
        foodSpawnCooldown: 0, foodCount: 0
    },
    init: tile => room.spawnableDefault.push(tile),
    tick: tile => {
        if (++tile.data.foodSpawnCooldown > Config.FOOD_SPAWN_COOLDOWN_LABY * 5) {
            tile.data.foodSpawnCooldown = 0;
            if (tile.data.foodCount < (Config.FOOD_CAP_LABY - 1) && Math.random() < Config.FOOD_SPAWN_CHANCE_LABY) {
                spawnNatural(tile, labyrinthFoodTypes, 'food', labyrinthConfinement);
            }
        }
    }
}),

forge = new Tile({
    color: "white",
}),

outOfBounds = new Tile({
    color: 'none'
});

module.exports = { open, labyrinth, forge, outOfBounds };