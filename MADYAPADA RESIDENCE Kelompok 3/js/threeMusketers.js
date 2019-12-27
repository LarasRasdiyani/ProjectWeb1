// fungsi yang mengembalikan nilai faktor persekutuan terbesar dari 2 nilai sesuai dengan algoritma euclid
// input: n1, n2 berupa integer
// output: nilai fpb
function gcd(n1, n2) {
    if (n1 === 0) {
        return n2;
    } else {
        return gcd(n2 % n1, n1);
    }
}

// fungsi yang akan mengembalikan nilai kelipatan persekutuan terkecil dari 2 n1 dan n2
// input: n1 dan n2 berupa integer
// output: nilai kpk dari n1 dan n2
function lcm(n1, n2) {
    return ((n1 * n2) / gcd(n1, n2));
}

// fungsi yang mengambalikan nilai minimum dari a dan b
// input: a dan b berupa integer
// output: nilai minimum dari a dan b
function min(a, b) {
    if (a < b) {
        return a;
    } else {
        return b;
    }
}

// fungsi yang akan mengembalikan keuntungan dari penjualan rumah
// input: tipe1 dan tipe2 merupakan variabel bertipe data integer
// output: keuntungan dari tipe1 dan tipe2
function keuntungan(tipe1, tipe2) {
    return (130 * tipe1) + (165 * tipe2);
}

