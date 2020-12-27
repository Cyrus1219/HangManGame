const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');


const words = [ 'application', 'programming','interface','wizard','gamer','toxic']

let selectedWord = words[ Math.floor(Math.random()* words.length) ]

const correctLetters = [];
const wrongLetters = [];

function displayWord(){
    console.log(selectedWord);
    wordEl.innerHTML = `    
    ${selectedWord
        .split('')
        .map(
            letter => `
                <span class="letter">
                ${correctLetters.includes(letter) ? letter:''}
                </span>
            `
        ).join('')
    }`

    console.log(selectedWord);
    
    const innerWord = wordEl.innerText.replace(/\n/g,'')

    if(innerWord === selectedWord){
        finalMessage.innerText = "Congratulations ! You Won !! "
        popup.style.display = 'flex';
    }


}


// updat wrong leter:

function updateWrongLetter(){

    wrongLettersEl.innerHTML = `
        ${ wrongLetters.length > 0 ? '<p> Wrong </p>': ''}
        ${wrongLetters.map(letter => `<span> ${letter}</span>`)}
    `;

    figureParts.forEach((part,index)=>{
        const err = wrongLetters.length;

        if(index < err){
            part.style.display = 'block'
        }else{
            part.style.display = 'none'
        }

    })

    // check if lost :

    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = " You lost bishhhh !"
        popup.style.display = 'flex'
    }



}


// show notification :
function showNotification(){
    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000);

}   



// keydown letter press :

window.addEventListener('keydown',e=>{
    if(e.keyCode >= 65 && e.keyCode <= 90){
        // console.log(e.keyCode);
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                
                displayWord()
            }
            else{
                showNotification()
            }
        }
        else{

            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
    
                updateWrongLetter();
            }else{
                showNotification()
            }
    
        }
    }

})

// restart game :
playAgainBtn.addEventListener('click',()=>{

    correctLetters.splice(0)
    wrongLetters.splice(0)

    // get a new random words
    selectedWord = words[Math.floor(Math.random()*words.length)]
    displayWord();
    updateWrongLetter()

    popup.style.display = 'none'
})

displayWord()