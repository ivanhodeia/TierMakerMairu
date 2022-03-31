const fs = require('fs');

function seeder() {
  const data = {
    profile: {
      id: 'admin',
      email: 'admin@tiermaker.com'
    },
    users: [
      {
        id: 'admin',
        email: 'admin@tiermaker.com',
        password: '$2a$12$.fFCLsXvLe2GvN85AWkSjOENFxxUAuYfk25KuyOnTl6yMccZYDwXW'
      }
    ],
    random: [],
    tierlists: []
  }

  // Crear 1000 pictures
  for (let i = 0; i < 1000; i++) {
    data.random.push(`https://picsum.photos/800/500?random=${i}`);
  }

  // Crear 100 tierLists
  for (let i = 0; i < 100; i++) {
    let tierList = {
      id: i + '',
      title: `Tierlist #${i}`,
      category: 'random',
      nPictures: 20,
      banner: `https://picsum.photos/800/500?random=${i}`,
      description: `Esta es una descripción generada automáticamente de la tier list #${i}`,
      favorite: i % 4 == 0,
      items: [
        {
          id: `i.${1}`,
          color: '#ff5733',
          text: 'mejor',
          pictures: []
        },
        {
          id: `i.${2}`,
          color: '#996d64',
          text: 'bueno',
          pictures: []
        },
        {
          id: `i.${3}`,
          color: '#646699',
          text: 'malo',
          pictures: []
        },
        {
          id: `i.${4}`,
          color: '#819964',
          text: 'peor',
          pictures: []
        }
      ]
    }
    data.tierlists.push(tierList);
  }

  return data;
}

const seed = JSON.stringify(seeder(), null, '\t');

fs.writeFile('./api/db.json', seed, (err) => {
  if (err) {
      throw err;
  }
  console.log('JSON data is saved.');
});
