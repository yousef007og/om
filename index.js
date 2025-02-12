const mineflayer = require('mineflayer');
const express = require('express');

// Create a simple web server using Express
const app = express();
app.get('/', (req, res) => {
  res.send('OM BOT is running!');
});

// Start the server on port specified by Netlify or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web server is running on port ${PORT}`);
});

// Function to create a bot with given options
function createBot(options) {
  const bot = mineflayer.createBot(options);
  
  // Event: When the bot spawns in the server
  bot.on('spawn', () => {
    console.log(`${options.username} has entered the server!`);
    bot.chat(`Hello, I am ${options.username}!`);
  });

  // Event: When the bot hears a chat message
  bot.on('chat', (username, message) => {
    if (username === bot.username) return; // Ignore messages from the bot itself
    console.log(`${username}: ${message}`);
    
    // Respond to specific commands
    if (message === '!hello') {
      bot.chat(`Hello, ${username}!`);
    }
  });

  // Make the bot active by sending periodic messages
  setInterval(() => {
    bot.chat('I am still here!');
  }, 60000); // Send a message every 60 seconds

  // Automatically reconnect if the bot disconnects
  bot.on('end', () => {
    console.log(`${options.username} has disconnected. Reconnecting...`);
    setTimeout(() => {
      createBot(options);
    }, 5000); // Wait 5 seconds before reconnecting
  });

  return bot;
}

// Create the main bot
const mainBotOptions = {
  host: 'om2025.aternos.me', // Replace with your server IP
  port: 19409,               // Replace with your server port
  username: 'OM_BOT_123'     // The bot's username (make it unique)
};
const mainBot = createBot(mainBotOptions);

// Create a dummy bot to keep the server alive
const dummyBotOptions = {
  host: 'om2025.aternos.me', // Replace with your server IP
  port: 19409,               // Replace with your server port
  username: 'Dummy_Bot'       // A different username for the dummy bot
};
const dummyBot = createBot(dummyBotOptions);
