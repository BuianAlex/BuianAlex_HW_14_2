class Game {
  constructor(){
    this.wraper = document.getElementById('app');
    this.calcMoves = 0;
    this.rings = [
      {
        name: 3,
        class: 'ring-3',
      },
      {
        name: 2,
        class: 'ring-2',
      },
      {
        name: 1,
        class: 'ring-1',
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
    document.getElementById("calcMoves").innerHTML=this.calcMoves;
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
          element.prepend(this.createRing(item,spindle.name, canMove));
        } 
        
      }
      
      this.wraper.appendChild(element);
    }
    console.log(this.calcMoves);
    
  }
  createRing(index, spindle, canMove){

    for (let item of this.rings) {
      
      if (index === item.name){
        let ring = document.createElement("div");
        ring.className = item.class;
        ring.setAttribute("data", item.name);
        ring.setAttribute("spindleNumb", spindle);
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
    e.dataTransfer.setData('spindleNumb', this.getAttribute('spindleNumb'));
  }
  dragEnd(e) {

  }
  ///
  dragDrop(e) {
    e.preventDefault();
    let spindleNumber = parseInt(e.target.getAttribute("spin"));
    let ringData = parseInt(e.dataTransfer.getData("text"),10)

    for(let spindelTarget of this.spindles){

      if(spindelTarget.name === spindleNumber){
         
        if(spindelTarget.items[spindelTarget.items.length-1]<ringData||spindelTarget.items.length===0){
         
          spindelTarget.items.push(ringData);
          for(let spindleStart of this.spindles){
            if(spindleStart.name === parseInt(e.dataTransfer.getData("spindleNumb"),10)){
              spindleStart.items.pop();
              this.calcMoves++;
            }
          }
        }
      }
    }
    this.render();
    
    e.dataTransfer.clearData();
  }


}
const newGame = new Game;

