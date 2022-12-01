// Consegna
// ! Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// ! Attenzione: Nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// ! In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// ? Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// ! La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// todo Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

//===============================================================//
//===========================FUNZIONI============================//
//===============================================================//

function getNewElement(parentElement, element) {
    const newElement = document.createElement(element);
    parentElement.append(newElement);
    return newElement;
    }

// function getNewSquareElement(content,levelClass) {
//     let newSquare = getNewElement(gridElement, 'div');
//     let newP = getNewElement(newSquare, 'p');
//     newSquare.classList.add('d-flex', levelClass);

//     newSquare.addEventListener('click', function(){
//         newSquare.classList.toggle('active');
//         console.error(`Hai cliccato la cella ${content}`);
//     })
//     return newSquare;
// }

function getRandomNumber(numMin, numMax) {
    return Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;;
}
//===============================================================//
//===============================================================//
//===============================================================//

const mainElement = document.querySelector('main');
const asideElement = document.querySelector('aside');
const buttonElement = document.querySelector('button.btn-color');

let gridElement = getNewElement(mainElement, 'div');
gridElement.classList.add('d-flex','flex-wrap', 'grid');


buttonElement.addEventListener('click', function(){
    let gameOver = false;
    gridElement.innerHTML = "";
    asideElement.innerHTML= "";

    let pointCounter = 0;
    const counterElement = getNewElement(asideElement,'span')

    const bombList = [];
    while (bombList.length < 16) {
        let randomicNumber = getRandomNumber(1, 100);
        if (!bombList.includes(randomicNumber)) {
            bombList.push(randomicNumber);
        }
    }
    console.warn('Le bombe sono nella posizione: ' + bombList);

    for (let index = 1; index <= 100; index++) {
        let newSquare = getNewElement(gridElement, 'div');
        newSquare.classList.add('d-flex', 'square');
    
        newSquare.addEventListener('click', function(){
            if (gameOver){
                return;
            }
            newSquare.classList.toggle('active');
            console.error(`Hai cliccato la cella ${index}`);

            if (bombList.includes(index)) {
                alert('You Lose!')
                gameOver = true;
                newSquare.classList.add('lose');
                counterElement.innerHTML = `GAME OVER - FINAL SCORE: ${pointCounter}`;
            }
            
            if (!gameOver){
                pointCounter++;
                counterElement.innerHTML = `SCORE: ${pointCounter}`;
                
                if (pointCounter == 100 - bombList.length) {
                    gameOver = true;
                    alert('CONTRATULATION! You win!');
                    return newSquare
                }
            }
            
        }, {once :true})
    }
})


