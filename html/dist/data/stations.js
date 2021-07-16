$(document).ready(function() {

    var row = ``
    var tableau = []

    // get all
    db.collection("police").get()
        .then((querySnapshot) => {
    
            querySnapshot.forEach((doc) => {
                tableau.push(1)

                row = `  <div class="col-md-4" id=${[tableau.length-1]}>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Station Ruashi</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-outline-success">
                                            <i class="fa fa-edit"></i></a>
                                    <a href="#" class="btn btn-outline-danger">
                                            <i class="fa fa-trash"></i></a>
                                    </a>
                                </div>
                            </div>
                        </div> `

                $('#data').append(row)

            })
        })
        
        .catch((err) => {
            console.log(err)
        })

    //add

    //modifier

    //delete
})