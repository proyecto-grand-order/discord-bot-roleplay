import { MessageEmbed } from 'discord.js';


export default {
	name: 'crearHabilidad',
	description: 'Crea una habilidad',
	aliases: ['crearhabilidad'],
	permissions: ['ADMINISTRATOR', 'MANAGE_GUILD'],
	/**
     * @param {import("discord.js").Message} message Message of the command
     * @param {import("../interfaces/RedisPrivder").RedisProviderMethods} db Database
     */
	async execute(message, _, db) {
		const filter = m => m.author.id === message.author.id;

		const EmbedSkillCreation = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Nombre de la habilidad')
			.setDescription('Escribe el nombre de la habilidad que quieres crear');

		// Name
		const msg = await message.channel.send({ embeds: [EmbedSkillCreation] });
		const name = await message.channel.awaitMessages({ filter, max: 1, time:120000, errors: ['time'] }).then(collected => collected.first().content);

		// Skill description
		EmbedSkillCreation.setTitle('Descripción de la habilidad');
		EmbedSkillCreation.setDescription('Escribe la descripción de la habilidad que quieres crear');
		msg.edit({ embeds: [EmbedSkillCreation] });
		const description = await message.channel.awaitMessages({ filter, max: 1, time:120000, errors: ['time'] }).then(collected => collected.first().content);

		// image of skill
		EmbedSkillCreation.setTitle('Imagen de la habilidad');
		EmbedSkillCreation.setDescription('Escribe la url de la imagen de la habilidad que quieres crear');
		msg.edit({ embeds: [EmbedSkillCreation] });
		const image = await message.channel.awaitMessages({ filter, max: 1, time:120000, errors: ['time'] }).then(collected => collected.first().content);

		EmbedSkillCreation.setTitle('Como se llamara al comando mediante el chat');
		EmbedSkillCreation.setDescription('Escribe como quieres que se llame al comando por chat se admiten espacios `patada destructora`');
		msg.edit({ embeds: [EmbedSkillCreation] });
		const command = await message.channel.awaitMessages({ filter, max: 1, time:120000, errors: ['time'] }).then(collected => collected.first().content);

		// Input all data into object
		const skill = {
			name: name,
			description: description,
			image: image,
			command,
		};

		// convert all values of skill into array
		const skillArray = Object.values(skill);

		// if values has empty, undefined or null, return error
		if (skillArray.includes('') || skillArray.includes(undefined) || skillArray.includes(null)) {
			const EmbedError = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('Error')
				.setDescription('Alguno de los valores está vacío o es nulo');
			return message.channel.send({ embeds: [EmbedError] });
		}

		// Save skill into database
		db.set(`${command.toLowerCase()}`, skill);

		const SkillCreationComplete = new MessageEmbed()
			.setDescription('La habilidad ' + name + ' ha sido creada con extio!')
			.addField('Comando', '`!' + command + '`');

		msg.edit({ embeds: [SkillCreationComplete] });
	},
};