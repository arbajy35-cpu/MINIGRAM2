(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  //////////////////////////////////////////////////
  // ✅ GLOBAL HANDLERS STORAGE FOR CLEANUP
  //////////////////////////////////////////////////
  window.__REELS_HANDLERS = {
    likeHandler: null,
    swipeHandlers: {
      touchstart: null,
      touchmove: null,
      touchend: null
    },
    container: null
  };

  // state.js
  var require_state = __commonJS({
    "state.js"() {
      console.log("📊 state.js loaded");
      window.REELS_STATE = {
        container: null,
        reels: [],
        data: [],
        index: 0,
        isFetching: false,
        lastId: null,
        hasMore: true
      };
      window.initReelsState = function(container) {
        window.REELS_STATE.container = container;
        console.log("✅ container set");
      };
      window.resetReelsState = function() {
        const s = window.REELS_STATE;
        s.reels = [];
        s.data = [];
        s.index = 0;
        s.hasMore = true;
      };
    }
  });

  // utils.js
  var require_utils = __commonJS({
    "utils.js"() {
      console.log("🔧 utils.js loaded");
      window.format = (n) => {
        if (n > 1e6) return (n / 1e6).toFixed(1) + "M";
        if (n > 1e3) return (n / 1e3).toFixed(1) + "K";
        return n;
      };
    }
  });

  // like.js
  var require_like = __commonJS({
    "like.js"() {
      console.log("❤️ like.js loaded");
      function toggleLike(el) {
        el.classList.toggle("liked");
      }

      //////////////////////////////////////////////////
      // ✅ REMOVE OLD HANDLER FIRST (PREVENT DUPLICATES)
      //////////////////////////////////////////////////
      if (window.__REELS_HANDLERS?.likeHandler) {
        document.removeEventListener("click", window.__REELS_HANDLERS.likeHandler);
        console.log("🧹 Removed old like handler");
      }

      //////////////////////////////////////////////////
      // ✅ CREATE NEW HANDLER & STORE IT
      //////////////////////////////////////////////////
      const likeHandler = (e) => {
        const btn = e.target.closest(".like");
        if (!btn) return;
        toggleLike(btn);
      };

      window.__REELS_HANDLERS.likeHandler = likeHandler;
      document.addEventListener("click", likeHandler);
      window.toggleLike = toggleLike;

      console.log("✅ New like handler attached");
    }
  });

  // progress.js
  var require_progress = __commonJS({
    "progress.js"() {
      console.log("⏱️ progress.js loaded");
      function startProgress(reel, video) {
        const bar = reel.querySelector(".bar");
        if (!bar) return;
        function loop() {
          if (!video.duration) return requestAnimationFrame(loop);
          bar.style.width = video.currentTime / video.duration * 100 + "%";
          if (!video.paused) {
            requestAnimationFrame(loop);
          }
        }
        loop();
      }
      window.startProgress = startProgress;
    }
  });

  // video.js
  var require_video = __commonJS({
    "video.js"() {
      console.log("🎥 video.js loaded");
      window.preloadNext = function() {
        const s = window.REELS_STATE;
        const next = s.reels[s.index + 1];
        if (next) {
          const v = next.querySelector("video");
          if (v) v.preload = "auto";
        }
      };
    }
  });

  // swipe.js
  var require_swipe = __commonJS({
    "swipe.js"() {
      console.log("👆 swipe.js loaded");
      function initSwipe() {
        const s = window.REELS_STATE;
        const el = s.container;

        if (!el) {
          console.warn("⚠️ Swipe container not found");
          return;
        }

        let startY = 0;
        let delta = 0;
        let dragging = false;

        //////////////////////////////////////////////////
        // ✅ REMOVE OLD HANDLERS FIRST
        //////////////////////////////////////////////////
        if (window.__REELS_HANDLERS?.swipeHandlers?.touchstart) {
          el.removeEventListener("touchstart", window.__REELS_HANDLERS.swipeHandlers.touchstart);
          el.removeEventListener("touchmove", window.__REELS_HANDLERS.swipeHandlers.touchmove);
          el.removeEventListener("touchend", window.__REELS_HANDLERS.swipeHandlers.touchend);
          console.log("🧹 Removed old swipe handlers");
        }

        //////////////////////////////////////////////////
        // ✅ CREATE NEW HANDLERS & STORE THEM
        //////////////////////////////////////////////////
        const touchStartHandler = (e) => {
          startY = e.touches[0].clientY;
          dragging = true;
        };

        const touchMoveHandler = (e) => {
          if (!dragging) return;
          delta = e.touches[0].clientY - startY;
        };

        const touchEndHandler = () => {
          if (Math.abs(delta) > 80) {
            s.index += delta < 0 ? 1 : -1;
          }
          s.index = Math.max(0, Math.min(s.index, s.reels.length - 1));
          window.render?.();
          dragging = false;
          delta = 0;
        };

        window.__REELS_HANDLERS.swipeHandlers.touchstart = touchStartHandler;
        window.__REELS_HANDLERS.swipeHandlers.touchmove = touchMoveHandler;
        window.__REELS_HANDLERS.swipeHandlers.touchend = touchEndHandler;
        window.__REELS_HANDLERS.container = el;

        el.addEventListener("touchstart", touchStartHandler);
        el.addEventListener("touchmove", touchMoveHandler);
        el.addEventListener("touchend", touchEndHandler);

        console.log("✅ New swipe handlers attached");
      }
      window.initSwipe = initSwipe;
    }
  });

  // create.js
  var require_create = __commonJS({
    "create.js"() {
      console.log("🎬 create.js loaded");
      function createReel(data) {
        const reel = document.createElement("div");
        reel.className = "reel";
        const video = document.createElement("video");
        video.src = data.video;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        reel.appendChild(video);
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.innerHTML = `
    <div class="user">${data.user || "user"}</div>
    <div class="caption">${data.caption || ""}</div>
    <div class="likes">❤️ ${data.likes || 0}</div>
  `;
        reel.appendChild(overlay);
        return reel;
      }
      window.createReel = createReel;
    }
  });

  // append.js
  var require_append = __commonJS({
    "append.js"() {
      console.log("📦 append.js loaded");
      function appendReels(list) {
        const s = window.REELS_STATE;
        if (!s.container) return;
        list.forEach((d) => {
          const reel = window.createReel(d);
          s.container.appendChild(reel);
          s.reels.push(reel);
        });
      }
      window.appendReels = appendReels;
    }
  });

  // fetch.js - ✅ WITH PAGINATION
  var require_fetch = __commonJS({
    "fetch.js"() {
      console.log("📡 fetch.js loaded");
      async function fetchReels() {
        const s = window.REELS_STATE;

        //////////////////////////////////////////////////
        // ✅ PAGINATION CHECK
        //////////////////////////////////////////////////
        if (!window.supabase || s.isFetching || !s.hasMore) {
          if (!window.supabase) {
            console.log("⚠️ offline mode");
          }
          if (!s.hasMore) {
            console.log("📭 No more reels to load");
          }
          return window.loadDummy?.();
        }

        s.isFetching = true;

        try {
          //////////////////////////////////////////////////
          // ✅ CURSOR-BASED PAGINATION
          //////////////////////////////////////////////////
          let query = window.supabase
            .from("reels")
            .select("*")
            .order('id', { ascending: false })
            .limit(10);

          // Use cursor for pagination
          if (s.lastId) {
            query = query.lt('id', s.lastId);
          }

          const { data, error } = await query;

          if (error) {
            console.error("Fetch error:", error);
            return window.loadDummy?.();
          }

          if (!data?.length) {
            console.warn("⚠️ No more reels");
            s.hasMore = false;
            return window.loadDummy?.();
          }

          //////////////////////////////////////////////////
          // ✅ UPDATE CURSOR FOR NEXT FETCH
          //////////////////////////////////////////////////
          s.lastId = data[data.length - 1].id;

          const existing = new Set(s.data.map((x) => x.id));
          const fresh = data.filter((d) => !existing.has(d.id));

          if (fresh.length === 0) {
            console.warn("⚠️ All reels already loaded");
            s.hasMore = false;
            return;
          }

          s.data.push(...fresh);
          window.appendReels(fresh);
          window.render?.();

          console.log(`✅ Loaded ${fresh.length} new reels`);
        } catch (e) {
          console.log("fetch fail → dummy", e);
          window.loadDummy?.();
        }

        s.isFetching = false;
      }
      window.fetchReels = fetchReels;
    }
  });

  // main.js
  var require_main = __commonJS({
    "main.js"() {
      var state = __toESM(require_state());
      var utils = __toESM(require_utils());
      var like = __toESM(require_like());
      var progress = __toESM(require_progress());
      var video = __toESM(require_video());
      var swipe = __toESM(require_swipe());
      var create = __toESM(require_create());
      var append = __toESM(require_append());
      var fetch = __toESM(require_fetch());
      console.log("🎉 All reels modules loaded");
    }
  });

  require_main();
})();

