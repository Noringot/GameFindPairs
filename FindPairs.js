(() => {
    const CARDS_NUM = 16;
    const CARD_SIZE = 100;
    const CARD_COLOR = '#000';
    const CARD_SPACE = 30;
    const WRAP_WIDTH = (CARDS_NUM * CARD_SIZE / 4) + CARD_SPACE;

    function createWrapperCards() {
        const wrapper = document.createElement('div');
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
            k = Math.round(Math.random() * i);
            m = array[i];
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

    document.addEventListener('DOMContentLoaded', () => {
        const wrapperCards = createWrapperCards();
        const cards = createCards();
        const arrNumCards = generateArrayNumToCards();
        let openCards = [];

        document.body.append(wrapperCards);

        cards.forEach((card, i) => {
            wrapperCards.append(card);
            card.textContent = arrNumCards[i]
        })

        wrapperCards.addEventListener('click', event => {
            const target = event.target;
            if(target.className === 'card'
                && (openCards.length < 2)
                && (target.dataset.open !== '1')) {
                toOpenCard(target);
                openCards.push(target)
            }
            if(openCards.length === 2){
                const state = openCards[0].textContent === openCards[1].textContent;
                setTimeout(() => {
                    if(state){
                        openCards[0].dataset.open = '2';
                        openCards[1].dataset.open = '2';
                        openCards = [];
                        console.log('You\'re is cool');
                    }else {
                        openCards = [];
                        console.log('Oh, it\'s wrong')
                        cards.forEach(item => {
                            if(item.dataset.open === '2') return
                            toCloseCard(item);
                        })
                    }
                }, 600);
            }
        })
    })
})();
