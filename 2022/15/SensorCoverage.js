//Stores the sensor coverage as a polygon (4 angles)
class SensorCoverage{
    constructor(sensor, beacon){
        this.sensor = sensor;
        this.beacon = beacon;
        this.manDist = Math.abs(beacon.y-sensor.y) + Math.abs(beacon.x-sensor.x);;
        //Collect border coordinates
        // this.border = [];
    }

    getCoverageRangeByY(y){
        let ySteps = Math.abs(y - this.sensor.y);
        let xSteps = this.manDist - ySteps;
        let minX = 1;
        let maxX = 0;
        if(xSteps > 0){
            minX = this.sensor.x - xSteps;
            maxX = this.sensor.x + xSteps;
        }
        return {minX, maxX, length: maxX - minX};
    }

    /**
     * This one is not in use... part of brute force solution :)
     */
    _updateBorder(){
        //Collection top right border coordinates
        let j = this.top.y;
        for(let i = this.top.x; i <= this.right.x; i++){
            this.border.push({x: i, y: j});
            j++;
        }

        //Collection bottom right coordinates
        j = this.right.y+1;
        for(let i = this.right.x-1; i >= this.bottom.x; i--){
            this.border.push({x: i, y: j});
            j++;
        }

        //Collection bottom left coordinates
        j = this.bottom.y-1;
        for(let i = this.bottom.x-1; i >= this.left.x; i--){
            this.border.push({x: i, y: j});
            j--;
        }

        //Collection top left coordinates
        j = this.left.y-1;
        for(let i = this.left.x+1; i <= this.top.x-1; i++){
            this.border.push({x: i, y: j});
            j--;
        }
    }
}


module.exports = {
    SensorCoverage
}