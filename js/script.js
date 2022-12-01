// Consegna
// ! Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// ! Attenzione: Nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// ! In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// ? Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// ! La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// todo Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// ?Consigli del giorno:
// ?Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi. Ad esempio: Di cosa ho bisogno per generare i numeri?
// ?Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// ?Le validazioni e i controlli possiamo farli anche in un secondo momento.

//===============================================================//
//===========================FUNZIONI============================//
//===============================================================//

function getNewElement(parentElement, element) {
    const newElement = document.createElement(element);
    parentElement.append(newElement);
    return newElement;
    }

function getNewSquareElement(content,levelClass) {
    let newSquare = getNewElement(gridElement, 'div');
    let newP = getNewElement(newSquare, 'p');
    newSquare.classList.add('d-flex', levelClass);

    newSquare.addEventListener('click', function(){
        newSquare.classList.toggle('active');
        console.error(`Hai cliccato la cella ${content}`);
    })
    return newSquare;
}

function getRandomNumber(numMin, numMax) {
    return Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;;
}
//===============================================================//
//===============================================================//
//===============================================================//

const mainElement = document.querySelector('main');
const asideElement = document.querySelector('aside');
const buttonEasyElement = document.querySelector('button.btn-success');
const buttonMidElement = document.querySelector('button.btn-warning');
const buttonHardElement = document.querySelector('button.btn-danger');

let gridElement = getNewElement(mainElement, 'div');
gridElement.classList.add('d-flex','flex-wrap', 'grid');

buttonEasyElement.addEventListener('click', function(){
    gridElement.innerHTML = "";
    for (let index = 1; index <= 49; index++) {
        let squareElement = getNewSquareElement(index,'square-easy');
    }
})

buttonMidElement.addEventListener('click', function(){
    gridElement.innerHTML = "";
    for (let index = 1; index <= 64; index++) {
        let squareElement = getNewSquareElement(index,'square-normal');
    }
})

buttonHardElement.addEventListener('click', function(){
    gridElement.innerHTML = "";
    asideElement.innerHTML= "";

    let pointCounter = 0;
    const counterElement = getNewElement(asideElement,'p')
    let gameOver = false;

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
        newSquare.classList.add('d-flex', 'square-hard');
    
        newSquare.addEventListener('click', function(){
            newSquare.classList.toggle('active');
            console.error(`Hai cliccato la cella ${index}`);

            if (bombList.includes(index)) {
                alert('You Lose!')
                gameOver = true;
                newSquare.classList.add('active-lose');
            }
            
            if (!gameOver){
                pointCounter++;
                counterElement.innerHTML= `PUNTI: ${pointCounter}`;
                
                if (pointCounter == 100 - bombList.length) {
                    gameOver = true;
                    alert('CONTRATULATION! You win!');
                }
            }

        })
    }
})