// prosedur untuk menghitung keuntungan terbesar dari modal dan luas tanah yang di-input-kan investor
function investor() {
    // DECLARATION
    var modal;                              // dari input
    var luas;                               // dari input
    var harga1, tanah1;                     // untuk jenis ke-1
    var harga2, tanah2;                     // untuk jenis ke-2
    var banyak1, banyak2;
    var fpb;                                // untuk mencari nilai fpb
    var perpotonganX = new Array();
    var perpotonganY = new Array();
    var x1, x2, y1, y2;
    var kpk;
    var pengali;
    var untung = [];
    var i;                                  // untuk iterasi, kek biasa
    var max;
    var optimal;
    var untung1, untung2;                   // keuntungan tiap tipe rumah
    var persenan;                           // persentasi keuntungan yang diinginkan
    var kom1, kom2;                         // komisi yang didapatkan investor
    var jual1, jual2;                       // harga jual tiap rumah

    // INPUT
    modal = document.getElementById("inputModal").value;
    luas = document.getElementById("inputLuas").value;

    tanah1 = document.getElementById("tanah1").value;
    tanah2 = document.getElementById("tanah2").value;

    // luas tanah dari tiap bangunan
    localStorage.setItem('luas1', tanah1);
    localStorage.setItem('luas2', tanah2);

    persenan = document.getElementById("percentage").value;

    // PROCESS
    // Inisialisasi harga
    harga1 = 400 + 3 * (tanah1 - 70);
    harga2 = 500 + 3 * (tanah2 - 80);

    // menyederhanakan persamaan 1
    fpb = Math.floor(gcd(gcd(harga1, harga2), modal));
    harga1 = Math.floor(harga1 / fpb);
    harga2 = Math.floor(harga2 / fpb);
    modal = Math.floor(modal / fpb);

    // menyederhanakan persamaan 2
    fpb = Math.floor(gcd(gcd(tanah1, tanah2), luas));
    tanah1 = Math.floor(tanah1 / fpb);
    tanah2 = Math.floor(tanah2 / fpb);
    luas = Math.floor(luas / fpb);

    // hitung perpotonganX[0] dan perpotonganY[0]
    // perpotongan garis dengan sumbu x
    // dengan nilai y = 0
    x1 = Math.floor(modal / harga1);
    x2 = Math.floor(luas / tanah1);

    perpotonganX[0] = min(x1, x2);
    perpotonganY[0] = 0;

    // hitung perpotonganX[1] dan perpotonganY[1]
    // perpotongan garis dengan sumbu y
    // dengan nilai x = 0
    y1 = Math.floor(modal / harga2);
    y2 = Math.floor(luas / tanah2);

    perpotonganX[1] = 0;
    perpotonganY[1] = min(y1, y2);

    // hitung perpotonganX[2] dan perpotonganY[2]
    // dalam grafik, perpotongan ini merupakan perpotongan antara garis 1 dan garis 2

    // mencari nilai y dengan metode eliminasi
    kpk = lcm(harga1, tanah1);

    // persamaan 1
    pengali = Math.floor(kpk / harga1);
    harga1 = harga1 * pengali;
    harga2 = harga2 * pengali;
    modal = modal * pengali;

    // persamaan 2
    pengali = Math.floor(kpk / tanah1);
    tanah1 = tanah1 * pengali;
    tanah2 = tanah2 * pengali;
    luas = luas * pengali;

    perpotonganY[2] = Math.floor((modal - luas) / (harga2 - tanah2));

    // mencari nilai x dengan metode substitusi
    perpotonganX[2] = Math.floor((modal - (harga2 * perpotonganY[2])) / harga1);

    // mencari harga jual tiap rumah
    jual1 = Math.floor(harga1 + ((harga1 * persenan) / 100));
    jual2 = Math.floor(harga2 + ((harga2 * persenan) / 100));

    // harga yang akan didapatkan oleh consumer
    localStorage.setItem('harga1', jual1);
    localStorage.setItem('harga2', jual2);

    // mencari komisi yang akan didapatkan marketer
    kom1 = Math.floor(jual1 / 10);
    kom2 = Math.floor(jual2 / 10);

    // mencari keuntungan dari tiap rumah
    untung1 = jual1 - (harga1 + kom1);
    untung2 = jual2 - (harga2 + kom2);

    // inisialisasi untung dari tiap perpotongan
    for (i = 0; i < 3; i++) {
        if (i == 2) {
            if ((perpotonganX[i] >= 0) && (perpotonganY[i] >= 0)) {
                untung[i] = keuntungan(untung1, untung2, perpotonganX[i], perpotonganY[i]);        
            }
        } else {
            untung[i] = keuntungan(untung1, untung2, perpotonganX[i], perpotonganY[i]);
        }
    }

    // mencari keuntungan optimal
    max = untung[0];
    optimal = 0;
    for (i = 1; i <= 2; i++) {
        if (untung[i] > max) {
            max = untung[i];
            optimal = i;
        }
    }

    // mendapatkan banyak rumah yang akan dibuat
    banyak1 = perpotonganX[optimal];
    banyak2 = perpotonganY[optimal];

    // OUTPUT
    document.getElementById('pisah').insertAdjacentHTML('beforeend', '<div id="input">Tipe 60 = ' + banyak1 + '<br/>Tipe 70 = ' + banyak2 + '<br/><a href=\"Home.html\"><button>Back</button></a><br/></div>');

    // memasukkan banyak tipe 1 dan tipe 2 ke dalam local storage
    localStorage.setItem('tipe1', banyak1);
    localStorage.setItem('tipe2', banyak2);

    // mengetahui investor sudah memberikan data
    localStorage.setItem('submittedInv', 'true');

    // memberikan komisi kepada marketer
    localStorage.setItem('komisi1', kom1);
    localStorage.setItem('komisi2', kom2);
}

