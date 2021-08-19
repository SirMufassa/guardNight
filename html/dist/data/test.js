$(document).ready(function() {

    $(`#confrmation`).click((e) => {
        var row = `<div class="alert alert-success" role="alert">
            A simple success alert—check it out!
        </div>`

        $('#element').append(row)

        setTimeout(function () {
            $('#element').remove()
        }, 3000)
        
    })

})