const { combineStats, addAura, makeAuto, weaponArray, dereference } = require('../facilitators.js');
const { smshskl, base } = require('../constants.js');
const g = require('../gunvals.js');

const basicEliteBody = {
	SPEED: base.SPEED * 0.75,
	HEALTH: base.HEALTH * 2,
	SHIELD: base.SHIELD * 1.75,
	REGEN: base.REGEN * 0.7,
	FOV: base.FOV,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 3,
	ACCELERATION: base.ACCEL * 0.8,
};
const squarenoughtBody = {
	SPEED: base.SPEED * 0.6,
	HEALTH: base.HEALTH * 2.5,
	SHIELD: base.SHIELD * 2.7,
	REGEN: base.REGEN * 1.4,
	FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 2.75,
	ACCELERATION: base.ACCEL * 0.65,
};
const trinoughtBody = {
	SPEED: base.SPEED * 0.55,
	HEALTH: base.HEALTH * 3.5,
	SHIELD: base.SHIELD * 2.9,
	REGEN: base.REGEN * 1.5,
	FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 3,
	ACCELERATION: base.ACCEL * 0.55,
};
const pentanoughtBody = {
	SPEED: base.SPEED * 0.5,
	HEALTH: base.HEALTH * 4.25,
	SHIELD: base.SHIELD * 3.1,
	REGEN: base.REGEN * 1.55,
	FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 3.25,
	ACCELERATION: base.ACCEL * 0.45,
};
const hexnoughtBody = {
	SPEED: base.SPEED * 0.45,
	HEALTH: base.HEALTH * 5,
	SHIELD: base.SHIELD * 3.3,
	REGEN: base.REGEN * 1.6,
	FOV: base.FOV * 0.95,
	RESIST: base.RESIST,
	DENSITY: base.DENSITY * 3.5,
	ACCELERATION: base.ACCEL * 0.4,
};
const hpBuffBodyStats = [
	{ HEALTH: 1.3, SPEED: 1.15, SHIELD: 1.4,  REGEN: 1.1  },
	{ HEALTH: 1.7, SPEED: 1.1,  SHIELD: 1.65, REGEN: 1.45 },
	{ HEALTH: 1.8, SPEED: 1.17, SHIELD: 1.9,  REGEN: 1.6  },
	{ HEALTH: 1.9, SPEED: 1.17, SHIELD: 2.15, REGEN: 1.7  },
];
const speedBuffBodyStats = [
	{ HEALTH: 0.9 , SPEED: 1.3, SHIELD: 0.8,  REGEN: 0.9   },
	{ HEALTH: 0.8,  SPEED: 1.5, SHIELD: 0.83, REGEN: 0.9 },
	{ HEALTH: 0.75, SPEED: 1.6, SHIELD: 0.75, REGEN: 0.8 },
];
const healerBodyStats = [
	{ HEALTH: 1.1,  SPEED: 1.04, SHIELD: 1.2,  REGEN: 1.15 },
	{ HEALTH: 1,    SPEED: 0.98, SHIELD: 1.28, REGEN: 1.2  },
	{ HEALTH: 0.92, SPEED: 0.94, SHIELD: 1.35, REGEN: 1.25 },
];

function combineBodyStats(...bodies) {
	let output = {
		HEALTH: 1,
		SPEED: 1,
		SHIELD: 1,
		REGEN: 1,
	}
	for (let body of bodies) {
		for (let k in body) {
			output[k] *= body[k];
		}
	}
	return output;
}

// Comment out the line below to enable this addon, uncomment it to disable this addon.
 //return console.log('--- Dreadnoughts v2 addon [dreadv2.js] is disabled. See lines 60-61 to enable it. ---');

// Set the below variable to true to enable hex dreadnought building.
const buildHexnoughts = false;

// Set the below variable to true to enable photosphere with 10 auras instead of 6.
const useOldPhotosphere = false;

// For hexnought merging
const hexnoughtScaleFactor = 0.9;

// Misc
Class.genericDreadnoughtOfficialV2 = {
	PARENT: "genericTank",
	SKILL_CAP: Array(10).fill(smshskl),
	REROOT_UPGRADE_TREE: ["dreadWeaponOfficialV2", "dreadBodyOfficialV2"],
}
Class.genericEggnought = {
	PARENT: "genericDreadnoughtOfficialV2",
	BODY: basicEliteBody,
	SHAPE: 3,
	COLOR: 'crasher',
	SIZE: 15.5,
	DANGER: 12,
}
Class.genericSquarenought = {
	PARENT: "genericDreadnoughtOfficialV2",
	BODY: squarenoughtBody,
	SHAPE: 4,
	COLOR: 'square',
	SIZE: 20,
	DANGER: 9,
}
Class.genericTrinought = {
	PARENT: "genericDreadnoughtOfficialV2",
	BODY: trinoughtBody,
	SHAPE: 3.5,
	COLOR: 'triangle',
	SIZE: 23,
	DANGER: 10,
}
Class.genericPentanought = {
	PARENT: "genericDreadnoughtOfficialV2",
	BODY: pentanoughtBody,
	SHAPE: 5.5,
	COLOR: 'pentagon',
	SIZE: 25,
	DANGER: 11,
}
Class.genericHexnought = {
	PARENT: "genericDreadnoughtOfficialV2",
	BODY: hexnoughtBody,
	SHAPE: 6,
	COLOR: 'hexagon',
	SIZE: 26,
	DANGER: 12,
}

Class.spamAutoTurret = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.flankGuard, g.autoTurret, {recoil: 0.125}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.supermissile = {
	PARENT: "bullet",
	LABEL: "Missile",
	INDEPENDENT: true,
	BODY: {
		RANGE: 120,
	},
	GUNS: [
		{
			POSITION: [14, 6, 1, 0, -2, 130, 0],
			PROPERTIES: {
				AUTOFIRE: true,
				SHOOT_SETTINGS: combineStats([g.basic, g.lowPower, {reload: 1.15, speed: 1.3, maxSpeed: 1.3, recoil: 0.75}]),
				TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
				STAT_CALCULATOR: "thruster",
			},
		}, {
			POSITION: [14, 6, 1, 0, 2, 230, 0],
			PROPERTIES: {
				AUTOFIRE: true,
				SHOOT_SETTINGS: combineStats([g.basic, g.lowPower, {reload: 1.15, speed: 1.3, maxSpeed: 1.3, recoil: 0.75}]),
				TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
				STAT_CALCULATOR: "thruster",
			},
		}, {
			POSITION: [14, 6, 1, 0, 0, 0, 0.2],
			PROPERTIES: {
				AUTOFIRE: true,
				SHOOT_SETTINGS: combineStats([g.basic, g.lowPower, g.skimmer, {reload: 1.15, speed: 1.15, maxSpeed: 1.15, recoil: 0.75}]),
				TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
			},
		},
	],
};
Class.betadrone = {
	PARENT: "drone",
	PROPS: [
		{
			POSITION: [10, 0, 0, 180, 1],
			TYPE: ["triangle", {COLOR: -1}],
		},
	]
}

// Auras
Class.atmosphereAuraElit1 = addAura(1, 1, 0.15);
Class.atmosphereAuraOfficialV2 = addAura(1, 1, 0.15);
Class.heliosphereAuraElit1 = addAura(0.9, 1.4, 0.16);
Class.furnaceAuraElit1 = addAura(0.85, 1.8, 0.17);
Class.coronaAuraOfficialV2 = addAura(1.15, 0.8, 0.15);
Class.trinoughtBigAura = addAura(0.7, 1.5);
Class.trinoughtSmallAura = addAura(0.7, 2.1, 0.15);
Class.pentanoughtBigAura = addAura(1.2, 1.45);
Class.pentanoughtSmallAura = addAura(1.2, 1.6, 0.15);
if (useOldPhotosphere) {
	Class.photosphereSmallAuraOfficialV2 = addAura(1.25, 1.85, 0.15);
	Class.photosphereBigAuraOfficialV2 = addAura(0.25, 4);
}
Class.gladiatorAuraMinionAuraOfficialV2 = addAura(0.333, 1.2);

Class.thermosphereAuraOfficialV2 = addAura(-1, 1.5);
Class.trinoughtBigHealAura = addAura(-0.7, 1.5);
Class.trinoughtSmallHealAura = addAura(-0.7, 2.1, 0.15);
Class.pentanoughtBigHealAura = addAura(-0.8, 1.45);
Class.pentanoughtSmallHealAura = addAura(-0.8, 1.6, 0.15);
Class.gladiatorHealAuraMinionAuraOfficialV2 = addAura(-0.333, 1.2);

// gStat turret modifiers
g.triSecondaryAuto = {reload: 1.1, health: 0.83};
g.pentaSecondaryAuto = {reload: 1.1, health: 0.88}
g.triKilobyte = {reload: 1.05, health: 0.9, speed: 0.95, maxSpeed: 0.95};
g.pentaMegabyte = {reload: 1.05, health: 0.95, speed: 0.9, maxSpeed: 0.9};

// T0
Class.dreadOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Elites",
	UPGRADE_LABEL: "Elites",
	
	EXTRA_SKILL: 20,
}
Class.dreadWeaponOfficialV2 = {
	LABEL: "Weapon Upgrades",
	COLOR: 'crasher',
	REROOT_UPGRADE_TREE: "dreadWeaponOfficialV2",
}
Class.dreadBodyOfficialV2 = {
	LABEL: "Body Upgrades",
	COLOR: 'crasher',
	REROOT_UPGRADE_TREE: "dreadBodyOfficialV2",
}

