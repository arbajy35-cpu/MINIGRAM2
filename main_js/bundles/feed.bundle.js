

/* FILE: main_js/feedRenderer.js */

//////////////////////////////////////////////////
// 🚀 FEED RENDERER V2 (ULTRA OPTIMIZED)
//////////////////////////////////////////////////

console.log(
  "🚀 FEED RENDERER V2 LOADED"
);

//////////////////////////////////////////////////
// 📦 CONFIG
//////////////////////////////////////////////////

const BATCH_SIZE =

  window.IS_LOW_END
  ? 5
  : 10;

//////////////////////////////////////////////////
// 🌍 GLOBAL STATE
//////////////////////////////////////////////////

window.FEED_RENDER_STATE =
window.FEED_RENDER_STATE || {

  posts: [],
  page: 0,
  loading: false,
  ended: false

};

//////////////////////////////////////////////////
// 🚀 MAIN RENDER FEED
//////////////////////////////////////////////////

function renderFeed(
  posts = [],
  append = true,
  page = 0
){

  //////////////////////////////////////////////////
  // 📦 FEED
  //////////////////////////////////////////////////

  const feed =
    document.getElementById(
      "feed"
    );

  const template =
    document.getElementById(
      "postTemplate"
    );

  //////////////////////////////////////////////////
  // 🛑 HARD SAFETY
  //////////////////////////////////////////////////

  if(
    !feed ||
    !template
  ){

    console.error(
      "❌ feed/template missing"
    );

    return;

  }

  if(
    !Array.isArray(posts)
  ){

    return;

  }

  //////////////////////////////////////////////////
  // 🧹 REMOVE EMPTY STATE
  //////////////////////////////////////////////////

  document
    .getElementById(
      "emptyFeed"
    )
    ?.remove();

  //////////////////////////////////////////////////
  // 📦 BATCH CALCULATION
  //////////////////////////////////////////////////

  const start =
    page * BATCH_SIZE;

  const end =
    start + BATCH_SIZE;

  //////////////////////////////////////////////////
  // ✂️ ONLY RENDER BATCH
  //////////////////////////////////////////////////

  const batch =
    posts.slice(
      start,
      end
    );

  //////////////////////////////////////////////////
  // 🛑 NO POSTS
  //////////////////////////////////////////////////

  if(!batch.length){

    console.log(
      "⚠️ No more posts"
    );

    window.FEED_RENDER_STATE
      .ended = true;

    return;

  }

  //////////////////////////////////////////////////
  // 🚀 DOCUMENT FRAGMENT
  //////////////////////////////////////////////////

  const fragment =
    document.createDocumentFragment();

  //////////////////////////////////////////////////
  // 🚀 RENDER POSTS
  //////////////////////////////////////////////////

  batch.forEach(post => {

    //////////////////////////////////////////////////
    // 🛡️ SAFETY
    //////////////////////////////////////////////////

    if(
      !post ||
      !post.id
    ) return;

    //////////////////////////////////////////////////
    // ♻️ DUPLICATE CHECK
    //////////////////////////////////////////////////

    if(

      document.getElementById(
        "post-" + post.id
      )

    ) return;

    //////////////////////////////////////////////////
    // 👤 USER DATA
    //////////////////////////////////////////////////

    const username =
      post.username ||
      "user";

    //////////////////////////////////////////////////
    // 🖼️ AVATAR
    //////////////////////////////////////////////////

    const avatar =

      post.avatar_url ||

      `https://i.pravatar.cc/150?u=${
        encodeURIComponent(
          username
        )
      }`;

    //////////////////////////////////////////////////
    // 🖼️ IMAGE
    //////////////////////////////////////////////////

    const image =
      post.image_url ||
      "";

    //////////////////////////////////////////////////
    // 📝 CAPTION
    //////////////////////////////////////////////////

    const caption =
      post.caption ||
      "";

    //////////////////////////////////////////////////
    // ❤️ LIKES
    //////////////////////////////////////////////////

    const likes =

      Number(

        post.likes_count ??
        post.likes ??
        0

      );
    //////////////////////////////////////////////////
// 💬 COMMENTS
//////////////////////////////////////////////////

const comments =

  Number(

    post.comments_count ??
    post.comments ??
    0

  );
  
    //////////////////////////////////////////////////
    // 🕒 TIME
    //////////////////////////////////////////////////

    const time =

      (
        typeof window.formatTime ===
        "function" &&

        post.created_at
      )

      ? window.formatTime(
          post.created_at
        )

      : "";

    //////////////////////////////////////////////////
    // 📄 CLONE TEMPLATE
    //////////////////////////////////////////////////

    const clone =

      template.content
      .cloneNode(true);

    //////////////////////////////////////////////////
    // 📦 MAIN POST
    //////////////////////////////////////////////////

    const el =
      clone.querySelector(
        ".post"
      );

    if(!el) return;

    //////////////////////////////////////////////////
    // 🆔 POST ID
    //////////////////////////////////////////////////

    el.id =
      "post-" + post.id;

    //////////////////////////////////////////////////
    // ⚡ FAST ELEMENTS
    //////////////////////////////////////////////////

    const avatarEl =
      clone.querySelector(
        ".avatar"
      );

    const usernameEl =
      clone.querySelector(
        ".username"
      );

    const img =
      clone.querySelector(
        ".postImage"
      );

    const likesEl =
      clone.querySelector(
        ".postLikes"
      );
     
     const commentsEl =
        clone.querySelector(
       ".postComments"
      );
     
    const timeEl =
      clone.querySelector(
        ".postTime"
      );

    const captionUser =
      clone.querySelector(
        ".postCaption b"
      );

    const captionText =
      clone.querySelector(
        ".captionText"
      );

    const likeBtn =
      clone.querySelector(
        ".likeBtn"
      );

    //////////////////////////////////////////////////
    // ❤️ FIX BUTTON STATE
    //////////////////////////////////////////////////

    requestAnimationFrame(()=>{

      const likedKey =
        "liked_" + post.id;

      const isLiked =

        localStorage.getItem(
          likedKey
        ) === "true";

      //////////////////////////////////////////////////
      // ❤️ BUTTON CLASS
      //////////////////////////////////////////////////

      if(isLiked){

        likeBtn?.classList.add(
          "liked"
        );

      }else{

        likeBtn?.classList.remove(
          "liked"
        );

      }

    });

    const commentBtn =
      clone.querySelector(
        ".commentBtn"
      );

    const shareBtn =
      clone.querySelector(
        ".shareBtn"
      );

    const saveBtn =
      clone.querySelector(
        ".saveBtn"
      );

    //////////////////////////////////////////////////
    // 👤 USER
    //////////////////////////////////////////////////

    avatarEl.src =
      avatar;

    usernameEl.textContent =
      username;

    //////////////////////////////////////////////////
    // 🖼️ IMAGE
    //////////////////////////////////////////////////

    img.loading =
      "lazy";

    img.decoding =
      "async";

    img.src =
      image;

    img.dataset.id =
      post.id;

    //////////////////////////////////////////////////
    // 🖼️ IMAGE LOADED
    //////////////////////////////////////////////////

    img.onload = ()=>{

      img.classList.remove(
        "loading"
      );

      img.classList.add(
        "loaded"
      );

    };

    //////////////////////////////////////////////////
    // ❌ IMAGE ERROR
    //////////////////////////////////////////////////

    img.onerror = ()=>{

      img.src =
        "https://via.placeholder.com/400x400?text=No+Image";

    };

    //////////////////////////////////////////////////
    // ❤️ LIKES UI
    //////////////////////////////////////////////////

    likesEl.textContent =
      likes + " likes";

    likesEl.dataset.likes =
      likes;

    likesEl.id =
      "likes-" + post.id;

     commentsEl.textContent =
  comments + " comments";

commentsEl.dataset.comments =
  comments;

commentsEl.id =
  "comments-" + post.id;
  
    //////////////////////////////////////////////////
    // 🕒 TIME
    //////////////////////////////////////////////////

    timeEl.textContent =
      time;

    //////////////////////////////////////////////////
    // 📝 CAPTION
    //////////////////////////////////////////////////

    captionUser.textContent =
      username;

    captionText.textContent =
      caption;

    //////////////////////////////////////////////////
    // ❤️ DOUBLE TAP LIKE
    //////////////////////////////////////////////////

    let lastTap = 0;

    img?.addEventListener(
      "click",
      ()=>{

        const now =
          Date.now();

        if(
          now - lastTap < 300
        ){

          //////////////////////////////////////////////////
          // ❤️ HEART
          //////////////////////////////////////////////////

          window.animateHeart?.(
            img
          );

          //////////////////////////////////////////////////
          // ❤️ LIKE
          //////////////////////////////////////////////////

          window.likePost?.(
            likeBtn,
            post.id
          );

        }

        lastTap = now;

      },
      {
        passive: true
      }
    );

    //////////////////////////////////////////////////
    // ❤️ LIKE BUTTON
    //////////////////////////////////////////////////

    likeBtn?.addEventListener(
      "click",
      ()=>{

        window.likePost?.(
          likeBtn,
          post.id
        );

      },
      {
        passive: true
      }
    );

    //////////////////////////////////////////////////
    // 💬 COMMENT
    //////////////////////////////////////////////////

    commentBtn?.addEventListener(
  "click",
  ()=>{

    window.openComments?.(post.id);

  },
      {
        passive: true
      }
    );

    //////////////////////////////////////////////////
    // 📤 SHARE
    //////////////////////////////////////////////////

    shareBtn?.addEventListener(
      "click",
      ()=>{

        window.sharePost?.(
          image
        );

      },
      {
        passive: true
      }
    );

    //////////////////////////////////////////////////
    // 💾 SAVE
    //////////////////////////////////////////////////

    saveBtn?.addEventListener(
      "click",
      ()=>{

        window.savePost?.(
          post.id
        );

      },
      {
        passive: true
      }
    );

    //////////////////////////////////////////////////
    // 🚀 ADD TO FRAGMENT
    //////////////////////////////////////////////////

    append

      ? fragment.appendChild(clone)

      : fragment.prepend(clone);

  });

  //////////////////////////////////////////////////
  // 🚀 SINGLE DOM INSERT
  //////////////////////////////////////////////////

  requestAnimationFrame(()=>{

    append

      ? feed.appendChild(fragment)

      : feed.prepend(fragment);

  });

  //////////////////////////////////////////////////
  // 🧹 AUTO CLEAN POSTS
  //////////////////////////////////////////////////

  const LIMIT =

    window.IS_LOW_END
    ? 10
    : 20;

  while(
    feed.children.length > LIMIT
  ){

    feed.removeChild(
      feed.firstElementChild
    );

  }

  //////////////////////////////////////////////////
  // 📊 STATE UPDATE
  //////////////////////////////////////////////////

  window.FEED_RENDER_STATE.page =
    page;

  console.log(

    "✅ Batch Rendered:",

    page,

    "| Posts:",

    batch.length

  );

}

