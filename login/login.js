// ---------------- PASSWORD TOGGLE ----------------

const toggle = document.getElementById("togglePassword");
const pass = document.getElementById("password");

if (toggle && pass) {

toggle.addEventListener("click", () => {

pass.type =
  pass.type === "password"
  ? "text"
  : "password";

toggle
  .querySelector("i")
  ?.classList.toggle("fa-eye");

toggle
  .querySelector("i")
  ?.classList.toggle("fa-eye-slash");

});

}

// ---------------- DEBUG ----------------

alert(
"window.supabaseClient = " +
typeof window.supabaseClient
);

alert(
"window.supabase = " +
typeof window.supabase
);

// ---------------- LOGIN ----------------

const loginBtn =
document.getElementById("loginBtn");

loginBtn?.addEventListener(
"click",
async () => {

try {

  alert("Login Started");

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

  const email =
    document
    .getElementById("username")
    .value
    .trim();

  const password =
    document
    .getElementById("password")
    .value
    .trim();

  if (!email || !password) {

    alert(
      "Please enter email and password"
    );

    return;

  }

  loginBtn.disabled = true;
  loginBtn.textContent =
    "Logging In...";

  alert("Before Supabase");

  const {
    data,
    error
  } =
  await client.auth.signInWithPassword({

    email,
    password

  });

  alert("After Supabase");

  if (error) {

    alert(
      "LOGIN ERROR:\n" +
      error.message
    );

    loginBtn.disabled = false;
    loginBtn.textContent = "Login";

    return;

  }

  alert(
    "Welcome " +
    data.user.email
  );

  window.location.href =
    "../index.html";

} catch (err) {

  alert(
    "CRASH:\n" +
    err.message
  );

  console.error(err);

  loginBtn.disabled = false;
  loginBtn.textContent = "Login";

}

}
);

// ---------------- ENTER KEY ----------------

document.addEventListener(
"keydown",
(e) => {

if (e.key === "Enter") {

  e.preventDefault();

  loginBtn?.click();

}

}
);

// ---------------- RIPPLE EFFECT ----------------

document.addEventListener(
"click",
function(e){

const rippleLayer =
  document.querySelector(
    ".ripple-layer"
  );

if(!rippleLayer) return;

const ripple =
  document.createElement("span");

ripple.className =
  "ripple";

ripple.style.left =
  e.clientX + "px";

ripple.style.top =
  e.clientY + "px";

rippleLayer.appendChild(
  ripple
);

setTimeout(
  () => ripple.remove(),
  1000
);

}
);

// ---------------- ERROR LOGGER ----------------

window.addEventListener?.(
"error",
e => {

console.log(
  " ERROR IN FILE:",
  e.filename,
  e.message
);

}
);