// T1 Weapons
Class.basicElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Basic",
  UPGRADE_TOOLTIP: "Basic Guns",
	GUNS: weaponArray({
		POSITION: [16, 7, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, {speed: 0.9, maxSpeed: 0.9, health: 1.3}]),
			TYPE: "bullet",
		},
	}, 3),
}
Class.basic2Elit1 = {
	PARENT: "basicElit1",
  UPGRADE_TOOLTIP: "Basic Guns",
	BATCH_UPGRADES: true,
}
Class.peacekeeperElit1 = {
  PARENT: "genericEggnought",
  LABEL: "Peacekeeper",
  UPGRADE_TOOLTIP: "Sniper Guns: more range, less reload.",
	BODY: {
		FOV: basicEliteBody.FOV * 1.2
	},
	GUNS: weaponArray({
		POSITION: [20, 7, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, {reload: 1.1, health: 1.2, range: 0.9}]),
			TYPE: "bullet",
		},
	}, 3),
}
Class.peacekeeper2Elit1 = {
	PARENT: "peacekeeperElit1",
	BATCH_UPGRADES: true,
  UPGRADE_TOOLTIP: "Sniper Guns: more range, less reload.",
}
Class.megaElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Mega",
  UPGRADE_TOOLTIP: "Heavy guns: Less Reload, More Damage.",
	GUNS: weaponArray({
		POSITION: [17, 9.25, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pounder, {reload: 0.9, damage: 1.2, range: 0.9, speed: 0.95}]),
			TYPE: "bullet",
		},
	}, 3),
}
Class.mega2Elit1 = {
	PARENT: "megaElit1",
	BATCH_UPGRADES: true,
  UPGRADE_TOOLTIP: "Heavy guns: Less Reload, More Damage.",
}
Class.invaderElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Invader",
  UPGRADE_TOOLTIP: "Base Drones",
	BODY: { 
		FOV: basicEliteBody.FOV * 1.1,
		SPEED: basicEliteBody.SPEED * 0.9,
	},
	GUNS: weaponArray({
		POSITION: [6.5, 9, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.overseer, {reload: 1.1, health: 1.2, maxSpeed: 0.9}]),
			TYPE: "drone",
			MAX_CHILDREN: 3,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: "drone",
			WAIT_TO_CYCLE: true,
		},
	}, 3),
}
Class.invader2Elit1 = {
	PARENT: "invaderElit1",
	BATCH_UPGRADES: true,
  UPGRADE_TOOLTIP: "Base Drones",
}
Class.defenderElit1 = {
	PARENT: "genericEggnought",
  UPGRADE_TOOLTIP: "Base Traps",
	LABEL: "Defender",
  BODY: { 
		SPEED: basicEliteBody.SPEED * 1.085,
	},
	GUNS: weaponArray([
		{
			POSITION: [13, 7, 1, 0, 0, 180, 0],
		}, {
			POSITION: [3, 7, 1.5, 13, 0, 180, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.pounder, {health: 1.2, shudder: 0.5, speed: 0.75, range: 0.75}]),
				TYPE: "trap",
				STAT_CALCULATOR: "trap",
			},
		},
	], 3),
}
Class.defender2Elit1 = {
	PARENT: "defenderElit1",
	BATCH_UPGRADES: true,
  UPGRADE_TOOLTIP: "Base Traps",
}

// T1 Bodies ###############
// T1 Bodies
Class.autoTurretElit1 = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.turret, {size: 0.875, health: 1.4, speed: 0.85, recoil: 0.7, range: 0.4}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.autoElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Auto",
	TURRETS: [
		{
			POSITION: [9, 0, 0, 0, 360, 2],
			TYPE: 'autoTurretElit1',
		}
	],
	
}
Class.atmosphereElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Atmosphere",
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 360, 2],
			TYPE: 'atmosphereAuraOfficialV2',
		},
	],
}
Class.juggernautElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Juggernaut",
	BODY: hpBuffBodyStats[0],
	PROPS: [
		{
			POSITION: [15, 0, 0, 0, 1],
			TYPE: 'crasher',
		}, {
			POSITION: [22.9, 0, 0, 0, 0],
			TYPE: ['crasher', {COLOR: 9}]
		},
	],
}
Class.byteTurretOfficialV2 = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [22, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.turret, {size: 0.9, health: 1.3, speed: 0.85, recoil: 0.8, range: 0.45}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.byteOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Byte",
	TURRETS: [
		{
			POSITION: [9, 0, 0, 0, 360, 2],
			TYPE: 'byteTurretOfficialV2',
		}
	],
	PROPS: [
		{
			POSITION: [15, 0, 0, 0, 1],
			TYPE: 'egg',
		}
	]
}
Class.atmosphereOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Atmosphere",
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 360, 2],
			TYPE: 'atmosphereAuraOfficialV2',
		},
	],
}
Class.juggernautOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Juggernaut",
	BODY: hpBuffBodyStats[0],
	PROPS: [
		{
			POSITION: [15, 0, 0, 0, 1],
			TYPE: 'crasher',
		}, {
			POSITION: [22.9, 0, 0, 0, 0],
			TYPE: ['crasher', {COLOR: 9}]
		},
	],
}

// ACTUAL T2 ELITES

Class.provokerElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Provoker",
  UPGRADE_TOOLTIP: "More Guns",
	GUNS: weaponArray([
		{
			POSITION: [16, 7, 1, 0, 4.25, 180, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, {health: 1.3, range: 0.9}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [16, 7, 1, 0, -4.25, 180, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, {health: 1.3, range: 0.9}]),
				TYPE: "bullet",
			},
		},
	], 3),
}
Class.conciliatorElit1 = {
  PARENT: "genericEggnought",
  LABEL: "Conciliator",
  UPGRADE_TOOLTIP: "Even more sniping!",
	BODY: {
		FOV: basicEliteBody.FOV * 1.34
	},
	GUNS: weaponArray([{
		POSITION: [24.5, 7, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, {reload: 1.1, health: 1.2, range: 0.9}]),
			TYPE: "bullet",
		},
	},{
		POSITION: [22, 8, 1, 0, 0, 180, 0],}], 
  3),
}
Class.gigaElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Giga",
  UPGRADE_TOOLTIP: "Heavier guns",
	GUNS: weaponArray({
		POSITION: [17, 10.75, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, {reload: 1.2, damage: 1.1, range: 0.9, speed: 0.9}]),
			TYPE: "bullet",
		},
	}, 3),
}
Class.strikerElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Striker",
  UPGRADE_TOOLTIP: "Bigger Drones!",
	BODY: { 
		FOV: basicEliteBody.FOV * 1.1,
		SPEED: basicEliteBody.SPEED * 0.9,
	},
	GUNS: weaponArray({
		POSITION: [6.5, 11, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.pounder, {reload: 1.1, health: 1.2, size: 1.1, maxSpeed: 0.9}]),
			TYPE: "drone",
			MAX_CHILDREN: 2,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: "drone",
			WAIT_TO_CYCLE: true,
		},
	}, 3),
}
Class.caretakerElit1 = {
	PARENT: "genericEggnought",
  UPGRADE_TOOLTIP: "Stronger Traps",
	LABEL: "Caretaker",
  BODY: { 
		SPEED: basicEliteBody.SPEED * 1.05,
	},
	GUNS: weaponArray([
		{
			POSITION: [13, 9, 1, 0, 0, 180, 0],
		}, {
			POSITION: [3, 9, 1.5, 13, 0, 180, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.pounder, {damage: 0.95, shudder: 0.5, speed: 0.75, range: 0.75}]),
				TYPE: "trap",
				STAT_CALCULATOR: "trap",
			},
		},
	], 3),
}
// T2 Weapons
Class.gladiusOfficialV2 = {
	PARENT: "genericEggnought",
	LABEL: "Gladius",
	BODY: { 
		FOV: squarenoughtBody.FOV * 1.225,
	},
	GUNS: weaponArray([
		{
			POSITION: [17, 8, 1, 0, 0, 0, 0],
		}, {
			POSITION: [19.5, 5, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {speed: 1.05, maxSpeed: 1.05, damage: 1.12, range: 0.65}]),
				TYPE: "bullet",
			},
		},
	], 4),
}
Class.sabreOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Sabre",
	BODY: {
		FOV: squarenoughtBody.FOV * 1.4,
		SPEED: squarenoughtBody.SPEED * 0.9,
	},
	GUNS: weaponArray([
		{
			POSITION: [24, 7, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, {reload: 1.23, health: 1.33, speed: 1.1, maxSpeed: 1.1, density: 1.2, range: 0.65}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [5, 7, -1.7, 7, 0, 0, 0],
		},
	], 4),
}
Class.mediatorOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Mediator",
	GUNS: weaponArray([
		{
			POSITION: [15, 7, 1, 0, 4.25, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, {health: 1.09, range: 0.9}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [15, 7, 1, 0, -4.25, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, {health: 1.09, range: 0.9}]),
				TYPE: "bullet",
			},
		},
	], 4),
}
Class.negotiatorOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Negotiator",
	GUNS: weaponArray({
		POSITION: [9, 8, 1.4, 6, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, {size: 0.85, speed: 0.85, maxSpeed: 0.75, health: 1.23, range: 0.75}]),
			TYPE: "bullet",
		},
	}, 4),
}
Class.enforcerOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Enforcer",
	GUNS: weaponArray({
		POSITION: [17, 9, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pounder, {reload: 1.25, health: 1.37, range: 0.9}]),
			TYPE: "bullet",
		},
	}, 4),
}
Class.executorOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Executor",
	GUNS: weaponArray([
		{
			POSITION: [11, 6, 1, 8, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, {reload: 1.1, health: 1.35, speed: 0.7, maxSpeed: 0.65, range: 0.33}]),
				TYPE: ["missile", {GUN_STAT_SCALE: {recoil: 0.6}}],
				STAT_CALCULATOR: "sustained",
			},
		}, {
			POSITION: [17, 9, 1, 0, 0, 0, 0],	
		},
	], 4),
}
Class.inquisitorOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Inquisitor",
	BODY: { 
		FOV: squarenoughtBody.FOV * 1.1,
		SPEED: squarenoughtBody.SPEED * 0.9,
	},
	GUNS: weaponArray({
		POSITION: [5, 11, 1.1, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.overseer, {reload: 0.9, health: 0.8, maxSpeed: 0.9}]),
			TYPE: "drone",
			MAX_CHILDREN: 3,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: "drone",
			WAIT_TO_CYCLE: true,
		},
	}, 4),
}
Class.assailantMinionOfficialV2 = {
	PARENT: "minion",
	SHAPE: 4,
	COLOR: "square",
	GUNS: weaponArray({
		POSITION: [15, 7.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.assassin, g.minionGun, {reload: 1.8, health: 1.1}]),
			WAIT_TO_CYCLE: true,
			TYPE: "bullet",
		},
	}, 4)
}
Class.assailantOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Assailant",
	BODY: { 
		FOV: squarenoughtBody.FOV * 1.1,
		SPEED: squarenoughtBody.SPEED * 0.85,
	},
	GUNS: weaponArray([
		{
			POSITION: [5, 10, 1, 10.5, 0, 0, 0],
		}, {
			POSITION: [1.5, 11, 1, 15, 0, 0, 0],
			PROPERTIES: {
				MAX_CHILDREN: 4,
				SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 1.95, health: 1.3, damage: 0.65, pen: 0.9, speed: 0.8, maxSpeed: 0.8, density: 1.5}]),
				TYPE: "assailantMinionOfficialV2",
				STAT_CALCULATOR: "drone",
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				MAX_CHILDREN: 2,
				WAIT_TO_CYCLE: true,
			},
		}, {
			POSITION: [12, 11, 1, 0, 0, 0, 0],
		},
	], 4),
}
Class.daemonOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Daemon",
	GUNS: weaponArray([
		{
			POSITION: [11.5, 4.5, 1, 0, 4.5, 0, 0],
		}, {
			POSITION: [2, 4.5, 1.7, 11, 4.5, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pounder, {health: 0.73, speed: 0.7, maxSpeed: 0.7, range: 0.67, shudder: 0.5}]),
				TYPE: "trap",
				STAT_CALCULATOR: "trap",
			},
		}, {
			POSITION: [11.5, 4.5, 1, 0, -4.5, 0, 0],
		}, {
			POSITION: [2, 4.5, 1.7, 11, -4.5, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pounder, {health: 0.73, speed: 0.7, maxSpeed: 0.7, range: 0.67, shudder: 0.5}]),
				TYPE: "trap",
				STAT_CALCULATOR: "trap",
			},
		},
	], 4),
}
Class.minotaurOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Minotaur",
	GUNS: weaponArray([
		{
			POSITION: [13, 7, 1, 0, 0, 0, 0],
		}, {
			POSITION: [3.75, 7, 1.75, 13, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.pounder, {health: 0.85, shudder: 0.7, range: 0.67}]),
				TYPE: "unsetTrap",
				STAT_CALCULATOR: "block"
			},
		},
	], 4),
}
// ACTUAL T2 BODIES
Class.androidTurretElit1 = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [22, 14.5, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.turret, g.pounder, {size: 0.875, health: 1.4, speed: 0.85, recoil: 0.7, range: 0.4}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.androidElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Android",
	TURRETS: [
		{
			POSITION: [10.5, 0, 0, 0, 360, 2],
			TYPE: 'androidTurretElit1',
		}
	],
	
}
Class.heliosphereElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Heliosphere",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 360, 2],
			TYPE: 'heliosphereAuraElit1',
		},
	],
}
Class.barrageElit1 = {
	PARENT: "genericEggnought",
	LABEL: "Barrage",
	BODY: hpBuffBodyStats[1],
	PROPS: [
		{
			POSITION: [10.4, 0, 0, 180, 2],
			TYPE: ['crasher',{COLOR:9}],
		},{
			POSITION: [8.5, 0, 0, 180, 2],
			TYPE: 'crasher',
		},{
			POSITION: [9.5, 0, 0, 180, 2],
			TYPE: 'crasher',
		},{
			POSITION: [15, 0, 0, 0, 1],
			TYPE: 'crasher',
		}, {
			POSITION: [22.9, 0, 0, 0, 0],
			TYPE: ['crasher', {COLOR: 9}]
		},
	],
}

