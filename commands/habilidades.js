import { MessageEmbed } from 'discord.js';

export default {
	name: 'habilidades',
	description: 'Lista con todas las habilidades que hay en la base de datos',
	aliases: ['lista'],
	permissions: ['ADMINISTRATOR', 'MANAGE_GUILD'],
	/**
     * @param {import("discord.js").Message} message Message of the command
     * @param {import("../interfaces/RedisPrivder").RedisProviderMethods} db Database
	 * @param {String[]} args Arguments of the command
     */
	async execute(message, args, db) {
		const habilidades = await db.keys();

		if (!habilidades.length) {
			const embed = new MessageEmbed()
				.setTitle('No hay habilidades en la base de datos')
				.setColor('#ff0000');

			return message.reply({ embeds: [embed] });
		}

		const EmbedSkillList = new MessageEmbed()
			.setColor('#0099ff')
			.setDescription('Esta es una lista con todas las habilidades disponibles en la base de datos')
			.addField('Habilidades', '```' + habilidades.join(', ') + '```');

		message.channel.send({ embeds: [EmbedSkillList] });

	},
};