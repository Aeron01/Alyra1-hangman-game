const fs = require('fs')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
const { randomInt } = require('crypto')
const { hangmanPic } = require('./affichage')
const { starGame } = require('./main')



// verification de l'existance des fichier dict.txt et score.json
// et creation de fichier backup de dict.txt et score.json, si ces dernier n'existe pas
if (!fs.existsSync('./dict.txt' && './score.json' && './main.js')) {
  console.log(chalk.red(`Error: dict.txt or score.json does not exist`))
  process.exit(1)
} else if (fs.existsSync('./dict.bak' && './ score.bak')) {

} else {
  switch ('./dict.bak' || './score.bak') {
    case './dict.bak':
      let filecont = fs.readFileSync('./dict.txt', 'utf-8')
      fs.writeFileSync('./dict.bak', `${filecont}`)
    case './score.bak':
      let filecont2 = fs.readFileSync('./score.json', 'utf-8')
      fs.writeFileSync('./score.bak', `${filecont2}`)
      break
  }
}
console.log(chalk.bold.rgb(162, 51, 255)('JEU DU PENDU'))
// affichage du high score
let highScore = fs.readFileSync(`./score.json`)
let data = JSON.parse(highScore)
console.log(chalk.blueBright.bold.bgRgb(255, 198, 51)('\nHIGH SCORE\n'))
for (let i = 0; i < 10; i++) {
  console.log(chalk.rgb(0, 255, i * 20).bgRgb(93, 0, 12)(`${data.top[i].position}: ${data.top[i].name}: ${data.top[i].score}`))
}
const pressStart = readlineSync.keyIn(`\nAppuyer sur la touche Espace pour commencer\n Ou la touche Q pour quitter`, { limit: [' ', 'q'] }).toUpperCase()
if (pressStart === 'Q') {
  process.exit(1)
}


starGame()