// T2 Bodies
Class.automationOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Automation",
	TURRETS: weaponArray({
		POSITION: [4, 9, 0, 45, 180, 2],
		TYPE: ["spamAutoTurret", {GUN_STAT_SCALE: {reload: 0.9, health: 1.2}}],
	}, 4), 
	PROPS: [
		{
			POSITION: [11, 0, 0, 0, 1],
			TYPE: "square"
		},
	]
}
Class.kilobyteTurretOfficialV2 = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [26, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.turret, g.assassin, {size: 0.9, health: 1.39, speed: 0.63, recoil: 1.25, range: 0.5}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.kilobyteOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Kilobyte",
	TURRETS: [
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: "kilobyteTurretOfficialV2",
		},
	],
	PROPS: [
		{
			POSITION: [12, 0, 0, 0, 1],
			TYPE: "square"
		},
	]
}
Class.coronaOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Corona",
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 360, 2],
			TYPE: "coronaAuraOfficialV2",
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: "square"
		},
	]
}
Class.thermosphereOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Thermosphere",
	BODY: healerBodyStats[0],
	TURRETS: [
		{
			POSITION: [11, 0, 0, 0, 360, 2],
			TYPE: "thermosphereAuraOfficialV2",
		},
	],
	PROPS: [
		{
			POSITION: [14, 0, 0, 0, 1],
			TYPE: "square"
		},
	]
}
Class.jumboOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Jumbo",
	BODY: hpBuffBodyStats[1],
	PROPS: [
		{
			POSITION: [15, 0, 0, 0, 1],
			TYPE: 'square'
		}, {
			POSITION: [24, 0, 0, 0, 0],
			TYPE: ['square', {COLOR: 9}]
		},
	],
}
Class.colossusTopOfficialV2 = {
	PARENT: "genericSquarenought",
	GUNS: weaponArray({
		POSITION: [3.5, 17.5, 0.001, 9, 0, 0, 0],
		PROPERTIES: {COLOR: 9},
	}, 4),
}
Class.colossusBottomOfficialV2 = {
	PARENT: "genericSquarenought",
	GUNS: weaponArray({
		POSITION: [4, 17.5, 0.001, 9, 0, 0, 0],
		PROPERTIES: {COLOR: 9},
	}, 4),
}
Class.colossusOfficialV2 = {
	PARENT: "genericSquarenought",
	LABEL: "Colossus",
	BODY: speedBuffBodyStats[0],
	PROPS: [
		{
			POSITION: [13, 0, 0, 0, 1],
			TYPE: 'colossusTopOfficialV2'
		}, {
			POSITION: [20, 0, 0, 0, 0],
			TYPE: 'colossusBottomOfficialV2'
		},
	],
}
// T3 Weapons
Class.bladeOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Blade",
	BODY: { 
		FOV: trinoughtBody.FOV * 1.225,
	},
	GUNS: weaponArray([
		{
			POSITION: [17, 1, 1, 0, 6, 0, 0],
		}, {
			POSITION: [17, 1, 1, 0, -6, 0, 0],
		}, {
			POSITION: [18, 5, 1, 0, 3, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 1.09, maxSpeed: 1.09, health: 1.09, range: 0.65}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [18, 5, 1, 0, -3, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 1.09, maxSpeed: 1.09, health: 1.09, range: 0.65}]),
				TYPE: "bullet",
			},
		},
	], 3),
}
Class.bayonetOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Bayonet",
	BODY: {
		FOV: trinoughtBody.FOV * 1.5,
		SPEED: trinoughtBody.SPEED * 0.85,
	},
	GUNS: weaponArray([
		{
			POSITION: [28, 7, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.assassin, {reload: 1.05, health: 0.98, density: 0.45, range: 0.65}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [5, 7, -1.6, 7, 0, 0, 0],
		},
	], 3),
}
Class.mitigatorOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Mitigator",
	GUNS: weaponArray([
		{
			POSITION: [10, 8, 1, 3, 5, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, {health: 1.15, range: 0.9}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [10, 8, 1, 3, -5, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, {health: 1.15, range: 0.9}]),
				TYPE: "bullet",
			},
		},
	], 3),
}
Class.appeaserOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Appeaser",
	GUNS: weaponArray([
		{
			POSITION: [7, 11, 1.35, 6, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.spam, {size: 0.7, health: 1.03, range: 0.75}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [7, 10, 1.3, 8, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.spam, {size: 0.6, health: 1.03, range: 0.75, reload: 1.05}]),
				TYPE: "bullet",
			},
		},
	], 3),
}
Class.suppressorOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Suppressor",
	GUNS: weaponArray({
		POSITION: [16.5, 11.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, {reload: 1.1, health: 1.19}]),
			TYPE: "bullet",
		},
	}, 3),
}
Class.inhibitorOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Inhibitor",
	GUNS: weaponArray([
		{
			POSITION: [10, 14, -0.75, 7, 0, 0, 0],
		}, {
			POSITION: [15, 15, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, {reload: 1.15, health: 1.33, speed: 0.7, maxSpeed: 0.7, range: 0.4}]),
				TYPE: "supermissile",
				STAT_CALCULATOR: "sustained",
			},
		},
	], 3),
}
Class.infiltratorOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Infiltrator",
	BODY: { 
		FOV: trinoughtBody.FOV * 1.1,
		SPEED: trinoughtBody.SPEED * 0.9,
	},
	GUNS: weaponArray([
		{
			POSITION: [5, 6, 1.4, 6, 5.5, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, {maxSpeed: 0.9, size: 1.5, reload: 1.4}]),
				TYPE: "drone",
				MAX_CHILDREN: 2,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: "drone",
				WAIT_TO_CYCLE: true,
			},
		}, {
			POSITION: [5, 6, 1.4, 6, -5.5, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, {maxSpeed: 0.9, size: 1.5, reload: 1.4}]),
				TYPE: "drone",
				MAX_CHILDREN: 2,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: "drone",
				WAIT_TO_CYCLE: true,
			},
		}, {
			POSITION: [5, 6, 1.4, 8, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, g.pounder, {damage: 0.85, maxSpeed: 0.9, size: 2, reload: 1.4}]),
				TYPE: "betadrone",
				MAX_CHILDREN: 2,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: "drone",
				WAIT_TO_CYCLE: true,
			},
		},
	], 3),
}
Class.aggressorMinionOfficialV2 = {
	PARENT: "minion",
	SHAPE: 3.5,
	COLOR: "triangle",
	GUNS: weaponArray({
		POSITION: [16, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.assassin, g.minionGun, {speed: 1.06, maxSpeed: 1.06, reload: 1.75, health: 1.25}]),
			WAIT_TO_CYCLE: true,
			TYPE: "bullet",
		},
	}, 3),
}
Class.aggressorOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Aggressor",
	BODY: { 
		FOV: trinoughtBody.FOV * 1.1,
		SPEED: trinoughtBody.SPEED * 0.85,
	},
	GUNS: weaponArray([
		{
			POSITION: [5, 12, 1, 10, 0, 0, 0],
		}, {
			POSITION: [1.5, 13, 1, 15, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 1.8, health: 1.72, damage: 0.67, pen: 0.9, speed: 0.8, maxSpeed: 0.8, density: 1.6}]),
				TYPE: "aggressorMinionOfficialV2",
				STAT_CALCULATOR: "drone",
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				MAX_CHILDREN: 2,
				WAIT_TO_CYCLE: true,
			},
		}, {
			POSITION: [12, 13, 1, 0, 0, 0, 0],
		},
	], 3),
}
Class.hydraOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Hydra",
	GUNS: weaponArray([
		{
			POSITION: [6, 3.5, 1, 4, 8.5, 0, 0],
		}, {
			POSITION: [2, 3.5, 1.8, 10, 8.5, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pounder, {shudder: 0.6, health: 0.7, speed: 1.15, maxSpeed: 1.15, range: 0.85}]),
				TYPE: "trap",
				STAT_CALCULATOR: "trap",
			},
		}, {
			POSITION: [6, 3.5, 1, 4, -8.5, 0, 0],
		}, {
			POSITION: [2, 3.5, 1.8, 10, -8.5, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pounder, {shudder: 0.6, health: 0.7, speed: 1.15, maxSpeed: 1.15, range: 0.85}]),
				TYPE: "trap",
				STAT_CALCULATOR: "trap",
			},
		}, {
			POSITION: [12, 5, 1, 0, 0, 0, 0],
		}, {
			POSITION: [2.5, 5, 1.7, 12, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.twin, g.pounder, {reload: 1.1, health: 1.02, speed: 0.75, maxSpeed: 0.75, range: 0.65}]),
				TYPE: "unsetTrap",
				STAT_CALCULATOR: "block"
			},
		},
	], 3),
}
Class.beelzebubOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Beelzebub",
	GUNS: weaponArray([
		{
			POSITION: [13, 10, 1, 0, 0, 0, 0],
		}, {
			POSITION: [3.5, 10, 1.6, 13, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.pounder, {health: 1.4, speed: 1.16, maxSpeed: 1.16, size: 1.2, shudder: 0.65, range: 0.55}]),
				TYPE: "unsetTrap",
				STAT_CALCULATOR: "block"
			},
		},
	], 3),
}

