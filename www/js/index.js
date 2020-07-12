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

function set(display, computable) {
    console.log(display, computable);
    ansBox.value = ansBox.value + display;
    formula += computable;
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
}

document.getElementById("to_Setting").addEventListener('click', function() {
    window.location.href = "setting.html"
});
//5ボタン
document.getElementById("5_9").addEventListener('click', function() {
    set('5', '5');
});
document.getElementById("0_4").addEventListener('click', function() {
    set('0', '0');
});
document.getElementById("operands").addEventListener('click', function() {
    const operands = ['+', '-', '*', '/'];
    const last = formula.slice(-1);
    console.log(last);
    console.log(operands.includes(last));
    if (!operands.includes(last)) {
        set('+', '+');
    }

});

document.getElementById("AC").addEventListener('click', function() {
    ansBox.value = "";
});