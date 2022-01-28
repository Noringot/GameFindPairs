(() => {
    const options = {
        ROW: 2,
        COLUMN: 2,
        CARD_SIZE: 100,
        CARD_SPACE: 10,
        TIME: 60,
        CARDS_NUM: function () {
            return this.ROW * this.COLUMN;
        },
        WRAP_WIDTH: function () {
            return this.ROW * this.CARD_SIZE + (this.ROW - 1) * this.CARD_SPACE
        },
        WRAP_HEIGHT: function () {
            return this.COLUMN * this.CARD_SIZE + (this.COLUMN - 1) * this.CARD_SPACE
        }
    }

    function createWrapperCards() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper')
        wrapper.style.width = `${options.WRAP_WIDTH()}px`;
        wrapper.style.height = `${options.WRAP_HEIGHT()}px`;
        return wrapper
    }

    function createCards() {
        const cards = [];
        for(let i = 0; i < options.CARDS_NUM(); i++){
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.open = '0';
            card.style.width = `${options.CARD_SIZE}px`;
            card.style.height = `${options.CARD_SIZE}px`;
            cards.push(card);
        }
        return cards;
    }

    function generateArrayNumToCards() {
        const arr = [];
        for(let i = 1; i <= options.CARDS_NUM(); i++){
            arr.push(Math.ceil(i / 2));
        }
        console.log(arr)
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

    function createButton(title) {
        const button = document.createElement('button');
        button.textContent = title.toUpperCase();
        button.classList.add(`button__${title}`, 'button');
        button.style.height = `80px`;
        button.style.width = `600px`;

        const x = Math.round(window.outerHeight - (document.body.clientHeight) / 4);
        button.style.top = `${x}px`;

        return button
    }

    function createStartInput(labelTitle) {
        const inputGroup = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');

        inputGroup.classList.add('input__group');
        label.classList.add('label');
        input.classList.add('input');

        inputGroup.append(label);
        inputGroup.append(input);

        label.textContent = `${labelTitle} :`;
        return {
            inputGroup,
            label,
            input
        };
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

    function restartGame() {
        [...document.body.children].forEach(child => child.remove())
        startScreen();
    }

    function startScreen() {
        const startBlock = document.createElement('div');
        const startButton = createButton('start');
        const rowInput = createStartInput('ROW');
        const columnInput = createStartInput('COLUMN');

        startBlock.classList.add('start__block');

        document.body.append(startButton);
        document.body.append(startBlock);
        startBlock.append(rowInput.inputGroup);
        startBlock.append(columnInput.inputGroup);

        startButton.addEventListener('click', () => {
            [...document.body.children].forEach(child => child.remove())
            initializeGame(rowInput.input.value, columnInput.input.value);
        })
    }

    function initializeGame(row, col) {
        if(row >= 2 && row <= 10) options.ROW = row;
        if(col >= 2 && col <= 10) options.COLUMN = col;

        const wrapperCards = createWrapperCards();
        const cards = createCards();
        const arrNumCards = generateArrayNumToCards();
        const restartButton = createButton('restart');

        let endGame = options.CARDS_NUM() / 2;
        let openCards = [];
        let maxOpen = 2;

        document.body.append(wrapperCards);
        document.body.append(createTimer(options.TIME))
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