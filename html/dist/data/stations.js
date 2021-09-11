$(document).ready(function() {

    var row = ``
    var tableau = []

    // get all
    db.collection("police").get()
        .then((querySnapshot) => {
    
            querySnapshot.forEach((doc) => {
                console.log(doc.data().geopoint)
                tableau.push(doc.id)

                row = `  <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 station">

                            <div class="card">

                                <h5 class="card-header"><a href="#" >${[doc.data().designation]}</a></h5>

                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <i class="fa fa-map-marker">  </i>
                                    </li>

                                    <li class="list-group-item">
                                        <i class="fa fa-bookmark-o"> ${[doc.data().stationCode]} </i>
                                    </li>

                                    <li class="list-group-item">
                                        <i class="fa   fa-phone"> (+ 243) ${[doc.data().phones.DP1]} - ${[doc.data().phones.DP1]} </i>
                                    </li>
                                </ul>

                                <div class="card-body">
                                    <p class="card-text"></p>

                                    <a href="#" class="btn btn-outline-success" data-toggle="modal" data-target="#${[doc.id]}">
                                            <i class="fa fa-edit"></i>
                                    </a>


                                    <a href="#" class="btn btn-outline-warning"
                                        id="map${[tableau.length-1]}">
                                        <i class="fa fa-map"></i>
                                    </a>


                                    <a href="#" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal${[tableau.length-1]}" id="${[tableau.length-1]}">
                                            <i class="fa fa-trash"></i>
                                    </a>
                                   
                                </div>
                            </div>
                        </div> 

                        <div class="modal fade" id="exampleModal${[tableau.length-1]}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel"> Voulez-vous vraiment supprimer cet élément ? </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                            
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                        <button type="button" class="btn btn-primary delete" id="trash${[tableau.length-1]}" data-dismiss="modal">Confirmer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal fade" id="${[doc.id]}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modifier ${[doc.data().designation]}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        
                                    
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <input type="text" placeholder="Designation" value="${[doc.data().designation]}" id="designation${[doc.id]}"
                                                    class="form-control form-control-line">
                                            </div>
                                        </div>
                
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <input type="text" placeholder="Avenue" value="" id="avenue${[doc.id]}"
                                                    class="form-control form-control-line">
                                            </div>
                                        </div>
                
                
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <input type="text" placeholder="Code Station" value="${[doc.data().stationCode]}" id="stationcode${[doc.id]}"
                                                    class="form-control form-control-line">
                                            </div>
                                        </div>
                
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <input type="text" placeholder="DP1" value="${[doc.data().phones.DP1]}" id="DP1${[doc.id]}"
                                                    class="form-control form-control-line">
                                            </div>
                                        </div>
                
                
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <input type="text" placeholder="DP2" value="${[doc.data().phones.DP1]}" id="DP2${[doc.id]}"
                                                    class="form-control form-control-line">
                                            </div>
                                        </div>
                
        


                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" id="edit${[tableau.length-1]}" data-dismiss="modal">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `

                $('#data').append(row)
                
                $(`#edit${[tableau.length-1]}`).click((e) => {
                    // modal
                    // var pid = $(this).parent().attr("id")
                    e.preventDefault()
                    edit(doc.id)
                })

                $(`#trash${[tableau.length-1]}`).click((e) => {
                        // confirmer
                        e.preventDefault()
                        supprimer(doc.id)
                        // alert("Action successfully executed")
                    
                })

                $(`#map${[tableau.length-1]}`).click((e) => {
                    newLocation(doc.data().geopoint._lat, doc.data().geopoint._long)
                })
                
            })
        })
        
        .catch((err) => {
            console.log(err)
        })

    //add

    function ajouter(){
        // Add a second document with a generated ID.
        db.collection("police").add({

            // adress : { avenue : $("#avenue").val()}, // que contient une adress, en dehors de l'avenue ?
            designation : $("#designation").val(), // est-ce que unique ? 
            // geopoint : , // comment faire pour prendre les deux ? //simulation
            phones : {
                DP1 : $("#DP1").val(),
                DP2 : $("#DP2").val()
            },
            stationCode : $("#stationcode").val(), // est-ce que automatique ?

        })
        .then((docRef) => {
            // console.log("Document written with ID: ", docRef.id)
            var row = `<div class="alert alert-success" role="alert">
                    Objet ajouté avec succès !
                </div>`
        
                $('#element').append(row)
        
                setTimeout(function () {
                    $('#element').remove()
                }, 3000)
            // alert()
        })
        .catch((error) => {
            // console.error("Error adding document: ", error)
            // alert("Error adding document")
            var row = `<div class="alert alert-danger" role="alert">
                L'objet n'a pas pu être ajouté !
            </div>`

            $('#element').append(row)

            setTimeout(function () {
                $('#element').remove()
            }, 3000)
            // alert()
        })
    }

    $('#ajouter').click(e => {
        e.preventDefault()
        ajouter()
    })
    //modifier

    function edit(id){

        db.collection("police").doc(id).update({

            // adress : { avenue : $("#avenue" + id).val()}, // que contient une adress, en dehors de l'avenue ?
            designation : $("#designation" + id).val(), // est-ce que unique ? 
            // geopoint : , // comment faire pour prendre les deux ? //simulation
            phones : {
                DP1 : $("#DP1" + id).val(),
                DP2 : $("#DP2" + id).val()
            },
            stationCode : $("#stationcode" + id).val(), // est-ce que automatique ?

        })
            .then((docRef) => {
                var row = `<div class="alert alert-success" role="alert">
                    Objet modifié avec succès !
                </div>`
        
                $('#element').append(row)
        
                setTimeout(function () {
                    $('#element').remove()
                }, 3000)
            })
            .catch((error) => {
                // console.error("Error updating document: ", error);
                var row = `<div class="alert alert-danger" role="alert">
                    L'objet n'a pas pu être modifié !
                </div>`
        
                $('#element').append(row)
        
                setTimeout(function () {
                    $('#element').remove()
                }, 3000)
            })

    }

    //delete

    function supprimer(id){
        
          db.collection("police").doc(id).delete()
            .then((docRef) => {
                // console.log("Document deleted with ID: ", docRef.id);
                var row = `<div class="alert alert-success" role="alert">
                    Objet supprimé avec succès !
                </div>`
        
                $('#element').append(row)
        
                setTimeout(function () {
                    $('#element').remove()
                }, 3000)

            })
            .catch((error) => {
                var row = `<div class="alert alert-danger" role="alert">
                    L'objet n'a pas pu être supprimé !
                </div>`
        
                $('#element').append(row)
        
                setTimeout(function () {
                    $('#element').remove()
                }, 3000)
            })

    }

    $(window).bind("load", () => {
        $("#filtre").on("keyup", function() {
            var value = $(this).val().toLowerCase()
            $("#data .col-md-4").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            })
        })
    })
})