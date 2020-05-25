$(document).ready(function(){
    var source   = document.getElementById("film-template").innerHTML;
    var template = Handlebars.compile(source);
    //Intercetto il click sul button e attivo il tasto Invio per far partire la richiesta ajax richiamandone la funzione
     $('#search').click(richiesta_ajax)

     $('.search-film').keypress(function(event) {
         var enter = event.which

         if(enter == 13) {
             richiesta_ajax();
         }
     })


//FUNZIONE PER FARE RICHIESTA AJAX

     function richiesta_ajax() {
          //Chiamo la funzione reset per svuotare i campi dopo la ricerca corrente
         reset();

         //Invio una richiesta ajax per recuperare i dati dei film
         $.ajax({
             url : 'https://api.themoviedb.org/3/search/movie',
             method : 'GET',
             //imposto la mia api_key personale e la query per la ricerca
             data : {
                 api_key : '5ccd22807b780aebefb68ca254c6d38a',
                 query : testo_utente,
                 language : 'it',
             },
             success : function(request_film) {
                 //Chiamo la funziona cerca_film per mostrare i risukltati della ricerca
                 cerca_film(request_film.results)
             },
             error : function(){
                 console.log('si è verificato un errore');
             }

         })

         //Invio una richiesta ajax per recuperare i dati delle serie tv
         $.ajax({
             url : 'https://api.themoviedb.org/3/search/tv',
             method : 'GET',
             //imposto la mia api_key personale e la query per la ricerca
             data : {
                 api_key : '5ccd22807b780aebefb68ca254c6d38a',
                 query : testo_utente,
                 language : 'it',
             },
             success : function(request_series) {
                 //Chiamo la funziona cerca_film per mostrare i risukltati della ricerca
                 cerca_film(request_series.results)
             },
             error : function(){
                 console.log('si è verificato un errore');
             }

         })
     }

//FUNZIONE PER SVUOTARE I CAMPI DI INPUT E FILM DOPO LA RICERCA

    function reset() {
        //Recupero testo utente
        testo_utente = $('input').val();
        //Svuoto il contenitore dei risultati
        $('.box-film').empty();
        //Imposto nel titolo le informazioni della ricerca corrente
        $('.film-searched').text(testo_utente)
        //Imposto classe active con display block per il titolo
        $('#current-research').addClass('active');
    }

//FUNZIONE PER CERCARE I FILM

     function cerca_film(film) {
         //Imposto un ciclo for per andare a ricavare le chiavi degli oggetti contenuti nell'array dei film
         for (var i = 0; i < film.length; i++) {
             //Recupero i singoli film inserendoli in una variabile
             var film_corrente = film[i];
             //console.log(film_corrente);
             //Richiamo la funzione inserisci_dati per stampare i dati in pagina
             inserisci_dati(film_corrente)
         }
     }
//FUNZIONE PER INSERIRE I DATI

     function inserisci_dati(dati_film) {
        //Imposto variabile per arrotondare trasformare il voto in interi da 1 a 5
        var votes = Math.round(dati_film.vote_average / 2);
        //Creo due variabili: una per la l'cona stella piena e una per l'icona stella vuota entrambe = ad una stringa vuota
        var star = '';
        var empty_star = '';
        //Creo un ciclo for per andare a riempire le variabili con le icone
        for (var i = 0; i < votes; i++) {
            star += '<i class="fas fa-star"></i>';
        }
        //Vado a stampare in pagina con il comando append i dati ricavati
         var lista_film = {
             'title' : dati_film.title || dati_film.name,
             'original-title' : dati_film.original_title || dati_film.original_name,
             'language' : flag_language(dati_film.original_language),
             'score' : star,
         }

         var context = template(lista_film);
         $('.box-film').append(context);

         $('.search-film').val('');
     }

//FUNZIONE PER IMPOSTARE LE BANDIERE AL POSTO DELLA LINGUA
     function flag_language(flag) {
            //creo un array dove inserire le lingue
         var languages = ['en', 'us', 'it', 'fr', 'es'];
         //verifico le condizioni :

         if (languages.includes(flag)) {
             //se bandiere corrispondente alla lingua è inclusa tra le lingue la inserisco in pagina
            return '<img class="flag-size" src="img/flag_' + flag + '.png">'
        } else {
            //altrimenti inserisco in pagina la sigla della lingua
            return flag
        }
     }
})
