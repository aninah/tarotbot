const Discord = require('discord.js');
const cards = require("./cards.json")
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	const m = msg.content.split(' ');
	if (m[0] =='?tarot') {
		answer_the_ask(m, msg);
	}
});

client.login('ODEyMTc3MjQxOTcwMTgwMTI2.YC89AA.Ot6tHh9LhmImcByG5rYop4P4sE0');

function extract_card_info(num) {
	let o = "reversed";
  if(Math.floor(Math.random() * 2) == 0){
      o = "upright";
  }
  let title = cards[num]["title"];
  let description = cards[num][o];
  return `${title} (${o}) - ${description}`;

}

function draw_cards(num_cards) {
	let numbers = [];
	for (let i = 0; i < num_cards; i++) {
		let n =  Math.floor(Math.random() * 77);
	  let check = numbers.includes(n);
	  while(check) {
	  	n =  Math.floor(Math.random() * 77);
	  	check = numbers.includes(n);
	  }
		numbers.push(n);
	}
	return numbers;
}

function answer_the_ask(m, msg) {
	actual_message = "";
	tarot_numbers = [];
	if (m.length == 1) {
		command = "1card";
	} else {
		command = m[1];
	}
	switch(command) {
		case "help":
			msg.reply(` *HELP*
- commands are help, 1card, 3card, and celtic. example: \`?tarot 3card\`
- you can add the option "--images" in order to add images to your tarot.  
- literally everything in this bot was taken from biddytarot website
			`);
			return;
		case "1card":
			tarot_numbers = draw_cards(1);
			actual_message = "\`\`\`" + extract_card_info(tarot_numbers[0]) + "\`\`\`";
			break;
		case "3card":
			tarot_numbers = draw_cards(3);
			actual_message = `\`\`\`1 ${extract_card_info(tarot_numbers[0])}
2 ${extract_card_info(tarot_numbers[1])}
3 ${extract_card_info(tarot_numbers[2])}\`\`\``;
			break;
		case "celtic":
			tarot_numbers = draw_cards(10);
			actual_message = `\`\`\`1 ${extract_card_info(tarot_numbers[0])}
2 ${extract_card_info(tarot_numbers[1])}
3 ${extract_card_info(tarot_numbers[2])}
4 ${extract_card_info(tarot_numbers[3])}
5 ${extract_card_info(tarot_numbers[4])}
6 ${extract_card_info(tarot_numbers[5])}
7 ${extract_card_info(tarot_numbers[6])}
8 ${extract_card_info(tarot_numbers[7])}
9 ${extract_card_info(tarot_numbers[8])}
10 ${extract_card_info(tarot_numbers[9])}\`\`\``;
			break;

		default:
			msg.reply("I don't recognize the command. Try again?");
			return;
		}


	if (m.indexOf('--images') >= 0) {
		card_imgs = []
		for (t in tarot_numbers) {
			card_imgs.push(cards[t]['img']);
		}
		msg.reply(actual_message, {files: card_imgs}); // TODO ADD LIST OF LINKS HERE
	} else {
		msg.reply(actual_message);
	}
}










	









	









	