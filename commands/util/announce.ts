import oneLine from 'common-tags';
import * as Commando from 'discord.js-commando';
import * as Discord from 'discord.js';

module.exports = class AnnounceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'announce',
            group: 'util',
            memberName: 'announce',
            description: 'Announces a message.',
            guildOnly: true,
            args: [
                {
                    key: 'ping',
                    prompt: 'Should we ping everyone/here? (`no` `--everyone` or `--here`)',
                    type: 'string',
                    oneOf: ['--no', '--everyone', '--here'],
                    default: '--no'
                },
                {
                    key: 'message',
                    prompt: 'What should we announce?',
                    type: 'string'
                }
            ],
            throttling: {
                usages: 5,
                duration: 30
            }
        });
    }

    async run(msg, { ping, message }) {
        if (msg.member.roles.cache.has(config.roles.lv2) == true) {
            let embed = new Discord.MessageEmbed()
                .setDescription(message)
                .setTimestamp(Date.now());
            if (msg.attachments.size != 0) {
                embed.setImage(msg.attachments.first().attachment);
            }
            msg.delete();

            switch(ping) {
                case '--no':
                    return msg.channel.send(embed);
                case '--everyone':
                    return msg.channel.send('@everyone', embed);
                case '--here':
                    return msg.channel.send('@here', embed);
            }
        } else {
            return msg.reply("you don't have permission to announce.")
        }
    }
}