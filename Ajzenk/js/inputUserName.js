(function () {
    var inputUserName = document.getElementById("user-name");

    inputUserName.onfocus = function () {
        if (this.value == "<<Введите свое имя>>") {
            this.value = "";
            inputUserName.style.color = "#000";
        }
    };

    inputUserName.onblur = function () {
        if (this.value == "") {
            this.value = "<<Введите свое имя>>";
            inputUserName.style.color = "#777";
        }
        localStorage.setItem("name", this.value);
    };
})();