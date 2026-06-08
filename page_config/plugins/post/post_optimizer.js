console.log("⚡ post_optimizer FAST LOADED");

//////////////////////////////////////////////////
// 🚀 OPTIMIZER (NO HEAVY MAP / NO EXTRA GC)
//////////////////////////////////////////////////

window.optimizePosts = function (posts = []) {

  if (!Array.isArray(posts)) return [];

  const seen = new Set();
  const out = [];

  for (let i = 0; i < posts.length; i++) {

    const p = posts[i];
    if (!p || !p.id) continue;

    // ⚡ duplicate skip (FAST O(1))
    if (seen.has(p.id)) continue;
    seen.add(p.id);

    // ==============================
    // ⚡ LIGHTWEIGHT TRANSFORM
    // ==============================
    out.push({
      id: p.id,

      username: (p.username || "user").slice(0, 20),

      caption: (p.caption || "").slice(0, 120),

      likes: Number(p.likes_count ?? p.likes ?? 0),

      comments: Number(p.comments_count ?? p.comments ?? 0),

      created_at: p.created_at,

      image_url: p.image_url || "",

      // ⚡ stable avatar (no recompute heavy encode calls)
      avatar_url:
        "https://i.pravatar.cc/80?u=" + (p.username || "user")
    });
  }

  return out;
};

//////////////////////////////////////////////////
// ⚡ PRELOAD BOOST (KEEP HERE OR post.js)
//////////////////////////////////////////////////

window.preloadNextPosts = async function () {

  if (!window.POST_PLUGIN) return;

  const nextFrom = window.POST_CACHE?.length || 0;
  const nextTo = nextFrom + 10;

  try {
    await window.POST_PLUGIN.fetch(nextFrom, nextTo);
  } catch (e) {
    // silent fail (no UI lag)
  }
};

//////////////////////////////////////////////////
// 🎉 READY
//////////////////////////////////////////////////

console.log("🚀 POST OPTIMIZER READY (FAST MODE)");