// T3 Bodies
Class.mechanismOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Mechanism",
	TURRETS: weaponArray([
		{
			POSITION: [3.5, 6, 0, 0, 180, 2],
			TYPE: "spamAutoTurret",
		}, {
			POSITION: [3.5, 10, 0, 60, 180, 2],
			TYPE: "spamAutoTurret",
		},
	], 3),
	PROPS: [
		{
			POSITION: [10, 0, 0, 180, 1],
			TYPE: "triangle"
		},
	],
}
Class.fusionOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Fusion",
	TURRETS: [
		...weaponArray({
			POSITION: [3.5, 10.5, 0, 60, 180, 2],
			TYPE: ["spamAutoTurret", {GUN_STAT_SCALE: g.triSecondaryAuto}],
		}, 3),
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "trinoughtBigAura",
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "triangle"
		},
	]
}
Class.binaryOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Binary",
	TURRETS: [
		...weaponArray({
			POSITION: [3.5, 10.5, 0, 60, 180, 2],
			TYPE: ["spamAutoTurret", {GUN_STAT_SCALE: g.triSecondaryAuto}],
		}, 3),
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: ["kilobyteTurretOfficialV2", {GUN_STAT_SCALE: g.triKilobyte}],
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "triangle"
		},
	],
}
Class.exosphereOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Exosphere",
	BODY: healerBodyStats[0],
	TURRETS: [
		...weaponArray({
			POSITION: [3.5, 10.5, 0, 60, 180, 2],
			TYPE: ["spamAutoTurret", {GUN_STAT_SCALE: g.triSecondaryAuto}],
		}, 3),
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "trinoughtBigHealAura",
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "triangle"
		},
	]
}
Class.megabyteTurretOfficialV2 = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [26, 13, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.turret, g.assassin, g.pounder, {size: 0.85, health: 1.31, speed: 0.62, recoil: 1.4, range: 0.52}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.megabyteOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Megabyte",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 360, 2],
			TYPE: "megabyteTurretOfficialV2",
		},
	],
	PROPS: [
		{
			POSITION: [15, 0, 0, 180, 1],
			TYPE: "triangle"
		},
	]
}
Class.trojanOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Trojan",
	TURRETS: [
		...weaponArray({
			POSITION: [3.5, 11, 0, 60, 360, 2],
			TYPE: "trinoughtSmallAura",
		}, 3),
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: ["kilobyteTurretOfficialV2", {GUN_STAT_SCALE: g.triKilobyte}],
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "triangle"
		},
	]
}
Class.hardwareOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Hardware",
	BODY: healerBodyStats[0],
	TURRETS: [
		...weaponArray({
			POSITION: [3.5, 11, 0, 60, 360, 2],
			TYPE: "trinoughtSmallHealAura",
		}, 3),
		{
			POSITION: [10, 0, 0, 0, 360, 2],
			TYPE: ["kilobyteTurretOfficialV2", {GUN_STAT_SCALE: g.triKilobyte}],
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "triangle"
		},
	]
}
Class.chromosphereOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Chromosphere",
	TURRETS: [
		...weaponArray({
			POSITION: [3.5, 10.5, 0, 60, 360, 2],
			TYPE: "trinoughtSmallAura",
		}, 3),
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "trinoughtBigAura",
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "triangle"
		},
	]
}
Class.mesosphereOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Mesosphere",
	BODY: healerBodyStats[1],
	TURRETS: [
		...weaponArray({
			POSITION: [3.5, 10.5, 0, 60, 360, 2],
			TYPE: "trinoughtSmallHealAura",
		}, 3),
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "trinoughtBigHealAura",
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "triangle"
		},
	]
}
Class.goliathOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Goliath",
	BODY: hpBuffBodyStats[2],
	PROPS: [
		{
			POSITION: [14, 0, 0, 180, 1],
			TYPE: ['triangle', {COLOR: 9}]
		}, {
			POSITION: [24, 0, 0, 180, 0],
			TYPE: ['triangle', {COLOR: 9}]
		},
	],
}
Class.planetOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Planet",
	BODY: hpBuffBodyStats[1],
	TURRETS: weaponArray({
		POSITION: [3.5, 10.5, 0, 60, 360, 2],
		TYPE: "trinoughtSmallAura",
	}, 3),
	PROPS: [
		{
			POSITION: [24, 0, 0, 180, 0],
			TYPE: ['triangle', {COLOR: 9}]
		}, {
			POSITION: [12, 0, 0, 180, 1],
			TYPE: "triangle"
		}
	],
}
Class.moonOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Moon",
	BODY: combineBodyStats(hpBuffBodyStats[1], healerBodyStats[0]),
	TURRETS: weaponArray({
		POSITION: [3.5, 10.5, 0, 60, 360, 2],
		TYPE: "trinoughtSmallHealAura",
	}, 3),
	PROPS: [
		{
			POSITION: [24, 0, 0, 180, 0],
			TYPE: ['triangle', {COLOR: 9}]
		}, {
			POSITION: [12, 0, 0, 180, 1],
			TYPE: "triangle"
		}
	],
}
Class.titanTopOfficialV2 = {
	PARENT: "genericTrinought",
	GUNS: weaponArray({
		POSITION: [5, 26, 0.001, 8, 0, 0, 0],
		PROPERTIES: {COLOR: 9},
	}, 3),
}
Class.titanOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Titan",
	BODY: speedBuffBodyStats[1],
	PROPS: [
		{
			POSITION: [11, 0, 0, 0, 1],
			TYPE: "titanTopOfficialV2"
		}, {
			POSITION: [20, 0, 0, 0, 0],
			TYPE: "titanTopOfficialV2"
		},
	],
}
Class.sirenOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Siren",
	BODY: speedBuffBodyStats[0],
	TURRETS: weaponArray({
		POSITION: [3.5, 10.5, 0, 60, 360, 1],
		TYPE: "trinoughtSmallAura",
	}, 3),
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: "triangle"
		}, {
			POSITION: [20, 0, 0, 0, 0],
			TYPE: "titanTopOfficialV2"
		},
	],
}
Class.harpyOfficialV2 = {
	PARENT: "genericTrinought",
	LABEL: "Harpy",
	BODY: combineBodyStats(speedBuffBodyStats[0], healerBodyStats[0]),
	TURRETS: weaponArray({
		POSITION: [3.5, 10.5, 0, 60, 360, 1],
			TYPE: "trinoughtSmallHealAura",
	}, 3),
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: "triangle"
		}, {
			POSITION: [20, 0, 0, 0, 0],
			TYPE: "titanTopOfficialV2"
		},
	],
}

