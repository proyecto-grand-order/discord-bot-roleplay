export const commands = new Map();

export class CommandClient {

	static get allCommands() {
		return Array.from(commands.values());
	}

}