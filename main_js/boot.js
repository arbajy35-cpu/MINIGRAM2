//////////////////////////////////////////////////
// 🚀 BOOT START (OPTIMIZED VERSION)
//////////////////////////////////////////////////

console.log("🚀 OPTIMIZED BOOT START");

//////////////////////////////////////////////////
// 💤 REQUEST IDLE CALLBACK FALLBACK
//////////////////////////////////////////////////

window.requestIdleCallback =
window.requestIdleCallback ||
function(cb){

  return setTimeout(()=>{

    cb({
      timeRemaining: () => 0
    });

  }, 1);

};

//////////////////////////////////////////////////
// 📜 SMART SCRIPT LOADER
//////////////////////////////////////////////////

window.__LOADED_SCRIPTS =
window.__LOADED_SCRIPTS || new Map();

function loadScript(src, force = false){

  return new Promise((resolve, reject)=>{

    //////////////////////////////////////////////////
    // 🔥 REMOVE OLD SCRIPT
    //////////////////////////////////////////////////

    if(force){

      const old =
        document.querySelector(
          `script[data-src="${src}"]`
        );

      if(old){

        old.remove();

        console.log(
          "♻️ Removed:",
          src
        );

      }

      window.__LOADED_SCRIPTS.delete(src);

    }

    //////////////////////////////////////////////////
    // ♻️ CACHE HIT
    //////////////////////////////////////////////////

    if(
      window.__LOADED_SCRIPTS.has(src)
    ){

      console.log(
        "♻️ Cached:",
        src
      );

      return resolve();

    }

    //////////////////////////////////////////////////
    // 📜 CREATE SCRIPT
    //////////////////////////////////////////////////

    const s =
      document.createElement(
        "script"
      );

    //////////////////////////////////////////////////
    // 🚀 CACHE VERSION
    //////////////////////////////////////////////////

    s.src =
      src +
      "?v=1";

    s.dataset.src = src;

    s.defer = true;

    //////////////////////////////////////////////////
    // ✅ LOADED
    //////////////////////////////////////////////////

    s.onload = ()=>{

      window.__LOADED_SCRIPTS
        .set(src, true);

      console.log(
        "✅ Loaded:",
        src
      );

      resolve();

    };

    //////////////////////////////////////////////////
    // ❌ ERROR
    //////////////////////////////////////////////////

    s.onerror = ()=>{

      console.error(
        "❌ Failed:",
        src
      );

      reject(src);

    };

    //////////////////////////////////////////////////
    // 📦 APPEND
    //////////////////////////////////////////////////

    document.body.appendChild(s);

  });

}

//////////////////////////////////////////////////
// 📱 LOW-END DETECTION
//////////////////////////////////////////////////

window.IS_LOW_END =

  (
    navigator.deviceMemory &&
    navigator.deviceMemory <= 4
  ) ||

  (
    navigator.hardwareConcurrency &&
    navigator.hardwareConcurrency <= 4
  );

console.log(
  "📱 LOW END:",
  window.IS_LOW_END
);

//////////////////////////////////////////////////
// 🌐 NETWORK DETECTION
//////////////////////////////////////////////////

window.NETWORK_TYPE =
navigator.connection?.effectiveType ||
"unknown";

console.log(
  "🌐 NETWORK:",
  window.NETWORK_TYPE
);

//////////////////////////////////////////////////
// 🚀 START APP UI
//////////////////////////////////////////////////

async function startApp(){

  try{

    //////////////////////////////////////////////////
    // 🔥 SHOW UI FAST
    //////////////////////////////////////////////////

    document
      .getElementById("appbar")
      ?.classList
      .remove("hidden");

    document
      .getElementById("bottomNav")
      ?.classList
      .remove("hidden");

    //////////////////////////////////////////////////
    // 🎨 INIT ICONS
    //////////////////////////////////////////////////

    window.initIcons?.();

    //////////////////////////////////////////////////
    // 🔥 REMOVE LOADER FAST
    //////////////////////////////////////////////////

    const loader =
      document.getElementById(
        "loader"
      );

    if(loader){

      loader.remove();

    }

    //////////////////////////////////////////////////
    // 🚀 LOAD HOME IN BACKGROUND
    //////////////////////////////////////////////////

    requestIdleCallback(
      async ()=>{

        try{

          //////////////////////////////////////////////////
          // 📦 ENSURE CONFIG
          //////////////////////////////////////////////////

          await window
            .ensurePageConfig?.(
              "home"
            );

          //////////////////////////////////////////////////
          // 🏠 LOAD PAGE
          //////////////////////////////////////////////////

          if(
            typeof window.loadPage ===
            "function"
          ){

            await window.loadPage(
              "home"
            );

          }

          console.log(
            "🏠 HOME LOADED"
          );

        }catch(e){

          console.error(
            "❌ HOME LOAD FAIL:",
            e
          );

        }

      }
    );

    console.log(
      "🚀 UI READY"
    );

  }catch(e){

    console.error(
      "❌ START ERROR:",
      e
    );

  }

}

//////////////////////////////////////////////////
// 🚀 MAIN BOOT
//////////////////////////////////////////////////

