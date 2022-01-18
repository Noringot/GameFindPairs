(() => {
    const CARDS_NUM = 16;
    const CARD_SIZE = 100;
    const CARD_COLOR = '#000';
    const CARD_SPACE = 30;
    const TIME = 10;
    const WRAP_WIDTH = (CARDS_NUM * CARD_SIZE / 4) + CARD_SPACE;

    function createWrapperCards() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper')
        wrapper.style.cssText = `
            width: ${WRAP_WIDTH}px;
            height: ${WRAP_WIDTH}px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        `;
        return wrapper
    }

    function createCards() {
        const cards = [];

        for(let i = 0; i < CARDS_NUM; i++){
            const card = document.createElement('div');

            card.classList.add('card');
            card.dataset.open = '0';
            card.style.cssText = `
                color: #000;
                font-family: Poppins;
                font-size: 30px;
                background-color:${CARD_COLOR}; 
                width: ${CARD_SIZE}px; 
                height: ${CARD_SIZE}px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                user-select: none;`;

            cards.push(card);
        }
        return cards;
    }

    function generateArrayNumToCards() {
        const arr = [];
        for(let i = 1; i <= CARDS_NUM; i++){
            if(i > 8) {
                arr.push(i - 8);
            }else {
                arr.push(i);
            }
        }
        const res = swapNumArrayCards(arr);
        return res;
    }

    function swapNumArrayCards(array) {
        for(let i = array.length - 1; i >= 0; i--){
            let k = Math.round(Math.random() * i);
            let m = array[i];
            array[i] = array[k];
            array[k] = m;
        }
        return array
    }

    function toOpenCard(card) {
        card.dataset.open = '1';
        card.style.color = '#FFF';
        return card;
    }

    function toCloseCard(card) {
        card.dataset.open = '0';
        card.style.color = '#000';
        return card;
    }

    function restartGame(wrap) {
        wrap.remove();
        initializeGame();
    }

    function createButtonRestart(wrap) {
        const button = document.createElement('button');
        button.textContent = 'RESTART MAZAFACKA';
        button.style.cssText = `
            position: absolute;
            top: 10px;
            left: 20px;
        `;
        button.addEventListener('click', () => {
            restartGame(wrap);
        })
        return button
    }

    function startScreen() {
        const button = document.createElement('button');
        button.textContent = 'START';
        button.addEventListener('click', () => {
            initializeGame();
            button.remove();
        })
        return button
    }

    function createTimer(time) {
        const block = document.createElement('div');

        block.textContent = time;
        block.style.cssText = `
            position: absolute;
            left: 50%;
            top: 20px;
            transform: translateX(-50%);
        `
        let timer = setInterval(() => {
            block.textContent -= 1;
            if(block.textContent <= 0) clearInterval(timer)
        }, 1000)
        return block
    }

    function initializeGame() {
        const wrapperCards = createWrapperCards();
        const cards = createCards();
        const arrNumCards = generateArrayNumToCards();
        const timer = createTimer(TIME);
        let endGame = CARDS_NUM / 2;
        let openCards = [];
        let maxOpen = 2;


        document.body.append(wrapperCards);
        document.body.append(timer);

        cards.forEach((card, i) => {
            wrapperCards.append(card);
            card.textContent = arrNumCards[i]
        })

        wrapperCards.addEventListener('click', event => {
            const target = event.target;
            if(target.className === 'card' && openCards.length < maxOpen) {
                toOpenCard(target);
                openCards.push(target);
            }
            if(openCards.length === maxOpen && openCards[0].textContent === openCards[1].textContent){
                openCards = [];
                --endGame;
            }else if(openCards.length === maxOpen && openCards[0].textContent !== openCards[1].textContent){
                setTimeout(() => {
                    openCards.forEach(item => {
                        toCloseCard(item)
                    })
                    openCards = [];
                }, 300)
            }
            if(!endGame) {
                console.log('End game');
                wrapperCards.append(createButtonRestart(wrapperCards));
            }
        })
    }

    document.addEventListener('DOMContentLoaded', () => {
        const startButton = startScreen();
        document.body.append(startButton)
    })
})();