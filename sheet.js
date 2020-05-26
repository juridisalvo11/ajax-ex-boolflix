$(document).ready(function(){
    //Variabili standard
    var api_key = '5ccd22807b780aebefb68ca254c6d38a';
    var api_url = 'https://api.themoviedb.org/3/';
    var url_copertina = 'https://image.tmdb.org/t/p/w185'

    //Utilizzo Handlebars per il template
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
         //Recupero testo utente
         var testo_utente = $('input').val().trim();
         //Imposto la condizione per non far partire la ricerca nel caso l'utente digiti meno di due carattere
         if (testo_utente.length > 1) {
             //Chiamo la funzione reset per svuotare i campi dopo la ricerca corrente
            reset();

            //Invio una richiesta ajax per recuperare i dati dei film
            $.ajax({
                url : api_url + 'search/movie',
                method : 'GET',
                //imposto la mia api_key personale e la query per la ricerca
                data : {
                    api_key : api_key,
                    query : testo_utente,
                    language : 'it',
                },
                success : function(request) {
                    //Imposto nel titolo le informazioni della ricerca corrente
                    $('.film-searched').text(testo_utente)
                    //Imposto classe active con display block per mostrare il titolo
                    $('#current-research').addClass('active');

                    //Chiamo la funziona cerca_film per mostrare i risukltati della ricerca
                    search(request.results, 'Film')
                },
                error : function(){
                    alert('si è verificato un errore');
                }

            })

            //Invio una richiesta ajax per recuperare i dati delle serie tv
            $.ajax({
                url : api_url + 'search/tv',
                method : 'GET',
                //imposto la mia api_key personale e la query per la ricerca
                data : {
                    api_key : api_key,
                    query : testo_utente,
                    language : 'it',
                },
                success : function(request) {
                    //Chiamo la funziona cerca_film per mostrare i risukltati della ricerca
                    search(request.results, 'Serie TV')
                },
                error : function(){
                    alert('si è verificato un errore');
                }

            })
        } else {
            alert ('Digita 2 o più caratteri')
        }

     }

//FUNZIONE PER SVUOTARE I CAMPI DI INPUT E FILM DOPO LA RICERCA

    function reset() {
        //Svuoto il contenitore dei risultati
        $('.box-film').empty();
        //Rimuovo classe active con display block per eliminare il titolo
        $('#current-research').removeClass('active');
    }

//FUNZIONE PER CERCARE I FILM

     function search(film, categoria) {
         var results = film.results;
         //Imposto un ciclo for per andare a ricavare le chiavi degli oggetti contenuti nell'array dei film
         for (var i = 0; i < film.length; i++) {
             //Recupero i singoli film inserendoli in una variabile
             var film_corrente = film[i];
             //console.log(film_corrente);
             //Richiamo la funzione inserisci_dati per stampare i dati in pagina
             inserisci_dati(film_corrente, categoria)
         }
     }
//FUNZIONE PER INSERIRE I DATI

     function inserisci_dati(dati_film, categoria) {
         if (categoria == 'Film') {
            var tipe_title = dati_film.title;
            var tipe_originaltitle = dati_film.original_title;
        } else {
            var tipe_title = dati_film.name;
            var tipe_originaltitle = dati_film.original_name;
        }
        //Vado a recuperare i dati da stampare in pagina
         var lista_film = {
             'title' : tipe_title,
             'original-title' : tipe_originaltitle,
             'language' : flag_language(dati_film.original_language),
             'score' : stelle(arrotonda_voto(dati_film.vote_average)),
             'categoria_elemento' : categoria,
             'copertina' : inserisci_locandina(dati_film.poster_path),
         }

         var context = template(lista_film);
         //Stampo in pagina i dati dei film
         $('.box-film').append(context);

         $('.search-film').val('');
     }

//FUNZIONE PER IMPOSTARE LE BANDIERE AL POSTO DELLA LINGUA
     function flag_language(flag) {
            //creo un array dove inserire le lingue
         var languages = ['en', 'us', 'it', 'fr', 'es'];
         //verifico le condizioni :

         if (languages.includes(flag)) {
             //se la bandiera corrispondente alla lingua è inclusa tra le lingue la inserisco in pagina
            return '<img class="flag-size" src="img/flag_' + flag + '.png">'
        } else {
            //altrimenti inserisco in pagina la sigla della lingua
            return flag
        }
     }

     function arrotonda_voto(voto) {
        vote = voto / 2;
        return Math.round(vote);
     }

     function stelle(voti_stelle) {
         //Creo due variabili: una per l'icona stella piena e una per l'icona stella vuota entrambe = ad una stringa vuota
         var star = '';
         //Creo un ciclo for per andare a riempire le variabili con le icone
         for (var i = 1; i <= 5 ; i++) {
            if(i <= voti_stelle) {
                star += '<i class="fas fa-star"></i>';
            }
         }
         return star;
     }

     function inserisci_locandina(locandina) {
        var not_found = '<img class="not-found" src="img/not_found.jpg">'

        if (locandina) {
            return '<img class="img-found" src="' + url_copertina + locandina + '">'
        }

        return not_found

     }
})
