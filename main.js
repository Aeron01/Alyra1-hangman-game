const fs = require('fs')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
const { randomInt } = require('crypto')

score = 0

// randomisation du mots a chercher

const words = fs.readFileSync('./dict.txt', 'utf-8').toString().split('\n')
const n = randomInt(0, words.length)
console.log(`random words: ${words[n]}`)
const wordsRan = words[n]
// nb de caracter du mot
let wordsCrtNb = wordsRan.length
//console.log(wordsCrtNb)

// nb d'essai du joueur
let plyrTry = 9


// affichage cacher des caracters du mot sous forme "_"
/*let affi = ''
for (let i = wordsCrtNb; i > 0; --i) {
  affi += '_' + ' '
}*/
//passage des caracteres du mot en tableau
let tabCaraWord = wordsRan.split('')
let indexCar = []
for (let i = 0; i < tabCaraWord.length; i++) {
  indexCar.push('_')
}
let inc = 0
let count = 0
console.log(tabCaraWord)
let turnoff = false
while (turnoff = true) {
  //console.log(indexCar)
  const plyerEnt = readlineSync.question(chalk.blue(`${indexCar}\nIl te reste ${plyrTry} essais.\nChoisi une lettre :`)).toUpperCase()
  console.log(chalk.blue(``))
  console.log(plyerEnt)


  tabCaraWord.forEach(elem => {
    if (plyerEnt === elem) {
      console.log('tt', inc)
      indexCar.splice(0, inc, elem)
      ++count
      score += 10
      plyrTry++
    }
    inc = inc + 1
  });
  console.log(count)
  //console.log(tabCaraWord)
  //console.log(wordsCrtNb)
  console.log(indexCar)
  //console.log(indexCar.length)
  if (wordsCrtNb === count) {
    return console.log(chalk.greenBright(`Bravo, vous avez trouvez. le mot etait ${wordsRan}. \n Vous avez trouver en utilisant ${9 - plyrTry} essais.`))
    return console.log(chalk.greenBright(`votre score est de ${score} points.`))
    turnoff = true
  }
  plyrTry--
  score = score - 5
}
//console.log(affi)


console.log(indexCar)
console.log(wordsCrtNb)
console.log(plyrTry)