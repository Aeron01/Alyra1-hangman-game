const fs = require('fs')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
const { randomInt } = require('crypto')
const { hangmanPic } = require('./affichage')

//definition du fichier high Score
let highScore = fs.readFileSync(`./score.json`)
let data = JSON.parse(highScore)
// initialisation du score, du nombre de party et du compteur d'essai global
let score = 0
let partyLeft = 3


//lancement du jeu

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
    console.log(chalk.whiteBright(`\nSaura tu deviner le mot masqué de ${chalk.cyanBright(wordsCrtNb)} caractères ?\n${emptTab.join().split(',').join(' ')}\nIl te reste${chalk.yellow(` ${plyrTry} `)}essais.    Score: ${chalk.magentaBright(`${score}`)} Points.\n`))
    const plyerEnt = readlineSync.keyIn('Choisi une lettre (touche 0 ou shift+0 pour quitter le jeu):', { limit: ['$<a-z>', '0'] }).toUpperCase()

    //verification si la touche '0' est appuyer pour quiter le jeu
    if (plyerEnt === '0') {
      console.log(chalk.cyanBright.bold('GAME OVER'))
      process.exit(1)
    }

    //verification de lettre entrer par le joueur par rapport à ceux du mot secret
    //et remplacement des '_' par les lettre trouver au index coresspondant à ces derniers
    // incrementation du compteur et du score si la lettre est correcte, sinon decompte d'un essai
    if (tabCaraWord.includes(plyerEnt)) {
      console.log(chalk.greenBright(`La lettre ${plyerEnt} est bien dans le mot masqué.`))
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
      console.log(chalk.red(`La lettre ${plyerEnt} n'est pas dans le mot masqué.`))
      plyrTry--
      hang++
    }

    // choix fin de jeu ou contine 
    const endGame = () => {
      if (partyLeft > 1) { // tant que le nombre de partie est superieur a 1 il continue
        partyLeft--
        starGame()
      } else {
        for (let i = 0; i < 10; i++) {
          if (data.top[i].score < score) {
            console.log(`Vous avez battue le score de ${data.top[i].score} points du N°${data.top[i].position}, ${data.top[i].name} ${data.top[i].position}`)
            // demande du nom du joueur pour le sauvgarder dans le High Score
            //remplacement du score battue par le score du joueur
            // et sauvegarde dans le fichier JSON
            const enterNam = readlineSync.question(chalk.cyan(`Entrer votre nom : `))
            data.top[i].name = enterNam
            data.top[i].score = score
            let dataScore = JSON.stringify(data)
            fs.writeFileSync('score.json', dataScore)
            break
          }
        }
      } console.log(chalk.blueBright.bold.bgRgb(255, 198, 51)('\n      HIGH SCORE      \n'))
      for (let i = 0; i < 10; i++) {
        console.log(chalk.rgb(0, 255, i * 20).bgRgb(93, 0, 12)(`   ${data.top[i].position}: ${data.top[i].name}: ${data.top[i].score} `))
      }
      if (readlineSync.keyInYN(chalk.blue('Recommancer ?'))) {
        score = 0
        //fait le backup du fichier high score
        let cont1 = fs.readFileSync('./score.json', 'utf-8')
        fs.writeFileSync('./score.bak', `${cont1}`)
        starGame()
      } else {
        console.log(chalk.cyanBright.bold('GAME OVER'))
        process.exit(1)
      }

    }

    //vérification si le compteur de lettre trouver est bien egale a ceux du mot secret
    // si c'est le cas, calcul du score final et affichage du mot, du nombre d'essai utiliser et du score du joueur
    //proposition de recommencer la partie
    if (wordsCrtNb === count) {
      score = score + 40 + (plyrTry * 5) //40 représente un bonus pour avoir trouver le mot et un bonus supplémentaire de 5 point par essai restant
      console.log(chalk.greenBright(`\n${emptTab.join().split(',').join(' ')}\nBravo, vous avez trouver ! Le mot était bien ${wordsRan}.\nVous avez trouver en utilisant ${Math.abs(plyrTry - 9)} essais.\nVotre score est de ${score} Points.`)), endGame()
    } else if (plyrTry === 0) {
      console.log(chalk.red(`\n\n${hangmanPic[9]}\n`))
      console.log(chalk.redBright(`Pas de chance. Le mot était ${wordsRan}.\nVotre score est de ${score} points.`)), endGame()
    }
  }
}

exports.starGame = starGame