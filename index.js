// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

	if (interaction.customId.startsWith('cancel') && 
		interaction.customId.endsWith(interaction.user.id)) {

		const embed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Ride Request')
						.setDescription(`Cancelled`);

		await interaction.update({ embeds: [ embed ], components: []});
	}

	else if (interaction.customId.startsWith('ok') && 
		!interaction.customId.endsWith(interaction.user.id)) {

		const userId = interaction.customId.split('-').pop();

		const embed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Ride Request')
						.setDescription(`@${interaction.member.displayName} has offered to give you a ride`);

		await interaction.update({ components: []});
		await interaction.followUp({ content: `<@${userId}>`, embeds: [ embed ] });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'request') {

		const embed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Ride Request')
						.setDescription(`Can someone give ${interaction.member.displayName} a ride?`)
						.addFields(
							{ name: ':house:    From:', value: `\`\`\`${interaction.options.getString('from')}\`\`\`` },
							{ name: ':office:    To:', value: `\`\`\`${interaction.options.getString('to')}\`\`\`` },
							{ name: ':clock1:    When:', value: `\`\`\`${interaction.options.getString('when')}\`\`\`` },
						)

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId(`ok-${interaction.user.id}`)
					.setLabel('Pick Up')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId(`cancel-${interaction.user.id}`)
					.setLabel('Cancel')
					.setStyle('DANGER'),
			);

		await interaction.reply(content: `@everyone`, { embeds: [ embed ], components: [row] });
	}
});

client.login(process.env.token);
