const form = document.querySelector("#js-form");
const input = document.querySelector("#js-form-input");
const ul = document.querySelector("#todolist-items");
const buttonSubmit = document.querySelector("#js-button-submit");
const buttonDelete = document.querySelector("#js-button-delete");
const todoItemCountElement = document.querySelector("#js-todo-count");

// ボタンをクリックしてTodoリストを追加できる機能
buttonSubmit.addEventListener ("click", () => {
    console.log("SUBMIT!ボタンがクリックされました");
    if (input.value.length > 0 ) {
    add();
    }
});

// 送信時の処理
form.addEventListener ("submit", (event) => {
    console.log("フォームが送信されました");
    event.preventDefault();
    if(input.value !== "") {
        //console.log(input.value);
        add();
    }
})

// 入力内容をリストに追加し、入力欄をリセットする。
function add() {
    console.log("add関数を実行します");
    const list = document.createElement("li"); // Todoアイテム作成
    const checkBox = document.createElement("input"); 
    checkBox.setAttribute("type", "checkbox"); // チェックボックスを作成
    checkBox.classList.add("todo-item-check"); // チェックボックスにクラスを付与
    list.innerText = input.value; // 入力をTodoアイテムに組み込み
    list.prepend(checkBox); // liタグの中にチェックボックスを追加
    list.classList.add("todo-item"); // Todoアイテムにクラスを付与
    ul.appendChild(list); // Todoアイテムをアイテムにリストに追加
    deleteHandler(list); // 追加されたアイテムに削除機能を実装
    toggleStrikeThrough(list, checkBox); // 追加されたアイテムに打ち消し線機能を実装
    /*
    console.log(`リストアイテムに${list.innerHTML}を追加しました`); // 確認用 => "リストアイテムにtestを追加しました"
    */
    todoItemChecksCount();
    input.value = ""; // 入力欄をリセット
    saveData(); // Todoをローカルストレージに保存する
    console.log("add関数を終了します");
}

function saveData(){
    console.log("saveData関数を実行します");
    // liタグ全ての情報を配列で取得
    const lists = document.querySelectorAll("li"); // 全てのTodoリストに登録されている内容を取得
    /*
    console.log(lists); // 確認用 => "NodeList [li.todo-item]"（<li>のクラス）が表示される
    */
    let todos = []; // 空の配列を作成
    lists.forEach(list =>{
        todos.push(list.innerText);
    }); // Todoリストに登録されているli要素の中身のみを取り出し、一つずつ空配列に加えていく
    /*
    console.log(todos); // 確認用 => "['test']"が表示される
    */
    // データをJSON形式に変換
    localStorage.setItem("todos", JSON.stringify(todos));
    // 確認用（ローカルストレージに保存された内容）
    const localTodos = localStorage.getItem("todos");
    /*
    console.log(localTodos); // 確認用 => "["test"]"が表示される
    */
    console.log("saveData関数を終了します");
}

// ページが更新された際にローカルストレージのTodoリストを表示する。
document.addEventListener("DOMContentLoaded", () => {
    console.log("ページが更新またはロードされました");
    todoDisplay();
    todoItemChecksCount();
})

/*
ローカルストレージに保存されているTodoリストを表示する
buttonDisplay.addEventListener ("click", (event) => {
    todoDisplay();
})
*/

function todoDisplay(){
    console.log("todoDisplay関数を実行します");
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
        todos.forEach((todo) => {
            addSavedata(todo);
        });
        console.log("todoDisplay関数を終了します");
    }
}

function addSavedata(todo){
    console.log("addSavedata(todo)関数を実行します");
    const list = document.createElement("li"); // Todoアイテム作成
    const checkBox = document.createElement("input"); 
    checkBox.setAttribute("type", "checkbox"); // チェックボックスを作成
    list.innerText = todo; // 入力をTodoアイテムに組み込み
    list.prepend(checkBox); // liタグの先頭にチェックボックスを追加
    list.classList.add("todo-item"); // Todoアイテムにクラスを付与
    checkBox.classList.add("todo-item-check"); // チェックボックスにクラスを付与
    ul.appendChild(list); // Todoアイテムをアイテムにリストに追加
    deleteHandler(list); // 復元アイテムに削除機能を設定
    toggleStrikeThrough(list, checkBox); // 復元アイテムに打ち消し線機能を設定
    console.log("addSavedata(todo)関数を終了します");
}

// Todoの削除機能
function deleteHandler(listElement) {
    console.log("deleteHandler(listElement)関数を実行します");
    listElement.addEventListener("contextmenu", function(event){
        event.preventDefault();
        listElement.remove();
        saveData();
        todoItemChecksCount();
        console.log("deleteHandler(listElement)関数を終了します");
    })
}

// チェックボックスによるTodoの削除機能
// ボタンがクリックされるとdeleteCheckedItems関数が起動
buttonDelete.addEventListener("click", () => {
    console.log("削除ボタンがクリックされました");
    const lists = document.querySelectorAll(".todo-item-check:checked");
    if(lists.length) {
        deleteCheckedItems();
        todoItemChecksCount();  
    }
});

// deleteCheckedItems関数
function deleteCheckedItems() {
    console.log("deleteCheckedItems関数を実行します");
    const checkedBoxes = ul.querySelectorAll(".todo-item-check:checked"); // チェックボックスの内、チェック済のものを全て取得
    checkedBoxes.forEach(checkBox => {
        const listItem = checkBox.closest("li"); //チェックボックスの親要素<li>タグを取得
        /*
        console.log(`110行目${listItem}`); // 確認用
        */
        if (listItem) { // listItemがない状態でremove()を実行するとエラーになるため、if文を使用
            listItem.remove();
        }
    });
    if (checkedBoxes.length > 0) {
        saveData();
        console.log(`${checkedBoxes.length}個のチェック済みアイテムを削除し、ストレージを更新しました。`);
    } else {
        console.log("削除対象のチェック済みアイテムはありませんでした。");
    }
}

// チェックボックスによるTodoアイテムへの打ち消し線付与機能
function toggleStrikeThrough (listElement, checkBox) {
    console.log("toggleStrikeThrough(listElement, checkBox)関数を実行します");
    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            listElement.classList.add("strike-through");
        } else {
            listElement.classList.remove("strike-through");
        }
        todoItemChecksCount();
        saveData();
        console.log("toggleStrikeThrough(listElement, checkBox)関数を終了します");
    })
}

// チェック済のボックス数をカウントする
function todoItemChecksCount () {
    const todoItemChecks = document.querySelectorAll(".todo-item-check:not(:checked)");
    let todoItemCount = todoItemChecks.length;
    todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
}