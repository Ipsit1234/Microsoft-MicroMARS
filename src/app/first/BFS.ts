import {utils } from './utils';
import { GridCoords } from './GridCoords';
import {hGrid, vGrid, totalGrid} from './constants';
import {DPair} from './adj';

let Utils: utils = new utils();

export class BFS{

  public steps: number = 0;
  public length1: number = 0;
  public time: string = '0';

  public search(gridCord: GridCoords[] ,start:number, end:number,allowDiag:boolean,notCrossCorner:boolean, adj?: DPair[][]):void {

    let milli = performance.now();
    let distance: number[] = new Array();
    let stop :boolean = false;
    var qu = new Array();
    gridCord[start].visited = true;
    distance[start] = 0;
    qu.push(start);
    while(qu.length != 0){
      this.steps ++;
      var s =   qu[0];
      qu.shift();
      gridCord[s].visited= true;
      var arr = Utils.direction8_vector(s,gridCord,allowDiag, notCrossCorner);
      for(let u of arr){


        if (!gridCord[u].open  && ! stop){

          gridCord[u].open= true;
          distance[u]=distance[s]+1;
          gridCord[u].parent = s;

          if (u == end){
            let node:number;
            node = s;//parent[u]
            while(node!=start){
              gridCord[node].isPath = true;
              node = gridCord[node].parent;
              this.length1 ++;
            }
            let milli2 = performance.now();
            this.time = (milli2-milli).toFixed(3);
            this.length1 ++;
            stop = true;
            break;
          }

          qu.push(u);

        }
      }
      if(stop){
        break;
      }
    }

	}
}


