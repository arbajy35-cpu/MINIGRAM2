console.log(" POST ENGINE READY (STATE SINGLE SOURCE)");

//////////////////////////////////////////////////
//  POST PLUGIN (STATE ONLY — NO CACHE)
//////////////////////////////////////////////////

window.POST_PLUGIN = {

  async fetch(from = 0, to = 10, force = false) {

    try {

      if (!window.supabaseClient) return [];

      const { data, error } =
        await supabaseClient
          .from("minigram_feed")
          .select("id, username, caption, image_url, likes_count, comments_count, created_at")
          .order("created_at", { ascending: false })
          .range(from, to);

      if (error) {
        console.error("FETCH ERROR:", error);
        return [];
      }

      return data || [];

    } catch (err) {
      console.error("FETCH FAIL:", err);
      return [];
    }
  },

  async add(post) {

    try {

      const { data, error } =
        await supabaseClient
          .from("minigram_feed")
          .insert([{
            username: post.username,
            image_url: post.image_url,
            caption: post.caption,
            likes_count: 0,
            comments_count: 0,
            created_at: new Date().toISOString()
          }])
          .select()
          .single();

      if (error) {
        console.error(error);
        return null;
      }

      return data;

    } catch (err) {
      console.error(err);
      return null;
    }
  }

};

console.log(" POST ENGINE READY (NO CACHE, STATE CONTROLLED)");