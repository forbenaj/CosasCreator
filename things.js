

class Room {
    constructor(id){
        this.id = id;
        this.bg = id+".png";
        this.items = [];
        this.doors = [];
    }

    init(){
        this.window = document.createElement("div")
        this.window.className = "window"

        this.window.style.backgroundImage = this.bg


        for(let item of items){
            item.draw(this.window)
        }
    }
}

class Item {
    constructor(id){
        this.id = id;
        this.img = id+".png";
        this.action = "";
        this.x;
        this.y;
    }
    draw(){

    }

}

class Scene {
    constructor(id){
        this.id = id;

        this.currentRoom;
        
        this.window = document.createElement("div");

        this.window.id = "canvasContainer";
        this.window.style.width = "800px"
        this.window.style.height = "600px"

        this.canvas = document.createElement("canvas");
        this.canvas.width = 800; // T h i s                b e                 e l s e w h e r e
        this.canvas.height = 600; //         s h o u l d        d e f i n e d
        this.window.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.window) // This should be dealen elsewhere
    }

    reload() {
        let newCanvas = document.createElement("canvas");
        newCanvas.width = 800; // T h i s                b e                 e l s e w h e r e
        newCanvas.height = 600; //         s h o u l d        d e f i n e d

        this.window.replaceChild(newCanvas, this.canvas);

        this.canvas = newCanvas;
        this.ctx = this.canvas.getContext('2d');
    }

    drawImage(src,x,y,r,h,w){
        
        let image = new Image()
        image.src = src
        
        this.ctx.save();
        this.ctx.translate(x,y);
        this.ctx.rotate(r);
        this.ctx.scale(h, w);
        this.ctx.drawImage(image, -image.width / 2, -image.height / 2);
        this.ctx.restore();
    }

    drawPolygon(points,color) {

        if (points.length < 3) {
          console.error('A polygon needs at least 3 points.');
          return;
        }
  
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
  
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
  
        this.ctx.closePath();
        this.ctx.fillStyle = color
        this.ctx.fill()
        //this.ctx.stroke();
    }

    makePolygon(points) {

        if (points.length < 3) {
          console.error('A polygon needs at least 3 points.');
          return;
        }
  
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
  
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
  
        this.ctx.closePath();
    }

    setSize(x,y){
        this.window.style.width = x
        this.window.style.height = y

    }

    setBackground(src){
        this.window.style.backgroundImage = "url("+src+")"
    }

    goTo(roomId){

        this.reload()
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //this.canvas.removeEventListener('click', (event) => this.handleCanvasClick(event, door))
        let newRoom = rooms.find(room => room.id === roomId);
        
        this.currentRoom=newRoom;
        this.setBackground(newRoom.id+".png")
        this.loadChildren()
    }

    loadChildren(){
        for (let child of this.currentRoom.children){
            if(child.type == "door"){
                this.makePolygon(child.points)
                child.hovered = false
                this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event,child))
                this.canvas.addEventListener('click', (event) => this.handleCanvasClick(event, child))
                //this.canvas.addEventListener('mouseover', (event) => this.onMouseOver(event, door))
                //this.canvas.addEventListener('mouseout', (event) => this.onMouseOff(event, door))}
            }
        }

    }

    loadItems(){

    }
    loadDoors(){
        for (let door of this.currentRoom.doors){
            this.makePolygon(door.points)
            this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event,door))
            this.canvas.addEventListener('click', (event) => this.handleCanvasClick(event, door))
            //this.canvas.addEventListener('mouseover', (event) => this.onMouseOver(event, door))
            //this.canvas.addEventListener('mouseout', (event) => this.onMouseOff(event, door))
        }
    }

    handleCanvasClick(event, door) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
  
        // Check if the click point is inside the polygon
        this.ctx.beginPath();
        this.makePolygon(door.points);
        if (this.ctx.isPointInPath(mouseX, mouseY)) {
          // Call the click event function for the specific polygon
          door.clickEvent(this);
        }
    }

    onMouseOver(event, door) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        console.log("mouseon")
  
        // Check if the click point is inside the polygon
        this.ctx.beginPath();
        this.makePolygon(door.points)
        if (this.ctx.isPointInPath(mouseX, mouseY)) {
            this.drawPolygon(door.points, door.onHover.color);
          //door.clickEvent(this);
        }
    }
    onMouseMove(event, child) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
  
        // Check if the click point is inside the polygon
        this.ctx.beginPath();
        this.makePolygon(child.points)

        if (this.ctx.isPointInPath(mouseX, mouseY) && child.hovered == false) {
            this.drawPolygon(child.points, child.onHover.color);
            child.hovered = true
          //door.clickEvent(this);
        }
        else if (this.ctx.isPointInPath(mouseX, mouseY) == false && child.hovered == true){
            child.hovered = false
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }// This should redraw the scene

        
    }
}