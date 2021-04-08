const fs = require('fs')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
const { randomInt } = require('crypto')
const { hangmanPic } = require('./affichage')
const { starGame } = require('./main')

// verification de la bonne input de lancement du programme
if (process.argv.length > [2]) {
  console.log(chalk.red(`Usage : node hangman.js`))
  process.exit(1)
}

// verification de l'existence des fichiers main.js, dict.txt et score.json et si ce ne sont pas des repertoires
// et creation de fichier backup de hangman.js, main.js, dict.txt et score.json, si ces derniers n'existent pas
if (!fs.existsSync('./dict.txt' && './score.json' && './main.js')) {
  console.log(chalk.red(`Error: dict.txt or main.js or score.json does not exist`))
  process.exit(1)
}

if (fs.statSync('dict').isDirectory) {
  console.log(chalk.red(`Error: dict is a directory`))
  process.exit(1)
} else if (fs.statSync('score').isDirectory) {
  console.log(chalk.red(`Error: score is a directory`))
  process.exit(1)
} else if (fs.statSync('main').isDirectory) {
  console.log(chalk.red(`Error: main is a directory`))
  process.exit(1)
}

if (fs.existsSync('./dict.bak' && './ score.bak' && './main.bak' && './hangman.bak')) {

} else {
  switch ('./dict.bak' || './score.bak') {
    case './dict.bak':
      let filecont = fs.readFileSync('./dict.txt', 'utf-8')
      fs.writeFileSync('./dict.bak', `${filecont}`)
    case './score.bak':
      let filecont2 = fs.readFileSync('./score.json', 'utf-8')
      fs.writeFileSync('./score.bak', `${filecont2}`)
    case './hangman.bak':
      let filecont3 = fs.readFileSync('./hangman.js', 'utf-8')
      fs.writeFileSync('./hangman.bak', `${filecont3}`)
    case './main.bak':
      let filecont3 = fs.readFileSync('./main.js', 'utf-8')
      fs.writeFileSync('./main.bak', `${filecont3}`)
      break
  }
}
console.log(chalk.bold.rgb(162, 51, 255)('    JEU DU PENDU    '))
// affichage du high score
let highScore = fs.readFileSync(`./score.json`)
let data = JSON.parse(highScore)
console.log(chalk.blueBright.bold.bgRgb(255, 198, 51)('\n      HIGH SCORE      \n'))
for (let i = 0; i < 10; i++) {
  console.log(chalk.rgb(0, 255, i * 20).bgRgb(93, 0, 12)(`   ${data.top[i].position}: ${data.top[i].name}: ${data.top[i].score} `))
}
const pressStart = readlineSync.keyIn(`\nAppuyer sur la touche ESPACE pour commencer\n Ou la touche Q pour quitter`, { limit: [' ', 'q'] }).toUpperCase()
if (pressStart === 'Q') {
  process.exit(1)
}


starGame()
