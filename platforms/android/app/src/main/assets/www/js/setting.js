/*設定から元の画面へ戻るボタン(設定を何もせず戻る)
「設定を保存」ボタンで設定を反映し、戻る*/
//設定が保存されました通知

window.onload = function () {
    $("#backToCalcBtn").on("click", function () {
        window.location.href = "index.html";
        const settings = document.getElementById("settings-form");
        window.localStorage.setItem("handside", settings.handside.value);
    });
};