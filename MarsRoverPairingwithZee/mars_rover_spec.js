describe('Mars Rover', function(){
  describe("sendCommands", function() {
    describe('F command', function(){
      it('moves forward when facing north from 0, 0 to 0, 1', function(){
        var rover = new Rover({ x: 0, y: 0, facing: "north"});

        rover.sendCommands(["F"]);
        expect(rover.location()).toEqual({ x: 0, y: 1 });
      });

      it('moves forward when facing north from 0, 1 to 0, 2', function(){
        var rover = new Rover({ x: 0, y: 1, facing: "north"});
        rover.sendCommands(["F"]);
        expect(rover.location()).toEqual({ x: 0, y: 2 });
      });

      it('moves forward when facing east from 0, 0 to 1, 0', function(){
        var rover = new Rover({ x: 0, y: 0, facing: "east"});
        rover.sendCommands(["F"]);
        expect(rover.location()).toEqual({ x: 1, y: 0 });
      });

      it('moves forward when facing west from 0, 0 to -1, 0', function(){
        var rover = new Rover({ x: 0, y: 0, facing: "west"});
        rover.sendCommands(["F"]);
        expect(rover.location()).toEqual({ x: -1, y: 0 });
      });

      it('moves forward when facing south from 0, 0 to 0, -1', function(){
        var rover = new Rover({ x: 0, y: 0, facing: "south"});
        rover.sendCommands(["F"]);
        expect(rover.location()).toEqual({ x: 0, y: -1 });
      });

      it('moves forward when facing north from 0, 0 to 0, 2', function(){
        var rover = new Rover({ x: 0, y: 0, facing: "north"});
        rover.sendCommands(["F", "F"]);
        expect(rover.location()).toEqual({ x: 0, y: 2 });
      });

      it('moves forward when facing east from 0, 0 to 2, 0', function(){
        var rover = new Rover({ x: 0, y: 0, facing: "east"});
        rover.sendCommands(["F", "F"]);
        expect(rover.location()).toEqual({ x: 2, y: 0 });
      });
    });

    describe('B command', function(){
      it('moves backward when facing north from 0, 0 to 0, -1', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "north"});
        rover.sendCommands(["B"]);
        expect(rover.location()).toEqual({ x: 0, y: -1 });
      });

      it('moves backward when facing north from 0, -1 to 0, -2', function() {
        var rover = new Rover({ x: 0, y: -1, facing: "north"});
        rover.sendCommands(["B"]);
        expect(rover.location()).toEqual({ x: 0, y: -2 });
      });

      it('moves backward when facing east from 0, 0 to -1, 0', function(){
        var rover = new Rover({ x: 0, y: 0, facing: "east"});
        rover.sendCommands(["B"]);
        expect(rover.location()).toEqual({ x: -1, y: 0 });
      });

      it('moves backward when facing west from 0, 0 to 1, 0', function(){
        var rover = new Rover({ x: 0, y: 0, facing: "west"});
        rover.sendCommands(["B"]);
        expect(rover.location()).toEqual({ x: 1, y: 0 });
      });

      it('moves backward when facing south from 0, 0 to 0, 1', function(){
        var rover = new Rover({ x: 0, y: 0, facing: "south"});
        rover.sendCommands(["B"]);
        expect(rover.location()).toEqual({ x: 0, y: 1 });
      });

      it('moves backward when facing north from 0, 0 to 0, -2', function(){
        var rover = new Rover({ x: 0, y: 0, facing: "north"});
        rover.sendCommands(["B", "B"]);
        expect(rover.location()).toEqual({ x: 0, y: -2 });
      });

      it('moves backward when facing east from 0, 0 to -2, 0', function(){
        var rover = new Rover({ x: 0, y: 0, facing: "east"});
        rover.sendCommands(["B", "B"]);
        expect(rover.location()).toEqual({ x: -2, y: 0 });
      });
    });

    describe("the L command", function() {
      it('changes direction from north to west', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "north"});
        rover.sendCommands(["L"]);
        expect(rover.facing()).toEqual("west");
      });

      it('rotates West to south', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "west"});
        rover.sendCommands(["L"]);
        expect(rover.facing()).toEqual("south");
      });

      it('rotates south to east', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "south"});
        rover.sendCommands(["L"]);
        expect(rover.facing()).toEqual("east");
      });

      it('rotates east to north', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "east"});
        rover.sendCommands(["L"]);
        expect(rover.facing()).toEqual("north");
      });

      it('rotates left twice east to west', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "east"});
        rover.sendCommands(["L", "L"]);
        expect(rover.facing()).toEqual("west");
      });

      it('rotates left twice north to south', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "north"});
        rover.sendCommands(["L", "L"]);
        expect(rover.facing()).toEqual("south");
      });
    });

    describe("the R command", function() {
      it('rotates north to east', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "north"});
        rover.sendCommands(["R"]);
        expect(rover.facing()).toEqual("east");
      });

      it('rotates east to south', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "east"});
        rover.sendCommands(["R"]);
        expect(rover.facing()).toEqual("south");
      });

      it('rotates south to west', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "south"});
        rover.sendCommands(["R"]);
        expect(rover.facing()).toEqual("west");
      });

      it('rotates west to north', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "west"});
        rover.sendCommands(["R"]);
        expect(rover.facing()).toEqual("north");
      });

      it('rotates right twice west to east', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "west"});
        rover.sendCommands(["R", "R"]);
        expect(rover.facing()).toEqual("east");
      });

      it('rotates left twice north to south', function() {
        var rover = new Rover({ x: 0, y: 0, facing: "north"});
        rover.sendCommands(["R", "R"]);
        expect(rover.facing()).toEqual("south");
      });
    });

    describe("Mix turn and movement commands sent to rover", function(){
      it('rotates right from north to east and moves forward one coordinate', function(){
        var rover = new Rover({x: 0, y: 0, facing: "north"});
        rover.sendCommands(["R", "F"]);
        expect(rover.attributes.position).toEqual({ x: 1, y: 0, facing: "east"});
      });

      it('rotates left twice from north to south and moves backward twice', function(){
        var rover = new Rover({x: 0, y: 0, facing: "north"});
        rover.sendCommands(["L", "L", "B", "B"]);
        expect(rover.attributes.position).toEqual({ x: 0, y: 2, facing: "south"});
      });

      it('Facing east forward, left, forward, right, forward', function(){
        var rover = new Rover({x: 0, y: 0, facing: "east"});
        rover.sendCommands(["F", "L", "F", "R", "F"]);
        expect(rover.attributes.position).toEqual({ x: 2, y: 1, facing: "east"});
      });

      it('Facing south go backward, left, backward, right, forward', function(){
        var rover = new Rover({x: 0, y: 0, facing: "south"});
        rover.sendCommands(["B", "L", "B", "R", "F"]);
        expect(rover.attributes.position).toEqual({ x: -1, y: 0, facing: "south"});
      });
    });
  });
});