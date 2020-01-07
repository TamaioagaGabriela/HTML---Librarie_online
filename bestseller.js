// functia de memorare a cartilor in baza de date
function store_books() {
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
        xhr.open('POST', 'http://localhost:3000/books', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("titlu=" + document.getElementById('uname_titlu').value + "&autor=" + document.getElementById('uname_autor').value + "&pret=" + document.getElementById('uname_pret').value + "&url=" + document.getElementById('uname_url').value);


        // folosire sweet alert pt erori
        Swal.fire({
            icon: 'success',
            title: 'Succes!',
            text: 'Cartea a fost adaugata cu succes!'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ceva nu a mers bine!'
        });
    }
    GetItems();
    return false;
}


// functia de stergere a unei carti din baza de date
function deleteuser() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == "200") {
            let timerInterval
            Swal.fire({
                icon: 'success',
                title: 'Succes!',
                html: 'Cartea a fost stearsa cu succes!',
                timer: 1000,
                timerProgressBar: true,
                onBeforeOpen: () => {
                    Swal.showLoading();
                    timerInterval = setInterval(() => {
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
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ceva nu a mers bine!'
            });
        }
    };
    xhr.open("DELETE", 'http://localhost:3000/books/' + document.getElementById('uname_id').value, true);
    xhr.send();

    return false;
}


function GetItems() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {

        if (xhr.status >= 200 && xhr.status < 300) {
            var obj = JSON.parse(xhr.response);
            var i;
            var carti = [];
            for (i = 0; i < obj.length; i++) {
                var div = document.createElement("div");
                div.className = "item";
                var para = document.createElement("p");
                var mybr = document.createElement('br');
                var elem = document.createElement("img");
                elem.setAttribute("src", obj[i].url);
                para.appendChild(elem);
                para.appendChild(mybr);
                var titlucarte = document.createElement("B");
                titlucarte.innerHTML = obj[i].titlu;
                para.appendChild(titlucarte);
                mybr = document.createElement('br');
                para.appendChild(mybr);
                var autorcarte = document.createElement("B");
                autorcarte.innerHTML = obj[i].autor;
                para.appendChild(autorcarte);
                mybr = document.createElement('br');
                para.appendChild(mybr);
                var pretcarte = document.createElement('span');
                pretcarte.innerHTML = obj[i].pret;
                para.appendChild(pretcarte);
                mybr = document.createElement('br');
                para.appendChild(mybr);
                div.appendChild(para);
                carte = [{
                    titlu: obj[i].titlu,
                    autor: obj[i].autor,
                    pret: obj[i].pret
                }];
                carti.push(carte);

                document.getElementsByClassName("books")[0].appendChild(div);

            }
        } else {
            console.log('The request failed!');
        }
    };
    xhr.open("GET", 'http://localhost:3000/books/', true);
    xhr.send();

}



