$(document).ready(function(){
    //Intercetto il click sul button e attivo il tasto Invio per far partire la richiesta ajax richiamandone la funzione
     $('#search').click(richiesta_ajax)

     $('input').keypress(function(event) {
         var enter = event.which

         if(enter == 13) {
             richiesta_ajax();
         }
     })


//FUNZIONE PER FARE RICHIESTA AJAX

     function richiesta_ajax() {
         //Invio una richiesta ajax per recuperare i dati dei film
         $.ajax({
             url : 'https://api.themoviedb.org/3/search/movie',
             method : 'GET',
             //imposto la mia api_key personale e la query per la ricerca
             data : {
                 api_key : '5ccd22807b780aebefb68ca254c6d38a',
                 query : $('input').val()
             },
             success : function(request) {
                 //Chiamo la funziona cerca_film per mostrare i risukltati della ricerca
                 cerca_film(request.results)
             },
             error : function(){
                 console.log('si è verificato un errore');
             }

         })
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
         //Vado a recuperare i calori delle chiavi degli oggetti contenenti i dati dei film
         var title = dati_film.title;
         var original_title = dati_film.original_title;
         var language = dati_film.original_language;
         var vote = dati_film.vote_average;

         //Vado a stampare in pagina con il comando append i dati ricavati
         $('.titolo').append('TITOLO FILM : ' + title + '<br>');
         $('.titolo-originale').append('TITOLO ORIGINALE : ' + original_title  + '<br>');
         $('.lingua').append('LINGUA : ' + language  + '<br>');
         $('.voto-film').append('VOTO : ' + vote  + '<br>');


         $('input').val('');

     }

})
