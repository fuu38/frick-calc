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

//設定可能項目(ストレージ書き込み権限まわり)
window.flickLengthStandard = 30; //フリック検知距離　設定で弄れるように
window.longPressStandard = 200; //長押し判定時間(ms)
var ansBox = document.getElementById("ansBox");
var formula = "";
var deletIntervalHolder;

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
        $("#5_9").css("display", "none");
        $("#5_9_pushed").css("display", "block");
        $("#suggest_5").css("display", "block");
    });
    $("#5_9").on('touchmove', function(event) {
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
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
        if (Math.abs(diffX) < window.flickLengthStandard && Math.abs(diffY) < window.flickLengthStandard) {
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
    });
    //0ボタン
    $("#0_4").on('touchstart', function(event) {
        window.touchStartX = event.changedTouches[0].pageX;
        window.touchStartY = event.changedTouches[0].pageY;
        $("#0_4").css("display", "none");
        $("#0_4_pushed").css("display", "block");
        $("#suggest_0").css("display", "block");
    });
    $('#0_4').on('touchmove', function(event) {
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
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
    });
    //演算子ボタン

    $("#operands").on('touchstart', function(event) {
        window.touchStartX = event.changedTouches[0].pageX;
        window.touchStartY = event.changedTouches[0].pageY;
        $("#operands").css("display", "none");
        $("#operands_pushed").css("display", "block");
        $("#suggest_add").css("display", "block");
    });
    $("#operands").on('touchmove', function(event) {
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
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
        //直前が演算子でないなら演算子を追加

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
        $(".suggest-img").css("display", "none");
        window.touchStartX = 0;
        window.touxhStartY = 0;
        $("#operands_pushed").css("display", "none");
        $("#operands").css("display", "block");
    });
    //ACボタン
    $("#AC").on('touchstart', function(event) {
        window.touchStartX = event.changedTouches[0].pageX;
        window.touchStartY = event.changedTouches[0].pageY;
        $("#AC").css("display", "none");
        $("#AC_pushed").css("display", "block");
        $("#suggest_del").css("display", "block");
        deletIntervalHolder = setInterval(deleteLastCharOfFormula, 100);
    });
    $("#AC").on('touchmove', function(event) {
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
        $(".suggest-img").css("display", "none"); //一回サジェストを全部消す
        if (Math.abs(diffX) < window.flickLengthStandard && Math.abs(diffY) < window.flickLengthStandard) {
            $("#suggest_del").css("display", "block");
            return;
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) !== diffX) { //左フリック
            $("#suggest_AC").css("display", "block");
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) === diffX) { //右フリック
            $("#suggest_C").css("display", "block");
        } else if (Math.abs(diffX) <= Math.abs(diffY) && Math.abs(diffY) === diffY) { //下フリック
            $("#suggest_equal").css("display", "block");
        } else { //上フリック(該当なし)
            $("#suggest_none").css("display", "block");
        }
        clearInterval(deletIntervalHolder);
    })
    $("#AC").on('touchend', function() {
        clearInterval(deletIntervalHolder);
        $(".suggest-img").css("display", "none"); //サジェスト削除
        var thisx = event.changedTouches[0].pageX;
        var thisy = event.changedTouches[0].pageY;
        const diffX = thisx - window.touchStartX;
        const diffY = thisy - window.touchStartY;
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
    });
    //履歴閲覧と計算の切り替え
    $("#showFormulaLog").on('click', function() {
        $(".logArea").css("display", "block");
        $(".flick-keys-default").css("display", "none");
        $("#showFormulaLog").css("display", "none");
        $("#backToCalc").css("display", "block");
    });
    $("#backToCalc").on("click", function() {
        $(".logArea").css("display", "none");
        $(".flick-keys-default").css("display", "block");
        $("#showFormulaLog").css("display", "block");
        $("#backToCalc").css("display", "none");
    });
    //設定ボタン
    $("#setting_btn").on("click", function() {
        window.location.href = "setting.html";
    });
};

function addFormula(opera) {
    const display_computable = {
        '*': '×',
        '/': '÷'
    };
    //修正
    const operands = ['+', '-', '*', '/', '.'];
    const last = formula.slice(-1);
    if (!formula && (operands.includes(opera))) {
        //空文字かnull && 先頭に来てはいけない文字
        return;
    } else if (operands.includes(last) && operands.includes(opera)) {
        //前が演算子で演算子の追加
        formula = formula.slice(0, formula.length - 1) + opera;
        ansBox.value = ansBox.value.slice(0, ansBox.value.length - 1);
        ansBox.value += display_computable[opera] ? display_computable[opera] : opera;
        return;
    } else if (last === '0' && !operands.includes(opera) && ((operands.includes(formula.slice(-2, -1)) && formula.slice(-2, -1) !== '.') || formula.slice(-2, -1) === "")) { //うんち条件式、リファクタしろカス　
        //前が0 かつ　追加するのが演算子ではない　かつ　((二つ前が小数点以外の演算子)　または　空文字(つまり先頭)) => 先頭か演算子の直後は、0を二個以上連続できないようにする
        formula = formula.slice(0, formula.length - 1) + opera;
        ansBox.value = ansBox.value.slice(0, ansBox.value.length - 1);
        ansBox.value += display_computable[opera] ? display_computable[opera] : opera;
        return;
    } else {
        formula += opera;
        if (display_computable[opera]) {
            ansBox.value += display_computable[opera];
        } else {
            ansBox.value += opera;
        }
        return;
    }
}

function deleteLastCharOfFormula() {
    ansBox.value = ansBox.value.slice(0, ansBox.value.length - 1);
    formula = formula.slice(0, formula.length - 1);
}

function formulaAllClear() {
    ansBox.value = "";
    formula = "";
}

function formulaClear() {
    const operands = ['+', '-', '*', '/'];
    if (!formula) {
        return;
    } else if (operands.includes(formula.slice(-1))) { //最後が演算子なら1個だけ消す
        ansBox.value = ansBox.value.slice(0, ansBox.value.length - 1);
        formula = formula.slice(0, formula.length - 1);
    } else { //演算子が出るか式が無くなるまで消す
        while (true) {
            ansBox.value = ansBox.value.slice(0, ansBox.value.length - 1);
            formula = formula.slice(0, formula.length - 1);
            if (operands.includes(formula.slice(-1)) || !formula) {
                break;
            }
        }
    }
}

function finallyCalc() {
    try {
        const answer = new Function("return " + formula)();
        if (answer === void 0) { //式がないときにundefindが返るのでundefindチェック
            ansBox.value = "";
            formula = "";
            return; //何も変更を加えず中断する(式が不正というよりは単に操作ミスなので)
        }
        if (isNaN(answer) || !isFinite(answer)) { //isNaNはNaNの時true(当然)、isFiniteはInfの時true(有限ですか？なので)を返す。
            ansBox.value = "";
            formula = "";
            alert("式を計算できませんでした><");
        }
        ansBox.value = String(answer);
        formula = String(answer);
        $(".logArea").append("<h3 class=\"log-text\">" + String(answer) + "</h3>");
    } catch (e) {
        ansBox.value = "";
        formula = "";
        alert("この式は計算できません!");
    }
};