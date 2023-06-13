const readline = require('readline');

// The API object now contains the API key and the names of cities and their respective distances from a starting point.

const api = {
  cities: {
    'Split': {
      'Solin': '15 km',
      'Dubrovnik': '230 km',
      'Zagreb': '400 km',
      'Rijeka': '375 km'
    },
    'Dubrovnik': {
      'Split': '230 km',
      'Solin': '246 km',
      'Zagreb': '610 km',
      'Rijeka': '513 km'
    },
    'Zagreb': {
      'Split': '400 km',
      'Solin': '375 km',
      'Dubrovnik': '610 km',
      'Rijeka': '162 km'
    },
    'Rijeka': {
      'Split': '375 km',
      'Solin': '356 km',
      'Dubrovnik': '513 km',
      'Zagreb': '162 km'
    }
  }
};



const prompts = {
  'hi': `Hello! Welcome to our transportation service. We can help you get from ${Object.keys(api.cities)[0]} to any of the following destinations: ${Object.keys(api.cities).slice(1).join(', ')}. How can we assist you today?`,
  'bye': 'Thank you for using our service. Have a great day!',
  'help': 'What do you need help with?',
  'default': "I'm sorry, I didn't understand. Can you please try again?"
};




async function askQuestions () {
  let city = Object.keys(api.cities)[0];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(`Welcome! Please select your starting point from the following options: ${Object.keys(api.cities).join(', ')}. `, (input) => {
    city = input.charAt(0).toUpperCase() + input.slice(1);
    console.log(`You have selected ${city}.`);
    rl.question(`Please select your destination from the following options: ${Object.keys(api.cities).filter(city => city !== input.charAt(0).toUpperCase() + input.slice(1)).join(', ')}. `,(input) => 
      {
        const destination = input.charAt(0).toUpperCase() + input.slice(1);
        const distance = api.cities[city][destination] || api.cities[destination][city];
        if (distance !== undefined) {
          console.log(`The distance between ${city} and ${destination} is ${distance}.`);
        } else {
          console.log(`The distance between ${city} and ${destination} is unknown.`);
        }
        rl.close();
      }
    );
  });
};



askQuestions();