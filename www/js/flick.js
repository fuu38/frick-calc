function flickStart() {
    /*フリックの始まりを検知したら呼ぶ
    flickingクラスの付与
    flicking()
    */
}

function flicking() {
    /*
    フリックの方向を判定
    flickingクラスのオブジェクトに
    フリックしてる演出(選択中の数字 or 演算子の表示)*/
}

function flickEnd(display, computable) {
    /*フリック演出の削除
    flickingクラスの剥奪
    選択された数字(演算子)をset(display,computable);する
    =の時はcalc()を呼ぶ
    ↑この都合でsetの引数はこの関数内で取得するのもあり
    */
}