// T4 Weapons
Class.rapierOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Rapier",
	BODY: { 
		FOV: pentanoughtBody.FOV * 1.225,
	},
	GUNS: weaponArray([
		{
			POSITION: [17, 1, 1, 0, 6, 0, 0],
		}, {
			POSITION: [17, 1, 1, 0, -6, 0, 0],
		}, {
			POSITION: [18, 5, 1, 0, 3, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 1.13, maxSpeed: 1.13, health: 1.15, range: 0.65}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [18, 5, 1, 0, -3, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 1.13, maxSpeed: 1.13, health: 1.15, range: 0.65}]),
				TYPE: "bullet",
			},
		},
	], 5),
}
Class.javelinOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Javelin",
	BODY: {
		FOV: pentanoughtBody.FOV * 1.5,
		SPEED: pentanoughtBody.SPEED * 0.85,
	},
	GUNS: weaponArray([
		{
			POSITION: [28, 7, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.assassin, {reload: 1.13, health: 1.1, density: 0.55, range: 0.65}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [5, 7, -1.6, 7, 0, 0, 0],
		},
	], 5),
}
Class.diplomatOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Diplomat",
	GUNS: weaponArray([
		{
			POSITION: [13, 7, 1, 0, 3.25, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, {health: 1.15}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [13, 7, 1, 0, -3.25, 0, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, {health: 1.15}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [15, 7, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, {health: 1.15}]),
				TYPE: "bullet",
			},
		},
	], 5),
}
Class.arbitratorOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Arbitrator",
	GUNS: weaponArray([
		{
			POSITION: [7.5, 10.75, 1.33, 5.5, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.7,  health: 1.05, range: 0.8, reload: 1}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [7.5, 9.5, 1.33, 7.5, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.65, health: 1.05, range: 0.8, reload: 1.05}]),
				TYPE: "bullet",
			},
		}, {
			POSITION: [7.5, 7.25, 1.25, 9.5, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.7,  health: 1.05, range: 0.8, reload: 1.1}]),
				TYPE: "bullet",
			},
		},
	], 5),
}
Class.retardantOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Retardant",
	GUNS: weaponArray({
		POSITION: [17, 12, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, {reload: 1.1, health: 1.26}]),
			TYPE: "bullet",
		},
	}, 5),
}
Class.tyrantOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Tyrant",
	GUNS: weaponArray([
		{
			POSITION: [10, 11, -0.75, 7, 0, 0, 0],
		}, {
			POSITION: [15, 12, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, {reload: 1.18, health: 1.39, speed: 0.7, maxSpeed: 0.7, range: 0.4}]),
				TYPE: "supermissile",
				STAT_CALCULATOR: "sustained",
			},
		},
	], 5),
}
Class.raiderOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Raider",
	BODY: { 
		FOV: pentanoughtBody.FOV * 1.1,
		SPEED: pentanoughtBody.SPEED * 0.9,
	},
	GUNS: weaponArray([
		{
			POSITION: [4, 5, 2.1, 8, 3, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, {damage: 0.9, health: 0.63, maxSpeed: 0.9, size: 1.5, reload: 1.5}]),
				TYPE: "drone",
				MAX_CHILDREN: 2,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: "drone",
				WAIT_TO_CYCLE: true,
			},
		}, {
			POSITION: [4, 5, 2.1, 8, -3, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, {damage: 0.9, health: 0.63, maxSpeed: 0.9, size: 1.5, reload: 1.5}]),
				TYPE: "drone",
				MAX_CHILDREN: 2,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: "drone",
				WAIT_TO_CYCLE: true,
			},
		}, {
			POSITION: [6, 6.5, 1.4, 8, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g.overseer, g.pounder, {damage: 1.06, maxSpeed: 0.9, size: 2, reload: 1.5}]),
				TYPE: "betadrone",
				MAX_CHILDREN: 1,
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				STAT_CALCULATOR: "drone",
				WAIT_TO_CYCLE: true,
			},
		},
	], 5),
}
Class.gladiatorGenericMinionOfficialV2 = {
	PARENT: "minion",
	SHAPE: 3.5,
	COLOR: "crasher",
	GUNS: [],
}
Class.gladiatorTritankMinionOfficialV2 = {
	PARENT: "gladiatorGenericMinionOfficialV2",
	GUNS: weaponArray({
		POSITION: [15, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.assassin, g.minionGun, {speed: 1.06, maxSpeed: 1.06, reload: 1.8, health: 1.3}]),
			WAIT_TO_CYCLE: true,
			TYPE: ["bullet", {COLOR: 5}],
		},
	}, 3),
}
Class.gladiatorTritrapMinionOfficialV2 = {
	PARENT: "gladiatorGenericMinionOfficialV2",
	GUNS: weaponArray([
		{
			POSITION: [13, 7, 1, 0, 0, 0, 0],
		}, {
			POSITION: [3, 7, 1.7, 13, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.pounder, g.flankGuard, g.minionGun, {reload: 1.2, speed: 0.8, maxSpeed: 0.8}]),
				TYPE: "trap",
				STAT_CALCULATOR: "trap",
			},
		},
	], 3),
}
Class.gladiatorTriswarmMinionOfficialV2 = {
	PARENT: "gladiatorGenericMinionOfficialV2",
	GUNS: weaponArray({
		POSITION: [7, 8.5, -1.5, 7, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.flankGuard, g.minionGun, {speed: 1.1, maxSpeed: 1.1, reload: 1.6, size: 1.6, range: 1.15}]),
			TYPE: ["swarm", {COLOR: 5}],
			STAT_CALCULATOR: "swarm",
		},
	}, 3),
}
Class.gladiatorAutoMinionOfficialV2 = makeAuto({
	PARENT: "gladiatorGenericMinionOfficialV2",
}, "Minion", {size: 12, angle: 0});
Class.gladiatorAuraMinionOfficialV2 = {
	PARENT: "gladiatorGenericMinionOfficialV2",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 360, 1],
			TYPE: "gladiatorAuraMinionAuraOfficialV2",
		}
	]
}
Class.gladiatorHealAuraMinionOfficialV2 = {
	PARENT: "gladiatorGenericMinionOfficialV2",
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 360, 1],
			TYPE: "gladiatorHealAuraMinionAuraOfficialV2",
		}
	]
}
Class.gladiatorOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Gladiator",
	BODY: { 
		FOV: pentanoughtBody.FOV * 1.1,
		SPEED: pentanoughtBody.SPEED * 0.85,
	},
	GUNS: weaponArray([
		{
			POSITION: [4.75, 12, 1, 10, 0, 0, 0],
		}, {
			POSITION: [1.5, 13, 1, 14.75, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 2.1, health: 1.16, damage: 0.62, pen: 0.9, speed: 0.8, maxSpeed: 0.8, density: 1.6}]),
				TYPE: "minion",
				STAT_CALCULATOR: "drone",
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				MAX_CHILDREN: 2,
				WAIT_TO_CYCLE: true,
			},
		}, {
			POSITION: [12, 13, 1, 0, 0, 0, 0],
		},
	], 5),
}
let minionIndex = 0;
for (let gun of Class.gladiatorOfficialV2.GUNS) {
	minionIndex = setGladiatorMinion(gun, minionIndex);
}
Class.cerberusOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Cerberus",
	GUNS: weaponArray([
		{
			POSITION: [12, 4, 1, 0, 2.5, 10, 0.5],
		}, {
			POSITION: [1.5, 4, 1.6, 12, 2.5, 10, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pounder, {shudder: 0.6, health: 0.55, reload: 1.2, speed: 1.26, maxSpeed: 1.26, range: 0.67}]),
				TYPE: "trap",
				STAT_CALCULATOR: "trap",
			},
		}, {
			POSITION: [12, 4, 1, 0, -2.5, -10, 0.5],
		}, {
			POSITION: [1.5, 4, 1.6, 12, -2.5, -10, 0.5],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pounder, {shudder: 0.6, health: 0.55, reload: 1.2, speed: 1.26, maxSpeed: 1.26, range: 0.67}]),
				TYPE: "trap",
				STAT_CALCULATOR: "trap",
			},
		}, {
			POSITION: [14, 5.5, 1, 0, 0, 0, 0],
		}, {
			POSITION: [2, 5.5, 1.7, 14, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.twin, g.pounder, {reload: 1.15, health: 0.85, speed: 0.75, maxSpeed: 0.75, range: 0.5}]),
				TYPE: "unsetTrap",
				STAT_CALCULATOR: "block"
			},
		},
	], 5),
}
Class.luciferOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Lucifer",
	GUNS: weaponArray([
		{
			POSITION: [13, 10, 1, 0, 0, 0, 0],
		}, {
			POSITION: [3.5, 10, 1.6, 13, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.pounder, {reload: 1.2, speed: 1.15, maxSpeed: 1.15, size: 1.25, health: 1.15, range: 0.37}]),
				TYPE: "unsetTrap",
				STAT_CALCULATOR: "block"
			},
		},
	], 5),
}

