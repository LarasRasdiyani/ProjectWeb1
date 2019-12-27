// fungsi untuk menyimpan data user yang mendaftar ke web
function input() {
    // DECLARATION
    var surname;
    var lastname;
    var email;
    var pass;
    var selectedRole;

    // INPUT
    // menyimpan input pendaftaran dari user
    surname = document.getElementById("surname").value;
    lastname = document.getElementById("lastname").value;
    email = document.getElementById("userEmail").value;
    pass = document.getElementById("userPass").value;
    selectedRole = document.querySelector('input[name="role"]:checked').value;

    // membuat local storage
    localStorage.setItem('surname', surname);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('email', email);
    localStorage.setItem('pass', pass);
    localStorage.setItem('role', selectedRole)

    // OUTPUT
    document.getElementById("Signup").innerHTML = "yeehaw";
    // document.getElementById("teuing").innerHTML = localStorage.getItem('surname');
}

// mengecek apakah input yang dimasukkan user sama dengan di local storage atau tidak
function login() {
    // DECLARATION
    // mengambil data dari yang didaftarkan user
    var storedEmail = localStorage.getItem('email');
    var storedPass = localStorage.getItem('pass');

    // input login email dan password dari user
    var loginEmail;
    var loginPass;

    // mengecek kesamaan
    var validateEmail;
    var validatePass;

    var surname;

    loginEmail = document.getElementById("identity").value;
    loginPass = document.getElementById("loginPass").value;

    validateEmail = storedEmail.localeCompare(loginEmail);
    validatePass = storedPass.localeCompare(loginPass);
    if ((validateEmail == 0) && (validatePass == 0)) {
        document.getElementById("login").innerHTML = "Login berhasil";
        surname = localStorage.getItem('surname');
        localStorage.setItem('loggedinName', surname);
        localStorage.setItem('loggedin', true);
    } else {
        document.getElementById("login").innerHTML = "Password yang Anda masukkan salah";
    }
}

// untuk user logout
function logout() {
    localStorage.removeItem('loggedinName');
    localStorage.removeItem('logggedin');
}

// mengecek apakah user sudah login atau belum
function validateLogin() {
    var loggedin;
    
    loggedin = localStorage.getItem('loggedin');

    //loggedin = true;
    if (loggedin) {
        document.getElementById("sayapKanan").innerHTML = "<li class=\"right\"><a href=\"login.html\"> Login</a></li><li class=\"right\"><a href=\"SignUp.html\">Sign Up</a></li>";
    }

    document.getElementById("Name").value = localStorage.getItem('loggedinName');
}