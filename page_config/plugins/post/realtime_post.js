console.log("🔥 realtime FAST loaded");

//////////////////////////////////////////////////
// 🚀 REALTIME ENGINE (STATE DRIVEN)
//////////////////////////////////////////////////

window.startRealtimePosts = function () {

  console.log("⚡ Realtime ENABLED");

  // prevent duplicate subscriptions
  if (window.__realtimeSubscribed) return;
  window.__realtimeSubscribed = true;

  if (!window.supabaseClient) {
    console.error("Supabase not ready");
    return;
  }

  supabaseClient
    .channel("minigram-feed")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "minigram_feed"
      },
      (payload) => {

        const post = payload.new;
        if (!post?.id) return;

        console.log("⚡ New post:", post.id);

        //////////////////////////////////////////////////
        // 💣 1. UPDATE STATE ONLY (SOURCE OF TRUTH)
        //////////////////////////////////////////////////

        if (window.STATE) {

          // prevent duplicates
          const exists = STATE.FEED.find(p => p.id === post.id);

          if (!exists) {
            STATE.FEED.unshift(post);
          }
        }

        //////////////////////////////////////////////////
        // 💣 2. UI UPDATE FROM STATE (NOT SINGLE POST)
        //////////////////////////////////////////////////

        if (typeof window.renderFeed === "function") {
          window.renderFeed(STATE.FEED, true);
        }

        //////////////////////////////////////////////////
        // 📡 3. BROADCAST EVENT (optional modules)
        //////////////////////////////////////////////////

        window.dispatchEvent(
          new CustomEvent("new-post", {
            detail: post
          })
        );

      }
    )
    .subscribe();
};

//////////////////////////////////////////////////
// 🛑 STOP REALTIME
//////////////////////////////////////////////////

window.stopRealtimePosts = function () {

  if (!window.supabaseClient) return;

  supabaseClient.removeAllChannels();
  window.__realtimeSubscribed = false;

  console.log("🛑 Realtime stopped");
};

//////////////////////////////////////////////////
// 🎉 READY
//////////////////////////////////////////////////

console.log("🚀 REALTIME ENGINE READY (STATE DRIVEN)");