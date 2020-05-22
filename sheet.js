$(document).ready(function(){
    //Intercetto il click sul button per far partire la richiesta ajax
    //var film_cercato = $('input').val();

     $('#search').click(function() {
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
                //Recupero i placeholder relativi ai film
                var film = request.results;
                console.log(film);

                for (var i = 0; i < film.length; i++) {
                    var film_corrente = film[i];
                    console.log(film_corrente);

                    var title = film_corrente.title;
                    var original_title = film_corrente.original_title;
                    var language = film_corrente.original_language;
                    var vote = film_corrente.vote_average;

                    $('.titolo').append('TITOLO FILM : ' + title + '<br>');
                    $('.titolo-originale').append('TITOLO ORIGINALE : ' + original_title  + '<br>');
                    $('.lingua').append('LINGUA : ' + language  + '<br>');
                    $('.voto-film').append('VOTO : ' + vote  + '<br>');

                }
            },
            error : function(){
                console.log('si è verificato un errore');
            }

        })
    })
})
