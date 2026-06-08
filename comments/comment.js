//////////////////////////////////////////////////
// 🧠 GLOBAL STATE
//////////////////////////////////////////////////

if (!window._commentState) {
  window._commentState = { isOpen: false };
}

const state = window._commentState;

// 👉 important: current post id store
window.CURRENT_POST_ID = null;

//////////////////////////////////////////////////
// 🚀 OPEN COMMENTS
//////////////////////////////////////////////////

window.openComments = function (postId) {

  window.CURRENT_POST_ID = postId;

  const sheet = document.getElementById("commentSheet");
  if (!sheet || state.isOpen) return;

  initCommentSheet();

  sheet.classList.add("active");
  document.body.style.overflow = "hidden";
  state.isOpen = true;
};

//////////////////////////////////////////////////
// ❌ CLOSE COMMENTS
//////////////////////////////////////////////////

function closeComments() {
  const sheet = document.getElementById("commentSheet");
  if (!sheet || !state.isOpen) return;

  sheet.classList.remove("active");
  document.body.style.overflow = "";
  state.isOpen = false;
}

//////////////////////////////////////////////////
// 🧱 INIT SHEET
//////////////////////////////////////////////////

function initCommentSheet() {
  const root = document.getElementById("commentSheet");
  if (!root || root.dataset.loaded) return;

  root.dataset.loaded = "true";

  root.innerHTML = `
    <div class="sheetContent">

      <div class="sheetHeader">
        <h3>Comments</h3>
      </div>

      <div id="commentList">
        <div class="emptyState">No comments yet 😶</div>
      </div>

      <div class="inputBox">
        <input id="commentInput" placeholder="Add a comment...">
        <button id="postBtn">Post</button>
      </div>

    </div>
  `;

  document
    .getElementById("postBtn")
    ?.addEventListener("click", sendComment);
}

//////////////////////////////////////////////////
// 💬 SEND COMMENT + SUPABASE UPDATE
//////////////////////////////////////////////////

async function sendComment() {

  const input = document.getElementById("commentInput");
  const list = document.getElementById("commentList");

  if (!input || !list) return;

  const text = input.value.trim();
  if (!text) return;

  const postId = window.CURRENT_POST_ID;
  if (!postId) return;

  //////////////////////////////////////////////////
  // 🧾 ADD COMMENT UI
  //////////////////////////////////////////////////

  const empty = list.querySelector(".emptyState");
  if (empty) empty.remove();

  const div = document.createElement("div");
  div.className = "commentRow";

  div.innerHTML = `
    <b>You:</b> <span></span>
  `;

  div.querySelector("span").textContent = text;

  list.appendChild(div);
  input.value = "";

  //////////////////////////////////////////////////
  // 📊 UPDATE COUNTER UI
  //////////////////////////////////////////////////

  const commentsEl = document.getElementById("comments-" + postId);

  let count = parseInt(commentsEl?.dataset.comments || "0") || 0;
  count++;

  if (commentsEl) {
    commentsEl.dataset.comments = count;
    commentsEl.textContent = count + " comments";
  }

  //////////////////////////////////////////////////
  // 🧠 SUPABASE UPDATE (POST TABLE)
  //////////////////////////////////////////////////

  try {
    await supabaseClient
      .from("minigram_feed")
      .update({
        comments_count: count
      })
      .eq("id", postId);
  } catch (e) {
    console.error("Supabase update error:", e);
  }
}