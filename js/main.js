"use strict";
function getData(url, callBack){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
            callBack(this.responseText);         
            //console.log(json[2].employeefname);
            //var emply = json[1];
            //console.log(emply[1].employeeid);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// Roles here is not yet implemented
function getTeamMembers(data,roles = null){
    //maxValueWidth Determined the size of the browser and will take the maximum member container for the Team container
    // var w = window.innerWidth;
    // var maxValueWidth = 0;
    // if(w < 1335){
    //     maxValueWidth = 6;
    // }else if (w< 1025){
    //     maxValueWidth = 4;
    // }else if (w<720){
    //     maxValueWidth = 2;
    // }else{
    //     maxValueWidth = 8;
    // }
    //console.log(w);
    //console.log(maxValueWidth);
    var team_container = document.getElementById('container_team');
    var json = [];
    json = JSON.parse(data);
     //https://stackoverflow.com/questions/33096959/how-to-count-json-object-in-javascript
    //New learning as to get the lenght in a json file.
    //Object.keys will return an array so that length property can be use.
    //console.log(Object.keys(json).length);
    //console.log(json);     
    var list_members= Object.keys(json);
    var start_loop = parseInt(list_members[0]);
    //To get the first value number
    //console.log(list_members[0]);
    //Add values if More than 12 
    if(list_members.length > 6){
        //Container will have a scrolling effect to the right if value is max to 6
        team_container.className = 'wrap_team';
    }else{
        team_container.className = '';
    }
        
    // Loop thru all the contents
    for(let i = start_loop; i< list_members.length + start_loop; i++){
        //Main Container
        var inside_cont = document.createElement('div');
        inside_cont.className = 'inside_cont';
            
        //Featured Container
        var featured = document.createElement('div');
        featured.className = 'featured';
        var featured_image = document.createElement('img');
        if(parseInt(json[i].employeeisfeatured) === 1){
            featured_image.src = '../images/crown-emoji-by-google.png';
        }
        else{
            featured_image.src = '';
        }
        // featured_image.alt= '';
        featured.appendChild(featured_image);

        //Main info Container
        var main_info = document.createElement('div');
        main_info.className = 'main_info';
        
        var mem_image_cont = document.createElement('div');
        mem_image_cont.className = 'mem_image';
        var mem_image = document.createElement('img');
        mem_image.src = 'http://sandbox.bittsdevelopment.com/code1/employeepics/'+i+'.jpg';
        mem_image.alt = 'Member picture';
        mem_image_cont.appendChild(mem_image);

        var mem_details = document.createElement('div');
        mem_details.className = 'mem_details';
        var mem_name = document.createElement('div');
        mem_name.className = 'mem_name';
        mem_name.textContent = json[i].employeefname + ' ' + json[i].employeelname;
        var mem_bio = document.createElement('p');
        mem_bio.className = 'mem_bio';
        if(json[i].employeebio.length >= 50){
            mem_details.style.overflowY = 'scroll';

        }
        mem_bio.textContent =  json[i].employeebio;
        mem_details.appendChild(mem_name);
        mem_details.appendChild(mem_bio);

        main_info.appendChild(mem_image_cont);
        main_info.appendChild(mem_details);
        
        //Tags Container
        var mem_tags = document.createElement('div');
        mem_tags.className = 'mem_tags';

        var list_tags= Object.keys(json[i].roles).length;
        for(let x = 0; x<list_tags; x++){
            var tag = document.createElement('div');
            tag.className = 'tag';
            tag.textContent = json[i].roles[x].rolename;
            tag.style.background = json[i].roles[x].rolecolor;
            mem_tags.appendChild(tag);
        }
  
            //Appending all the Containers
            inside_cont.appendChild(featured);
            inside_cont.appendChild(main_info);
            inside_cont.appendChild(mem_tags);

            console.log(inside_cont);
            team_container.appendChild(inside_cont);
          
    }
}


function getRoles(data){
    // Get the Roles for each and print in HTML
    // not Yet Implemented
}

window.onload = function(){
    getData("http://sandbox.bittsdevelopment.com/code1/fetchemployees.php", getTeamMembers);

}
