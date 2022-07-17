const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
   new SlashCommandBuilder()
      .setName('request')
      .setDescription('Request a Ride')
      .addStringOption(option =>
		option.setName('from')
			.setDescription('Pickup Location')
			.setRequired(true))
      .addStringOption(option =>
                option.setName('to')
                        .setDescription('Dropoff Location')
                        .setRequired(true))
      .addStringOption(option =>
                option.setName('when')
                        .setDescription('Pickup Time')
                        .setRequired(true))
]
  .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
