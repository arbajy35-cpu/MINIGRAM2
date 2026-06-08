

/* FILE: main_js/ui.js */

//////////////////////////////////////////////////
// 🎨 UI SYSTEM (CLEAN VERSION)
//////////////////////////////////////////////////

console.log(
  "🎨 ui.js loaded"
);

//////////////////////////////////////////////////
// 💬 CHAT NAVIGATION
//////////////////////////////////////////////////

window.openChat =
function(){

  //////////////////////////////////////////////////
  // 🚀 LOAD CHAT PAGE
  //////////////////////////////////////////////////

  window.loadPage?.(
    "chat"
  );

};

//////////////////////////////////////////////////
// 🔔 NOTIFICATIONS NAVIGATION
//////////////////////////////////////////////////

window.openNotifications =
function(){

  //////////////////////////////////////////////////
  // 🚀 LOAD NOTIFICATIONS PAGE
  //////////////////////////////////////////////////

  window.loadPage?.(
    "notifications"
  );

};

//////////////////////////////////////////////////
// 🧹 GLOBAL PAGE CLEANER
//////////////////////////////////////////////////

window.cleanupPage =
async function(){

  try{

    //////////////////////////////////////////////////
    // 📄 CURRENT PAGE
    //////////////////////////////////////////////////

    const page =
      window.CURRENT_PAGE;

    if(!page)
      return;

    //////////////////////////////////////////////////
    // 📦 DESTROY FUNCTION NAME
    //////////////////////////////////////////////////

    const destroyName =
      page + "Destroy";

    //////////////////////////////////////////////////
    // 📦 FUNCTION
    //////////////////////////////////////////////////

    const destroyFn =

      window.FUNCTIONS?.[
        destroyName
      ];

    //////////////////////////////////////////////////
    // 🚀 RUN DESTROY
    //////////////////////////////////////////////////

    if(
      typeof destroyFn ===
      "function"
    ){

      await destroyFn();

      console.log(
        `🧹 ${page} cleaned`
      );

    }

  }catch(e){

    console.error(
      "❌ cleanupPage error:",
      e
    );

  }

};

//////////////////////////////////////////////////
// 📱 SMALL UI HELPERS
//////////////////////////////////////////////////

window.safeHide =
function(id){

  const el =
    document.getElementById(id);

  if(el){

    el.style.display =
      "none";

  }

};

window.safeShow =
function(id){

  const el =
    document.getElementById(id);

  if(el){

    el.style.display =
      "";

  }

};

//////////////////////////////////////////////////
// 🛡️ GLOBAL ERROR LOGGER
//////////////////////////////////////////////////

if(
  !window.__UI_ERROR_TRACKER
){

  window.__UI_ERROR_TRACKER =
    true;

  window.addEventListener?.(

    "error",

    e => {

      console.log(

        "💀 ERROR IN FILE:",

        e.filename,

        e.message,

        "LINE:",

        e.lineno

      );

    }

  );

}

//////////////////////////////////////////////////
// 🎉 READY
//////////////////////////////////////////////////

console.log(
  "🔥 UI SYSTEM READY"
);

/* FILE: main_js/pageloader/navigation.js */

window.initNavigation = function(){

  const homeBtn = document.getElementById("homeBtn");
  if(homeBtn){
    homeBtn.onclick = () => loadPage("home");
  }

  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.onclick = () => loadPage("search");
  }

  const profileBtn = document.getElementById("profileBtn");
  if (profileBtn) {
    profileBtn.onclick = () => loadPage("profile");
  }

  const reelsBtn = document.getElementById("reelsBtn");
  if (reelsBtn) {
    reelsBtn.onclick = () => loadPage("reels");
  }

};
window.addEventListener && window.addEventListener("error", e => console.log("💀 ERROR IN FILE:", e.filename, e.message));


/* FILE: main_js/pageloader/loader.js */

//////////////////////////////////////////////////
// 🚀 OPTIMIZED PLUGIN LOADER
//////////////////////////////////////////////////

console.log(
  "🚀 Optimized Plugin Loader Ready"
);

//////////////////////////////////////////////////
// 🌍 GLOBAL CACHE
//////////////////////////////////////////////////

window.__PLUGIN_CACHE =
window.__PLUGIN_CACHE || new Map();

window.__PLUGIN_LOADING =
window.__PLUGIN_LOADING || new Set();

//////////////////////////////////////////////////
// 📱 LOW-END DETECTION
//////////////////////////////////////////////////

window.IS_LOW_END =

  window.IS_LOW_END ||

  (
    navigator.deviceMemory &&
    navigator.deviceMemory <= 4
  );

//////////////////////////////////////////////////
// 🌐 NETWORK DETECTION
//////////////////////////////////////////////////

window.NETWORK_TYPE =

  navigator.connection
  ?.effectiveType ||

  "unknown";

//////////////////////////////////////////////////
// 🚀 SAFE LOAD SCRIPT
//////////////////////////////////////////////////