async function boot(){

  try{

    //////////////////////////////////////////////////
    // ⚡ PARALLEL CRITICAL LOAD
    //////////////////////////////////////////////////

    await Promise.all([

  // 🔥 3. CORE SYSTEM
  loadScript("main_js/bundles/core.bundle.js"),
  loadScript("main_js/bundles/ui.bundle.js"),

  // 🔥 4. CONFIG SYSTEM
  loadScript("main_js/pageloader/config.js"),
  loadScript("main_js/config_Loader.js")

]);
   
await loadScript(
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
);

await loadScript(
  "supabase.js"
);

 
    //////////////////////////////////////////////////
// 🔐 AUTH CHECK
//////////////////////////////////////////////////

try {

  const client =
    window.supabaseClient ||
    window.db;

  if (!client) {

    console.error(
      "❌ SUPABASE CLIENT NOT FOUND"
    );

    document
      .getElementById("loader")
      ?.remove();

    window.location.href =
      "./sighup/signup.html";

    return;

  }

  const {
    data: { session }
  } = await client.auth.getSession();

  if (!session) {

    console.log(
      "🔒 USER NOT LOGGED IN"
    );

    document
      .getElementById("loader")
      ?.remove();

    setTimeout(() => {

      window.location.href =
        "./sighup/signup.html";

    }, 300);

    return;

  }

  console.log(
    "✅ LOGGED IN:",
    session.user?.email
  );

} catch (e) {

  console.error(
    "❌ SESSION CHECK FAILED:",
    e
  );

  document
    .getElementById("loader")
    ?.remove();

  window.location.href =
    "./sighup/signup.html";

  return;

}
     
    //////////////////////////////////////////////////
    // 🚀 PAGE CORE
    //////////////////////////////////////////////////

    await Promise.all([

      loadScript(
        "main_js/pageLoader.js"
      ),

      loadScript(
        "main_js/pageloader/cssLoader.js"
      ),

      loadScript(
        "main_js/pageloader/jsLoader.js"
      ),

      loadScript(
        "main_js/pageloader/home.js"
      ),
      
      loadScript(
        "main_js/minigramPost.js"
      ),
      loadScript(
        "global/icons.js"
      )

    ]);

    //////////////////////////////////////////////////
    // 🚀 OPTIONAL SYSTEMS
    //////////////////////////////////////////////////

    loadScript(
      "main_js/pageloader/loader.js"
    );

    console.log(
      "🎉 CRITICAL BOOT COMPLETE"
    );

    //////////////////////////////////////////////////
    // 🚀 START UI IMMEDIATELY
    //////////////////////////////////////////////////

    startApp();

    //////////////////////////////////////////////////
    // 💤 LOAD HEAVY SYSTEMS LATER
    //////////////////////////////////////////////////

    requestIdleCallback(
      async ()=>{

        try{

          //////////////////////////////////////////////////
          // 🚀 LOW-END OPTIMIZATION
          //////////////////////////////////////////////////

          if(window.IS_LOW_END){

            console.log(
              "📱 LOW-END MODE ENABLED"
            );

          }

          //////////////////////////////////////////////////
          // 🚀 LOAD FEED SYSTEM
          //////////////////////////////////////////////////

          await loadScript(
            "main_js/bundles/feed.bundle.js"
          );

          //////////////////////////////////////////////////
          // 🚀 LOAD ADAPTIVE
          //////////////////////////////////////////////////

          await loadScript(
            "main_js/bundles/adaptive.bundle.js"
          );

          //////////////////////////////////////////////////
          // 🌐 NETWORK CHECK
          //////////////////////////////////////////////////

          const slowNetwork =

            window.NETWORK_TYPE ===
            "slow-2g" ||

            window.NETWORK_TYPE ===
            "2g";

          //////////////////////////////////////////////////
          // 🚀 REALTIME ONLY ON GOOD NETWORK
          //////////////////////////////////////////////////

          if(
            navigator.onLine &&
            !slowNetwork
          ){

            await loadScript(
              "main_js/realtime.js"
            );

            await loadScript(
              "main_js/pageloader/realtime.js"
            );

            console.log(
              "🚀 REALTIME ENABLED"
            );

          }else{

            console.log(
              "📴 Realtime Skipped"
            );

          }

          console.log(
            "🚀 IDLE SYSTEMS READY"
          );

        }catch(e){

          console.error(
            "❌ IDLE LOAD FAIL:",
            e
          );

        }

      }
    );

  }catch(e){

    console.error(
      "🔥 BOOT CRASH:",
      e
    );

  }

}

//////////////////////////////////////////////////
// 🚀 START
//////////////////////////////////////////////////

if(
  document.readyState ===
  "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    boot
  );

}else{

  boot();

}

//////////////////////////////////////////////////
// 💀 GLOBAL ERROR LOGGER
//////////////////////////////////////////////////

window.addEventListener?.(

  "error",

  e => {

    console.log(

      "💀 ERROR:",

      e.filename,

      e.message,

      "LINE:",

      e.lineno

    );

  }

);