//////////////////////////////////////////////////
// 🚀 LOAD NEXT BATCH
//////////////////////////////////////////////////

window.loadMoreFeed =
function(){

  if(
    window.FEED_RENDER_STATE
    .ended
  ){
    return;
  }

  if(
    window.FEED_RENDER_STATE
    .loading
  ){
    return;
  }

  window.FEED_RENDER_STATE
    .loading = true;

  const nextPage =

    window.FEED_RENDER_STATE
    .page + 1;

  requestIdleCallback(()=>{

    renderFeed(

      window.FEED_RENDER_STATE
      .posts,

      true,

      nextPage

    );

    window.FEED_RENDER_STATE
      .loading = false;

  });

};

//////////////////////////////////////////////////
// 🚀 AUTO SCROLL LOAD
//////////////////////////////////////////////////

window.initFeedInfiniteScroll =
function(){

  window.removeEventListener(
    "scroll",
    window.__FEED_SCROLL_HANDLER
  );

  window.__FEED_SCROLL_HANDLER =
  function(){

    const nearBottom =

      window.innerHeight +
      window.scrollY >=

      document.body.offsetHeight
      - 1200;

    if(nearBottom){

      window.loadMoreFeed?.();

    }

  };

  window.addEventListener(

    "scroll",

    window.__FEED_SCROLL_HANDLER,

    {
      passive: true
    }

  );

};

