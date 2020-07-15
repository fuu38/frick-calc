/*設定から元の画面へ戻るボタン(設定を何もせず戻る)
「設定を保存」ボタンで設定を反映し、戻る
//設定が保存されました通知
*/
function doSomething() {
    return new Promise(function(resolve, reject) {
        /*Setttingのラジオボタンの値をすべて読み取り、セットする
        もしエラーを吐いたらreject()を呼ぶ
        */
        resolve("設定の保存に成功しました！")
    })

}

function setSetting() {
    doSomething()
        .then(successCallback, failureCallback)
        .finally(() => {
            window.location.href = 'index.html'
        })
}

function successCallback(arg) {
    alert(arg);
}

function failureCallback(err) {
    console.log(err);
    alert("保存に失敗しました。\ n何度も繰り返すようであれば、制作者にご連絡ください。 ");
}

document.getElementById('update_Button').addEventListener('click', setSetting);