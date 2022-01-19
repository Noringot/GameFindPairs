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
        wrapper.style.width = `${WRAP_WIDTH}px`;
        wrapper.style.height = `${WRAP_WIDTH}px`;
        return wrapper
    }

    function createCards() {
        const cards = [];
        for(let i = 0; i < CARDS_NUM; i++){
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.open = '0';
            card.style.width = `${CARD_SIZE}px`;
            card.style.height = `${CARD_SIZE}px`;
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
        return swapNumArrayCards(arr);
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
        card.style.color = '#000';
        return card;
    }

    function toCloseCard(card) {
        card.dataset.open = '0';
        card.style.color = '#32E44F';
        return card;
    }

    function restartGame() {
        [...document.body.children].forEach(child => child.remove())
        startScreen();
    }

    function createButton(title) {
        const button = document.createElement('button');
        const x = Math.round(document.body.clientHeight - (document.body.clientHeight - WRAP_WIDTH) / 3);

        button.textContent = title.toUpperCase();
        button.classList.add(`button__${title}`, 'button');
        button.style.top = `${x}px`;

        return button
    }

    function startScreen() {
        const startBlock = document.createElement('div');
        const startButton = createButton('start');
        const rowInput = createInputGroup('ROW');
        const columnInput = createInputGroup('COLUMN');

        startBlock.classList.add('start__block');

        document.body.append(startButton);
        document.body.append(startBlock);
        startBlock.append(rowInput);
        startBlock.append(columnInput);

        startButton.addEventListener('click', () => {
            [...document.body.children].forEach(child => child.remove())
            initializeGame();
        })
    }

    function createInputGroup(labelTitle) {
        const inputGroup = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');

        inputGroup.classList.add('input__group');
        label.classList.add('label');
        input.classList.add('input');

        inputGroup.append(label);
        inputGroup.append(input);

        label.textContent = `${labelTitle} :`;
        return inputGroup;
    }

    function createTimer(time) {
        const block = document.createElement('div');
        block.textContent = time;
        block.classList.add('timer');
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
        const restartButton = createButton('restart');
        const timer = createTimer(TIME);

        let endGame = CARDS_NUM / 2;
        let openCards = [];
        let maxOpen = 2;

        document.body.append(wrapperCards);

        cards.forEach((card, i) => {
            wrapperCards.append(card);
            card.textContent = arrNumCards[i]
        })

        restartButton.addEventListener('click', () => {
            restartGame(wrapperCards);
        })

        wrapperCards.addEventListener('click', event => {
            const target = event.target;
            if(target.className === 'card' &&
                openCards.length < maxOpen &&
                !+target.dataset.open) {
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
                wrapperCards.append(restartButton);
            }
        })
    }

    document.addEventListener('DOMContentLoaded', startScreen)
})();