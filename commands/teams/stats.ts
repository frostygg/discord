import * as ct from 'common-tags';
import * as Commando from 'discord.js-commando';
import { Message } from 'discord.js';

module.exports = class JoinCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'teams',
            memberName: 'stats',
            description: 'Checks team stats.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run(msg, { team }) {
        let blueCount = await globals.db.query("select count(*) from penguin_item where item_id = 34241");
        let redCount = await globals.db.query("select count(*) from penguin_item where item_id = 34242");
        blueCount = blueCount.rows[0] //first 0: first row, 2nd 0: first column (the count)
        redCount = redCount.rows[0]

        let reply: string = `here are the stats:\n**Red Team**: \`${redCount.count}\`\n**Blue Team**: \`${blueCount.count}\``;
        return msg.reply(reply)
    }
}