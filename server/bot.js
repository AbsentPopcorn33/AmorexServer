global.ReadableStream = require("web-streams-polyfill").ReadableStream;
const { Client, GatewayIntentBits, TextChannel, EmbedBuilder } = require("discord.js");
const commands = global.chatCommands;
const Events = global.Events;
const wsServer = global.wsServer;
const tags = global.tags

let client;

const log = function (c, message) {
  console.log(message);
  if (c === "logs") {
    c = "1277303427004629002";
  } else if (c === "polygons") {
    c = "1277113636262776842";
  }
  const channel = client.channels.cache.get(c);
  if (channel instanceof TextChannel) {
    channel.send(`\`[${new Date().toLocaleString()}] ${message}\``);
  }
};

module.exports.log = log;

client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  log("logs", `[INFO] Amorex is up`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(">")) {

    const [cmd, id, ...args] = message.content.trim().slice(1).split(/ +/);

    if (cmd === "run") {
      if (!message.member.roles.cache.some((role) => {return ['1272369967110557840','1277282382415921255'].includes(role.id);})) return;
      const command = args.shift();
      const embed = new EmbedBuilder()
        .setColor('#4b009c')
        .setTitle('Command Execution')
        .setDescription(`Attempting to run /${command} ${args.join(" ")} as ID ${id}`)
        .setTimestamp();

      message.reply({ embeds: [embed] });
      runCommand(id, command, args);
    } else if (cmd === "restore") {
      if (!message.member.roles.cache.has('1277468648339931166')) return;
      const embed = new EmbedBuilder()
        .setColor('#4b009c')
        .setTitle('Restore')
        .setDescription(`Attempting to restore level ${args.join(" ")} to ID ${id}`)
        .setTimestamp();

      message.reply({ embeds: [embed] });
      runCommand(id, "level", args);
    } else {
      const embed = new EmbedBuilder()
        .setColor('#9602c7')
        .setTitle('Error')
        .setDescription('Unknown command.')
        .setTimestamp();

      message.reply({ embeds: [embed] });
    }
  }
});

console.log(process.env)
client.login(process.env.BOT).catch(console.error);


global.log = log;

function runCommand(id, command, args) {
  let abort = false;
  let message = `/${command} ${args.join(" ")}`;
  let socket;
  if (command === "level" && args > 999 || command === "lvl" && args > 999) return;

  wsServer.clients.forEach(function (client) {
    if (client && client.player && client.player.body && tags.add(client.player.body) == id) {
      socket = client;
      return;
    }
  });

  if (socket) {
    if (!socket.player.body) return;
    if (!socket.permissions) {
      socket.permissions ={}
    }
    let trueperms = socket.permissions.class;
    socket.permissions.class = "developer";
    commands.update({
      socket,
      player: socket.player,
      body: socket.player.body,
    },
      () => (abort = true)
    );
    const commandArgs = message.slice(1).split(" ");
    commands.on(commandArgs.shift().toLowerCase(), commandArgs);
    socket.permissions.class = trueperms;
  } else {
    log("logs", `[INFO] ID ${id} not found`);
  }
}
