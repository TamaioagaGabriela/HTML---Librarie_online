/*jshint esversion: 6 */

// variabile in care stochez numele, parola si parola rescrisa 
var nume = document.getElementsByName('runame')[0];
var pw = document.getElementsByName('rpsw')[0];
var pwrepeat = document.getElementsByName('rpsw-repeat')[0];

// functie de memorare a informatiilor de logare in baza de date
// folosire functie swall alert pt afisare de alerte
function store() {
    if (pwrepeat.value == pw.value) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {

            if (xhr.status >= 200 && xhr.status < 300) {
                var obj = JSON.parse(xhr.response);
                console.log(obj);
            } else {
                console.log('The request failed!');
            }
        };
        // folosire AJAX pt a retine informatiile de logare
        xhr.open('POST', 'http://localhost:3000/users', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("user=" + nume.value + "&parola=" + pw.value);

        localStorage.setItem('uname', nume.value);
        localStorage.setItem('psw', pw.value);

        // folosire sweet alert pt erori
        Swal.fire({
            icon: 'success',
            title: 'succes!',
            text: 'Cont creat!'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parolele nu coincid!'
        });
    }
    return false;
}


// folosire AJAX si Local Storage
// functia de verificare a parolei si userului unui cont deja creat
// check if stored data from register-form is equal to entered data in the login-form
function check() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {

        if (xhr.status >= 200 && xhr.status < 300) {
            var obj = JSON.parse(xhr.response);
            var i;
            // entered data from the login-form
            var userName = document.getElementsByName('uname')[0];
            var userPw = document.getElementsByName('psw')[0];
            var ok = 0;
            for (i = 0; i < obj.length; i++) {
                if (userName.value == obj[i].user && userPw.value == obj[i].parola) {
                    localStorage.setItem('userlogat', userName.value);
                    console.log(i);
                    ok = 1;
                    let timerInterval
                    Swal.fire({
                        icon: 'success',
                        title: 'Logat!',
                        html: 'Esti logat',
                        timer: 1000,
                        timerProgressBar: true,
                        onBeforeOpen: () => {
                            Swal.showLoading();
                            timerInterval = setInterval(() => { // folosire setInterval
                                Swal.getContent().querySelector('b')
                                    .textContent = Swal.getTimerLeft();
                            }, 100);
                        },
                        onClose: () => {
                            clearInterval(timerInterval);
                            window.location.reload();
                        }
                    }).then((result) => {
                        if (
                            /* Read more about handling dismissals below */
                            result.dismiss === Swal.DismissReason.timer
                        ) {
                            console.log('I was closed by the timer'); // eslint-disable-line
                        }
                    });
                    break;
                }
            }
            if (ok === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username si parola gresite!'
                });
            }
        } else {
            console.log('The request failed!');
        }
    };
    xhr.open('GET', 'http://localhost:3000/users', true); // folosire AJAX
    xhr.send();
    return false;
}

// functie de creare a unui cont nou
function newaccount() {
    var modal = document.getElementById('id01');
    modal.style.display = "none";
    modal = document.getElementById('id02');
    modal.style.display = 'block';
    return false;
}


// folosire expresii regulate REGEX pt parola
// verde - parola buna
// galben - parola medie
// rosu - nu respecta cerintele
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
$('#rspw').keyup(function(event) {
    if (strongRegex.test(pw.value)) {
        pw.style.backgroundColor = "green";
    } else if (mediumRegex.test(pw.value)) {
        pw.style.backgroundColor = "yellow";
    } else {
        pw.style.backgroundColor = "red";
    }
});


// functie prin care verificam daca parolele coincid
$('#rspwr').keyup(function(event) {
    if (pw.value != pwrepeat.value) {
        document.getElementById("raspuns").innerHTML = "✗   Parolele nu coincid!";
        document.getElementById("raspuns").style.color = "red";
    } else {
        document.getElementById("raspuns").innerHTML = "";
    }
});


$('form > input, textarea').keyup(function() {
    var empty = false;
    $('input, textarea').each(function() {
        if ($(this).val() === '') {
            empty = true;
        }
    });

    if (empty) {
        $('#sub').attr('disabled', 'disabled');
    } else {
        $('#sub').removeAttr('disabled');
    }
});



// FUNCTII PENTRU BUTONUL SETARI

// folosire Local storage (setItem) pt setarea fontului si a culorii cerute de utilizator
function setari() {
    localStorage.setItem('fontsize', document.getElementById('fontInput').value);
    localStorage.setItem('bgcolor', document.getElementById('colorInput').value);
    fonload();
}

// folosire clearinterval pt a se opri la o anumita culoare
function stop_bg_color() {
    clearInterval(interval);
}

// folosire Local storage (getItem) pt a face rost de fontul stocat
// functie de schimbare a culorii si fontului dupa cum doreste utilizatorul  
function fonload() {
    var fontsize = localStorage.getItem('fontsize');
    var bgcolor = localStorage.getItem('bgcolor');
    if (fontsize != 'undefined' && bgcolor != 'undefined') {
        document.body.style.backgroundColor = bgcolor;
        document.body.style.fontSize = fontsize + 'px';
    }
    var username = localStorage.getItem('userlogat');
    if (username !== null) {
        document.getElementById('numeuser').innerHTML = username;
        document.getElementById("loginbutton").style.display = "none";
    }
    GetItems();
    // deleteuser();	

}

// functie de stergere a informatiilor stocate
$('#sterge').click(function() {
    localStorage.clear();
    window.location.reload();
});


// Get the modal
var modal1 = document.getElementById('id01');
var modal2 = document.getElementById('id02');

// Functie care asculta pt click
// Cand utilizatorul apas
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
};

// Functie care imi seteaza valoarea dorita
function updateTextInput(val) {
    document.getElementById('textInput').value = val;
}

// Functie preventDefault
$("#id01").submit(function(e) {
    e.preventDefault();
});
$("#id02").submit(function(e) {
    e.preventDefault();
});
$("#id03").submit(function(e) {
    e.preventDefault();
});
$("#id04").submit(function(e) {
    e.preventDefault();
});
$("#id05").submit(function(e) {
    e.preventDefault();
});

// Functie care se apeleaza la tasta ESC
// la apasarea tastei ESC se iese din fereastra de setari/login/adaugare/stergere
$(document).keyup(function(e) {
    if (e.key === "Escape") { // escape key maps to keycode `27`
        document.getElementById('id01').style.display = 'none';
        document.getElementById('id02').style.display = 'none';
        document.getElementById('id03').style.display = 'none';
        document.getElementById('id04').style.display = 'none';
        document.getElementById('id05').style.display = 'none';
    }
});


// folosire math random color + setTimeout
function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    console.log(bgColor);

    document.body.style.backgroundColor = bgColor;
    interval = setTimeout(random_bg_color, 5000);
}


// elementul video si audio
document.getElementById('song').innerHTML = '<audio id="audio-player" controls="controls" src="audio/FROZEN.mp3" type="audio/mpeg">';
document.getElementById('video').innerHTML = '<video id="audio-player" width="320" height="176" controls="controls" src="audio/FROZEN.mp4" type="video/mpeg">';