//////////////////////////////////////////////////
// 🌍 GLOBAL EXPORT
//////////////////////////////////////////////////

window.renderFeed =
renderFeed;

//////////////////////////////////////////////////
// 🎉 READY
//////////////////////////////////////////////////

console.log(
  "🎉 FEED RENDERER V2 READY"
);2

/* FILE: main_js/feedService.js */

console.log("🔥 FETCH SYSTEM READY");

//////////////////////////////////////////////////
// ⏱️ TIMEOUT WRAPPER
//////////////////////////////////////////////////

function fetchWithTimeout(
  promise,
  time = 5000
){

  return Promise.race([

    promise,

    new Promise((_, reject)=>

      setTimeout(()=>{

        reject(
          new Error("Timeout")
        );

      }, time)

    )

  ]);

}

//////////////////////////////////////////////////
// 🚀 LOAD FEED
//////////////////////////////////////////////////

async function loadFeed(){

  //////////////////////////////////////////////////
  // 🛑 STATE CHECK
  //////////////////////////////////////////////////

  if(!window.STATE) return;

  if(
    STATE.LOADING ||
    STATE.END
  ) return;

  //////////////////////////////////////////////////
  // 📦 FEED ELEMENT
  //////////////////////////////////////////////////

  const feed =
    document.getElementById(
      "feed"
    );

  if(!feed){

    console.warn(
      "⚠️ feed not found"
    );

    return;

  }

  //////////////////////////////////////////////////
  // 🔄 LOADING START
  //////////////////////////////////////////////////

  STATE.LOADING = true;

  window.showSkeleton?.();

  try{

    console.log(
      "🔥 FETCH START"
    );

    //////////////////////////////////////////////////
    // 🛑 SUPABASE CHECK
    //////////////////////////////////////////////////

    if(!window.supabaseClient){

      throw new Error(
        "Supabase not initialized"
      );

    }

    //////////////////////////////////////////////////
    // 📄 PAGINATION
    //////////////////////////////////////////////////

    const from =
      STATE.PAGE * STATE.LIMIT;

    const to =
      from + STATE.LIMIT - 1;

    //////////////////////////////////////////////////
    // 🚀 PAGE CONFIG
    //////////////////////////////////////////////////

    const postConfig =

      window.PAGE_CONFIG?.[
        window.CURRENT_PAGE
      ]?.post;

    //////////////////////////////////////////////////
    // 🛑 POST DISABLED
    //////////////////////////////////////////////////

    if(!postConfig?.enabled){

      console.warn(
        "⚠️ Post system disabled"
      );

      return;

    }

    //////////////////////////////////////////////////
    // 🚀 FETCH FROM PLUGIN
    //////////////////////////////////////////////////

    const data =
      await fetchWithTimeout(

        window.POST_PLUGIN?.fetch(
          from,
          to
        ),

      5000);

    //////////////////////////////////////////////////
    // 📭 NO DATA
    //////////////////////////////////////////////////

    if(
      !data ||
      data.length === 0
    ){

      //////////////////////////////////////////////////
      // 🛑 END
      //////////////////////////////////////////////////

      STATE.END = true;

      //////////////////////////////////////////////////
      // 😴 FALLBACK
      //////////////////////////////////////////////////

      if(

        STATE.PAGE === 0 &&

        postConfig?.fallback

      ){

        window.renderFeed?.(

          window.POST_PLUGIN?.fallback?.()

        , true);

      }

      //////////////////////////////////////////////////
      // 📭 EMPTY UI
      //////////////////////////////////////////////////

      else if(
        STATE.PAGE === 0
      ){

        showEmptyFeed?.();

      }

      return;

    }

    //////////////////////////////////////////////////
    // ✅ SUCCESS
    //////////////////////////////////////////////////

    STATE.FEED.push(
      ...data
    );

    window.renderFeed?.(
      data,
      true
    );

    STATE.PAGE++;

    console.log(
      "✅ FEED LOADED:",
      data.length
    );

  }catch(err){

    //////////////////////////////////////////////////
    // ❌ ERROR
    //////////////////////////////////////////////////

    console.error(
      "❌ FEED ERROR:",
      err.message
    );

    //////////////////////////////////////////////////
    // 😴 FALLBACK
    //////////////////////////////////////////////////

    const postConfig =

      window.PAGE_CONFIG?.[
        window.CURRENT_PAGE
      ]?.post;

    if(

      STATE.PAGE === 0 &&

      postConfig?.fallback

    ){

      window.renderFeed?.(

        window.POST_PLUGIN?.fallback?.()

      , true);

    }

    //////////////////////////////////////////////////
    // 📢 TOAST
    //////////////////////////////////////////////////

    window.toast?.(
      "Offline mode"
    );

  }finally{

    //////////////////////////////////////////////////
    // 🧹 CLEANUP
    //////////////////////////////////////////////////

    window.hideSkeleton?.();

    STATE.LOADING = false;

  }

}