// T4 Bodies
Class.skynetOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Skynet",
	TURRETS: [
		...weaponArray({
			POSITION: [3.25, 4.5, 0, 0, 180, 2],
			TYPE: ["spamAutoTurret", {GUN_STAT_SCALE: {reload: 1.1, health: 0.93, damage: 0.8}}],
		}, 5),
		...weaponArray({
			POSITION: [3.25, 8, 0, 36, 180, 2],
			TYPE: ["spamAutoTurret", {GUN_STAT_SCALE: {reload: 1.1, health: 0.93, damage: 0.8}}],
		}, 5)
	],
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: "pentagon",
		}
	]
}
Class.supernovaOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Supernova",
	TURRETS: [
		...weaponArray({
			POSITION: [3.25, 9, 0, 36, 180, 2],
			TYPE: ["spamAutoTurret", {GUN_STAT_SCALE: g.pentaSecondaryAuto}],
		}, 5),
		{
			POSITION: [9, 0, 0, 0, 360, 2],
			TYPE: "pentanoughtBigAura",
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "pentagon",
		},
	]
}
Class.cipherOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Cipher",
	TURRETS: [
		...weaponArray({
			POSITION: [3.25, 9, 0, 36, 180, 2],
			TYPE: ["spamAutoTurret", {GUN_STAT_SCALE: g.pentaSecondaryAuto}],
		}, 5),
		{
			POSITION: [11.5, 0, 0, 0, 360, 2],
			TYPE: ["megabyteTurretOfficialV2", {GUN_STAT_SCALE: g.pentaMegabyte}],
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "pentagon",
		},
	]
}
Class.interstellarOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Interstellar",
	BODY: healerBodyStats[1],
	TURRETS: [
		...weaponArray({
			POSITION: [3.25, 9, 0, 36, 180, 2],
			TYPE: ["spamAutoTurret", {GUN_STAT_SCALE: g.pentaSecondaryAuto}],
		}, 5),
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "pentanoughtBigHealAura",
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "pentagon",
		},
	]
}
Class.gigabyteTurretOfficialV2 = {
	PARENT: "autoTankGun",
	INDEPENDENT: true,
	GUNS: [
		{
			POSITION: [26, 16, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.turret, g.assassin, g.pounder, g.destroyer, {size: 0.75, health: 1.24, speed: 0.9, recoil: 1.4, range: 0.9}]),
				TYPE: "bullet",
			},
		},
	],
}
Class.gigabyteOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Gigabyte",
	TURRETS: [
		{
			POSITION: [13, 0, 0, 0, 360, 2],
			TYPE: "gigabyteTurretOfficialV2",
		},
	],
	PROPS: [
		{
			POSITION: [14.5, 0, 0, 180, 1],
			TYPE: "pentagon",
		},
	]
}
Class.malwareOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Malware",
	TURRETS: [
		...weaponArray({
			POSITION: [4, 8.5, 0, 36, 360, 2],
			TYPE: "pentanoughtSmallAura",
		}, 5),
		{
			POSITION: [11.5, 0, 0, 0, 360, 2],
			TYPE: ["megabyteTurretOfficialV2", {GUN_STAT_SCALE: g.pentaMegabyte}],
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "pentagon",
		},
	]
}
Class.softwareOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Software",
	BODY: healerBodyStats[1],
	TURRETS: [
		...weaponArray({
			POSITION: [4, 8.5, 0, 36, 360, 2],
			TYPE: "pentanoughtSmallHealAura",
		}, 5),
		{
			POSITION: [11.5, 0, 0, 0, 360, 2],
			TYPE: ["megabyteTurretOfficialV2", {GUN_STAT_SCALE: g.pentaMegabyte}],
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "pentagon",
		},
	]
}
Class.photosphereOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Photosphere",
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: "pentagon",
		},
	],
}
if (useOldPhotosphere) {
	Class.photosphereOfficialV2.TURRETS = [
		...weaponArray({
			POSITION: [3.5, 8.75, 0, 36, 360, 2],
			TYPE: "photosphereSmallAuraOfficialV2",
		}, 5),
		...weaponArray({
			POSITION: [3, 4, 0, 0, 360, 2],
			TYPE: "photosphereBigAuraOfficialV2",
		}, 5)
	]
} else {
	Class.photosphereOfficialV2.TURRETS = [
		...weaponArray({
			POSITION: [4, 8.5, 0, 36, 360, 2],
			TYPE: "pentanoughtSmallAura",
		}, 5),
		{
			POSITION: [9, 0, 0, 0, 360, 2],
			TYPE: "pentanoughtBigAura",
		},
	]
}
Class.stratosphereOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Stratosphere",
	BODY: healerBodyStats[2],
	TURRETS: [
		...weaponArray({
			POSITION: [4, 8.5, 0, 36, 360, 2],
			TYPE: "pentanoughtSmallHealAura",
		}, 5),
		{
			POSITION: [9.5, 0, 0, 0, 360, 2],
			TYPE: "pentanoughtBigHealAura",
		},
	],
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "pentagon",
		},
	]
}
Class.behemothOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Behemoth",
	BODY: hpBuffBodyStats[3],
	PROPS: [
		{
			POSITION: [15, 0, 0, 180, 1],
			TYPE: ["pentagon", {COLOR: 9}],
		}, {
			POSITION: [24, 0, 0, 180, 0],
			TYPE: ["pentagon", {COLOR: 9}],
		},
	],
}
Class.astronomicOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Astronomic",
	BODY: hpBuffBodyStats[2],
	TURRETS: weaponArray({
		POSITION: [4, 8.5, 0, 36, 360, 2],
		TYPE: "pentanoughtSmallAura",
	}, 5),
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "pentagon",
		}, {
			POSITION: [24, 0, 0, 180, 0],
			TYPE: ["pentagon", {COLOR: 9}],
		},
	],
}
Class.grandioseOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Grandiose",
	BODY: combineBodyStats(hpBuffBodyStats[2], healerBodyStats[1]),
	TURRETS: weaponArray({
		POSITION: [4, 8.5, 0, 36, 360, 2],
		TYPE: "pentanoughtSmallHealAura",
	}, 5),
	PROPS: [
		{
			POSITION: [13, 0, 0, 180, 1],
			TYPE: "pentagon",
		}, {
			POSITION: [24, 0, 0, 180, 0],
			TYPE: ["pentagon", {COLOR: 9}],
		},
	],
}
Class.pentagonLeviathanTopOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Leviathan",
	GUNS: weaponArray({
		POSITION: [6, 13.5, 0.001, 9, 0, 0, 0],
		PROPERTIES: {COLOR: 9},
	}, 5),
}
Class.pentagonLeviathanBottomOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Leviathan",
	GUNS: weaponArray({
		POSITION: [7, 17, 0.001, 9, 0, 0, 0],
		PROPERTIES: {COLOR: 9},
	}, 5),
}
Class.hexagonLeviathanTopOfficialV2 = {
	PARENT: "genericHexnought",
	LABEL: "Leviathan",
	GUNS: weaponArray({
		POSITION: [6, 10, 0.001, 9.5, 0, 0, 0],
		PROPERTIES: {COLOR: 9},
	}, 6),
}
Class.hexagonLeviathanBottomOfficialV2 = {
	PARENT: "genericHexnought",
	LABEL: "Leviathan",
	GUNS: weaponArray({
		POSITION: [7, 13.5, 0.001, 9.5, 0, 0, 0],
		PROPERTIES: {COLOR: 9},
	}, 6),
}
Class.leviathanOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Leviathan",
	BODY: speedBuffBodyStats[2],
	PROPS: [
		{
			POSITION: [12, 0, 0, 0, 1],
			TYPE: "pentagonLeviathanTopOfficialV2"
		}, {
			POSITION: [20, 0, 0, 0, 0],
			TYPE: "pentagonLeviathanBottomOfficialV2"
		},
	],
}
Class.valrayvnOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Valrayvn",
	BODY: speedBuffBodyStats[1],
	TURRETS: weaponArray({
		POSITION: [4, 8.5, 0, 36, 360, 2],
		TYPE: "pentanoughtSmallAura",
	}, 5),
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: "pentagon"
		}, {
			POSITION: [20, 0, 0, 0, 0],
			TYPE: "pentagonLeviathanBottomOfficialV2"
		},
	],
}
Class.pegasusOfficialV2 = {
	PARENT: "genericPentanought",
	LABEL: "Pegasus",
	BODY: combineBodyStats(speedBuffBodyStats[1], healerBodyStats[1]),
	TURRETS: weaponArray({
		POSITION: [4, 8.5, 0, 36, 360, 2],
		TYPE: "pentanoughtSmallHealAura",
	}, 5),
	PROPS: [
		{
			POSITION: [12, 0, 0, 180, 1],
			TYPE: "pentagon"
		}, {
			POSITION: [20, 0, 0, 0, 0],
			TYPE: "pentagonLeviathanBottomOfficialV2"
		},
	],
}

Class.addons.UPGRADES_TIER_0.push("dreadOfficialV2");
	Class.dreadOfficialV2.UPGRADES_TIER_5 = [
		["peacekeeper2Elit1", "dreadBodyOfficialV2",],
		["basic2Elit1", "dreadBodyOfficialV2"],
		["mega2Elit1", "dreadBodyOfficialV2"],
		["invader2Elit1", "dreadBodyOfficialV2"],
		["defender2Elit1", "dreadBodyOfficialV2"],
	];

	Class.peacekeeper2Elit1.UPGRADES_TIER_5 = ["peacekeeperElit1"];
	Class.basic2Elit1.UPGRADES_TIER_5 = ["basicElit1"];
	Class.mega2Elit1.UPGRADES_TIER_5 = ["megaElit1"];
	Class.invader2Elit1.UPGRADES_TIER_5 = ["invaderElit1"];
	Class.defender2Elit1.UPGRADES_TIER_5 = ["defenderElit1"];

	Class.dreadWeaponOfficialV2.UPGRADES_TIER_5 = ["peacekeeperElit1", "basicElit1", "megaElit1", "invaderElit1", "defenderElit1"];

  //Class.basicElit1.UPGRADES_TIER_7 = ["provokerElit1"]
