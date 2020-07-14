/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*
計算の実装
フリックの実装
その他もろもろ*/
//設定ボタン
window.flickLengthflickLengthStandard = 30; //フリック検知距離　設定で弄れるように
window.longPressStandard = 200; //長押し判定時間(ms)
var ansBox = document.getElementById("ansBox");
var formula = "";

//jQueryは読み込んでからじゃないと動かないのでonloadの後でイベント登録
window.onload = () => {
    //設定
    $("#to_Setting").on('click', function() {
        window.location.href = "setting.html"
    });
    //5ボタン
    $("#5_9").on('touchstart', function(event) {
        window.touchStartX = event.changedTouches[0].pageX;
        window.touchStartY = event.changedTouches[0].pageY;
        console.log(window.touchStartX);
        console.log(window.touchStartY);
        $("#5_9").css("display", "none");
        $("#5_9_pushed").css("display", "block");
        $("#suggest_5").css("display", "block");
    });
    $("#5_9").on('touchmove', function(event) {
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
        console.log(diffX);
        console.log(diffY);

        $(".suggest-img").css("display", "none"); //一回サジェストを全部消す
        if (Math.abs(diffX) < window.flickLengthStandard && Math.abs(diffY) < window.flickLengthStandard) {
            $("#suggest_5").css("display", "block");
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) !== diffX) { //左フリック
            $("#suggest_6").css("display", "block");
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) === diffX) { //右フリック
            $("#suggest_8").css("display", "block");
        } else if (Math.abs(diffX) <= Math.abs(diffY) && Math.abs(diffY) === diffY) { //上フリック
            $("#suggest_9").css("display", "block");
        } else { //上フリック
            $("#suggest_7").css("display", "block");
        }
    });
    $("#5_9").on('touchend', function() {
        $(".suggest-img").css("display", "none"); //サジェスト削除
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
        console.log(diffX);
        console.log(diffY);
        if (Math.abs(diffX) < window.standard && Math.abs(diffY) < window.flickLengthStandard) {
            addFormula('5');
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) !== diffX) { //左フリック
            addFormula('6');
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) === diffX) { //右フリック
            addFormula('8');
        } else if (Math.abs(diffX) <= Math.abs(diffY) && Math.abs(diffY) === diffY) { //上フリック
            addFormula('9');
        } else { //下フリック
            addFormula('7');
        }
        $(".suggest-img").css("display", "none");
        window.touchStartX = 0;
        window.touxhStartY = 0;
        $("#5_9_pushed").css("display", "none");
        $("#5_9").css("display", "block");
        console.log("func end!");
    });
    //0ボタン
    $("#0_4").on('touchstart', function(event) {
        window.touchStartX = event.changedTouches[0].pageX;
        window.touchStartY = event.changedTouches[0].pageY;
        console.log(window.touchStartX);
        console.log(window.touchStartY);
        $("#0_4").css("display", "none");
        $("#0_4_pushed").css("display", "block");
        $("#suggest_0").css("display", "block");
    });
    $('#0_4').on('touchmove', function(event) {
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
        console.log(diffX);
        console.log(diffY);

        $(".suggest-img").css("display", "none"); //一回サジェストを全部消す
        if (Math.abs(diffX) < window.flickLengthStandard && Math.abs(diffY) < window.flickLengthStandard) {
            $("#suggest_0").css("display", "block");
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) !== diffX) { //左フリック
            $("#suggest_1").css("display", "block");
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) === diffX) { //右フリック
            $("#suggest_3").css("display", "block");
        } else if (Math.abs(diffX) <= Math.abs(diffY) && Math.abs(diffY) === diffY) { //下フリック
            $("#suggest_4").css("display", "block");
        } else { //上フリック
            $("#suggest_2").css("display", "block");
        }
    });
    $("#0_4").on('touchend', function() {
        $(".suggest-img").css("display", "none"); //サジェスト削除
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
        console.log(diffX);
        console.log(diffY);
        if (Math.abs(diffX) < window.flickLengthStandard && Math.abs(diffY) < window.flickLengthStandard) {
            addFormula('0');
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) !== diffX) { //左フリック
            addFormula('1');
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) === diffX) { //右フリック
            addFormula('3');
        } else if (Math.abs(diffX) <= Math.abs(diffY) && Math.abs(diffY) === diffY) { //上フリック
            addFormula('4');
        } else { //下フリック
            addFormula('2');
        }
        $(".suggest-img").css("display", "none");
        window.touchStartX = 0;
        window.touxhStartY = 0;
        $("#0_4_pushed").css("display", "none");
        $("#0_4").css("display", "block");
        console.log("func end!");
    });
    //演算子ボタン

    $("#operands").on('touchstart', function(event) {
        window.touchStartX = event.changedTouches[0].pageX;
        window.touchStartY = event.changedTouches[0].pageY;
        console.log(window.touchStartX);
        console.log(window.touchStartY);
        $("#operands").css("display", "none");
        $("#operands_pushed").css("display", "block");
        $("#suggest_add").css("display", "block");
    });
    $("#operands").on('touchmove', function(event) {
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
        console.log(diffX);
        console.log(diffY);

        $(".suggest-img").css("display", "none"); //一回サジェストを全部消す
        if (Math.abs(diffX) < window.flickLengthStandard && Math.abs(diffY) < window.flickLengthStandard) {
            $("#suggest_add").css("display", "block");
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) !== diffX) { //左フリック
            $("#suggest_sub").css("display", "block");
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) === diffX) { //右フリック
            $("#suggest_div").css("display", "block");
        } else if (Math.abs(diffX) <= Math.abs(diffY) && Math.abs(diffY) === diffY) { //下フリック
            $("#suggest_dot").css("display", "block");
        } else { //上フリック
            $("#suggest_by").css("display", "block");
        }
    });
    $("#operands").on('touchend', function() {
        $(".suggest-img").css("display", "none"); //サジェスト削除
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
        console.log(diffX);
        console.log(diffY);
        const operands = ['+', '-', '*', '/'];
        const last = formula.slice(-1);
        console.log(last);
        console.log(operands.includes(last));
        //直前が演算子でないなら演算子を追加
        if (!operands.includes(last)) {
            if (Math.abs(diffX) < window.flickLengthStandard && Math.abs(diffY) < window.flickLengthStandard) {
                addFormula('+');
            } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) !== diffX) { //左フリック
                addFormula('-');
            } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) === diffX) { //右フリック
                addFormula('/');
            } else if (Math.abs(diffX) <= Math.abs(diffY) && Math.abs(diffY) === diffY) { //上フリック
                addFormula('.');
            } else { //下フリック
                addFormula('*');
            }
        } else {
            console.log("Cannot append operands because an operand found before this query.");
        }
        $(".suggest-img").css("display", "none");
        window.touchStartX = 0;
        window.touxhStartY = 0;
        $("#operands_pushed").css("display", "none");
        $("#operands").css("display", "block");
        console.log("func end!");
    });
    //ACボタン
    $("#AC").on('touchstart', function(event) {
        window.touchStartX = event.changedTouches[0].pageX;
        window.touchStartY = event.changedTouches[0].pageY;
        console.log(window.touchStartX);
        console.log(window.touchStartY);
        $("#AC").css("display", "none");
        $("#AC_pushed").css("display", "block");
        $("#suggest_del").css("display", "block");
    });
    $("#AC").on('touchmove', function(event) {
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
        console.log(diffX);
        console.log(diffY);

        $(".suggest-img").css("display", "none"); //一回サジェストを全部消す
        if (Math.abs(diffX) < window.flickLengthStandard && Math.abs(diffY) < window.flickLengthStandard) {
            $("#suggest_del").css("display", "block");
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) !== diffX) { //左フリック
            $("#suggest_AC").css("display", "block");
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) === diffX) { //右フリック
            $("#suggest_C").css("display", "block");
        } else if (Math.abs(diffX) <= Math.abs(diffY) && Math.abs(diffY) === diffY) { //下フリック
            $("#suggest_equal").css("display", "block");
        } else { //上フリック(該当なし)
            $("#suggest_none").css("display", "block");
        }
    })
    $("#AC").on('touchend', function() {
        $(".suggest-img").css("display", "none"); //サジェスト削除
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
        console.log(diffX);
        console.log(diffY);
        if (Math.abs(diffX) < window.flickLengthStandard && Math.abs(diffY) < window.flickLengthStandard) {
            deleteLastCharOfFormula();
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) !== diffX) { //左フリック
            formulaAllClear();
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) === diffX) { //右フリック
            formulaClear();
        } else if (Math.abs(diffX) <= Math.abs(diffY) && Math.abs(diffY) === diffY) { //下フリック
            finallyCalc();
        } else { //上フリック(挙動なし)
        }
        $(".suggest-img").css("display", "none");
        window.touchStartX = 0;
        window.touxhStartY = 0;
        $("#AC_pushed").css("display", "none");
        $("#AC").css("display", "block");
        console.log("func end!");
    });
};

function addFormula(opera) {
    const display_computable = {
        '*': '×',
        '/': '÷'
    };
    console.log(opera);
    formula += opera;
    //修正
    if (display_computable[opera]) {
        ansBox.value += display_computable[opera];
    } else {
        ansBox.value += opera;
    }
}

function deleteLastCharOfFormula() {

    console.log(ansBox.value.slice(0, ansBox.value.length - 1));
    ansBox.value = ansBox.value.slice(0, ansBox.value.length - 1);
    formula = formula.slice(0, formula.length - 1)
}

function formulaAllClear() {
    ansBox.value = "";
    formula = "";
}

function formulaClear() {

}

function finallyCalc() {
    try {
        const answer = new Function("return " + formula)();
        if (answer === void 0) { //式がないときにundefindが返るのでundefindチェック
            return; //何も変更を加えず中断する
        }
        ansBox.value = answer;
        console.log(answer);
    } catch (e) {
        ansBox.value = "";
        alert("式を計算できませんでした><");
        console.log(e);
    }
};