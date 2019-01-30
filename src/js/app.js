class Game {
  constructor(){
    this.wraper = document.getElementById('app');
    this.rings = [
      {
        name: 3,
        class: 'ring-1',
        spindle: 1,
      },
      {
        name: 2,
        class: 'ring-2',
        spindle: 1,
      },
      {
        name: 1,
        class: 'ring-3',
        spindle: 1,
      },

    ]
    this.spindles=[
      {
        name: 1,
        items: [1,2,3]
      },
      { 
        name: 2,
        items:[]
      },
      { 
        name: 3,
        items:[]
      }
    ]
    this.render();
  }
  render(){
    this.wraper.innerHTML = " ";
    for (let spindle of this.spindles ){
      let element = document.createElement("div");
      element.className = 'spindle';

      element.setAttribute("spin", spindle.name);
      element.addEventListener('dragover', function (e) {
        e.preventDefault();
      });
      element.addEventListener('dragenter', function (e) {
        e.preventDefault();       
      });
      element.addEventListener('dragleave', function () {
      });
      element.addEventListener('drop', function (e) {
        e.preventDefault();
          this.dragDrop(e);
      }.bind(this), false);
       
    
      if(spindle.items.length){
        for(let item of spindle.items){
          let canMove = false;
          if(spindle.items.indexOf(item)+1===spindle.items.length){
            canMove = true;
          } 
          element.prepend(this.createRing(item, canMove));
        } 
        
      }
      
      this.wraper.appendChild(element);
    }
  }
  createRing(index, canMove){

    for (let item of this.rings) {
      
      if (index === item.name){
        let ring = document.createElement("div");
        ring.className = item.class;
        ring.setAttribute("data", item.name);
        if (canMove){
          this.ringDrag(ring);
        }
        return ring;
      }

    } 
  }
  
  ringDrag(element) {
    element.setAttribute("draggable", "true");
    element.addEventListener('dragstart', this.dragStart);
    element.addEventListener('dragend', this.dragEnd);
  }
  dragStart(e) {
    e.dataTransfer.setData('text', this.getAttribute('data')); 
  }
  dragEnd(e) {

    console.log(e.target.getAttribute("data"));
  }
  dragDrop(e) {
    e.preventDefault();
    let spindleNumber = e.target.getAttribute("spin");

    
    for(let spindel of this.spindles){
      if(spindel.name == spindleNumber){
        spindel.items.push(parseInt(e.dataTransfer.getData("text"),10));
      }
    }
    this.render();
    
    e.dataTransfer.clearData();
  }


}
const newGame = new Game;