// menampilkan komisi yang akan didapatkan oleh marketer
function marketer() {
    // DECLARATION
    var komisi                                  // komisi yang diidapatkan marketer (dalam juta rupiah)
    var input1, input2;                         // banyak tiap tipe yang diinputkan marketer
    var banyak1, banyak2;

    // INPUT
    input1 = document.getElementById("tipe1").value;
    input2 = document.getElementById("tipe2").value;

    banyak1 = localStorage.getItem('tipe1');
    banyak2 = localStorage.getItem('tipe2');

    // PROCESS
    // penyesuaian agar input tidak lebih banyak dari jumlah yang disediakan investor
    if (input1 > banyak1) {
        input1 = banyak1;
    }

    if (input2 > banyak2) {
        input2 = banyak2;
    }

    // hitung komisi, the core
    komisi = (70 * input1) + (85 * input2);

    // OUTPUT
    document.getElementById("inputmarketer").innerHTML = "Rp " + komisi + ".000.000" + "<br/><a href=\"Home.html\"><button>Back</button></a><br/>";

    // memberikan jumlah rumah yang dijual oleh marketer
    localStorage.setItem('available1', input1);
    localStorage.setItem('available2', input2);

    // mengetahui marketer sudah memberikan data
    localStorage.setItem('submittedMar', 'true');

    // memberikan komisi ke dalam local storage
    localStorage.setItem('duit', komisi);
}

// menampilkan jumlah rumah yang tersedia untuk konsumer
function consumer() {
    // DECLARATION
    var tersedia1, tersedia2;                   // banyak rumah yang dijual
    var tanah1, tanah2;                         // luas tanah
    var jual1, jual2;                           // harga dari rumah

    // INPUT
    tersedia1 = localStorage.getItem('available1');
    tersedia2 = localStorage.getItem('available2');

    tanah1 = localStorage.getItem('luas1');
    tanah2 = localStorage.getItem('luas2');
    
    jual1 = localStorage.getItem('harga1');
    jual2 = localStorage.getItem('harga2');

    // OUTPUT
    document.getElementById('tanah1').innerHTML = tanah1;
    document.getElementById('tanah2').innerHTML = tanah2;
    
    document.getElementById('harga1').innerHTML = jual1;
    document.getElementById('harga2').innerHTML = jual2;
    
    document.getElementById('available60').innerHTML = tersedia1;
    document.getElementById('available70').innerHTML = tersedia2;
}

// menampilkan jumlah rumah yang tersedia untuk konsumer
function home60() {
    // DECLARATION
    var tersedia1, tersedia2;                   // banyak rumah yang dijual
    var tanah1, tanah2;                         // luas tanah
    var jual1, jual2;                           // harga dari rumah

    // INPUT
    tersedia1 = localStorage.getItem('available1');

    tanah1 = localStorage.getItem('luas1');
    
    jual1 = localStorage.getItem('harga1');

    // OUTPUT
    document.getElementById('tanah1').innerHTML = tanah1;
    
    document.getElementById('harga1').innerHTML = jual1;
    
    document.getElementById('available60').innerHTML = tersedia1;
}

function home70() {
    // DECLARATION
    var tersedia1, tersedia2;                   // banyak rumah yang dijual
    var tanah1, tanah2;                         // luas tanah
    var jual1, jual2;                           // harga dari rumah

    // INPUT
    tersedia2 = localStorage.getItem('available2');

    tanah2 = localStorage.getItem('luas2');
    
    jual2 = localStorage.getItem('harga2');

    // OUTPUT
    document.getElementById('tanah2').innerHTML = tanah2;
    
    document.getElementById('harga2').innerHTML = jual2;
    
    document.getElementById('available70').innerHTML = tersedia2;
}

// fungsi untuk menentukan tampilan di investor
function validateInvest() {
    // DECLARATION AND INPUT   
    var submitted = localStorage.getItem('submittedInv');
    var banyak1 = localStorage.getItem('tipe1');
    var banyak2 = localStorage.getItem('tipe2');

    // PROCESS AND OUTPUT
    if (submitted) {
        document.getElementById('pisah').insertAdjacentHTML('beforeend', '<div id="input"   >Tipe 60 = ' + banyak1 + '<br/>Tipe 70 = ' + banyak2 + '<br/><a href=\"Home.html\"><button>Back</button></a><br/></div>');
    }
}

// Untuk menampilkan biaya yang akan dikeluarkan oleh investor
function showPrice1(val) {
    document.getElementById('harga1').value = (400 + 3 * (val - 70));
}

function showPrice2(val) {
    document.getElementById('harga2').value = (500 + 3 * (val - 80));
}

