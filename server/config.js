module.exports = {
    // Server
 
    // Game server domain.
    // If the host is 'localhost:NUMBER', the NUMBER must be the port setting.
    host: "amorex-ser-ft-aqocnoajxo.glitch.me",

    // Which port to run the web server on.
    port: 3000,

    // How often to update the list of the entities that players can see.
    // Has effects of when entities are activated.
    visibleListInterval: 2000,

    // How long (in ms) a socket can be disconnected without their player dying.
    maxHeartbeatInterval: 400000,
  
    restoreHeartbeatInterval: 10000,

    // Flatten entity definition, which gets rid of PARENT attributes and applies the parents' attributes to the entity definition, if they're not set in the entity already.
    flattenDefintions: false,

    // Log speed loop warnings
    LOGS: false,

    // The \modules\setup\gamemodeconfigs\ files to load.
    // To change specific things about specific gamemodes (such as team count for tdm), edit their config file in \modules\setup\gamemodeconfigs\.
    GAME_MODES: ['old_dreadnoughts'],

    // The room files to load in the setup/rooms folder.
    // NOTE: If a /gamemodeconfig/ file "replaces" the value of ROOM_SETUP, it just adds its own ROOM_SETUP's content to this array.
    // NOTE: Files starting with `map_` are maps. files starting with `overlay_` are overlays that get added on.
    // NOTE: These prefixes are only for categorisation, a room file would work the same regardless of its prefix. APS++ does nothing based on file name prefixes.
    ROOM_SETUP: ['map_apspp_default'],

    // The dimensions of a single tile on the map.
    TILE_WIDTH: 500,
    TILE_HEIGHT: 500,



    // Miscellaneous

    // How long a chat message lasts in milliseconds.
    // Includes the fade-out period.
    CHAT_MESSAGE_DURATION: 20_000,

    // If you don't want your players to color their messages.
    // They get sanitized after addons interpret them, but before they're added to the chat message dictionary.
    SANITIZE_CHAT_MESSAGE_COLORS: true,

    // If someone tries to get a file that does not exist, send them this instead.
    DEFAULT_FILE: 'index.html',

    // Window name of the server terminal.
    WINDOW_NAME: 'OSA Game Server Instance',

    // Allows you to type and run javascript code in the terminal.
    REPL_WINDOW: false,

    // Welcome message once a player spawns.
    WELCOME_MESSAGE: "You have spawned! Welcome to the game.\n"
                    +"You will be invulnerable until you move or shoot.\n"
                    +"Please report any bugs you encounter!",
    
    // How long a popup message lasts before fading out in milliseconds.
    MESSAGE_DISPLAY_TIME: 10_000,

    // How long you have to wait to respawn in seconds.
    RESPAWN_TIMEOUT: 3,
    


    // Physics

    // General multiplier for acceleration and max speeds.
    runSpeed: 2,

    // Where the bullet spawns, where 1 is fully outside the barrel and -1 is fully inside the barrel, and 0 is halfway between.
    bulletSpawnOffset: 0.5,

    // General damage multiplier everytime damage is dealt.
    DAMAGE_CONSTANT: 0.5,

    // General knockback multiplier everytime knockback is applied.
    KNOCKBACK_CONSTANT: 1.5,

    // TODO: Figure out how the math behind this works.
    GLASS_HEALTH_FACTOR: 2,

    // How strong the force is that confines entities to the map and portals apply to entities.
    ROOM_BOUND_FORCE: 0.5,



    // Gameplay

    // When an entity reaches a level, this function is called and returns how many points that entity gets for reaching that level.
   /* LEVEL_SKILL_POINT_FUNCTION: level => {
        if (level < 2) return 0;
        if (level <= 40) return 1;
        if (level <= 45 && level & 1 == 1) return 1;
        return 0;
    },*/ // More skill points down below
    LEVEL_SKILL_POINT_FUNCTION: level => {
        if (level < 2) return 0;
        if (level <= 40) return 1;
        if (level <= 45 && level & 1 == 1) return 1;
        if (level % 3 == 1 && level < 100) return 1;
        if (level % 2 == 1 && level < 150) return 1;
        return 0;
    },
    // Show the health bar text or not.
    SHOW_HEALTHBAR_TEXT: true,

    // Default skill caps.
    MAX_SKILL: 15,

    // Amount of tank tiers.
    MAX_UPGRADE_TIER: 26,

    // Level difference between each tier.
    TIER_MULTIPLIER: 20,

    // Maximum normally achievable level.
    LEVEL_CAP: 9999999999,

    // Maximum level via the level-up key and auto-level-up.
    LEVEL_CHEAT_CAP: 0,

    // Amount of player-bots to spawn.
    BOTS: 0,

    // How much XP player-bots get per second until they reach LEVEL_CAP.
    BOT_XP: 0,

    // How much XP player-bots will receive when first created.
    BOT_START_XP: 1,

    // The chances of a player-bot upgrading a specific skill when skill upgrades are available.
    BOT_SKILL_UPGRADE_CHANCES: [ 1, 1, 3, 4, 4, 4, 4, 2, 1, 1],

    // The chances of a player-bot upgrading a specific amount of times before it stops upgrading.
    BOT_CLASS_UPGRADE_CHANCES: [ 1, 5, 20, 37, 37],

    // The prefix of the bot's name.
    BOT_NAME_PREFIX: "",

    // The class that players and player-bots spawn as.
    SPAWN_CLASS: "basic",

    // How every entity regenerates their health.
    REGENERATE_TICK: 400,

    // How many members a team can have in comparison to an unweighed team.
    // Example: Lets say we have team A and B. If the weigh of A is 2 and B is 1, then the game will try to give A twice as many members as B.
    TEAM_WEIGHTS: {},



    // Natural Spawns

    // Allow foods to be spawned or not.
    // NOTE: Disabling it decreases lagness, also very useful if you don't need foods to be spawned.
    ENABLE_FOOD: true,

    FOOD_CAP_LABY: 3,
    FOOD_SPAWN_CHANCE_LABY: 0.7,
    FOOD_SPAWN_COOLDOWN_LABY: 1200,
    
    FOOD_CAP: 1, // Max normal food per normal tile.
    FOOD_SPAWN_CHANCE: 0.7, // Likeliness of normal food spawn attempts succeeding.
    FOOD_SPAWN_COOLDOWN: 1400, // Cooldown (in game ticks) of food spawn attempts being made.

    FOOD_CAP_NEST: 2, // Max nest food per nest tile.
    FOOD_SPAWN_CHANCE_NEST: 0.5, // Likeliness of nest food spawn attempts succeeding.
    FOOD_SPAWN_COOLDOWN_NEST: 1400, // Cooldown (in game ticks) of nest food spawn attempts being made.

    ENEMY_CAP_NEST: 1, // Max nest enemies per nest tile.
    ENEMY_SPAWN_CHANCE_NEST: 0.1, // Likeliness of nest enemies spawn attempts succeeding.
    ENEMY_SPAWN_COOLDOWN_NEST: 16000, // Cooldown (in game ticks) of nest enemies spawn attempts being made.

    // Cooldown (in seconds) of boss spawns being announced.
    BOSS_SPAWN_COOLDOWN: 2400000,
    // The delay (in seconds) between the boss spawns being announced and the bosses actually spawning.
    // NOTE: The spawn message (ex. "A strange trembling...") takes half as long to appear than the boss.
    BOSS_SPAWN_DURATION: 10,

    // The possible food types that can spawn.
    FOOD_TYPES: [
        [2000, [
            [32768, 'egg'], [16384, 'square'], [4096, 'triangle'], [2400, 'pentagon'], [1200, 'hexagon'], [800, 'heptagon'], [400, 'octagon'], [200, 'nonagon'], [80, 'decagon'], [64, 'hendecagon'], [48, 'dodecagon'], [32, 'tridecagon'], [20, 'tetradecagon'], [10, 'pentadecagon'], [6, 'hexadecagon'], [4, 'heptadecagon'], [2, 'octadecagon'], [1, 'enneadecagon']
        ]],
        [60, [
            /*[8192, 'gem'],*/ [2048, 'goldenSquare'], [512, 'goldenTriangle'], [128, 'goldenPentagon'], [64, 'goldenHexagon'], [32, 'goldenHeptagon'], [16, 'goldenOctagon'], [10, 'goldenNonagon'], [3, 'goldenDecagon'], [1, 'goldenHendecagon']
        ]],
        [1, [
            [8192, 'gem'], [2048, 'shinySquare'], [512, 'shinyTriangle'], [128, 'shinyPentagon'], [64, 'shinyHexagon'], [32, 'shinyHeptagon'], [16, 'shinyOctagon'], [10, 'shinyNonagon'], [3, 'shinyDecagon'], [1, 'shinyHendecagon']
        ]],
        [0.2, [
            [8192, 'jewel'], [2048, 'legendarySquare'], [512, 'legendaryTriangle'], [128, 'legendaryPentagon'], [64, 'legendaryHexagon'], [32, 'legendaryHeptagon'], [16, 'legendaryOctagon'], [10, 'legendaryNonagon'], [3, 'legendaryDecagon'], [1, 'legendaryHendecagon']
        ]],
        [0.1, [
            [4096, 'diamond'], [2048, 'shadowSquare'], [800, 'ruby'], [512, 'shadowTriangle'], [128, 'shadowPentagon'], [64, 'shadowHexagon'], [32, 'shadowHeptagon'], [16, 'shadowOctagon'], [10, 'shadowNonagon'], [3, 'shadowDecagon'], [1, 'shadowHendecagon']
        ]],
        [0.05, [
            [720, 'polyStar6'], [1024, 'rainbowSquare'], [512, 'rainbowTriangle'], [128, 'rainbowPentagon'], [64, 'rainbowHexagon'], [32, 'rainbowHeptagon'], [16, 'rainbowOctagon'], [10, 'rainbowNonagon'], [3, 'rainbowDecagon'], [1, 'rainbowHendecagon']
        ]],
        [0.025, 
            [/*[8192, 'jewel'],*/ [2048, 'transSquare'], [512, 'transTriangle'], [128, 'transPentagon'], [64, 'transHexagon'], [32, 'transHeptagon'], [16, 'transOctagon'], [10, 'transNonagon'], [3, 'transDecagon'], [1, 'transHendecagon'],
        ]],
        [0.0125, 
            [/*[8192, 'jewel'],*/ [2048, 'voidSquare'], [512, 'voidTriangle'], [128, 'voidPentagon'], [64, 'voidHexagon'], [32, 'voidHeptagon'], [16, 'voidOctagon'], [10, 'voidNonagon'], [3, 'voidDecagon'], [1, 'voidHendecagon'],
        ]],
        [0.00845, 
            [/*[8192, 'jewel'],*/ [2048, 'mythicSquare'], [512, 'mythicTriangle'], [128, 'mythicPentagon'], [64, 'mythicHexagon'], [32, 'mythicHeptagon'], [16, 'mythicOctagon'], [10, 'mythicNonagon'], [3, 'mythicDecagon'], [1, 'mythicHendecagon'],
        ]],
        [0.00616, 
            [/*[8192, 'jewel'],*/ [2048, 'heavenSquare'], [512, 'heavenTriangle'], [128, 'heavenPentagon'], [64, 'heavenHexagon'], [32, 'heavenHeptagon'], [16, 'heavenOctagon'], [10, 'heavenNonagon'], [3, 'heavenDecagon'], [1, 'heavenHendecagon'],
        ]],
        [0.005, 
            [/*[8192, 'jewel'],*/ [2048, 'albinoSquare'], [512, 'albinoTriangle'], [128, 'albinoPentagon'], [64, 'albinoHexagon'], [32, 'albinoHeptagon'], [16, 'albinoOctagon'], [10, 'albinoNonagon'], [3, 'albinoDecagon'], [1, 'albinoHendecagon'],
        ]],
[0.0035, 
            [/*[8192, 'jewel'],*/ [2048, 'ghostSquare'], [512, 'ghostTriangle'], [128, 'ghostPentagon'], [64, 'ghostHexagon'], [32, 'ghostHeptagon'], [16, 'ghostOctagon'], [10, 'ghostNonagon'], [3, 'ghostDecagon'], [1, 'ghostHendecagon'],
        ]],
        [0.00308, 
            [/*[8192, 'jewel'],*/ [2048, 'monochromeSquare'], [512, 'monochromeTriangle'], [128, 'monochromePentagon'], [64, 'monochromeHexagon'], [32, 'monochromeHeptagon'], [16, 'monochromeOctagon'], [10, 'monochromeNonagon'], [3, 'monochromeDecagon'], [1, 'monochromeHendecagon'],
        ]],
        [0.001, [
            [100000, 'sphere'], [10000, 'cube'], [1000, 'tetrahedron'], [100, 'octahedron'], [10, 'dodecahedron'], [1, 'icosahedron']
        ]],
        [0.00009313225, /* basically just 2000 divided by 2147483648%, yes this is the rarest shape ever*/[
            [1, 'notwzPentagon'], 
        ]]
    ],

    // The possible nest food types that can spawn.
    FOOD_TYPES_NEST: [
        [300, [
            [128, 'pentagon'], [72, 'hexagon'], [42, 'heptagon'], [24, 'octagon'], [14, 'nonagon'], [8, 'decagon'] /*[5, 'hendecagon'], [3, 'dodecagon'], [2, 'tridecagon'], [1, 'tetradecagon']*/
        ]]
    ],

    // The possible nest enemy types that can spawn.
    ENEMY_TYPES_NEST: [
        [19, [
            [1, 'crasher']
        ]],
        [1, [
            [1, 'sentryGun'], [1, 'sentrySwarm'], [1, 'sentryTrap']
        ]]
    ],

    // The possible boss types that can spawn.
    BOSS_TYPES: [{
        bosses: ["eliteDestroyer", "eliteGunner", "eliteSprayer", "eliteBattleship", "eliteSpawner"],
        amount: [1, 1,], chance: 2, nameType: "a",
    },{
        bosses: ["roguePalisade"],
        amount: [1, 1], chance: 1, nameType: "castle",
        message: "A strange trembling...",
    },{
        bosses: ["summoner", "eliteSkimmer", "nestKeeper"],
        amount: [1], chance: 1, nameType: "a",
        message: "A strange trembling...",
    },{
        bosses: ["paladin", "freyja", "zaphkiel", "nyx", "theia"],
        amount: [1], chance: 0.01,
        message: "The world tremors as the celestials are reborn anew!",
    },{
        bosses: ["julius", "genghis", "napoleon"],
        amount: [1], chance: 0.1,
        message: "The darkness arrives as the realms are torn apart!",
    }],



    // Default values for gamemode related things.
    // Do not change these, you'll likely break stuff!
    // Change GAME_MODES instead.
    GAMEMODE_NAME_PREFIXES: [],
    ALLOW_RADIANTS: true,
    SPECIAL_BOSS_SPAWNS: false,
    MOTHERSHIP_LOOP: false,
    RANDOM_COLORS: false,
    SPACE_PHYSICS: false,
    ARENA_TYPE: "rect",
    SPACE_MODE: false,
    GROUPS: false,
    TRAIN: false,
    MAZE: false,
    HUNT: false,
    MODE: "ffa",
    TAG: false,
    SPAWN_CONFINEMENT: {},
}
