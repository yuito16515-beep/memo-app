document.addEventListener("DOMContentLoaded", () => {

  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const addButton = document.getElementById("add");
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");
  const list = document.getElementById("list");

  let memos = JSON.parse(localStorage.getItem("memos")) || [];

  function save() {
    localStorage.setItem("memos", JSON.stringify(memos));
  }

  function render() {
    list.innerHTML = "";

    const keyword = searchInput.value;
    const sortType = sortSelect.value;

    let filtered = memos.filter(m =>
      m.title.includes(keyword) ||
      m.content.includes(keyword)
    );

    // 並び替え
    if (sortType === "new") {
      filtered = filtered.slice().reverse();
    }

    filtered.forEach((memo) => {

      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${memo.title}</strong><br>
        ${memo.content}<br>
        <button class="edit">編集</button>
        <button class="delete">削除</button>
      `;

      // 削除
      li.querySelector(".delete").onclick = () => {
        memos = memos.filter(m => m !== memo);
        save();
        render();
      };

      // 編集
      li.querySelector(".edit").onclick = () => {

        const newTitle = prompt("新しいタイトル", memo.title);
        const newContent = prompt("新しい内容", memo.content);

        if (newTitle && newContent) {
          memo.title = newTitle;
          memo.content = newContent;
          save();
          render();
        }
      };

      list.appendChild(li);
    });
  }

  // 追加
  addButton.onclick = () => {

    if (!titleInput.value || !contentInput.value) {
      alert("タイトルとメモ内容を入力してください");
      return;
    }

    memos.push({
      title: titleInput.value,
      content: contentInput.value
    });

    save();
    render();

    titleInput.value = "";
    contentInput.value = "";
  };

  // 検索
  searchInput.oninput = render;

  // 並び替え
  sortSelect.onchange = render;

  render();
});
