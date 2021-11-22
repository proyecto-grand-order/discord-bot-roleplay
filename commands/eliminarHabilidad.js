import { MessageEmbed } from 'discord.js';

export default {
	name: 'eliminarHabilidad',
	description: 'Elimina una habilidad de la base de datos',
	aliases: ['eliminarhabilidad'],
	permissions: ['ADMINISTRATOR', 'MANAGE_GUILD'],
	/**
     * @param {import("discord.js").Message} message Message of the command
     * @param {import("../interfaces/RedisPrivder").RedisProviderMethods} db Database
	 * @param {String[]} args Arguments of the command
     */
	async execute(message, args, db) {
		try {
			const arg = args.join(' ');

			// Eliminar habilidad de la base de datos
			await db.delete(arg);

			// Enviar mensaje de confirmación
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Habilidad eliminada')
				.setDescription(`Habilidad \`!${arg}\` eliminada correctamente`);

			return message.channel.send({ embeds: [embed] });
		}
		catch (error) {
			console.error(error);

			// Enviar mensaje de error
			const embed = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('Error')
				.setDescription('Ha ocurrido un error al eliminar la habilidad');

			return message.channel.send({ embeds: [embed] });
		}
	},
};