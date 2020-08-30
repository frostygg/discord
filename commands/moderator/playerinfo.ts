import * as ct from 'common-tags';
import * as Commando from 'discord.js-commando';
import { Message } from 'discord.js';
import { stringify } from 'querystring';

module.exports = class PlayerInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'playerinfo',
            group: 'moderator',
            memberName: 'playerinfo',
            description: 'Replies with information about a player.',
            guildOnly: true,
            args: [
                {
                    key: 'type',
                    prompt: 'Lookup by `user` or `id`?',
                    type: 'string',
                    oneOf: ['id', 'user']
                },
                {
                    key: 'search',
                    prompt: 'What is the username/ID you want to check info for?',
                    type: 'string',
                    validate: search => {
                        if (search.length > 12) return false; else return true;
                    }
                }
            ],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run(msg, { type, search }) {
        if (msg.member.roles.cache.has(config.roles.lv2) == false) return msg.reply("you do not have permission to run this command.");
        let playerInfo;
        switch(type) {
            case 'id':
                //let id: number = parseInt(search);
                ///if (id == NaN) return msg.reply("not an ID!");
                //playerInfo = await globals.db.query("select id, username, nickname, moderator, registration_date, active, approval_en, permaban, minutes_played, coins, agent_status from penguin where id = $1;", [ search.toLowerCase() ]);
                return msg.reply('searching by id is disabled until daniel fixes it.');
            case 'user':
                playerInfo = await globals.db.query("select id, username, nickname, moderator, registration_date, active, approval_en, permaban, minutes_played, coins, agent_status from penguin where username = $1;", [ search.toLowerCase() ]);
        }
        if (playerInfo.rows[0] == undefined) return msg.reply("player not found.")
        playerInfo = playerInfo.rows[0]; //first row
        let brokeTheRulesLikeThat: boolean;
        switch(playerInfo.username) {
            case "lilith":
                brokeTheRulesLikeThat = true;
                break;
            default:
                brokeTheRulesLikeThat = false;
                break;
        }

        let reply: string = 
`**Information for \`${playerInfo.nickname}\`**
ID: \`${playerInfo.id}\`
Username: \`${playerInfo.username}\`
Nickname/Display name: \`${playerInfo.nickname}\`
Is moderator: \`${playerInfo.moderator}\`

Registered: \`${playerInfo.registration_date}\`
Is activated: \`${playerInfo.active}\`
Is username approved: \`${playerInfo.approval_en}\`
Is permanently banned: \`${playerInfo.permaban}\`
Minutes played: \`${playerInfo.minutes_played}\`
Coins: \`${playerInfo.coins}\`
Is secret agent: \`${playerInfo.agent_status}\`
Broke the rules like that: \`${brokeTheRulesLikeThat}\`

Avatar preview: https://play.frosty.gg/avatar/${playerInfo.id}/cp?size=300`;
        return msg.channel.send(reply);
    }
}