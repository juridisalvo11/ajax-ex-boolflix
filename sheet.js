$(document).ready(function(){
    //Intercetto il click sul button per far partire la richiesta ajax
    // $('#search').click(function(){
        //Invio una richiesta ajax per recuperare i dati dei film
        $.ajax({
            url : 'https://api.themoviedb.org/3/search/movie',
            method : 'GET',
            //imposto la mia api_key personale e la query per la ricerca
            data : {
                api_key : '5ccd22807b780aebefb68ca254c6d38a',
                query : 'batman'
            },
            success : function(request) {
                //Recupero i placeholder relativi ai film
                var film = request.response;
                console.log(film);

            },
            error : function(){
                console.log('si è verificato un errore');
            }

        })
    // })
})
