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