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
var ansBox = document.getElementById("ansBox");
var formula = "";

/*
@param display{string} 表示する数字 or 演算子
@param computable{string} 計算する数字 or 演算子(特に演算子は表示と違うことがあるため)
 */
//jQueryは読み込んでからじゃないと動かないのでonloadの後でイベント登録
window.onload = () => {
    //設定
    $("#to_Setting").on('click', function() {
        window.location.href = "setting.html"
    });
    //5ボタン
    $("#5_9").on('click', function() {
        addFormula('5');
    });
    $("#5_9").on('touchstart', function() {
        $("#5_9").css("display", "none");
        $("#5_9_pushed").css("display", "block");
    });
    $("#5_9").on('touchend', function() {
        $("#5_9_pushed").css("display", "none");
        $("#5_9").css("display", "block");
    });
    //0ボタン
    $("#0_4").on('click', function() {
        addFormula('0');
    });
    $("#0_4").on('touchstart', function() {
        $("#0_4").css("display", "none");
        $("#0_4_pushed").css("display", "block");
    });
    $("#0_4").on('touchend', function() {
        $("#0_4_pushed").css("display", "none");
        $("#0_4").css("display", "block");
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