//////////////////////////////////////////////////
// 🚀 CREATE POST
//////////////////////////////////////////////////

async function createPost(){

  //////////////////////////////////////////////////
  // 🛑 OFFLINE
  //////////////////////////////////////////////////

  if(!window.supabaseClient){

    window.toast?.(
      "Offline - cannot post"
    );

    return;

  }

  //////////////////////////////////////////////////
  // 📷 INPUTS
  //////////////////////////////////////////////////

  const image =
    prompt(
      "Enter image URL"
    );

  if(!image) return;

  const caption =

    prompt("Caption")

    || "";

  const username =

    prompt("Username")

    || "user";

  //////////////////////////////////////////////////
  // ⏳ LOADING
  //////////////////////////////////////////////////

  window.toast?.(
    "Uploading..."
  );

  try{

    //////////////////////////////////////////////////
    // 🚀 INSERT
    //////////////////////////////////////////////////

    const { data, error } =

      await fetchWithTimeout(

        supabaseClient

          .from("minigram_feed")

          .insert([{

            image_url:
              image,

            caption:
              caption,

            username:
              username,

            likes: 0

          }])

          .select()

          .single()

      , 5000);

    //////////////////////////////////////////////////
    // ❌ ERROR
    //////////////////////////////////////////////////

    if(error){

      throw error;

    }

    //////////////////////////////////////////////////
    // ✅ SUCCESS
    //////////////////////////////////////////////////

    window.toast?.(
      "Uploaded"
    );

    window.renderFeed?.(
      [data],
      false
    );

    if(window.STATE){

      STATE.FEED.unshift(
        data
      );

    }

  }catch(err){

    //////////////////////////////////////////////////
    // ❌ FAIL
    //////////////////////////////////////////////////

    console.error(
      "❌ CREATE POST ERROR:",
      err.message
    );

    window.toast?.(
      "Failed (offline?)"
    );

  }

}

