//////////////////////////////////////////////////
// 🚀 SUPABASE INIT
//////////////////////////////////////////////////

if (!window.supabaseClient) {

  try {

    if (
      !window.supabase ||
      !window.supabase.createClient
    ) {
      throw new Error("Supabase Library Missing");
    }

    //////////////////////////////////////////////////
    // CREATE CLIENT
    //////////////////////////////////////////////////

    window.supabaseClient =
      window.supabase.createClient(
        "https://lfdboicfddwpmtvqbomw.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZGJvaWNmZGR3cG10dnFib213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNDA2OTcsImV4cCI6MjA5NTYxNjY5N30.Goca85x1ZMyjwpefOU2UonGgHcq74uULcFjd_Uqr8QM",
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false
          }
        }
      );

    //////////////////////////////////////////////////
    // GLOBAL ACCESS
    //////////////////////////////////////////////////

    window.db = window.supabaseClient;

    console.log("✅ Supabase Ready");

  } catch (err) {

    console.error(
      "Supabase Init Error:",
      err
    );

  }

}

//////////////////////////////////////////////////
// GLOBAL SHORTCUT
//////////////////////////////////////////////////

window.db = window.supabaseClient;