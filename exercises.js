class Exercise {

    name;
    type;
    muscle;
    equipment;
    difficulty;
    instruction;

    constructor(name, type, muscle, equipment, difficulty, instruction) {
        this.name = name;
        this.type = type;
        this.muscle = muscle;
        this.equipment = equipment;
        this.difficulty = difficulty;
        this.instruction = instruction;
    }
    getWorkoutInfo() {
        const exercise = {
            "name": this.name,
            "type": this.type,
            "muscle": this.muscle,
            "equipment": this.equipment,
            "difficulty": this.difficulty,
            "instruction": this.instruction
        }

        return exercise
    }
}

module.exports = Exercise