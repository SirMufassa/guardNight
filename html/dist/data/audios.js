$(document).ready(function() {

    var row = ``
    var tableau = []

    //get all
    db.collection("insec_audio").get()
        .then((querySnapshot) => {
    
            querySnapshot.forEach((doc) => {

                // avoid show the document with ID new, it's for debug purpose only
                
                if(doc.id === 'new') return;
                tableau.push(1)

                row = `  <div class="sl-item" id=${[tableau.length-1]}>
                            <div class="sl-left bg-success"> <i class="fa fa-user"></i></div>
                            <div class="sl-right">
                                <div><a href="#">${[doc.data().senderPhone]}</a> <span class="sl-date">5 minutes ago</span>
                                </div>
                                <div class="desc" id=${[doc.id]}>Approve meeting with tiger
                                    <br>
                                    <a href="javascript:void(0)"
                                        class="btn m-t-10 m-r-5 btn-rounded btn-outline-success" id="edit${[tableau.length-1]}">
                                        <i class="fa fa-play-circle-o"></i></a>
                                    </a>

                                    <a href="javascript:void(0)"
                                        class="btn m-t-10 m-r-5 btn-rounded btn-outline-warning">
                                        <i class="fa fa-map"></i></a>
                                    </a>

                                    <a href="javascript:void(0)"
                                        class="btn m-t-10 btn-rounded btn-outline-danger" id="trash${[tableau.length-1]}">
                                        <i class="fa fa-trash"></i></a>
                                    </a> 
                                </div>
                            </div>
                        </div>
                    `
                
                $('#data').append(row)
                // console.log(`${doc.id} => ${doc.data().avenue}`)

                $(`#trash${[tableau.length-1]}`).click((e) => {
                    console.log(doc.id)
                     // confirmer
                     let confirmAction = confirm("Are you sure to execute this action?")

                     if (confirmAction) {
                         supprimer(doc.id)
                         alert("Action successfully executed")
                     } else {
                         alert("Action canceled")
                     }

                })

            })
        })
        
        .catch((err) => {
            console.log(err)
        })

    //delete

    function supprimer(id){
        
        db.collection("insec_audio").doc(id).delete()
            .then((docRef) => {
              console.log("Document deleted")
              alert("Document deleted")
        })
            .catch((error) => {
              console.error("Error deleting document")
              alert("Error deleting document")
        })

    }

    //lecture

    // etat : lu ou pas ?
})