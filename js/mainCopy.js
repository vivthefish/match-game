const cardsArray = [
    {
        name: 'chopsticks',
        img: 'img/chopsticks.svg',
        color: '#55c3ba',
        selected: false
    },
    {
        name: 'lotus',
        img: 'img/lotus.svg',
        color: '#fff9b1',
        selected: false
    },
    {
        name: 'monkey',
        img: 'img/monkey.svg',
        color: '#3a4eb1',
        selected: false
    },    
    {
        name: 'koi',
        img: 'img/koi.svg',
        color: '#4964e9',
        selected: false
    },    
    {
        name: 'tea',
        img: 'img/tea.svg',
        color: '#d8d4cb',
        selected: false
    },    
    {
        name: 'rice',
        img: 'img/rice.svg',
        color: '#d7dff2',
        selected: false
    },
    {
        name: 'salmon sushi',
        img: 'img/salmon-sushi.svg',
        color: 'beige',
        selected: false
    },
    {
        name: 'edamame',
        img: 'img/edamame.svg',
        color: '#f4dacd',
        selected: false
    },
    {
        name: 'uramaki',
        img: 'img/uramaki.svg',
        color: '#338c81',
        selected: false
    },
    {
        name: 'dumpling',
        img: 'img/dumpling.svg',
        color: '#f67a82',
        selected: false
    },
    {
        name: 'onigiri',
        img: 'img/onigiri.svg',
        color: 'lemonchiffon',
        selected: false
    },
    {
        name: 'maki',
        img: 'img/maki.svg',
        color: 'whitesmoke',
        selected: false
    },
    {
        name: 'chopsticks',
        img: 'img/chopsticks.svg',
        color: '#55c3ba',
        selected: false
    },
    {
        name: 'lotus',
        img: 'img/lotus.svg',
        color: '#fff9b1',
        selected: false
    },
    {
        name: 'monkey',
        img: 'img/monkey.svg',
        color: '#3a4eb1',
        selected: false
    },    
    {
        name: 'koi',
        img: 'img/koi.svg',
        color: '#4964e9',
        selected: false
    },    
    {
        name: 'tea',
        img: 'img/tea.svg',
        color: '#d8d4cb',
        selected: false
    },    
    {
        name: 'rice',
        img: 'img/rice.svg',
        color: '#d7dff2',
        selected: false
    },
    {
        name: 'salmon sushi',
        img: 'img/salmon-sushi.svg',
        color: 'beige',
        selected: false
    },
    {
        name: 'edamame',
        img: 'img/edamame.svg',
        color: '#f4dacd',
        selected: false
    },
    {
        name: 'uramaki',
        img: 'img/uramaki.svg',
        color: '#338c81',
        selected: false
    },
    {
        name: 'dumpling',
        img: 'img/dumpling.svg',
        color: '#f67a82',
        selected: false
    },
    {
        name: 'onigiri',
        img: 'img/onigiri.svg',
        color: 'lemonchiffon',
        selected: false
    },
    {
        name: 'maki',
        img: 'img/maki.svg',
        color: 'whitesmoke',
        selected: false
    }
];
let vm = new Vue({
    el: "#app",
    data: {
        started: false,
        won: false,
        gameGrid: document.querySelector('.game-grid'),
        cards: cardsArray,
        dupCards: undefined,
        count: 0,
        firstGuess: '',
        secondGuess: '',
        previousTarget: null,
        delay: 1000,
        output: undefined,
        time: '00:00',
        ms: 0,
        sec: 0,
        min: 0,
        t: undefined,
        timeStart: false,
    },
    created() {
        // mix up array
        this.dupCards = this.shuffle(this.cards);
        // this.dupCards.map((x, index) => {
        //     x.id = index;
        //     console.log(x.id);
        // });
        //this.render();
    },
    computed: {
        // cardSelected() {
        //     return {
        //         selected: (this.selected && this.index ==)
        //     }
        // }
    },
    methods: {
        // hide intro screen once they start the game
        afterIntro: function (el) {
            document.querySelector('#intro-screen').classList.add('d-none');
        },
        add() {
            this.ms++;
            if (this.ms >= 100) {
                this.ms = 0;
                this.sec++;
                if (this.sec >= 60) {
                    this.sec = 0;
                    this.min++;
                }
            }
            this.time = `
                ${(this.min ? (this.min > 9 ? this.min : "0" + this.min) : "00")}:${(this.sec ? (this.sec > 9 ? this.sec : "0" + this.sec) : "00")}
            `
            // to add ms: (this.ms > 9 ? this.ms : "0" + this.ms)
            this.timer();
        },
        timer() {
            //this.t = setTimeout(add, 10);
            this.t = setTimeout(()=>{ vm.add() }, 10);
        },
        stopTime() {
            clearTimeout(vm.t);
            this.timeStart = false;
        },
        clearTime() {
            this.time = "00:00";
            this.ms = 0;
            this.sec = 0;
            this.min = 0;
        },


        cardBeforeEnter: function (el) {
            el.style.opacity = 0
            el.style.transform = "scale(0)"
            console.log('card before enter');
            },
        cardEnter: function (el, done) {
            var enterDelay = el.dataset.index * 50
            setTimeout(function () {
                console.log('card-enter');
                el.style.opacity = 1
                el.style.transform = "scale(1)"
                //el.style.height = 0
                // Velocity(
                //     el,
                //     { opacity: 1, height: '1.6em' },
                //     { complete: done }
                // )
            }, enterDelay)
        },
        // cardLeave: function (el, done) {
        //     var delay = el.dataset.index * 0.5
        //     setTimeout(function () {
        //         Velocity(
        //         el,
        //         { opacity: 0, height: 0 },
        //         { complete: done }
        //         )
        //     }, delay)
        // },


        shuffle(array) {
            return _.shuffle(array);
        }, 
        clickCard(e) {
            // start timer for first pick
            if(!this.timeStart){
                this.timeStart = true;
                this.timer();
            }

            // The event target is our clicked item
            let clicked = e.target.parentNode;

            // Do not allow the grid section itself to be selected; only select divs inside the grid
            if (clicked.nodeName === 'SECTION' || clicked === this.previousTarget || clicked.classList.contains('match')) { return; }

            // Only allow 2 selected at a time
            if (this.count < 2) {
                this.count++;

                // if first guess
                if(this.count === 1) {
                    this.firstGuess = clicked.dataset.name;
                } else {
                    this.secondGuess = clicked.dataset.name;
                }
                // Add selected class
                this.dupCards[clicked.dataset.index].selected = true;

                // clicked.classList.add('selected');
                // console.log(clicked);
                if(this.firstGuess !== '' && this.secondGuess !== '') {

                    if (this.firstGuess === this.secondGuess) {
                        // run match function
                        setTimeout(()=>{ vm.match() }, vm.delay);
                        setTimeout(()=>{ vm.reset() }, vm.delay+800);

                        let unmatched = document.querySelectorAll('.cart:not(.match)');

                        if(unmatched.length<3) {
                            setTimeout(()=>{ vm.wonGame() }, 1000);
                        }

                    } else {
                        setTimeout(()=>{ vm.reset() }, vm.delay);
                    }
                }
                // Set previous target to clicked  
                this.previousTarget = clicked;
              }
            
        },
        // Add match CSS
        match() {
            let selected = document.querySelectorAll('.selected');
            selected.forEach(card => {
                card.classList.add('match');
            });
        },
        // Reset guesses
        reset() {
            this.firstGuess = '';
            this.secondGuess = '';
            this.count = 0;
            this.previousTarget = null;
          
            let selected = document.querySelectorAll('.selected');
            selected.forEach(card => {
              card.classList.remove('selected');
            });
        },
        resetGame() {
            if(this.won) {
                this.won = false;
                document.querySelector('#win-screen').classList.add('d-none');
            }
            this.reset();
            let matched = document.querySelectorAll('.match');
            matched.forEach(x => {
                x.classList.remove('match');
            });

            // mix up array
            this.dupCards = this.shuffle(this.dupCards);
            // rerender
            this.render();
            // reset clock
            this.stopTime();
            this.clearTime();
        },
        wonGame() {
            document.querySelector('#win-screen').classList.remove('d-none');
            this.won = true;
            this.stopTime();
        }
        // render() {
        //     // map cards array
        //     this.output = this.dupCards.map( (x, index) => `
        //     <div class="cart" data-name="${this.dupCards[index].name}" >
        //     <div class="back"></div>
        //     <div class="front" style="background: url(${this.dupCards[index].img}), ${this.dupCards[index].color}" ></div>
        //     </div>`).join("");
        // }
    }
});
