alert(
  "window.supabaseClient = " +
  typeof window.supabaseClient
);

alert(
  "window.supabase = " +
  typeof window.supabase
);

// ---------------- SIGNUP BUTTON ----------------

const signupBtn =
  document.getElementById("signupBtn");

signupBtn?.addEventListener(
  "click",
  async () => {

    try {

      alert("Signup Started");

      const client =
        window.supabaseClient;

      alert(
        "CLIENT: " +
        typeof client
      );

      alert(
        "AUTH: " +
        typeof client?.auth
      );

      if (!client) {

        alert(
          "Supabase Client Missing"
        );

        return;

      }

      const fullname =
        document
        .getElementById("fullname")
        .value
        .trim();

      const username =
        document
        .getElementById("username")
        .value
        .trim();

      const email =
        document
        .getElementById("email")
        .value
        .trim();

      const password =
        document
        .getElementById("password")
        .value
        .trim();

      const confirm =
        document
        .getElementById("confirmPassword")
        .value
        .trim();

      if (
        !fullname ||
        !username ||
        !email ||
        !password ||
        !confirm
      ) {

        alert(
          "Please fill all fields"
        );

        return;

      }

      if (
        password !== confirm
      ) {

        alert(
          "Passwords do not match"
        );

        return;

      }

      signupBtn.disabled = true;
      signupBtn.textContent =
        "Creating...";

      alert(
        "Before Supabase"
      );

      const {
        data,
        error
      } =
      await client.auth.signUp({

        email,
        password,

        options: {

          data: {
            fullname,
            username
          }

        }

      });

      alert(
        "After Supabase"
      );

      if (error) {

        alert(
          "AUTH ERROR:\n" +
          error.message
        );

        signupBtn.disabled =
          false;

        signupBtn.textContent =
          "Sign Up";

        return;

      }

      const user =
        data?.user;

      if (!user) {

        alert(
          "User object missing"
        );

        return;

      }

      const {
        error:
        profileError
      } =
      await client
        .from("profiles")
        .insert({

          id: user.id,
          username,
          fullname

        });

      if (
        profileError
      ) {

        alert(
          "PROFILE ERROR:\n" +
          profileError.message
        );

        signupBtn.disabled =
          false;

        signupBtn.textContent =
          "Sign Up";

        return;

      }

      alert(
        "Account Created!"
      );

      window.location.href =
        "../index.html";

    } catch (err) {

      alert(
        "CRASH:\n" +
        err.message
      );

      console.error(err);

      signupBtn.disabled =
        false;

      signupBtn.textContent =
        "Sign Up";

    }

  }
);