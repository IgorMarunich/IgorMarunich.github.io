(function () {
    var selectSize = document.getElementById("size");
    var pSize = document.getElementsByClassName("forSize");

    selectSize.addEventListener("change", changeSelect);

    function changeSelect () {

        switch (selectSize.selectedIndex) {
            case 0:
                changeStyle(11);
                break;
            case 1:
                changeStyle(14);
                break;
            case 2:
                changeStyle(18);
                break;
            case 3:
                changeStyle(22);
                break;
            case 4:
                changeStyle(26);
                break;
        }

        function changeStyle (num) {
            for (var i = 0; i < pSize.length; i++) {
                pSize[i].style.fontSize = num + "px";
            }
        }
    }
})();