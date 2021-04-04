const fs = require('fs')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
const { randomInt } = require('crypto')


// initialisation du score, du nombre de party et du compteur d'essai global
let score = 0
let partyLeft = 3
//let plyrTryCnt = 0
// randomisation du mots a chercher
const starGame = () => {
  const words = fs.readFileSync('./dict.txt', 'utf-8').toString().split('\n')
  const n = randomInt(0, words.length)
  console.log(`random words: ${words[n]}`)
  const wordsRan = words[n]
  // nb de caracter du mot
  let wordsCrtNb = wordsRan.length
  //console.log(wordsCrtNb)

  // nb d'essai du joueur
  let plyrTry = 9
  //let plyrTryCnt = 0
  // initialisation du compteur de mot trouver
  let count = 0

  //passage des caracteres du mot en tableau
  let tabCaraWord = wordsRan.split('')
  let emptTab = []
  for (let i = 0; i < tabCaraWord.length; i++) {
    emptTab.push('_')
  }


  console.log(tabCaraWord)
  //initialisation de la boucle
  let turnoff = false
  // boucle du jeu
  while (turnoff = true) {
    console.log(chalk.yellowBright(`Partie ${partyLeft}/3`))
    const plyerEnt = readlineSync.question(chalk.blue(`\nQuelle est le mot secret ?\n${emptTab}\nIl te reste ${plyrTry} essais.    Score: ${score} Points.\nChoisi une lettre :`)).toUpperCase()
    console.log(chalk.blue(``))
    console.log(plyerEnt)

    //verification de lettre entrer par le joueur par rapport à ceux du mot secret
    //et remplacement des '_' par les lettre trouver au index coresspondant à ces derniers
    // incrementation du compteur et du score si la lettre est correcte, sinon decompte d'un essai
    /*tabCaraWord.forEach(elem => {
      if (plyerEnt === elem) {
        console.log(`index ${tabCaraWord.indexOf(elem)}`)
        emptTab.splice(tabCaraWord.indexOf(elem), 1, plyerEnt)
        ++count
        score += 10
        //plyrTry++
      }

    });*/
    for (let i = 0; i < tabCaraWord.length; i++) {
      if (plyerEnt === tabCaraWord[i]) {
        console.log(`ttt ${tabCaraWord[i]}`)
        console.log(`index ${tabCaraWord.indexOf(plyerEnt)}`)
        if (emptTab[i] === tabCaraWord[i]) {

        } else {
          emptTab.splice(tabCaraWord.indexOf(plyerEnt), 1, plyerEnt)
          ++count
          score += 10
        }
      }
      //i++
    }
    console.log(`compteur ${count}`)
    //console.log(tabCaraWord)
    //console.log(wordsCrtNb)
    console.log(`tableu vide du mot secret: ${emptTab}`)
    // partie choix fin de jeu et entrer son nom pour le high score
    const endGame = () => {

      if (partyLeft > 0) {
        //plyrTryCnt += plyrTry - count
        partyLeft--
        starGame()
      } else //mettre en place la comparaison du high score
      /*if(score > this.score){
        const enterNam = readlineSync.question(chalk.cyan(`Entrer votre nom`))
        }*/if (readlineSync.keyInYN(chalk.blue('Recommancer ?'))) {
          score = 0
          starGame()
        } else {
          console.log(chalk.cyanBright.bold('GAME OVER'))
          turnoff = true
        }
    }
    //console.log(indexCar.length)
    //vérification si ne compteur de lettre trouver est bien egale a ceux du mot secret
    // si c'est le cas, calcul du score final et affichage du mot, du nombre d'essai utiliser et du score du joueur
    //proposition de recommencer la partie
    if (wordsCrtNb === count) {
      plyrTry = plyrTry + count
      score = score + 40 + (plyrTry * 5)
      console.log(plyrTry)
      console.log(count)
      return console.log(chalk.greenBright(`Bravo, vous avez trouvez. le mot etait bien ${wordsRan}.\nVous avez trouver en utilisant ${Math.abs(plyrTry - 9)} essais.\nVotre score est de ${score} Points.`)), endGame()
    } else if (plyrTry === 0) {
      return console.log(chalk.greenBright(`Pas de chance. le mot etait ${wordsRan}.\nVotre score est de ${score} points.`)), endGame()
    }
    plyrTry--

  }

}
starGame()
//console.log(affi)


//console.log(emptTab)
//console.log(wordsCrtNb)
//console.log(plyrTry)