async function safeLoad(src, force = false){

  //////////////////////////////////////////////////
  // ♻️ ALREADY LOADED
  //////////////////////////////////////////////////

  if(
    window.__PLUGIN_CACHE.has(src)
    &&
    !force
  ){

    console.log(
      "♻️ Plugin Cached:",
      src
    );

    return true;

  }

  //////////////////////////////////////////////////
  // ⏳ ALREADY LOADING
  //////////////////////////////////////////////////

  if(
    window.__PLUGIN_LOADING.has(src)
  ){

    console.log(
      "⏳ Already Loading:",
      src
    );

    return true;

  }

  //////////////////////////////////////////////////
  // 🚀 START LOAD
  //////////////////////////////////////////////////

  window.__PLUGIN_LOADING.add(src);

  try{

    await loadScript(
      src,
      force
    );

    //////////////////////////////////////////////////
    // 💾 SAVE CACHE
    //////////////////////////////////////////////////

    window.__PLUGIN_CACHE
      .set(src, true);

    console.log(
      "✅ Plugin Loaded:",
      src
    );

    return true;

  }catch(e){

    console.error(
      "❌ Plugin Failed:",
      src
    );

    return false;

  }finally{

    //////////////////////////////////////////////////
    // 🧹 CLEANUP
    //////////////////////////////////////////////////

    window.__PLUGIN_LOADING
      .delete(src);

  }

}

//////////////////////////////////////////////////
// 🚀 LOAD PAGE PLUGINS
//////////////////////////////////////////////////

async function loadPlugins(config){

  try{

    //////////////////////////////////////////////////
    // 🛑 INVALID CONFIG
    //////////////////////////////////////////////////

    if(!config){

      console.warn(
        "⚠️ No config"
      );

      return;

    }

    //////////////////////////////////////////////////
    // 🚀 PAGE NAME
    //////////////////////////////////////////////////

    const page =
      config.name ||
      "unknown";

    console.log(
      "🚀 Plugin Load:",
      page
    );

    //////////////////////////////////////////////////
    // 🛑 NO POST SYSTEM
    //////////////////////////////////////////////////

    if(
      !config.post?.enabled
    ){

      console.log(
        "⚠️ Post Plugins Disabled"
      );

      return;

    }

    //////////////////////////////////////////////////
    // 📱 LOW-END MODE
    //////////////////////////////////////////////////

    if(window.IS_LOW_END){

      console.log(
        "📱 LOW-END OPTIMIZATION ENABLED"
      );

    }

    //////////////////////////////////////////////////
    // 🌐 SLOW NETWORK
    //////////////////////////////////////////////////

    const slowNetwork =

      window.NETWORK_TYPE ===
      "slow-2g" ||

      window.NETWORK_TYPE ===
      "2g";

    //////////////////////////////////////////////////
    // 🚀 LOAD CORE POST SYSTEM
    //////////////////////////////////////////////////

    console.log(
      "🚀 Loading Post Core"
    );

    //////////////////////////////////////////////////
    // ⚡ PARALLEL LOAD
    //////////////////////////////////////////////////

    await Promise.all([

      safeLoad(
        "page_config/plugins/post/post_optimizer.js"
      ),

      safeLoad(
        "page_config/plugins/post/post.js"
      )

    ]);

    //////////////////////////////////////////////////
    // 📡 REALTIME ONLY WHEN NEEDED
    //////////////////////////////////////////////////

    if(
      config.post?.realtime
      &&
      navigator.onLine
      &&
      !slowNetwork
      &&
      !window.IS_LOW_END
    ){

      console.log(
        "📡 Loading Realtime"
      );

      //////////////////////////////////////////////////
      // 💤 IDLE LOAD
      //////////////////////////////////////////////////

      requestIdleCallback(
        async ()=>{

          await safeLoad(

            "page_config/plugins/post/realtime_post.js"

          );

        }
      );

    }

    //////////////////////////////////////////////////
    // 🚀 PRELOAD NEXT SYSTEMS
    //////////////////////////////////////////////////

    requestIdleCallback(
      async ()=>{

        try{

          //////////////////////////////////////////////////
          // 📦 PRELOAD FUTURE PLUGINS
          //////////////////////////////////////////////////

          if(
            page === "home"
          ){

            console.log(
              "🚀 Background Preload"
            );

          }

        }catch(e){

          console.error(
            "❌ Preload Error:",
            e
          );

        }

      }
    );

    //////////////////////////////////////////////////
    // ✅ READY
    //////////////////////////////////////////////////

    console.log(
      "✅ Plugins Ready:",
      page
    );

  }catch(err){

    //////////////////////////////////////////////////
    // ❌ ERROR
    //////////////////////////////////////////////////

    console.error(
      "❌ Plugin Error:",
      err.message
    );

  }

}

//////////////////////////////////////////////////
// 🌍 GLOBAL EXPORT
//////////////////////////////////////////////////

window.loadPlugins =
loadPlugins;

//////////////////////////////////////////////////
// 🎉 READY
//////////////////////////////////////////////////

console.log(
  "🎉 Optimized Plugin System Ready"
);