/**/
		Class.peacekeeperElit1.UPGRADES_TIER_7 = ["conciliatorElit1"];
		/*	Class.gladiusOfficialV2.UPGRADES_TIER_9 = ["bladeOfficialV2"];
				Class.bladeOfficialV2.UPGRADES_TIER_11 = ["rapierOfficialV2"];
					Class.rapierOfficialV2.UPGRADES_TIER_13 = [];
			Class.sabreOfficialV2.UPGRADES_TIER_9 = ["bayonetOfficialV2"];
				Class.bayonetOfficialV2.UPGRADES_TIER_11 = ["javelinOfficialV2"];
					Class.javelinOfficialV2.UPGRADES_TIER_13 = [];*/

     Class.basicElit1.UPGRADES_TIER_7 = ["provokerElit1"];
			Class.provokerElit1.UPGRADES_TIER_9 = [];
			/*	Class.mitigatorOfficialV2.UPGRADES_TIER_11 = ["diplomatOfficialV2"];
					Class.diplomatOfficialV2.UPGRADES_TIER_13 = [];
			Class.negotiatorOfficialV2.UPGRADES_TIER_9 = ["appeaserOfficialV2"];
				Class.appeaserOfficialV2.UPGRADES_TIER_11 = ["arbitratorOfficialV2"];
					Class.arbitratorOfficialV2.UPGRADES_TIER_13 = [];*/

Class.megaElit1.UPGRADES_TIER_7 = ["gigaElit1"];
			/*Class.enforcerOfficialV2.UPGRADES_TIER_9 = ["suppressorOfficialV2"];
				Class.suppressorOfficialV2.UPGRADES_TIER_11 = ["retardantOfficialV2"];
					Class.retardantOfficialV2.UPGRADES_TIER_13 = [];
			Class.executorOfficialV2.UPGRADES_TIER_9 = ["inhibitorOfficialV2"];
				Class.inhibitorOfficialV2.UPGRADES_TIER_11 = ["tyrantOfficialV2"];
					Class.tyrantOfficialV2.UPGRADES_TIER_13 = [];*/

		Class.invaderElit1.UPGRADES_TIER_7 = ["strikerElit1"];
		/*	Class.inquisitorOfficialV2.UPGRADES_TIER_9 = ["infiltratorOfficialV2"];
				Class.infiltratorOfficialV2.UPGRADES_TIER_11 = ["raiderOfficialV2"];
					Class.raiderOfficialV2.UPGRADES_TIER_13 = [];
			Class.assailantOfficialV2.UPGRADES_TIER_9 = ["aggressorOfficialV2"];
				Class.aggressorOfficialV2.UPGRADES_TIER_11 = ["gladiatorOfficialV2"];
					Class.gladiatorOfficialV2.UPGRADES_TIER_13 = [];*/

		Class.defenderElit1.UPGRADES_TIER_7 = ["caretakerElit1"];
			/*Class.daemonOfficialV2.UPGRADES_TIER_9 = ["hydraOfficialV2"];
				Class.hydraOfficialV2.UPGRADES_TIER_11 = ["cerberusOfficialV2"];
					Class.cerberusOfficialV2.UPGRADES_TIER_13 = [];
			Class.minotaurOfficialV2.UPGRADES_TIER_9 = ["beelzebubOfficialV2"];
				Class.beelzebubOfficialV2.UPGRADES_TIER_11 = ["luciferOfficialV2"];
					Class.luciferOfficialV2.UPGRADES_TIER_13 = [];*/

	Class.dreadBodyOfficialV2.UPGRADES_TIER_6 = ["autoElit1", "atmosphereElit1", "juggernautElit1"];
/**/
		Class.autoElit1.UPGRADES_TIER_8 = ["androidElit1"];
			/*Class.automationOfficialV2.UPGRADES_TIER_10 = ["mechanismOfficialV2", "fusionOfficialV2", "binaryOfficialV2", "exosphereOfficialV2"];
				Class.mechanismOfficialV2.UPGRADES_TIER_12 = ["skynetOfficialV2"];
					Class.skynetOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("skynetOfficialV2");
				Class.fusionOfficialV2.UPGRADES_TIER_12 = ["supernovaOfficialV2"];
					Class.supernovaOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("supernovaOfficialV2");
				Class.binaryOfficialV2.UPGRADES_TIER_12 = ["cipherOfficialV2"];
					Class.cipherOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("cipherOfficialV2");
				Class.exosphereOfficialV2.UPGRADES_TIER_12 = ["interstellarOfficialV2"];
					Class.interstellarOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("interstellarOfficialV2");*/

		Class.atmosphereElit1.UPGRADES_TIER_8 = ["heliosphereElit1"];
				/*Class.megabyteOfficialV2.UPGRADES_TIER_12 = ["gigabyteOfficialV2"];
					Class.gigabyteOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("gigabyteOfficialV2");
				// Class.binaryOfficialV2.UPGRADES_TIER_12 = ["cipherOfficialV2"];
				Class.trojanOfficialV2.UPGRADES_TIER_12 = ["malwareOfficialV2"];
					Class.malwareOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("malwareOfficialV2");
				Class.hardwareOfficialV2.UPGRADES_TIER_12 = ["softwareOfficialV2"];
					Class.softwareOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("softwareOfficialV2");*/

		//Class.atmosphereOfficialV2.UPGRADES_TIER_8 = ["coronaOfficialV2", "thermosphereOfficialV2"];

		/*	Class.coronaOfficialV2.UPGRADES_TIER_10 = ["chromosphereOfficialV2", "fusionOfficialV2", "trojanOfficialV2", "planetOfficialV2"];
				Class.chromosphereOfficialV2.UPGRADES_TIER_12 = ["photosphereOfficialV2"];
					Class.photosphereOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("photosphereOfficialV2");
				// Class.fusionOfficialV2.UPGRADES_TIER_12 = ["supernovaOfficialV2"];
				// Class.trojanOfficialV2.UPGRADES_TIER_12 = ["malwareOfficialV2"];
				Class.planetOfficialV2.UPGRADES_TIER_12 = ["astronomicOfficialV2"];
					Class.astronomicOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("astronomicOfficialV2");*/

			/*Class.thermosphereOfficialV2.UPGRADES_TIER_10 = ["mesosphereOfficialV2", "exosphereOfficialV2", "hardwareOfficialV2", "moonOfficialV2"];
				Class.mesosphereOfficialV2.UPGRADES_TIER_12 = ["stratosphereOfficialV2"];
					Class.stratosphereOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("stratosphereOfficialV2");
				// Class.exosphereOfficialV2.UPGRADES_TIER_12 = ["interstellarOfficialV2"];
				// Class.hardwareOfficialV2.UPGRADES_TIER_12 = ["softwareOfficialV2"];
				Class.moonOfficialV2.UPGRADES_TIER_13 = ["grandioseOfficialV2"];
					Class.grandioseOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("grandioseOfficialV2");*/

		Class.juggernautElit1.UPGRADES_TIER_8 = ["barrageElit1"];

		/*	Class.jumboOfficialV2.UPGRADES_TIER_10 = ["goliathOfficialV2", "planetOfficialV2", "moonOfficialV2"];
				Class.goliathOfficialV2.UPGRADES_TIER_12 = ["behemothOfficialV2"];
					Class.behemothOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("behemothOfficialV2");
				// Class.planetOfficialV2.UPGRADES_TIER_12 = ["astronomicOfficialV2"];
				// Class.moonOfficialV2.UPGRADES_TIER_14 = ["grandioseOfficialV2"];

			Class.colossusOfficialV2.UPGRADES_TIER_10 = ["titanOfficialV2", "sirenOfficialV2", "harpyOfficialV2"];
				Class.titanOfficialV2.UPGRADES_TIER_12 = ["leviathanOfficialV2"];
					Class.leviathanOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("leviathanOfficialV2");
				Class.sirenOfficialV2.UPGRADES_TIER_12 = ["valrayvnOfficialV2"];
					Class.valrayvnOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("valrayvnOfficialV2");
				Class.harpyOfficialV2.UPGRADES_TIER_12 = ["pegasusOfficialV2"];
					Class.pegasusOfficialV2.UPGRADES_TIER_14 = makeHexnoughtBodyV2("pegasusOfficialV2");*/

