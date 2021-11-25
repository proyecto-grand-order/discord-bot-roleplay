import { MessageEmbed } from 'discord.js';

const userWithYesAll = new Set();

/**
 * @param {import("discord.js").Message} message - Message of the command
 * @param {boolean} hasConfirm - If the command has a confirm
 */
const confirm = async (message, again) => {

	if (userWithYesAll.has(message.author.id)) return again = false;

	// Embed
	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Esta seguro')
		.setDescription(
			'\n**si** para seguir con el procedimiento\n**editar** para editar el ultimo campo rellenado\n**cancelar** para cancelar todo el comando\n**Si todo** para continuar si este aviso!');

	message.edit({ embeds: [embed] });

	// Filtro de await message para que solo acepte si, editar o cancelar
	const filter = (m) => ['si', 'editar', 'cancelar', 'si todo'].includes(m.content.toLowerCase());

	const confirmacion = await message.channel.awaitMessages({ filter, max: 1, time: 120000, errors: ['time'] });


	if (confirmacion.first().content.toLowerCase() === 'si todo') {
		userWithYesAll.add(message.author.id);
		return false;
	}

	// Si se cancela el comando
	if (confirmacion.first().content.toLowerCase() === 'cancelar') {
		message.delete();
		return false;
	}

	// Si se edita el ultimo campo
	if (confirmacion.first().content.toLowerCase() === 'editar') again = true;

	// Si se confirma el comando
	if (confirmacion.first().content.toLowerCase() === 'si') again = false;

	// Si no se ha rellenado ningun campo
	if (!message.content) {
		return again;
	}
};

