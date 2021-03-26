$('body').ready(function() {
    $('#formClient').submit(function (event){
       $(".open-modal").click()
        event.preventDefault();
    })
});