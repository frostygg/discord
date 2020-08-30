import oneLine from 'common-tags';
import * as Commando from 'discord.js-commando';
import { Message } from 'discord.js';

module.exports = class JoinCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'teams',
            memberName: 'join',
            description: 'Joins a team (red or blue).',
            guildOnly: true,
            args: [
                {
                    key: 'team',
                    prompt: 'Which team to join? (`red` or `blue`)',
                    type: 'string',
                    oneOf: ['red', 'blue']
                }
            ],
            throttling: {
                usages: 1,
                duration: 120
            }
        });
    }

    async run(msg, { team }) {
        /*if (msg.member.roles.cache.has(config.roles.red) == false &&
            msg.member.roles.cache.has(config.roles.blue) == false)
        {
            switch(team) {
                case 'red':
                    msg.member.roles.add(config.roles.red);
                    return msg.reply("You are now in the red team.");
                case 'blue':
                    msg.member.roles.add(config.roles.blue);
                    return msg.reply("You are now in the blue team.");
            }
        } else {
            return msg.reply("You are already in a team!");
        }*/
        return msg.reply("you can no longer join teams.")
    }
}