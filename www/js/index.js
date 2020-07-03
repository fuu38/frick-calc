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
    console.log(display,computable);
    ansBox.value= ansBox.value + display;
    formula += computable;
}
/*
*
*/
function calc() {
    var answer=0;
    try {
        answer = new Function("return " + formula)();
        console.log(answer);
    }
    catch(e){
        answer="式が不正です";
        console.log(e);
    }
    ansBox.value=answer;
}

document.getElementById("to_Setting").addEventListener('click', function () {
    window.location.href = "setting.html"
});
//5ボタン
document.getElementById("num-6to0").addEventListener('click', function () {
    set('6', '6');
});
document.getElementById("num-1to5").addEventListener('click', function () {
    set('1', '1');
});
document.getElementById("operands").addEventListener('click', function () {
    set('+', '+');
});

document.getElementById("AC").addEventListener('click', function () {
    ansBox.value="";
});

