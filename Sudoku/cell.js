class Cell {
    
    constructor(tempX, tempY, tempW) {
        this.x = tempX * tempW;
        this.y = tempY * tempW;
        this.w = tempW;
        this.col = tempX;
        this.row = tempY;
        this.sect = 0
        this.collapsed = false;
        this.options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.value = '';
        this.conflict = false;
        this.revealed = false;
    }
  
    show() {

        stroke(0);
        strokeWeight(1);
        rect(this.x, this.y, this.w, this.w);

      

        if (this.collapsed) {
            this.value = this.options[0];
            textAlign(CENTER);
            text(this.value, this.x + (this.w / 2) , this.y + (this.w / 2));
        }
    }
   
    contains(x, y) {
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }

    reveal() {
        this.revealed = true;
        console.log("col: " + this.col);
        console.log("row: " + this.row);
        console.log("sect: " + this.sect);
        console.log("x:" + this.x +',' + this.y)

    }


  }