// Memeriksa apakah investor sudah memasukkan data atau belum
// Untuk halaman marketer
function validateInvestorData() {
    // DECLARATION
    var submitted;                      // submit dari investor
    var house1, house2                  // rumah yang dibuat oleh investor

    // INPUT
    submitted = localStorage.getItem('submittedInv');
    house1 = localStorage.getItem('tipe1');
    house2 = localStorage.getItem('tipe2');

    // PROCESS AND OUTPUT
    if (submitted) {
        document.getElementById('inputmarketer').innerHTML = '<h1>Hitung Keuntungan</h1>';
        document.getElementById('inputmarketer').innerHTML += '<hr>';
        document.getElementById('inputmarketer').innerHTML += '<p>Tersedia: ' + house1;
        document.getElementById('inputmarketer').innerHTML += '<input type="text" name="" placeholder="Rumah Tipe 1" required="" id="tipe1">';
        document.getElementById('inputmarketer').innerHTML += '</p>';
        document.getElementById('inputmarketer').innerHTML += '<p>Tersedia: ' + house2;
        document.getElementById('inputmarketer').innerHTML += '<input type="text" name="" placeholder="Rumah Tipe 2" required="" id="tipe2">';
        document.getElementById('inputmarketer').innerHTML += '</p>';
        document.getElementById('inputmarketer').innerHTML += '<button type="button" class="btn" onclick="marketer()">Hitung</button>';
        return true;
    } else {
        document.getElementById('inputmarketer').innerHTML = "<h1>404:</h1><h3>Page Not Found</h3>";
        return false;
    }
}

// fungsi untuk menentukan tampilan di marketer
function validateMarketer() {
    // DECLARATION
    var submitted;
    var komisi;
    var house1, house2; 

    // INPUT
    submitted = localStorage.getItem('submittedMar');
    komisi = localStorage.getItem('duit');
    house1 = localStorage.getItem('tipe1');
    house2 = localStorage.getItem('tipe2');
    
    // OUTPUT
    if (submitted) {
        document.getElementById('inputmarketer').innerHTML = "Rp " + komisi + ".000.000" + "<br/>";
        document.getElementById('inputmarketer').innerHTML += "<a href=\"Home.html\"><button>Back</button></a><br/>";
    } else {
        document.getElementById('inputmarketer').innerHTML = '<h1>Hitung Keuntungan</h1>';
        document.getElementById('inputmarketer').innerHTML += '<hr>';
        document.getElementById('inputmarketer').innerHTML += '<p>Tersedia: ' + house1;
        document.getElementById('inputmarketer').innerHTML += '<input type="text" name="" placeholder="Rumah Tipe 1" required="" id="tipe1">';
        document.getElementById('inputmarketer').innerHTML += '</p>';
        document.getElementById('inputmarketer').innerHTML += '<p>Tersedia: ' + house2;
        document.getElementById('inputmarketer').innerHTML += '<input type="text" name="" placeholder="Rumah Tipe 2" required="" id="tipe2">';
        document.getElementById('inputmarketer').innerHTML += '</p>';
        document.getElementById('inputmarketer').innerHTML += '<button type="button" class="btn" onclick="marketer()">Hitung</button>';
    }
}

// fungsi yang digunakan untuk halaman marketer
function masterMarketer() {
    validateInvestorData();

    if (validateInvestorData()) {
        validateMarketer();
    }
}

// memvalidasi apakah investor dan marketer sudah memasukkan data atau belum
function validateInvMarData() {
    // DECLARATION
    var submitted1;                             // submit dari investor
    var submitted2;                             // submit dari marketer

    // INPUT
    submitted1 = localStorage.getItem('submittedInv')
    submitted2 = localStorage.getItem('submittedMar')

    // PROCESS
    if ((submitted1 && submitted2)) {
        consumer();
    } else {
        document.getElementById('output').innerHTML = "<h1>404:</h1><h3>Page Not Found</h3>";
    }
}