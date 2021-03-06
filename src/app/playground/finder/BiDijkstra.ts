import {utils } from '../include/utils';
import { GridCoords } from '../include/GridCoords';
import {hGrid, totalGrid} from '../include/constants'

let Utils: utils = new utils();


export class BiDjk{
  public steps :number = 0;
  public time :number = 0;
  bidirecNodeS:number = -1;  // letiable to store node location where forward bidirec ends
  bidirecNodeE:number = -1;  // node where backward bidrec ends // used in tracing path

  public search(start:number, end:number,gridCord: GridCoords[] ,allowDiag:boolean,notCrossCorner:boolean/*, req_step:number*/):void {
  	let startOpenList : number[] = new Array();
  	let endOpenList : number[] = new Array();
  	let closedList : number[] = new Array();
		let stop : boolean = false;
    let openBy : number[] = new Array();
    const byStart : number = 1;
		const byEnd : number = 2;
		let milli = performance.now();

    for (let i = 0; i < totalGrid; ++i) {
    	openBy[i] = 0;
    }

  	startOpenList.push(start);
  	gridCord[start].g = 0;


  	endOpenList.push(end);
  	gridCord[end].g = 0;

  	let currentNode :number;
  	while(startOpenList.length != 0 && endOpenList.length!=0) {
			if(stop){
				break;
			}
    	let lowInd : number = 0;
    	function removeElement(array, elem) {
          let index = array.indexOf(elem);
          if (index > -1) {
              array.splice(index, 1);
          }
      }
      if(startOpenList.length != 0 && !stop) {
	      this.steps ++;
      	let lowInd : number = 0;
	      for(let i=0; i<startOpenList.length; i++) {
	        if(gridCord[startOpenList[i]].g < gridCord[startOpenList[lowInd]].g) {
	           lowInd = i;
	        }
	      }
	      currentNode = startOpenList[lowInd];
	      removeElement(startOpenList,currentNode);
	      gridCord[currentNode].visited = true;

	      closedList.push(currentNode);

	      let neighbors = Utils.direction8_vector(currentNode,gridCord,allowDiag,notCrossCorner);
	      for(let Coord of neighbors){
	      	if(closedList.includes(Coord) ){//already visited
	          continue;
	        }
	      	if(openBy[Coord] === byEnd){
	      		let milli2 = performance.now();
		      	let node:number;
	          node = currentNode;
	          while(node!=start && node!= end){
	            gridCord[node].isPath = true;
	            node = gridCord[node].parent;
	          }
	          node = Coord
	          while(node !== end && node !== start){
	            gridCord[node].isPath = true;
	            node = gridCord[node].parent;
	          }
					  stop = true;
					  this.bidirecNodeE=Coord;
					  this.bidirecNodeS=currentNode;
	          this.time =  (milli2-milli);
	      		break;
	      	}
	      	let ng = (((Math.round(currentNode/hGrid)-Math.round(Coord/hGrid) === 0 )|| ((currentNode%hGrid)-(Coord%hGrid) )===0 )? 1 : 1.4);
	        if(openBy[Coord] === byStart ){
	            if(gridCord[currentNode].g + ng  < gridCord[Coord].g){
	              gridCord[Coord].g = gridCord[currentNode].g + ng;

	              gridCord[Coord].parent = currentNode;
	              openBy[Coord] = byStart;
	            }
	          }

          else{ //seeing the node for first time
            gridCord[Coord].g = gridCord[currentNode].g + ng;

          	gridCord[Coord].parent = currentNode;
            gridCord[Coord].open = true;
            startOpenList.push(Coord);
            openBy[Coord] = byStart;
          }
	      }
			}

			if(endOpenList.length != 0 && !stop){
	      gridCord[currentNode].visited = true;
	      let lowInd : number = 0;
	      for(let i=0; i<endOpenList.length; i++) {
	        if(gridCord[endOpenList[i]].g < gridCord[endOpenList[lowInd]].g) {
	           lowInd = i;
	        }
	      }
	      currentNode = endOpenList[lowInd];
	      gridCord[currentNode].visited= true;
	      removeElement(endOpenList, currentNode);
	      closedList.push(currentNode);


	      let neighbors = Utils.direction8_vector(currentNode,gridCord,allowDiag,notCrossCorner);
	      for(let Coord of neighbors){
	      	let ng = (((Math.round(currentNode/hGrid)-Math.round(Coord/hGrid) === 0 )|| ((currentNode%hGrid)-(Coord%hGrid) )===0 )? 1 : 1.4);
	        if(closedList.includes(Coord) ){//already visited
	          continue;
	        }

	        if(openBy[Coord]===byStart){
	        	let milli2 = performance.now();
		      	let node:number;
	          node = currentNode;
	          while(node!=end && node!= start){
	            gridCord[node].isPath = true;
	            node = gridCord[node].parent;
	          }
	          node = Coord
	          while(node!=start&& node!= end ){
	            gridCord[node].isPath = true;
	            node = gridCord[node].parent;
	          }
					stop = true;
					this.bidirecNodeS=Coord;
					this.bidirecNodeE=currentNode;
	        this.time =  (milli2-milli);
	      	break;
	      }


	        if(openBy[Coord]==byEnd){
	            if(gridCord[currentNode].g + ng  < gridCord[Coord].g){
	              gridCord[Coord].g = gridCord[currentNode].g + ng;
	              gridCord[Coord].parent = currentNode;
	              openBy[Coord] = byEnd;
	            }
	          }

          else{ //seeing the node for first time
            gridCord[Coord].g = gridCord[currentNode].g + ng;
            gridCord[Coord].parent = currentNode;
            gridCord[Coord].open = true;
            endOpenList.push(Coord);
            openBy[Coord] = byEnd;

          }
	      }
			}
    }
	}
}
