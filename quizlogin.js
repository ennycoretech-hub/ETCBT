// Selecting elements
const nameInput = document.getElementById('name');
const pwdInput = document.getElementById('pwd');
const showBtn = document.getElementById('show');
const loginBtn = document.getElementById('login');
const reference = document.getElementById('reference');
const loading = document.getElementById('loadingDiv')
const b = document.getElementById('b');

// The check function handles validation logic
function check() {
    // Check if password is correct and name is not empty
    if (pwdInput.value === "2011" && nameInput.value.trim() !== "") {
        loginBtn.disabled = false;
        loginBtn.style.background = 'var(--accent)';
    } else {
        loginBtn.disabled = true;
        loginBtn.style.background = 'grey';
    }
}

// The toggle function switches password visibility
function toggle() {
    if (pwdInput.type === "password") {
        pwdInput.type = "text";
        showBtn.innerHTML = "HIDE";
    } else {
        pwdInput.type = "password";
        showBtn.innerHTML = "SHOW";
    }
}

// The move function handles the "page" transition
function move() {
    if (loginBtn.disabled === false) {
      loading.style.display = "flex"
      setTimeout(
  function (){
    loading.style.display = 'none'
  },4000)
        
        reference.innerHTML = nameInput.value;
        document.getElementById("login-div").style.display = "none";
        document.getElementById("mainpage").style.display = "block";
    } else {
        document.getElementById("mainpage").style.display = "none";
    }
}
function transfer() {
    window.location.replace('quizselpg.html');
    
}


// Event Listeners
nameInput.addEventListener('input', check);
pwdInput.addEventListener('input', check);
showBtn.addEventListener('click', toggle);
loginBtn.addEventListener('click', move);
b.addEventListener("click" , transfer)