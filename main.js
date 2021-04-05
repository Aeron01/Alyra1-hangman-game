const fs = require('fs')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
const { randomInt } = require('crypto')
const { hangmanPic } = require('./affichage')
const { clear } = require('console')

// verification de l'existance des fichier dict.txt et score.json
// et creation de fichier backup de dict.txt et score.json, si ces dernier n'existe pas
if (!fs.existsSync('./dict.txt' && './score.json')) {
  console.log(chalk.red(`Error: dict.txt or score.json does not exist`))
  process.exit(1)
} /*else if (fs.existsSync('./dict.bak' && './score.bak')) {

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
}*/


// initialisation du score, du nombre de party et du compteur d'essai global
let score = 0
let partyLeft = 3

// randomisation du mots a chercher
const starGame = () => {
  const words = fs.readFileSync('./dict.txt', 'utf-8').toString().split('\n')
  const n = randomInt(0, words.length)
  const wordsRan = words[n]
  // nb de caracter du mot
  let wordsCrtNb = wordsRan.length


  // nb d'essai du joueur et du status du pendu
  let plyrTry = 9
  let hang = 0
  // initialisation du compteur de mot trouver
  let count = 0

  //initialisation de la boucle
  let turnoff = false

  //passage des caracteres du mot en tableau
  let tabCaraWord = wordsRan.split('')
  let emptTab = []
  for (let i = 0; i < tabCaraWord.length; i++) {
    emptTab.push('_')
  }



  // boucle du jeu
  while (turnoff = true) {
    console.log(chalk.yellowBright(`Partie ${partyLeft}/3\n\n`))
    console.log(chalk.red(hangmanPic[hang]))
    console.log(chalk.whiteBright(`\n\nS'aura tu deviner le mot masquer ?\n${emptTab}\nIl te reste${chalk.yellow(` ${plyrTry} `)}essais.    Score: ${chalk.magentaBright(`${score}`)} Points.\n`))
    const plyerEnt = readlineSync.keyIn(chalk.blue('Choisi une lettre (touche 0 pour quitter le jeu):', { limit: ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n', '0'] })).toUpperCase()

    //verification si la touche '0' est appuyer pour quiter le jeu
    if (plyerEnt === '0') {
      console.log(chalk.cyanBright.bold('GAME OVER'))
      process.exit(1)
    }

    //verification de lettre entrer par le joueur par rapport à ceux du mot secret
    //et remplacement des '_' par les lettre trouver au index coresspondant à ces derniers
    // incrementation du compteur et du score si la lettre est correcte, sinon decompte d'un essai
    if (tabCaraWord.includes(plyerEnt)) {
      console.log(chalk.greenBright(`La lettre ${plyerEnt} est bien dans le mot masquer.`))
      for (let i = 0; i < tabCaraWord.length; i++) {
        if (plyerEnt === tabCaraWord[i]) {
          if (emptTab[i] === tabCaraWord[i]) {

          } else {
            emptTab[i] = plyerEnt
            ++count
            score += 10
          }
        }
      }
    } else {
      console.log(chalk.red(`La lettre ${plyerEnt} n'est pas dans le mot masquer.`))
      plyrTry--
      hang++
    }
    //console.log(`tableu vide du mot secret: ${emptTab}`)

    // partie choix fin de jeu et entrer son nom pour le high score
    const endGame = () => {
      if (partyLeft > 1) {// tant que le nombre de partie est superieur a 1 il continue
        partyLeft--
        starGame()
      } else //mettre en place la comparaison du high score
      /*if(score > this.score){
        const enterNam = readlineSync.question(chalk.cyan(`Entrer votre nom`))
        }*/if (readlineSync.keyInYN(chalk.blue('Recommancer ?'))) {
          score = 0
          let cont1 = fs.readFileSync('./score.json', 'utf-8')
          fs.writeFileSync('./score.bak', `${cont1}`)
          starGame()
        } else {
          let cont2 = fs.readFileSync('./score.json', 'utf-8')
          fs.writeFileSync('./score.bak', `${cont2}`)
          console.log(chalk.cyanBright.bold('GAME OVER'))
          process.exit(1)
        }
    }

    //vérification si ne compteur de lettre trouver est bien egale a ceux du mot secret
    // si c'est le cas, calcul du score final et affichage du mot, du nombre d'essai utiliser et du score du joueur
    //proposition de recommencer la partie
    if (wordsCrtNb === count) {
      score = score + 40 + (plyrTry * 5)
      console.log(chalk.greenBright(`Bravo, vous avez trouvez. le mot etait bien ${wordsRan}.\nVous avez trouver en utilisant ${Math.abs(plyrTry - 9)} essais.\nVotre score est de ${score} Points.`)), endGame()
    } else if (plyrTry === 0) {
      console.log(chalk.red(`\n\n${hangmanPic[9]}\n`))
      console.log(chalk.redBright(`Pas de chance. le mot etait ${wordsRan}.\nVotre score est de ${score} points.`)), endGame()
    }
  }

}
starGame()