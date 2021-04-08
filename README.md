# Jeu du pendu (test)

- Procédure de lancement du jeu :
- tapez dans le terminal : node hangman.js

# <---la partie suivante sera implémenter plus tard.--->
- Si les fichiers dict.txt, main.js, hangman.js ou score.json apparaissent manquant, tapez dans le terminal : node check.js
et il recrera ces fichiers.

- Si le fichier check.js n'existe plus, verifier si ce dernier n'existe pas en check.bak
dans ce cas renomer simplement le fichier check.bak en check.js.
- Si le fichier .bak est absent... ont ne peut plus rien faire.

======================================================================

======================================================================
# Hangman game

- Interaction avec l'utilisateur: `readline-sync`
- game loop il va falloir boucler
- un dictionnaire (_dict.txt_), avec mots ligne par ligne. Pour lire `readFileSync`.
- random pour récup un mot au hasard:

```js
// Synchronous
const { randomInt } = require('crypto')

const words = ['coucou', 'toto', 'tata', 'coco']

const n = randomInt(0, words.length)
console.log(`random words: ${words[n]}`)
```

- compter points / tentatives? (dessiner en asccii un pendu: https://gist.github.com/chrishorton/8510732aa9a80a03c829b09f12e20d9c)
- comparer la lettre en upperCase ou lowerCase
- jolie interface: chalk
- Optionnel fichier de high scores:
  _score.json_

```json
{
  "Alice": 100
}
```

- check l'accès aux fichiers, check les données entrées par l'utilisateur.
- une phase d'initialisation du jeu ?? : (check, recup l'high Score)
- Optionnel: utilisation d'une classe ?

```js
class Game {
  run() {}
}
game.run()
```

- programme modulaire: modules!!!! (exports / require)

- affichage du mot en cours à découvrir sous ce format "\_ \_ \_ \_ \_ \_ \_ \_"