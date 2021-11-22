import { MessageEmbed } from 'discord.js';

export default {
	name: 'purgeHabilidades',
	description: 'Elimina todas las habilidades de la base de datos',
	aliases: ['purgehabilidades'],
	permissions: ['ADMINISTRATOR', 'MANAGE_GUILD'],
	/**
	 * @param {import("discord.js").Message} message - Mensaje en el que se ejecuta el comando
	 * @param {String[]} _ - No usado
	 * @param {import("../interfaces/RedisPrivder").RedisProviderMethods} db - Base de datos
	 */
	async execute(message, _, db) {
		await db.clear();

		const embed = new MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Todas las habilidades han sido eliminadas.');

		return message.reply({ embeds: [embed] });
	},
};