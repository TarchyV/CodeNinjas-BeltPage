
var draggedElem;
var beforeBelt;
function makeDraggable(e, node,parent){
  dropped = false
    console.log($(node))
    draggedElem = node;
    beforeBelt = $(node).parent().attr('id')
    var stuff = $(node).clone().wrap('<div></div>').parent().html();
    console.log(stuff)
    e.originalEvent.dataTransfer.effectAllowed = 'copy';
    e.originalEvent.dataTransfer.setData('stuff', stuff);
  
}


$('#childContainer').bind('drag', function(e){

});    

$('.containerArea').bind('dragover', function (e) {

  if(e.originalEvent.preventDefault)
    e.preventDefault();

  e.originalEvent.dataTransfer.dropEffect = 'copy';
  return false;
});


$('.containerArea').bind('dragenter', function (e) {
  $(this).addClass('over');
}); 

$('.containerArea').bind('dragleave', function (e) {
  $(this).removeClass('over');
}); 


$('.containerArea').bind('drop', function (e) {

  if (e.originalEvent.stopPropagation)
     e.originalEvent.stopPropagation();   

  var stuff = $(e.originalEvent.dataTransfer.getData('stuff'));
  stuff.appendTo(this);
  console.log(stuff)
  dropped = true;
  stuff.attr({id: "childContainer"})
  stuff.attr({draggable:"true"})
  stuff.bind('dragstart',function(ev){makeDraggable(ev, stuff,this)})
  POSTStudent(stuff.text(),beforeBelt,this.id.toString().toLowerCase())
  $(draggedElem).remove()
  flyConfetti()
  return false;
});  
$('#trashcan').bind('dragover', function (e) {

  if(e.originalEvent.preventDefault)
    e.preventDefault();

  e.originalEvent.dataTransfer.dropEffect = 'copy';
  return false;
});


$('#trashcan').bind('dragenter', function (e) {
  $(this).addClass('over');
}); 

$('#trashcan').bind('dragleave', function (e) {
  $(this).removeClass('over');
}); 
$('#trashcan').bind('drop', function (e) {

  if (e.originalEvent.stopPropagation)
     e.originalEvent.stopPropagation();   

  var stuff = $(e.originalEvent.dataTransfer.getData('stuff'));
  stuff.appendTo(this);
  console.log(stuff)
  dropped = true;
  POSTStudent(stuff.text(),beforeBelt,'')
  $(draggedElem).remove()

  return false;
});  
