(function () {
    document.getElementById("buttonInput").addEventListener( "click", radio );
    var userName = localStorage.getItem("name");
    userName = (userName == "<<Введите свое имя>>")? "": userName + ", ";

    function radio () {
        var extra = 0;
        var nerve = 0;
        var lie = 0;
        var extraYes = [1, 3, 8, 10, 13, 17, 22, 25, 27, 39, 44, 46, 49, 53, 56];
        var extraNo =  [5, 15, 20, 29, 32, 34, 37, 41, 51];
        var nerveYes = [2, 4, 7, 9, 11, 14, 16, 19, 21, 23, 26, 28, 31, 33, 35, 38, 40, 43, 45, 47, 50, 52, 55, 57];
        var lieYes =   [6, 24, 36];
        var lieNo =    [12, 18, 30, 42, 48, 54];
        var i;

        for (i = 0; i < 57; i++){
            if (!document.getElementsByName("r-button" + (i+1))[0].checked &&
                !document.getElementsByName("r-button" + (i+1))[1].checked){
                alert(userName + "Вы ответили не на все вопросы");
                return;
            }
        }

        for (i = 0; i < extraYes.length; i++){
            if (document.getElementsByName("r-button" + extraYes[i])[0].checked)  extra += 1;
        }

        for (i = 0; i < extraNo.length; i++){
            if (document.getElementsByName("r-button" + extraNo[i])[1].checked)  extra += 1;
        }

        for (i = 0; i < nerveYes.length; i++){
            if (document.getElementsByName("r-button" + nerveYes[i])[0].checked)  nerve += 1;
        }

        for (i = 0; i < lieYes.length; i++){
            if (document.getElementsByName("r-button" + lieYes[i])[0].checked)  lie += 1;
        }

        for (i = 0; i < lieNo.length; i++){
            if (document.getElementsByName("r-button" + lieNo[i])[1].checked)  lie += 1;
        }

        if (extra < 13 && nerve > 12){
            createAnswer("Вы Меланхолик", document.getElementById('melancholiac'));
        }else if (extra > 12 && nerve < 13){
            createAnswer("Вы Сангвиник", document.getElementById('sanguine'));
        }else if (extra < 13 && nerve < 13){
            createAnswer("Вы Флегматик", document.getElementById('phlegmatic'));
        }else if (extra > 12 && nerve > 12) {
            createAnswer("Вы Холерик", document.getElementById('choleric'));
        }

        function createAnswer(textResult, temperament) {
            var answerH3 = document.querySelector('#answer h3');
            answerH3.textContent = userName + textResult;

            var levelLie = document.createElement('h5');
            levelLie.textContent = "Уровень лжи: " + lie + " из 9";

            answerH3.insertBefore(levelLie, null);

            document.getElementById('main').style.display = "none";

            var divAnswer = document.querySelector('div#answer');
            divAnswer.style.display = "block";

            temperament.style.display = "block";
        }
    }
})();