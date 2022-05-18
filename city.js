function showListCity(){
    $.ajax({
        type:"GET",
        url: "http://localhost:8080/city",
        success: function (city){
            let content = '';
            for (let i = 0; i < city.length; i++) {
                content += `<tr>
    <th scope="row">${i+1}</th>
    <td>${city[i].name}</td>

    <td>${city[i].country.name}</td>
    <td><button type="button" class="btn btn-outline-primary" onclick="showEditFormCity(${city[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deleteCity(${city[i].id})">Delete</button></td>
    <td><button type="button" class="btn btn-outline-success" onclick="cityDetails(${city[i].id})" data-bs-toggle="modal" data-bs-target="#myModal12">View</button></td>

    </tr>`
            }
            $("#city").html(content);
        }
    })
}
showListCity();

//DELETE CITY.................................................

function deleteCity(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/city/delete/${id}`,
        success: function () {
            showListCity()
        }
    })
}

//CREATE STUDENT..................................................

function showCountry(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/city/country",
        success: function (country){
            let content = `<option selected>...Choose...</option>`;
            for (let i = 0; i < country.length; i++) {
                content +=`<option value="${country[i].id}">${country[i].name}</option>`
            }
            $("#country").html(content);
            $("#u-country").html(content);
        }
    })
}

function addNewCity() {
    let name = $('#name').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let country = $('#country').val();

    let newCity = {
        name : name,
        area : area,
        population : population,
        gdp : gdp,
        description : description,
        country :{
            id:parseInt(country)
        },

    };


    // goi ajax
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/city",
        data: JSON.stringify(newCity),
        success: function (){
            showListCity()
        }
    });
    event.preventDefault();
}

//UPDATE_CITY..............................................
function updateCity(id) {
    // lay du lieu
    let name = $('#u-name').val();
    let area = $('#u-area').val();
    let population = $('#u-population').val();
    let gdp = $('#u-gdp').val();
    let description = $('#u-description').val();
    let country = $('#u-country').val();

    let cityUpdate = {
        name : name,
        area : area,
        population : population,
        gdp : gdp,
        description : description,
        country :{id:parseInt(country)},
    };


    // goi ajax
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(cityUpdate),
        url: `http://localhost:8080/city/edit/${id}`,

        success: function (){
            showListCity()
        }
    })
    event.preventDefault();
}


function showEditFormCity(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="u-name" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="area" class="form-label">Area</label>
                            <input type="text" class="form-control" id="u-area" >
                        </div>
      
                        
                        <div class="mb-3">
                            <label for="population" class="form-label">Population</label>
                            <input type="text" class="form-control" id="u-population" >
                        </div>
      
                        
                        <div class="mb-3">
                            <label for="gdp" class="form-label">GDP</label>
                            <input type="text" class="form-control" id="u-gdp" >
                        </div>
      
                        
                         <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
<!--              <input type="text" class="form-control" id="description">-->
                       <br />

                       <textarea rows = "5" cols="33" name = "description" id="description"></textarea>
                       </div>
      
                        
                        <tr>
                            <div>
                                <label>Country:</label>
                                
                                <select name="country" id="u-country"> </select>
                            </div>
                        </tr>
                                   
                        <div class="modal-footer">
                             <button type="submit" class="btn btn-primary" onclick="updateCity(${id})">Edit</button>
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#showFormEdit").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/city/${id}`,
        success:function (city){
            $('#u-name').val(city.name);
            $('#u-area').val(city.area);
            $('#u-population').val(city.population);
            $('#u-gdp').val(city.gdp);
            $('#u-description').val(city.description);
            $('#u-country').val(city.country.name);
        }
    })
    showCountry();
}
showCountry();



function cityDetails(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input disabled type="text" class="form-control" id="u-name" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="area" class="form-label">Area</label>
                            <input disabled type="text" class="form-control" id="u-area" >
                        </div>
      
                        
                        <div class="mb-3">
                            <label for="population" class="form-label">Population</label>
                            <input disabled type="text" class="form-control" id="u-population" >
                        </div>
      
                        
                        <div class="mb-3">
                            <label for="gdp" class="form-label">GDP</label>
                            <input disabled type="text" class="form-control" id="u-gdp" >
                        </div>
      
                        
                         <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
<!--              <input type="text" class="form-control" id="description">-->
                       <br />

                       <textarea disabled rows = "5" cols="33" name = "description" id="u-description"></textarea>
                       </div>                       
                  
                      <div class="mb-3">
                            <label for="country" class="form-label">Country</label>
                            <input disabled type="text" class="form-control" id="u-country" >
                        </div>
                                   
                        <div class="modal-footer">
                  
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#cityDetails").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/city/${id}`,
        success:function (city){
            $('#u-name').val(city.name);
            $('#u-area').val(city.area);
            $('#u-population').val(city.population);
            $('#u-gdp').val(city.gdp);
            $('#u-description').val(city.description);
            $('#u-country').val(city.country.name);
        }
    })
}



