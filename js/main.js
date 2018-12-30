const cardsArray = [
    {
        name: 'chopsticks',
        img: '#f4dacd'
    },
    {
        name: 'lotus',
        img: '#f67a82'
    },
    {
        name: 'monkey',
        img: '#f24446'
    },    
    {
        name: 'koi',
        img: '#ffee00'
    },    
    {
        name: 'tea',
        img: '#d7dff2'
    },    
    {
        name: 'rice',
        img: '#3a4eb1'
    },
    {
        name: 'salmon sushi',
        img: '#338c81'
    },
    {
        name: 'edamame',
        img: '#55c3ba'
    },
    {
        name: 'uramaki',
        img: 'orange'
    },
    {
        name: 'dumpling',
        img: 'green'
    },
    {
        name: 'onigiri',
        img: 'limegreen'
    },
    {
        name: 'rice',
        img: 'magenta'
    },
];

// const gameGrid = document.querySelector('.game-grid');

// const output = cardsArray.map( (x, index) => `
//     <div class="cart" data-name="${x.name}">
//     <div class="back"></div>
//     <div class="front" style="background: ${x.img}" ></div>
//     </div>`).join("");

// gameGrid.innerHTML = output;

//console.log(output);

let vm = new Vue({
    el: "#app",
    data: {
        gameGrid: document.querySelector('.game-grid'),
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
        this.dupCards = this.shuffle(cardsArray.concat(cardsArray));
        this.render();
    },
    methods: {
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
                clicked.classList.add('selected');
                if(this.firstGuess !== '' && this.secondGuess !== '') {

                    if (this.firstGuess === this.secondGuess) {
                        // run match function
                        setTimeout(()=>{ vm.match() }, vm.delay);
                        //vm.match();
                        //vm.reset();
                        setTimeout(()=>{ vm.reset() }, vm.delay+800);

                        let unmatched = document.querySelectorAll('.cart:not(.match)');
                        console.log(unmatched.length);
                        //console.log(unmatched);
                        if(unmatched.length<3) {
                            console.log('you won');
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
            this.reset();
            let matched = document.querySelectorAll('.match');
            matched.forEach(x => {
                x.classList.remove('match');
            });

            // mix up array
            this.dupCards = this.shuffle(this.dupCards);
            // rerender
            this.render();
        },
        render() {
            // map cards array
            this.output = this.dupCards.map( (x, index) => `
            <div class="cart" data-name="${this.dupCards[index].name}" >
            <div class="back"></div>
            <div class="front" style="background: ${this.dupCards[index].img}" ></div>
            </div>`).join("");
        }
    }
});
