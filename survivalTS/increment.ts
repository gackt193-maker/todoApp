
function increment(num: number) {
//                 ^^^^^^^^^^型注釈
    return num + 1;
}

console.log(increment(999));

/*
console.log(increment("999")); // tsc increment.tsコマンドでチェック
=> エラーが発生する

Argument of type 'string' is not assignable to parameter of type 'number'.
9 console.log(increment("999"));
                        ~~~~~
Found 1 error in increment.ts:9
*/