import { CommandClient } from '../client/cache.js';
import { MessageEmbed } from 'discord.js';


export default {
	name: 'ayuda',
	description: 'Lista con todos los comandos',
	aliases: ['help', 'commands', 'comandos'],
	async execute(message, args) {
		const arg = args.join(' ');

		// Si no se ha propuesto un comando, mostrar todos los comandos
		if (!arg) {
			const commands = CommandClient.allCommands.map(cmd => `${cmd.name}`);

			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setDescription('Estos son todos los comandos que tiene el bot actualmente!')
				.addField('Comandos', '```' + commands.join(', ') + '```');

			return message.reply({ embeds: [embed] });
		}

		// Si se ha propuesto un comando, mostrar la información del mismo
		const command = CommandClient.allCommands.find(cmd => cmd.name === arg || cmd.aliases.includes(arg));

		if (!command) {
			const embed = new MessageEmbed()
				.setColor('#ff0000')
				.setDescription('No se ha encontrado el comando que has propuesto.');

			return message.reply({ embeds: [embed] });
		}

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`Información del comando \`${command.name}\``)
			.addField('Descripción', command.description)
			.addField('Aliases', `\`${command.aliases.join(', ')}\``);


		embed.addField('Ejemplo', `\`!${command.name}\``);

		return message.reply({ embeds: [embed] });
	},
};