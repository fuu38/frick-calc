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
window.standard = 30; //フリック検知距離　設定で弄れるように
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
        if (Math.abs(diffX) < window.standard && Math.abs(diffY) < window.standard) {
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
        if (Math.abs(diffX) < window.standard && Math.abs(diffY) < window.standard) {
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
        if (Math.abs(diffX) < window.standard && Math.abs(diffY) < window.standard) {
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
        if (Math.abs(diffX) < window.standard && Math.abs(diffY) < window.standard) {
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
    $("#operands").on('click', function() {
        const operands = ['+', '-', '*', '/'];
        const last = formula.slice(-1);
        console.log(last);
        console.log(operands.includes(last));
        //直前が演算子でないなら演算子を追加
        if (!operands.includes(last)) {
            addFormula('+');
        }
    });
    $("#operands").on('touchstart', function() {
        $("#operands").css("display", "none");
        $("#operands_pushed").css("display", "block");
    });
    $("#operands").on('touchend', function() {
        $("#operands_pushed").css("display", "none");
        $("#operands").css("display", "block");
    });
    //ACボタン
    $("#AC").on('click', function() {
        var val = ansBox.value;
        console.log(val);
        console.log(typeof(val));
        console.log(val.slice(0, val.length - 1));
        ansBox.value = val.slice(0, val.length - 1);
    });
    $("#AC").on('touchstart', function() {
        $("#AC").css("display", "none");
        $("#AC_pushed").css("display", "block");
    });
    $("#AC").on('touchend', function() {
        $("#AC_pushed").css("display", "none");
        $("#AC").css("display", "block");
    });
};

function addFormula(opera) {
    const display_computable = {
        '×': '*',
        '÷': '/'
    };
    console.log(opera);
    ansBox.value += opera;
    //修正
    if (display_computable[opera]) {
        formula += display_computable[opera];
    } else {
        formula += opera;
    }
}

function calc() {
    try {
        const answer = new Function("return " + formula)();
        ansBox.value = answer;
        console.log(answer);
    } catch (e) {
        ansBox.value = "";
        alert("式を計算できませんでした><");
        console.log(e);
    }
};