//////////////////////////////////////////////////
// 📭 EMPTY FEED UI
//////////////////////////////////////////////////

function showEmptyFeed(){

  const feed =
    document.getElementById(
      "feed"
    );

  if(!feed) return;

  feed.innerHTML = `

    <div class="emptyFeed">

      <h3>
        No posts yet
      </h3>

      <p>
        Start by creating one 🚀
      </p>

    </div>

  `;

}

//////////////////////////////////////////////////
// 🌍 GLOBAL EXPORT
//////////////////////////////////////////////////

window.loadFeed =
  loadFeed;

window.createPost =
  createPost;

window.showEmptyFeed =
  showEmptyFeed;

//////////////////////////////////////////////////
// 💀 GLOBAL ERROR LOGGER
//////////////////////////////////////////////////

window.addEventListener?.(

  "error",

  e => {

    console.log(

      "💀 ERROR IN FILE:",

      e.filename,

      e.message

    );

  }

);

console.log(
  "createPost loaded:",
  typeof createPost
);

/* FILE: main_js/pageloader/virtualGrid.js */

console.log(" virtualGrid loaded");

window.VirtualGrid = function(container){

  const state = {
    container,
    data: [],
    pool: [],
    visibleCount: 18, //  6 rows � 3 cols (better UX)
    startIndex: 0,
    cols: 3,
    gap: 2,
    itemSize: 0
  };

  state.container.style.position = "relative";

  // ================================
  //  CALCULATE SIZE
  // ================================
  function calculateSize(){

    let width = state.container.clientWidth;

    if(!width || width < 100){
      width = state.container.getBoundingClientRect().width;
    }

    if(!width || width < 100){
      width = Math.min(window.innerWidth, 420);
    }

    const totalGap = state.gap * (state.cols - 1);

    state.itemSize = Math.floor((width - totalGap) / state.cols);
  }

  // ================================
  //  CREATE POOL
  // ================================
  function createPool(){

    for(let i=0;i<state.visibleCount;i++){

      const div = document.createElement("div");
      div.className = "post";

      const img = new Image();
      img.loading = "lazy";
      img.decoding = "async";

      div.appendChild(img);
      state.container.appendChild(div);

      state.pool.push(div);
    }
  }

  // ================================
  //  RENDER
  // ================================
  function render(){

    for(let i=0;i<state.pool.length;i++){

      const item = state.pool[i];
      const data = state.data[i];

      if(!data){
        item.style.display = "none";
        continue;
      }

      item.style.display = "block";

      const row = Math.floor(i / state.cols);
      const col = i % state.cols;

      const size = state.itemSize;

      item.style.position = "absolute";
      item.style.width = size + "px";
      item.style.height = size + "px";

      item.style.left = (col * (size + state.gap)) + "px";
      item.style.top = (row * (size + state.gap)) + "px";

      const img = item.querySelector("img");

      if(img.src !== data.image_url){
        img.src = data.image_url || "https://via.placeholder.com/300";
      }
    }
  }

  // ================================
  //  SET DATA (LIMITED HEIGHT)
  // ================================
  function setData(list){

    state.data = list || [];

    calculateSize();

    if(state.itemSize === 0){
      setTimeout(() => setData(state.data), 80);
      return;
    }

    const rows = Math.ceil(state.pool.length / state.cols);
    const height = rows * (state.itemSize + state.gap);

    //  LIMITED HEIGHT (NO INFINITE)
    state.container.style.height = height + "px";

    render();
  }

  // ================================
  //  RESIZE
  // ================================
  window.addEventListener("resize", () => {
    calculateSize();
    render();
  });

  createPool();

  return {
    setData
  };
};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));
