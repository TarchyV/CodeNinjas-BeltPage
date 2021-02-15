

var studentJson;
//0 = unsorted, 1 = white, 2 = yellow, 3 = orange and so on....
function POSTStudent(student, oldbelt, newbelt){
    console.log(oldbelt)
    var newbelt =  newbelt.id.toString().substring(0,newbelt.id.toString().indexOf("Belt")).toLowerCase();
    if(oldbelt.toString().includes('Belt')){
        var oldbelt =  oldbelt.toString().substring(0,oldbelt.toString().indexOf("Belt")).toLowerCase();
    }
    console.log(oldbelt)
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
