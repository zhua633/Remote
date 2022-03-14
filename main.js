const { Client, Intents, DiscordAPIError, Collection } = require('discord.js');     

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const prefix='!';

const mongooseConnectionString='mongodb+srv://anvilly:anvilly123@discordbot.5nqv5.mongodb.net/?keepAlive=true';

const fs=require('fs');

const mongoose=require('mongoose');

const token='OTIxNjcyNzk2NjI1NTY3Nzc0.Yb2Urg.jsgW6dC2oQiXgENYtx_gx-0vAug';

client.commands=new Collection();

const commandFiles=fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

var sayhi=0;

for (const file of commandFiles){
    const command=require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('ReMote is online!');
});

//Check if message does not start with prefix or if a bot sent the message
client.on('messageCreate', message =>{
    if(message.author.bot) return;
    //Splicing to allow for multiple commands
    const args=message.content.slice(prefix.length).split(/ +/);
    const command=args.shift().toLowerCase();
    
    if (command==='hi'){
        client.login(token);
        sayhi=0;
        message.channel.send('hey sup g yo homie back on');
    }

    if (sayhi===0){
        client.commands.get('react').execute(message);
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    else if(command==='bye'){
        sayhi++;
        message.channel.send('sadge fine be that way')
        .then(msg => client.destroy())
        .then(client.login(token))
    }

    else if(command ==='ping'){
        client.commands.get('ping').execute(message,args);
    }

    else if(command ==='alley'){
        message.channel.send('sucks');
    }

    else if(command ==='anvilly'){
        message.channel.send('is cool');
    }

    else if(command ==='giyu'){
        message.channel.send('is hot');
    }

    else if(command ==='art'){
        message.channel.send('https://youtu.be/dQw4w9WgXcQ');
    }
    else return;
    //mongoose
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            keepAlive: true,
            keepAliveInitialDelay: 300000,
        })
        .then(()=>console.log('Connected to mongodb'))
        .catch((err) => console.log(err));

})

client.login(token);