const hexDreadNames = {
	Javelin: {
		Javelin: 'Javelin II',
		Rapier: 'Lance',
		Diplomat: 'Envoy',
		Arbitrator: 'Cutlass',
		Retardant: 'Rebel',
		Tyrant: 'Autocrat',
		Raider: 'Pirate',
		Gladiator: 'Pillager',
		Cerberus: 'Argonaut',
		Lucifer: 'Kitsune',
	},
	Rapier: {
		Rapier: 'Rapier II',
		Diplomat: 'Emissary',
		Arbitrator: 'Umpire',
		Retardant: 'Impeder',
		Tyrant: 'Oppressor',
		Raider: 'Bandit',
		Gladiator: 'Bruiser',
		Cerberus: 'Cyclops',
		Lucifer: 'Damocles',
	},
	Diplomat: {
		Diplomat: 'Diplomat II',
		Arbitrator: 'Moderator',
		Retardant: 'Insurgent',
		Tyrant: 'Dictator',
		Raider: 'Marauder',
		Gladiator: 'Champion',
		Cerberus: 'Orion',
		Lucifer: 'Manticore',
	},
	Arbitrator: {
		Arbitrator: 'Arbitrator II',
		Retardant: 'Extinguisher',
		Tyrant: 'Shogun',
		Raider: 'Buccaneer',
		Gladiator: 'Warrior',
		Cerberus: 'Gorgon',
		Lucifer: 'Keres',
	},
	Retardant: {
		Retardant: 'Retardant II',
		Tyrant: 'Anarchist',
		Raider: 'Freebooter',
		Gladiator: 'Combatant',
		Cerberus: 'Gigantes',
		Lucifer: 'Demogorgon',
	},
	Tyrant: {
		Tyrant: 'Tyrant II',
		Raider: 'Corsair',
		Gladiator: 'Amazon',
		Cerberus: 'Ouroboros',
		Lucifer: 'Raiju',
	},
	Raider: {
		Raider: 'Raider II',
		Gladiator: 'Filibuster',
		Cerberus: 'Wyvern',
		Lucifer: 'Kraken',
	},
	Gladiator: {
		Gladiator: 'Gladiator II',
		Cerberus: 'Ogre',
		Lucifer: 'Wendigo',
	},
	Cerberus: {
		Cerberus: 'Cerberus II',
		Lucifer: 'Oni',
	},
	Lucifer: {
		Lucifer: 'Lucifer II',
	},
};

function setGladiatorMinion(gun, index) {
	if (!gun.PROPERTIES) return index;
	if (!gun.PROPERTIES.TYPE) return index;
	if (!gun.PROPERTIES.TYPE.includes("inion")) return index;
	switch (index) {
		case 0:
			gun.PROPERTIES.TYPE = "gladiatorTritankMinionOfficialV2";
			break;
		case 1:
			gun.PROPERTIES.TYPE = "gladiatorTritrapMinionOfficialV2";
			break;
		case 2:
			gun.PROPERTIES.TYPE = "gladiatorTriswarmMinionOfficialV2";
			break;
		case 3:
			gun.PROPERTIES.TYPE = "gladiatorAutoMinionOfficialV2";
			break;
		case 4:
			gun.PROPERTIES.TYPE = "gladiatorAuraMinionOfficialV2";
			break;
		case 5:
			gun.PROPERTIES.TYPE = "gladiatorHealAuraMinionOfficialV2";
			break;
	}
	return index + 1;
}
function mergeHexnoughtWeaponV2(weapon1, weapon2) {
	weapon1 = ensureIsClass(weapon1);
	weapon2 = ensureIsClass(weapon2);

	let PARENT = "genericHexnought",
		GUNS = [],
		gunsOnOneSide = [],
		weapon2GunsOnOneSide = [],
		TURRETS = [],
		turretsOnOneSide = [],
		weapon2TurretsOnOneSide = [];

	// Label
	let name1 = hexDreadNames[weapon1.LABEL][weapon2.LABEL],
		name2 = hexDreadNames[weapon2.LABEL][weapon1.LABEL],
		weaponName = weapon1.LABEL + weapon2.LABEL,
		orientationId = 0;
	if (name1) {
		weaponName = name1;
	} else if (name2) {
		weaponName = name2,
		orientationId = 1;
	}
	let LABEL = weaponName,
		className = weapon1.LABEL.toLowerCase() + weapon2.LABEL + orientationId + "Elit1";
	
	// Guns ----------------------
	if (weapon1.GUNS) {
		for (let i = 0; i < weapon1.GUNS.length; i += 5) {
			gunsOnOneSide.push(dereference(weapon1.GUNS[i]));
		}
	}
	if (weapon2.GUNS) {
		for (let i = 0; i < weapon2.GUNS.length; i += 5) {
			weapon2GunsOnOneSide.push(dereference(weapon2.GUNS[i]));
		}
	}

	for (let g in weapon2GunsOnOneSide) weapon2GunsOnOneSide[g].POSITION[5] += 60;
	gunsOnOneSide.push(...weapon2GunsOnOneSide)

	// Turrets -------------------
	if (weapon1.TURRETS) {
		for (let i = 0; i < weapon1.TURRETS.length; i += 5) {
			turretsOnOneSide.push(dereference(weapon1.TURRETS[i]));
		}
	}
	if (weapon2.TURRETS) {
		for (let i = 0; i < weapon2.TURRETS.length; i += 5) {
			weapon2TurretsOnOneSide.push(dereference(weapon2.TURRETS[i]));
		}
	}

	for (let t in weapon2TurretsOnOneSide) weapon2TurretsOnOneSide[t].POSITION[3] += 60;
	turretsOnOneSide.push(...weapon2TurretsOnOneSide)

	// Scale to fit size constraints
	for (let g in gunsOnOneSide) {
		gunsOnOneSide[g].POSITION[1] *= hexnoughtScaleFactor ** 2;
		gunsOnOneSide[g].POSITION[4] *= hexnoughtScaleFactor ** 2;
	}

	for (let t in turretsOnOneSide) {
		turretsOnOneSide[t].POSITION[0] *= hexnoughtScaleFactor ** 2;
	}

	for (let i = 0; i < 3; i++) {
		for (let g in gunsOnOneSide) {
			let gun = JSON.parse(JSON.stringify(gunsOnOneSide[g]));
			gun.POSITION[5] += 120 * i;
			GUNS.push(gun);
		}
		for (let t in turretsOnOneSide) {
			let turret = JSON.parse(JSON.stringify(turretsOnOneSide[t]));
			turret.POSITION[3] += 120 * i;
			TURRETS.push(turret);
		}
	};

	// Gladiator
	if (weapon1.LABEL == "Gladiator" || weapon2.LABEL == "Gladiator") {
		let droneSpawnerIndex = 0
		for (let g in GUNS) {
			let gun = GUNS[g];
			droneSpawnerIndex = setGladiatorMinion(gun, droneSpawnerIndex);
		}
	}
	
	// Body stat modification
	// Arithmetic mean of body stats
	let bodyStatFactors = {FOV: 2, SPEED: 2, HEALTH: 2, SHIELD: 2, REGEN: 2, RESIST: 2, DENSITY: 2};
	let weapon1Body = weapon1.BODY ?? pentanoughtBody;
	let weapon2Body = weapon2.BODY ?? pentanoughtBody;
	for (let m in bodyStatFactors) {
		bodyStatFactors[m] = (weapon1Body[m] ?? pentanoughtBody[m]) / pentanoughtBody[m];
		bodyStatFactors[m] += (weapon2Body[m] ?? pentanoughtBody[m]) / pentanoughtBody[m];
		bodyStatFactors[m] *= hexnoughtBody[m] / 2;
	}

	// Smash it together
	Class[className] = {
		PARENT, LABEL, GUNS, TURRETS,
		BODY: bodyStatFactors
	};
	return className;
}
function makeHexnoughtBodyV2(body) {
	if (!buildHexnoughts) return [];
	
	body = ensureIsClass(body);

	let PARENT = "genericHexnought",
		BODY = {},
		TURRETS = [],
		PROPS = [],
		LABEL = body.LABEL;

	// Label
	let className = LABEL.toLowerCase() + "HexOfficialV2";
	
	// Turrets --------------------
	if (body.TURRETS) {
		let turretRingLoopLength = Math.floor(body.TURRETS.length / 5);

		// Turret adding
		for (let t = 0; t < body.TURRETS.length; t++) {
			let turret = body.TURRETS[t];
			if (turret.POSITION[1]) { // Do whole turret loop at once
				for (let i = 0; i < turretRingLoopLength; i++) {
					for (let j = 0; j < 6; j++) {
						turret = body.TURRETS[t + i * 5 + 1];
						TURRETS.push(
							{
								POSITION: [turret.POSITION[0] * hexnoughtScaleFactor, turret.POSITION[1] * hexnoughtScaleFactor ** 0.5, turret.POSITION[2], turret.POSITION[3] / 6 * 5 + 60 * j, turret.POSITION[4], turret.POSITION[5]],
								TYPE: turret.TYPE,
							}
						)
					}
				}
				t += 5 * turretRingLoopLength - 1;
			} else { // Centered turrets
				TURRETS.push(
					{
						POSITION: [turret.POSITION[0] * hexnoughtScaleFactor ** 0.5, 0, 0, turret.POSITION[3], turret.POSITION[4], turret.POSITION[5]],
						TYPE: turret.TYPE,
					}
				) 
			}
		}
	}
	if (body.PROPS) {
		for (let prop of body.PROPS) {
			prop = dereference(prop);
			let type = prop.TYPE;
			if (typeof type == "string") {
				type = [type];
			}
			type[0] = type[0].replace("pentagon", "hexagon");
			PROPS.push(
				{
					POSITION: [prop.POSITION[0], 0, 0, prop.POSITION[3], prop.POSITION[4]],
					TYPE: type
				}
			);
		}
	}
	
	// Body stat modification
	if (body.BODY) for (let m in body.BODY) BODY[m] = body.BODY[m];

	// Smash it together
	Class[className] = {
		PARENT, BODY, LABEL, TURRETS, PROPS,
	};
	return [className];
}

// Merge hexdreads
const pentanoughtWeapons = ["rapierOfficialV2", "javelinOfficialV2", "diplomatOfficialV2", "arbitratorOfficialV2", "retardantOfficialV2", "tyrantOfficialV2", "raiderOfficialV2", "gladiatorOfficialV2", "cerberusOfficialV2", "luciferOfficialV2"];
if(buildHexnoughts) {
	for (let i of pentanoughtWeapons) {
		for (let j of pentanoughtWeapons) {
			Class[i].UPGRADES_TIER_12.push(mergeHexnoughtWeaponV2(i, j));
		}
	}
}