//////////////////////////////////////////////////
// ✅ CLEANUP FUNCTION - REMOVE ALL REELS LISTENERS
//////////////////////////////////////////////////
window.reelsDestroy = function() {
  console.log("🧹 Destroying reels...");

  try {
    //////////////////////////////////////////////////
    // 1️⃣ REMOVE LIKE HANDLER
    //////////////////////////////////////////////////
    if (window.__REELS_HANDLERS?.likeHandler) {
      document.removeEventListener("click", window.__REELS_HANDLERS.likeHandler);
      console.log("✅ Removed like handler");
    }

    //////////////////////////////////////////////////
    // 2️⃣ REMOVE SWIPE HANDLERS
    //////////////////////////////////////////////////
    if (window.__REELS_HANDLERS?.swipeHandlers && window.__REELS_HANDLERS?.container) {
      const handlers = window.__REELS_HANDLERS.swipeHandlers;
      const container = window.__REELS_HANDLERS.container;

      if (handlers.touchstart) {
        container.removeEventListener("touchstart", handlers.touchstart);
      }
      if (handlers.touchmove) {
        container.removeEventListener("touchmove", handlers.touchmove);
      }
      if (handlers.touchend) {
        container.removeEventListener("touchend", handlers.touchend);
      }

      console.log("✅ Removed swipe handlers");
    }

    //////////////////////////////////////////////////
    // 3️⃣ RESET REELS STATE
    //////////////////////////////////////////////////
    if (window.REELS_STATE) {
      window.REELS_STATE = {
        container: null,
        reels: [],
        data: [],
        index: 0,
        isFetching: false,
        lastId: null,
        hasMore: true
      };
      console.log("✅ Reset reels state");
    }

    //////////////////////////////////////////////////
    // 4️⃣ CLEAR HANDLERS STORAGE
    //////////////////////////////////////////////////
    window.__REELS_HANDLERS = {
      likeHandler: null,
      swipeHandlers: {
        touchstart: null,
        touchmove: null,
        touchend: null
      },
      container: null
    };

    console.log("🎉 Reels cleanup complete!");

  } catch (err) {
    console.error("❌ Error during reels cleanup:", err);
  }
};

//////////////////////////////////////////////////
// ✅ ERROR LOGGER
//////////////////////////////////////////////////
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN REELS:", e.filename, e.message));

console.log("🚀 REELS BUNDLE V2 READY - WITH CLEANUP & PAGINATION");
