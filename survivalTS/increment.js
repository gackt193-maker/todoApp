// このファイルではJavaScriptで発生する問題を見ていく
function increment(num) {
    return num + 1;
}
// コマンドラインで"node increment.js" => 1000
console.log(increment(999));
// "node increment.js" => 9991
console.log(increment("999"));
/*
    暗黙的な型変換により、+1の部分がstring型に変換されている
*/