(() => {

    function randomInteger (min, max){
        let rand = min + Math.random() * (max - min);
        return Math.round(rand);
    }

    function getRandomList (num){
        let arr = [];
        let copyArr;

        for (let i = 0, j = 0; j < num / 2; i++, j++){
            if (i == 10) i = 0;
            arr.push(i);
        }

        copyArr = arr.slice();
        arr = arr.concat(copyArr.reverse());
        arr.sort(() => randomInteger(-1, 1));

        return arr;
    }

    let divWrapper = document.getElementById('wrapper');

    let size = {
        width: 6,
        height: 6
    };

    function createTable (size) {
        let str = '';
        let numberList = getRandomList(size.width * size.height);
        let counter = 0;

        for (let i = 0; i < size.width; i++){
            let col = '';
            let row = '';

            for (let j = 0; j < size.height; j++) {
                row += `<div class='row'>
                            <img src='images/smiles/${numberList[counter]}.png' class='a'>
                        </div>`;
                counter++;
            }
            col = `<div class='col'>${row}</div>`;
            str += col;
        }
        divWrapper.innerHTML = `<div id='list'>${str}</div>
                                <div class='time'>Time:
                                    <span class='counter'>0</span>
                                </div>`;
    }
    createTable(size);

    let divRows = document.getElementsByClassName('row');
    let curDiv = null;
    let count = 0;

    function checkCurrentValue (){
        let value;

        return currentValue => {
            if (value !== currentValue) {
                value = currentValue;
                return false;
            }
            return true;
        };
    }

    let divValue = checkCurrentValue();
    let linkImg = checkCurrentValue();
    let clearCounter = 0;

    function clicker (event){

        let img = this.children[0];
        img.classList.remove('a');

        if (count == 2) {
            for (let i = 0; i < divRows.length; i++){
                divRows[i].children[0].classList.add('a');
            }
            img.classList.remove('a');
            count = 0;
        }

        count++;

        if (curDiv == event.currentTarget && count == 2) curDiv.children[0].classList.add('a');
        if (!divValue(event.currentTarget) && linkImg(img.getAttribute('src')) && count == 2){
            event.currentTarget.style.visibility = 'hidden';
            curDiv.style.visibility = 'hidden';
            clearCounter++;
            if (clearCounter == size.width * size.height / 2) {
                showFinishPage();
                setListener();
                clearCounter = 0;
            }
        } else curDiv = event.currentTarget;
    }
    function setListener (){
        for (let i = 0; i < divRows.length; i++) {
            divRows[i].addEventListener('click', clicker);
        }
    }
    setListener();

    let spanCounter;
    let timer;
    let divStart = document.getElementById('start');
    let buttonText = document.querySelector('.button p');
    let button = document.querySelector('.button');

    button.onmouseover = () => {buttonText.style.color = 'red';};
    button.onmouseout = () => {buttonText.style.color = 'white';};
    button.addEventListener('click', () => {
        divStart.style.display = 'none';
        divWrapper.style.display = 'table';
        spanCounter = document.querySelector('.counter');
        timer = setInterval(() => {
            spanCounter.innerHTML = +spanCounter.innerHTML + 1;
        }, 1000);
    });

    function showFinishPage (){
        divStart.style.display = 'block';
        divWrapper.style.display = 'none';

        clearInterval(timer);

        let startP = document.querySelector('#start p');
        startP.innerHTML = `It took you ${spanCounter.innerHTML} seconds!`;
        startP.style.fontSize = `${40}px`;
        document.querySelector('#start h2').innerHTML = '';
        buttonText.innerHTML = 'play again';
        createTable(size);
    }
})();