export default {
	name: 'crearficha',
	description: 'Crea una ficha de personaje',
	aliases: ['cf'],
	onlyGuild: false,
	/**
	 * @param {import("discord.js").Message} message - Message of the command
	 * @param {import('../interfaces/RedisPrivder'.RedisProviderMethods)} db - Database
	 */
	async execute(message, 	_, db) {

		try {
			const time = 120000;
			const embed = new MessageEmbed();
			const filter = m => m.content;

			// Variables

			const again = {
				nombre: false,
				apodo: false,
				altura: false,
				peso: false,
				edad: false,
				raza: false,
				genero: false,
				sexualidad: false,
				historia: false,
				debilidad: false,
				gustos: false,
				alineamiento: false,
				equipamiento: false,
				poderes: false,
			};

			const documento = {
				nombre: '',
				apodo: '',
				altura: '',
				peso: '',
				edad: '',
				raza: '',
				genero: '',
				sexualidad: '',
				historia: '',
				debilidad: '',
				gustos: '',
				alineamiento: '',
				poderes: '',
				equipamiento: '',
			};

			// Preguntas

			embed.setColor('#0099ff');
			embed.setTitle('Crear personaje');
			embed.setDescription('Veo que quieres crear una ficha en cualquier momento puede escribir **cancelar** para cancelar este comando!');
			embed.setFooter('Tienes dos minutos para responder cada pregunta tomate tu tiempo amigo!');
			const msg = await message.author.send({ embeds: [embed] });

			// Nombre y Apellidos
			embed.setTitle('Nombre y Apellidos');
			embed.setDescription('Escribe tu nombre y apellidos');

			await msg.edit({ embeds: [embed] });
			documento.nombre = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.nombre = await confirm(msg, again.nombre);

			while (again.nombre) {
				embed.setTitle('Nombre y Apellidos');
				embed.setDescription('Escribe tu nombre y apellidos');

				await msg.edit({ embeds: [embed] });
				documento.nombre = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.nombre = await confirm(msg, again.nombre);
			}

			// Apodo
			embed.setTitle('Apodo');
			embed.setDescription('Escribe tu apodo');

			await msg.edit({ embeds: [embed] });
			documento.apodo = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.apodo = await confirm(msg, again.apodo);

			while (again.apodo) {
				embed.setTitle('Apodo');
				embed.setDescription('Escribe tu apodo');

				await msg.edit({ embeds: [embed] });
				documento.apodo = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.apodo = await confirm(msg, again.apodo);
			}

			// Altura
			embed.setTitle('Altura');
			embed.setDescription('Escribe tu altura');

			await msg.edit({ embeds: [embed] });
			documento.altura = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.altura = await confirm(msg, again.altura);

			while (again.altura) {
				embed.setTitle('Altura');
				embed.setDescription('Escribe tu altura');

				await msg.edit({ embeds: [embed] });
				documento.altura = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.altura = await confirm(msg, again.altura);
			}

			// Peso (Aviso 300kg maximo)
			embed.setTitle('Peso');
			embed.setDescription('Escribe tu peso\n**Maximo 300kg**');

			await msg.edit({ embeds: [embed] });
			documento.peso = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.peso = await confirm(msg, again.peso);

			while (again.peso) {
				embed.setTitle('Peso');
				embed.setDescription('Escribe tu peso\n**Maximo 300kg**');

				await msg.edit({ embeds: [embed] });
				documento.peso = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.peso = await confirm(msg, again.peso);
			}

			// Edad
			embed.setTitle('Edad');
			embed.setDescription('Escribe tu edad');

			await msg.edit({ embeds: [embed] });
			documento.edad = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.edad = await confirm(msg, again.edad);

			while (again.edad) {
				embed.setTitle('Edad');
				embed.setDescription('Escribe tu edad');

				await msg.edit({ embeds: [embed] });
				documento.edad = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.edad = await confirm(msg, again.edad);
			}

			// Raza
			embed.setTitle('Raza');
			embed.setDescription('Escribe tu raza');

			await msg.edit({ embeds: [embed] });
			documento.raza = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.raza = await confirm(msg, again.raza);

			while (again.raza) {
				embed.setTitle('Raza');
				embed.setDescription('Escribe tu raza');

				await msg.edit({ embeds: [embed] });
				documento.raza = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.raza = await confirm(msg, again.raza);
			}

			// Genero
			embed.setTitle('Genero');
			embed.setDescription('Escribe tu genero');

			await msg.edit({ embeds: [embed] });
			documento.genero = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.genero = await confirm(msg, again.genero);

			while (again.genero) {
				embed.setTitle('Genero');
				embed.setDescription('Escribe tu genero');

				await msg.edit({ embeds: [embed] });
				documento.genero = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.genero = await confirm(msg, again.genero);
			}

			// Sexualidad
			embed.setTitle('Sexualidad');
			embed.setDescription('Escribe tu sexualidad \n*Orientación sexual*');

			await msg.edit({ embeds: [embed] });
			documento.sexualidad = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.sexualidad = await confirm(msg, again.sexualidad);

			while (again.sexualidad) {
				embed.setTitle('Sexualidad');
				embed.setDescription('Escribe tu sexualidad \n*Orientación sexual*');

				await msg.edit({ embeds: [embed] });
				documento.sexualidad = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.sexualidad = await confirm(msg, again.sexualidad);
			}

			// Historia
			embed.setTitle('Historia');
			embed.setDescription('Escribe tu historia\n*Si es larga se envia al canal de lore-personaje*');

			await msg.edit({ embeds: [embed] });
			documento.historia = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.historia = await confirm(msg, again.historia);

			while (again.historia) {
				embed.setTitle('Historia');
				embed.setDescription('Escribe tu historia\n*Si es larga se envia al canal de lore-personaje*');

				await msg.edit({ embeds: [embed] });
				documento.historia = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.historia = await confirm(msg, again.historia);
			}

			// Alineamiento
			embed.setTitle('Alineamiento');
			embed.setDescription('Escribe tu alineamiento\n*Bueno, Malo, Neutral, Pacifico*');

			await msg.edit({ embeds: [embed] });
			documento.alineamiento = await msg.channel.awaitMessages({ filter: (m) => ['bueno', 'malo', 'neutral', 'pacifico'].includes(m.content.toLowerCase()), max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.alineamiento = await confirm(msg, again.alineamiento);

			while (again.alineamiento) {
				embed.setTitle('Alineamiento');
				embed.setDescription('Escribe tu alineamiento\n*Bueno, Malo, Neutral, Pacifico*');

				await msg.edit({ embeds: [embed] });
				documento.alineamiento = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.alineamiento = await confirm(msg, again.alineamiento);
			}

			// Debilidad
			embed.setTitle('Debilidad');
			embed.setDescription('Escribe tu debilidad\n*Mínimo una Debilidad Física lógica*');

			await msg.edit({ embeds: [embed] });
			documento.debilidad = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.debilidad = await confirm(msg, again.debilidad);

			while (again.debilidad) {
				embed.setTitle('Debilidad');
				embed.setDescription('Escribe tu debilidad\n*Mínimo una Debilidad Física lógica*');

				await msg.edit({ embeds: [embed] });
				documento.debilidad = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.debilidad = await confirm(msg, again.debilidad);
			}

			// Gustos
			embed.setTitle('Gustos');
			embed.setDescription('Escribe tu gustos');

			await msg.edit({ embeds: [embed] });
			documento.gustos = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.gustos = await confirm(msg, again.gustos);

			while (again.gustos) {
				embed.setTitle('Gustos');
				embed.setDescription('Escribe tu gustos');

				await msg.edit({ embeds: [embed] });
				documento.gustos = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.gustos = await confirm(msg, again.gustos);
			}

			// Equipamiento
			embed.setTitle('Equipamiento');
			embed.setDescription('Escribe tu equipamiento\n*Si se trajo algo del mundo real, nada de armas de fuego ni objetos que no se puedan cargar*');

			await msg.edit({ embeds: [embed] });
			documento.equipamiento = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.equipamiento = await confirm(msg, again.equipamiento);

			while (again.equipamiento) {
				embed.setTitle('Equipamiento');
				embed.setDescription('Escribe tu equipamiento\n*Si se trajo algo del mundo real, nada de armas de fuego ni objetos que no se puedan cargar*');

				await msg.edit({ embeds: [embed] });
				documento.equipamiento = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.equipamiento = await confirm(msg, again.equipamiento);
			}

			// Podedes
			embed.setTitle('Poderes');
			embed.setDescription('Escribe tus poderes\n*Solo se permite poderes del canal <#868247854060290099>*');

			await msg.edit({ embeds: [embed] });
			documento.poderes = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
			again.poderes = await confirm(msg, again.poderes);

			while (again.poderes) {
				embed.setTitle('Poderes');
				embed.setDescription('Escribe tus poderes\n*Solo se permite poderes del canal <#868247854060290099>*');

				await msg.edit({ embeds: [embed] });
				documento.poderes = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again.poderes = await confirm(msg, again.poderes);
			}

			console.log(documento);
			userWithYesAll.delete(message.author.id);
		}


		catch (error) {
			if (error.message !== 'DiscordAPIError: Unknown Message') {
				console.log(error);
			}

			userWithYesAll.delete(message.author.id);
		}


	},
};