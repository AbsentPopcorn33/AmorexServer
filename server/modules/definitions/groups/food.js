const { bPXP, basePolygonDamage, basePolygonHealth } = require('../constants.js');
const { makeRelic, makeRare, makeCrasher, makeLaby } = require('../facilitators.js');

// EGGS
Class.egg = {
    PARENT: "food",
    LABEL: "Egg",
    VALUE: 60 * bPXP,
    SHAPE: 0,
    SIZE: 4.5,
    COLOR: "veryLightGrey",
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.5 * basePolygonHealth,
        PENETRATION: 1,
        PUSHABILITY: 0,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: false,
};
Class.gem = {
    PARENT: "food",
    LABEL: "Gem",
    VALUE: 15e6 * bPXP,
    SHAPE: 6,
    SIZE: 4.5,
    COLOR: "aqua",
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.jewel = {
    PARENT: "food",
    LABEL: "Jewel",
    VALUE: 1e8 * bPXP,
    SHAPE: 6,
    SIZE: 8,
    COLOR: "yellow",
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 50,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.ruby = {
    PARENT: "food",
    LABEL: "Ruby",
    VALUE: 18e7 * bPXP,
    SHAPE: -6,
    SIZE: 6.75,
    COLOR: "ruby",
    BODY: {
        DAMAGE: basePolygonDamage / 3,
        DENSITY: 4,
        HEALTH: 60,
        PENETRATION: 2,
        RESIST: 3,
        PUSHABILITY: 0.25,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.shinyEgg = makeRare("egg", 0);
Class.legendaryEgg = makeRare("egg", 1);
Class.shadowEgg = makeRare("egg", 2);
Class.rainbowEgg = makeRare("egg", 3);
Class.transEgg = makeRare("egg", 4); //ironic
Class.goldenEgg = makeRare("egg", 5); 
Class.voidEgg = makeRare("egg", 6);
Class.heavenEgg = makeRare("egg", 7);
Class.monochromeEgg = makeRare("egg", 8);
Class.mythicEgg = makeRare("egg", 9);
Class.albinoEgg = makeRare("egg", 10);
Class.ghostEgg = makeRare("egg", 11);

// SQUARES
Class.square = {
    PARENT: "food",
    LABEL: "Square",
    VALUE: 400*bPXP,
    SHAPE: 4,
    SIZE: 14,
    COLOR: "gold",
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
        ACCELERATION: 0.0075
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
Class.shinySquare = makeRare("square", 0);
Class.legendarySquare = makeRare("square", 1);
Class.shadowSquare = makeRare("square", 2);
Class.rainbowSquare = makeRare("square", 3);
Class.transSquare = makeRare("square", 4);
Class.goldenSquare = makeRare("square", 5);
Class.voidSquare = makeRare("square", 6);
Class.heavenSquare = makeRare("square", 7);
Class.monochromeSquare = makeRare("square", 8);
Class.mythicSquare = makeRare("square", 9);
Class.albinoSquare = makeRare("square", 10);
Class.ghostSquare = makeRare("square", 11);

// TRIANGLES
Class.triangle = {
    PARENT: "food",
    LABEL: "Triangle",
    VALUE: 700*bPXP,
    SHAPE: 3,
    SIZE: 10,
    COLOR: "orange",
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
        ACCELERATION: 0.005
    },
    DRAW_HEALTH: true,
};
Class.shinyTriangle = makeRare("triangle", 0);
Class.legendaryTriangle = makeRare("triangle", 1);
Class.shadowTriangle = makeRare("triangle", 2);
Class.rainbowTriangle = makeRare("triangle", 3);
Class.transTriangle = makeRare("triangle", 4);
Class.goldenTriangle = makeRare("triangle", 5);
Class.voidTriangle = makeRare("triangle", 6);
Class.heavenTriangle = makeRare("triangle", 7);
Class.monochromeTriangle = makeRare("triangle", 8);
Class.mythicTriangle = makeRare("triangle", 9);
Class.albinoTriangle = makeRare("triangle", 10);
Class.ghostTriangle = makeRare("triangle", 11);

// PENTAGONS
Class.pentagon = {
    PARENT: "food",
    LABEL: "Pentagon",
    VALUE: 4000*bPXP,
    SHAPE: 5,
    SIZE: 21,
    COLOR: "purple",
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
};
Class.notwzPentagon = {
    PARENT: "food",
    LABEL: "Withered Polygon",
    VALUE: 2147483648*bPXP*2,
    SHAPE: 'https://cdn.glitch.global/da897f11-c99e-458d-8a99-2fb876c3add1/Notwzshape.png?v=1724007414799',
    SIZE: 46,
    LEVEL_CAP: 45,
    COLOR: "purple",
    BROADCAST_MESSAGE: "A withered Polygon has been destroyed!",
    BODY: {
        DAMAGE: 3 * basePolygonDamage,
        DENSITY: 64,
        HEALTH: 8137 * basePolygonHealth,
        RESIST: 1.5,
        PENETRATION: 1,
        ACCELERATION: 0.0035
    },
    GLOW:{ RADIUS: 10, COLOR: 19, ALPHA:1, RECURSION: 9,},
    DRAW_HEALTH: true,
};
Class.shinyPentagon = makeRare("pentagon", 0);
Class.legendaryPentagon = makeRare("pentagon", 1);
Class.shadowPentagon = makeRare("pentagon", 2);
Class.rainbowPentagon = makeRare("pentagon", 3);
Class.transPentagon = makeRare("pentagon", 4);
Class.goldenPentagon = makeRare("pentagon", 5);
Class.voidPentagon = makeRare("pentagon", 6);
Class.heavenPentagon = makeRare("pentagon", 7);
Class.monochromePentagon = makeRare("pentagon", 8);
Class.mythicPentagon = makeRare("pentagon", 9);
Class.albinoPentagon = makeRare("pentagon", 10);
Class.ghostPentagon = makeRare("pentagon", 11);

// BETA PENTAGONS
Class.betaPentagon = {
    PARENT: "food",
    LABEL: "Beta Pentagon",
    VALUE: 10000*bPXP,
    SHAPE: 5,
    SIZE: 30,
    COLOR: "purple",
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 75 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        PENETRATION: 1.1,
        SHIELD: 20 * basePolygonHealth,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.shinyBetaPentagon = makeRare("betaPentagon", 0);
Class.legendaryBetaPentagon = makeRare("betaPentagon", 1);
Class.shadowBetaPentagon = makeRare("betaPentagon", 2);
Class.rainbowBetaPentagon = makeRare("betaPentagon", 3);
Class.transBetaPentagon = makeRare("betaPentagon", 4);
Class.goldenBetaPentagon = makeRare("betaPentagon", 5);
Class.voidBetaPentagon = makeRare("betaPentagon", 6);
Class.heavenBetaPentagon = makeRare("betaPentagon", 7);
Class.monochromeBetaPentagon = makeRare("betaPentagon", 8);
Class.mythicBetaPentagon = makeRare("betaPentagon", 9);
Class.albinoBetaPentagon = makeRare("betaPentagon", 10);
Class.ghostBetaPentagon = makeRare("betaPentagon", 11);

// ALPHA PENTAGONS
Class.alphaPentagon = {
    PARENT: "food",
    LABEL: "Alpha Pentagon",
    VALUE: 102e3*bPXP,
    SHAPE: 5,
    SIZE: 58,
    COLOR: "purple",
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 500.5 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        PENETRATION: 1.1,
        SHIELD: 4 * basePolygonHealth,
        ACCELERATION: 0.0025
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.shinyAlphaPentagon = makeRare("alphaPentagon", 0);
Class.legendaryAlphaPentagon = makeRare("alphaPentagon", 1);
Class.shadowAlphaPentagon = makeRare("alphaPentagon", 2);
Class.rainbowAlphaPentagon = makeRare("alphaPentagon", 3);
Class.transAlphaPentagon = makeRare("alphaPentagon", 4);
Class.goldenAlphaPentagon = makeRare("alphaPentagon", 5);
Class.voidAlphaPentagon = makeRare("alphaPentagon", 6);
Class.heavenAlphaPentagon = makeRare("alphaPentagon", 7);
Class.monochromeAlphaPentagon = makeRare("alphaPentagon", 8);
Class.mythicAlphaPentagon = makeRare("alphaPentagon", 9);
Class.albinoAlphaPentagon = makeRare("alphaPentagon", 10);
Class.ghostAlphaPentagon = makeRare("alphaPentagon", 11);

// HEXAGONS
Class.hexagon = {
    PARENT: "food",
    LABEL: "Hexagon",
    VALUE: 18000*bPXP,
    SHAPE: 6,
    SIZE: 25,
    COLOR: "hexagon",
    BODY: {
        DAMAGE: 3 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 20 * basePolygonHealth,
        RESIST: 1.3,
        SHIELD: 5 * basePolygonHealth,
        PENETRATION: 1.1,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};
Class.shinyHexagon = makeRare("hexagon", 0);
Class.legendaryHexagon = makeRare("hexagon", 1);
Class.shadowHexagon = makeRare("hexagon", 2);
Class.rainbowHexagon = makeRare("hexagon", 3);
Class.transHexagon = makeRare("hexagon", 4);
Class.goldenHexagon = makeRare("hexagon", 5);
Class.voidHexagon = makeRare("hexagon", 6);
Class.heavenHexagon = makeRare("hexagon", 7);
Class.monochromeHexagon = makeRare("hexagon", 8);
Class.mythicHexagon = makeRare("hexagon", 9);
Class.albinoHexagon = makeRare("hexagon", 10);
Class.ghostHexagon = makeRare("hexagon", 11);

// HEPTAGONS

Class.heptagon = {
    PARENT: "food",
    LABEL: "Heptagon",
    VALUE: 48000*bPXP,
    SHAPE: 7,
    SIZE: 35,
    COLOR: "heptagon",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 16,
        HEALTH: 32 * basePolygonHealth,
        RESIST: 1.4,
        SHIELD: 6 * basePolygonHealth,
        PENETRATION: 1.1,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};

Class.shinyHeptagon = makeRare("heptagon", 0);
Class.legendaryHeptagon = makeRare("heptagon", 1);
Class.shadowHeptagon = makeRare("heptagon", 2);
Class.rainbowHeptagon = makeRare("heptagon", 3);
Class.transHeptagon = makeRare("heptagon", 4);
Class.goldenHeptagon = makeRare("heptagon", 5);
Class.voidHeptagon = makeRare("heptagon", 6);
Class.heavenHeptagon = makeRare("heptagon", 7);
Class.monochromeHeptagon = makeRare("heptagon", 8);
Class.mythicHeptagon = makeRare("heptagon", 9);
Class.albinoHeptagon = makeRare("heptagon", 10);
Class.ghostHeptagon = makeRare("heptagon", 11);

// OCTAGONS

Class.octagon = {
    PARENT: "food",
    LABEL: "Octagon",
    VALUE: 100000*bPXP,
    SHAPE: 8,
    SIZE: 50,
    COLOR: "orange",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 64 * basePolygonHealth,
        RESIST: 1.45,
        SHIELD: 6 * basePolygonHealth,
        PENETRATION: 1.15,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};

Class.shinyOctagon = makeRare("octagon", 0);
Class.legendaryOctagon = makeRare("octagon", 1);
Class.shadowOctagon = makeRare("octagon", 2);
Class.rainbowOctagon = makeRare("octagon", 3);
Class.transOctagon = makeRare("octagon", 4);
Class.goldenOctagon = makeRare("octagon", 5);
Class.voidOctagon = makeRare("octagon", 6);
Class.heavenOctagon = makeRare("octagon", 7);
Class.monochromeOctagon = makeRare("octagon", 8);
Class.mythicOctagon = makeRare("octagon", 9);
Class.albinoOctagon = makeRare("octagon", 10);
Class.ghostOctagon = makeRare("octagon", 11);

// NONAGONS

Class.nonagon = {
    PARENT: "food",
    LABEL: "Nonagon",
    VALUE: 212000*bPXP,
    SHAPE: 9,
    SIZE: 64,
    COLOR: "mustard",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 50,
        HEALTH: 108 * basePolygonHealth,
        RESIST: 1.49,
        SHIELD: 6 * basePolygonHealth,
        PENETRATION: 1.2,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};

Class.shinyNonagon = makeRare("nonagon", 0);
Class.legendaryNonagon = makeRare("nonagon", 1);
Class.shadowNonagon = makeRare("nonagon", 2);
Class.rainbowNonagon = makeRare("nonagon", 3);
Class.transNonagon = makeRare("nonagon", 4);
Class.goldenNonagon = makeRare("nonagon", 5);
Class.voidNonagon = makeRare("nonagon", 6);
Class.heavenNonagon = makeRare("nonagon", 7);
Class.monochromeNonagon = makeRare("nonagon", 8);
Class.mythicNonagon = makeRare("nonagon", 9);
Class.albinoNonagon = makeRare("nonagon", 10);
Class.ghostNonagon = makeRare("nonagon", 11);

// DECAGONS

Class.decagon = {
    PARENT: "food",
    LABEL: "Decagon",
    VALUE: 600000*bPXP,
    SHAPE: 10,
    SIZE: 82,
    COLOR: "black",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 90,
        HEALTH: 246 * basePolygonHealth,
        RESIST: 1.52,
        SHIELD: 4.5 * basePolygonHealth,
        PENETRATION: 1.25,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};

Class.shinyDecagon = makeRare("decagon", 0);
Class.legendaryDecagon = makeRare("decagon", 1);
Class.shadowDecagon = makeRare("decagon", 2);
Class.rainbowDecagon = makeRare("decagon", 3);
Class.transDecagon = makeRare("decagon", 4);
Class.goldenDecagon = makeRare("decagon", 5);
Class.voidDecagon = makeRare("decagon", 6);
Class.heavenDecagon = makeRare("decagon", 7);
Class.monochromeDecagon = makeRare("decagon", 8);
Class.mythicDecagon = makeRare("decagon", 9);
Class.albinoDecagon = makeRare("decagon", 10);
Class.ghostDecagon = makeRare("decagon", 11);

// HENDECAGONS

Class.hendecagon = {
    PARENT: "food",
    LABEL: "Hendecagon",
    VALUE: 1003800*bPXP,
    SHAPE: 11,
    SIZE: 120,
    COLOR: "hendecagon",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 120,
        HEALTH: 312 * basePolygonHealth,
        RESIST: 1.55,
        SHIELD: 3.75 * basePolygonHealth,
        PENETRATION: 1.3,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};

Class.shinyHendecagon = makeRare("hendecagon", 0);
Class.legendaryHendecagon = makeRare("hendecagon", 1);
Class.shadowHendecagon = makeRare("hendecagon", 2);
Class.rainbowHendecagon = makeRare("hendecagon", 3);
Class.transHendecagon = makeRare("hendecagon", 4);
Class.goldenHendecagon = makeRare("hendecagon", 5);
Class.voidHendecagon = makeRare("hendecagon", 6);
Class.heavenHendecagon = makeRare("hendecagon", 7);
Class.monochromeHendecagon = makeRare("hendecagon", 8);
Class.mythicHendecagon = makeRare("hendecagon", 9);
Class.albinoHendecagon = makeRare("hendecagon", 10);
Class.ghostHendecagon = makeRare("hendecagon", 11);

// DODECAGONS

Class.dodecagon = {
    PARENT: "food",
    LABEL: "Dodecagon",
    VALUE: 3000000*bPXP,
    SHAPE: 12,
    SIZE: 150,
    COLOR: "white",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 150,
        HEALTH: 512 * basePolygonHealth,
        RESIST: 1.6,
        SHIELD: 2.95 * basePolygonHealth,
        PENETRATION: 1.35,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};


// TRIDECAGONS

Class.tridecagon = {
    PARENT: "food",
    LABEL: "Tridecagon",
    VALUE: 5000000*bPXP,
    SHAPE: 13,
    SIZE: 170,
    COLOR: "tridecagon",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 170,
        HEALTH: 912 * basePolygonHealth,
        RESIST: 1.6,
        SHIELD: 2.5 * basePolygonHealth,
        PENETRATION: 1.4,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};



// TETRADECAGONS

Class.tetradecagon = {
    PARENT: "food",
    LABEL: "Tetradecagon",
    VALUE: 10000000*bPXP,
    SHAPE: 14,
    SIZE: 200,
    COLOR: "white",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 200,
        HEALTH: 1300 * basePolygonHealth,
        RESIST: 1.6,
        SHIELD: 2.2 * basePolygonHealth,
        PENETRATION: 1.4,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};

// PENTADECAGONS

Class.pentadecagon = {
    PARENT: "food",
    LABEL: "Pentadecagon",
    VALUE: 19000000*bPXP,
    SHAPE: 15,
    SIZE: 256,
    COLOR: "white",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 256,
        HEALTH: 1900 * basePolygonHealth,
        RESIST: 1.6,
        SHIELD: 2 * basePolygonHealth,
        PENETRATION: 1.4,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};

// HEXADECAGONS

Class.hexadecagon = {
    PARENT: "food",
    LABEL: "Hexadecagon",
    VALUE: 30000000*bPXP,
    SHAPE: 16,
    SIZE: 278,
    COLOR: "white",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 278,
        HEALTH: 2500 * basePolygonHealth,
        RESIST: 1.6,
        SHIELD: 1.75 * basePolygonHealth,
        PENETRATION: 1.4,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};


// HEPTADECAGONS

Class.heptadecagon = {
    PARENT: "food",
    LABEL: "Heptadecagon",
    VALUE: 50000000*bPXP,
    SHAPE: 17,
    SIZE: 306,
    COLOR: "white",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 306,
        HEALTH: 3800 * basePolygonHealth,
        RESIST: 1.6,
        SHIELD: 1.4 * basePolygonHealth,
        PENETRATION: 1.4,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};

// OCTADECAGONS

Class.octadecagon = {
    PARENT: "food",
    LABEL: "Octadecagon",
    VALUE: 80000000*bPXP,
    SHAPE: 18,
    SIZE: 333,
    COLOR: "white",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 333,
        HEALTH: 5000 * basePolygonHealth,
        RESIST: 1.6,
        SHIELD: 1.4 * basePolygonHealth,
        PENETRATION: 1.4,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};

// ENNEADECAGONS

Class.enneadecagon = {
    PARENT: "food",
    LABEL: "Enneadecagon",
    VALUE: 120000000*bPXP,
    SHAPE: 19,
    SIZE: 360,
    COLOR: "white",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 360,
        HEALTH: 7000 * basePolygonHealth,
        RESIST: 1.6,
        SHIELD: 1.4 * basePolygonHealth,
        PENETRATION: 1.4,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};

// ICOSAGONS

Class.icosagon = {
    PARENT: "food",
    LABEL: "Icosagon",
    VALUE: 160000000*bPXP,
    SHAPE: 20,
    SIZE: 400,
    COLOR: "pureBlack",
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 400,
        HEALTH: 10000 * basePolygonHealth,
        RESIST: 1.6,
        SHIELD: 1.4 * basePolygonHealth,
        PENETRATION: 1.4,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};

// 3D POLYGONS
Class.sphere = {
    PARENT: "food",
    LABEL: "The Sphere",
    FACING_TYPE: "noFacing",
    VALUE: 3e8*bPXP,
    SHAPE: 0,
    SIZE: 9,
    COLOR: {
        BASE: "veryLightGrey",
        BRIGHTNESS_SHIFT: -15,
    },
    BODY: {
        DAMAGE: 4,
        DENSITY: 16,
        HEALTH: 30,
        RESIST: 1.25,
        PENETRATION: 15,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    PROPS: [{
        POSITION: [17, 0, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: -14 }, BORDERLESS: true }]
    }, {
        POSITION: [15, 1, -1, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: -9 }, BORDERLESS: true }]
    }, {
        POSITION: [13, 2, -2, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: -8 }, BORDERLESS: true }]
    }, {
        POSITION: [11, 3, -3, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: -3 }, BORDERLESS: true }]
    }, {
        POSITION: [8, 3.25, -3.25, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: 3 }, BORDERLESS: true }]
    }, {
        POSITION: [6, 3, -3, 0, 1],
        TYPE: ["egg", { COLOR: { BRIGHTNESS_SHIFT: 9 }, BORDERLESS: true }]
    }]
};
Class.cube = {
    PARENT: "food",
    LABEL: "The Cube",
    VALUE: 1e9*bPXP,
    SIZE: 10,
    COLOR: "egg",
    SHAPE: "M -0.13 0.07 L -0.87 -0.35 L -0.87 0.5 L -0.13 0.93 Z M 0.13 0.07 L 0.13 0.93 L 0.87 0.5 L 0.87 -0.35 Z M 0 -0.15 L 0.74 -0.57 L 0 -1 L -0.74 -0.57 Z",
    BODY: {
        DAMAGE: 4.8,
        DENSITY: 20,
        HEALTH: 40,
        RESIST: 1.25,
        PENETRATION: 17.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.tetrahedron = {
    PARENT: "food",
    LABEL: "The Tetrahedron",
    VALUE: 3e9*bPXP,
    SIZE: 12,
    COLOR: "egg",
    SHAPE: "M -0.13 0.07 L -0.87 -0.35 L -0.13 0.92 Z M 0.13 0.07 L 0.13 0.92 L 0.87 -0.35 Z M 0 -0.15 L 0.74 -0.57 L -0.74 -0.57 Z",
    BODY: {
        DAMAGE: 6,
        DENSITY: 23,
        HEALTH: 50,
        RESIST: 1.25,
        PENETRATION: 22.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.octahedron = {
    PARENT: "food",
    LABEL: "The Octahedron",
    VALUE: 4e9*bPXP,
    SIZE: 13,
    COLOR: "egg",
    SHAPE: "M -0.12 -0.12 L -0.12 -0.88 L -0.88 -0.12 Z M -0.12 0.12 L -0.88 0.12 L -0.12 0.88 Z M 0.12 0.12 L 0.12 0.88 L 0.88 0.12 Z M 0.12 -0.12 L 0.88 -0.12 L 0.12 -0.88 Z",
    BODY: {
        DAMAGE: 6.5,
        DENSITY: 26,
        HEALTH: 60,
        RESIST: 1.25,
        PENETRATION: 30,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.dodecahedron = {
    PARENT: "food",
    LABEL: "The Dodecahedron",
    VALUE: 5e9*bPXP,
    SIZE: 18,
    COLOR: "egg",
    SHAPE: "M -0.28 -0.39 H 0.28 L 0.455 0.15 L 0 0.48 L -0.455 0.15 Z M -0.951 -0.309 L -0.957 0.194 L -0.659 0.102 L -0.473 -0.469 L -0.66 -0.719 Z M -0.588 0.809 L -0.111 0.97 L -0.107 0.658 L -0.592 0.305 L -0.888 0.406 Z M 0.588 0.809 L 0.888 0.406 L 0.593 0.305 L 0.107 0.658 L 0.111 0.97 Z M 0.951 -0.309 L 0.66 -0.719 L 0.473 -0.469 L 0.659 0.102 L 0.957 0.194 Z M 0 -1 L -0.48 -0.85 L -0.3 -0.595 H 0.3 L 0.48 -0.85 Z",
    BODY: {
        DAMAGE: 7,
        DENSITY: 28,
        HEALTH: 70,
        RESIST: 1.25,
        PENETRATION: 32.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.icosahedron = {
    PARENT: "food",
    LABEL: "The Icosahedron",
    VALUE: 8e9*bPXP,
    SIZE: 20,
    COLOR: "egg",
    SHAPE: "M -0.84 0.485 L -0.196 0.621 L -0.636 -0.141 Z M 0.733 -0.319 L 0.912 0.27 L 0.911 -0.422 Z M 0.643 -0.475 L 0.222 -0.925 L 0.821 -0.578 Z M 0.84 0.485 L 0.636 -0.141 L 0.196 0.621 Z M -0.643 -0.475 L -0.222 -0.925 L -0.821 -0.578 Z M -0.733 -0.319 L -0.912 0.27 L -0.911 -0.422 Z M 0 -0.97 L -0.44 -0.48 L 0.44 -0.48 Z M -0.09 0.794 L -0.69 0.655 L -0.09 1 Z M 0.09 0.794 L 0.69 0.655 L 0.09 1 Z M 0 0.62 L -0.537 -0.31 L 0.537 -0.31 Z",
    BODY: {
        DAMAGE: 9,
        DENSITY: 30,
        HEALTH: 80,
        RESIST: 1.25,
        PENETRATION: 35,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};

// RELICS
for (let [gemColor, name] of [
    [undefined, ""],
    ["powerGem", "Power"],
    ["spaceGem", "Space"],
    ["realityGem", "Reality"],
    ["soulGem", "Soul"],
    ["timeGem", "Time"],
    ["mindGem", "Mind"]
]) {
    let gem;
    if (gemColor) {
        gem = Class[name + "Gem"] = {
            PARENT: 'gem',
            LABEL: name + ' Gem',
            SHAPE: 6,
            COLOR: gemColor
        }
    }

    Class[name + "EggRelic"] = makeRelic("egg", 0.5, gem, 7);
    Class[name + "SquareRelic"] = makeRelic("square", 1, gem);
    Class[name + "TriangleRelic"] = makeRelic("triangle", 1.45, gem);
    Class[name + "PentagonRelic"] = makeRelic("pentagon", -0.6, gem);
    Class[name + "BetaPentagonRelic"] = makeRelic("betaPentagon", -0.6, gem);
    Class[name + "AlphaPentagonRelic"] = makeRelic("alphaPentagon", -0.6, gem);
    Class[name + "HexagonRelic"] = makeRelic("hexagon", -0.4, gem, undefined, 6.25);
    Class[name + "HeptagonRelic"] = makeRelic("heptagon", -0.2, gem, undefined, 7.25);
}

// 4D
Class.tesseract = {
    PARENT: "food",
    LABEL: "The Tesseract",
    VALUE: 11e9*bPXP,
    SIZE: 25,
    COLOR: "egg",
    SHAPE: "M 0.34 0.47 L 0.58 0.71 L -0.58 0.71 L -0.34 0.47 Z M 0.47 -0.34 L 0.71 -0.58 L 0.71 0.58 L 0.47 0.34 Z M -0.34 -0.47 L -0.58 -0.71 L 0.58 -0.71 L 0.34 -0.47 Z M -0.47 0.34 L -0.71 0.58 L -0.71 -0.58 L -0.47 -0.34 Z M 0.32 0.32 L 0.32 -0.32 L -0.32 -0.32 L -0.32 0.32 L 0.32 0.32",
    BODY: {
        DAMAGE: 10,
        DENSITY: 40,
        RESIST: 1.25,
        HEALTH: 200,
        PENETRATION: 50,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};

// STARS, DIAMONDS
Class.diamond = {
    PARENT: "food",
    LABEL: "Diamond",
    VALUE: 36000000*bPXP,
    SHAPE: [[-0.9,0],[0,-1.3],[0.9,0],[0,1.3]],
    SIZE: 9,
    COLOR: "diamond",
    BODY: {
        DAMAGE: 5 * basePolygonDamage,
        DENSITY: 1,
        HEALTH: 15 * basePolygonHealth,
        RESIST: 1.5,
        PENETRATION: 1.1,
        ACCELERATION: 0.003,},
    DRAW_HEALTH: true,
    KILL_MESSAGE: 'destroyed',
};

Class.polyStar6 = {
    PARENT: "food",
    LABEL: "Star",
    VALUE: 44000000*bPXP,
    SHAPE: [[0.4,-0.5],[1,-0.5],[0.666,0],[1,0.5],[0.4,0.5],[0,1.125],[-0.4,0.5],[-1,0.5],[-0.666,0],[-1,-0.5],[-0.4,-0.5],[0,-1.125]],
    SIZE: 28,
    GLOW: {RADIUS: 2, RECURSION: 20, COLOR: 'yellow'},
    COLOR: "yellow",
    BODY: {
        DAMAGE: 5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 30 * basePolygonHealth,
        RESIST: 1.5,
        SHIELD: 1 * basePolygonHealth,
        PENETRATION: 1.1,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
    KILL_MESSAGE: 'killed',
    BROADCAST_MESSAGE: "A star has been destroyed!",
};
Class.shinyHexagon = makeRare("hexagon", 0);
Class.legendaryHexagon = makeRare("hexagon", 1);
Class.shadowHexagon = makeRare("hexagon", 2);
Class.rainbowHexagon = makeRare("hexagon", 3);
Class.transHexagon = makeRare("hexagon", 4);


// LABY
let polyNames = [ "egg", "square", "triangle", "pentagon", "hexagon", "heptagon", "octagon"],
    shinyNames = [ "", "shiny", "legendary", "shadow", "rainbow", "trans" ];
for (let tier = 0; tier < 6; tier++) {
    for (let poly in polyNames) {

        let polyName = polyNames[poly];
        polyName = polyName[0].toUpperCase() + polyName.slice(1);

        for (let shiny in shinyNames) {

            let shinyName = shinyNames[shiny];
            let food = shinyName + polyName;
            food = food[0].toLowerCase() + food.slice(1);

            Class[`laby${tier}${food}`] = // backwards compatability, DO NOT ADD A SEMICOLON HERE. javascript is funny about whitespace characters :))))))
            Class[`laby_${poly}_${tier}_${shiny}_0`] = makeLaby(Class[food], tier, (polyName == "Triangle" && tier > 0) ? 2/3 : 1);

            Class[`laby_${poly}_${tier}_${shiny}_1`] = makeCrasher(Class[`laby_${poly}_${tier}_${shiny}_0`]);
        }
    }
}