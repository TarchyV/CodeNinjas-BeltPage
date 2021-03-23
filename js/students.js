

document.getElementById('ninjaBtn').onclick= function(){
    var studentName = document.getElementById('newNinja').value;
    if(studentName.length < 3){
        alert('Name must be longer then 2 characters')
    }else{
        console.log(studentName)
    }
    POSTStudent(studentName, '', 'fundamentals')
    location.reload()
}

var studentJson;
//0 = unsorted, 1 = white, 2 = yellow, 3 = orange and so on....
function POSTStudent(student, oldbelt, newbelt){

    if(newbelt.toString().toLowerCase().includes('belt')){
         newbelt =  newbelt.toString().substring(0,newbelt.toString().indexOf("belt")).toLowerCase();
    }
    // var newbelt =  newbelt.id.toString().substring(0,newbelt.id.toString().indexOf("Belt")).toLowerCase();
    console.log("old: " +oldbelt)
    if(oldbelt.toString().includes('Belt')){
         oldbelt =  oldbelt.toString().substring(0,oldbelt.toString().indexOf("Belt")).toLowerCase();
    }
    console.log("old: " +oldbelt)
    console.log("new: " + newbelt)

    var xhr = new XMLHttpRequest();
    xhr.open("POST",'/students',true)
    xhr.send([oldbelt,student,newbelt])
    }
    

function getStudents(handle){
console.log('im doing stuff?')
var xhr = new XMLHttpRequest();
xhr.open("GET", '/students',true)
xhr.responseType = 'json'

xhr.onload = function(){

studentJson = xhr.response;
handleStudents(xhr.response)
}
xhr.send()
}
getStudents()








//0 = unsorted, 1 = fundamentals, 2 = white, 3 = yellow 4 = orange

function handleStudents(data){
renderStudents(Object.keys(data['unsorted']),0)
renderStudents(Object.keys(data['fundamentals']),1)
renderStudents(Object.keys(data['white']),2)
renderStudents(Object.keys(data['yellow']),3)
renderStudents(Object.keys(data['orange']),4)
renderStudents(Object.keys(data['green']),5)
}

function renderStudents(list,belt){
var parent;
switch (belt) {
    case 0:
        parent = $("#childrenArea")
        break;    
    case 1:
        parent = $("#Fundamentals")
        break;
    case 2:
        parent = $("#WhiteBelt")
        break; 
    case 3:
        parent = $("#YellowBelt")
        break;   
    case 4:
        parent = $("#OrangeBelt")
        break;  
    case 5:
        parent = $("#GreenBelt")
        break;                    
    default:
        break;
}


list.forEach(element => {
    var childNode = $(document.createElement('div'))
    childNode.attr({id: "childContainer"})
    childNode.attr({draggable:"true"})
    childNode.text(element)
    parent.append(childNode)
    childNode.bind('dragstart',function(ev){makeDraggable(ev, childNode,parent)})
    
});



}
function flyConfetti(){
    document.getElementById('confetti').style.backgroundImage = "url('https://i.gifer.com/Za9d.gif')"
    setTimeout(function(){
        document.getElementById('confetti').style.backgroundImage = "none"
    
    },800)
}