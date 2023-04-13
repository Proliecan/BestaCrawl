const Hexagon = class Hexagon{
    //  4 /\ 5
    // 3 |  | 0
    //  2 \/ 1

    static getNeighborInXYGrid(x, y, direction) {
        switch (direction) {
            case 0:
                return {x: x + (y % 2), y: y - 1};
            case 1:
                return {x: x+1, y: y};
            case 2:
                return {x: x + (y % 2), y: y + 1};
            case 3:
                return {x: x - 1 + (y % 2), y: y + 1};
            case 4:
                return {x: x-1, y: y};
            case 5:
                return {x: x - 1 + (y % 2), y: y - 1};
            default:
                throw new Error(`Invalid direction for hex neighbor: ${direction}`);
        }
    }
}