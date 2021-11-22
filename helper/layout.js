import { stripIndents } from 'common-tags';

/**
 * Layout principal de las habilidades!
 * @param {Object} skill - Objeto con la información de la habilidad
 * @param {String} skill.name - Nombre de la habilidad
 * @param {String} skill.description - Descripción de la habilidad
 * @param {String} skill.image - Imagen de la habilidad
 * @param {import('discord.js').Message} message - Mensaje en el que se va a mostrar la habilidad
 * @returns {import('discord.js').Message} - Mensaje con la información de la habilidad
 */
export default function layoutText(skill, message) {

	const layout = stripIndents`
		**${skill.name}**

		${skill.description}
		`;

	if (skill.image) {
		const image = skill.image.replace(/.gif/g, '');
		return message.channel.send({ content: layout, files: [image + '.gif'] });
	}

	return message.channel.send({ content: layout });

}