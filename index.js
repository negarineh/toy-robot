#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");

const init = () => {
    console.log(
        chalk.green(
            figlet.textSync("TOY ROBOT SIMULATOR", {
                font: "Standard",
                horizontalLayout: "full",
                verticalLayout: "default",
                kerning: "fitted"
            })
        )
    );
    console.log(
        chalk.blue("Available Commands: \n" +
            "    PLACE <0..4>,<0..4>,<NORTH,SOUTH,WEST,EAST>\n" +
            "    MOVE     => move the toy robot one unit forward in the direction it is currently facing\n" +
            "    LEFT     => rotate the robot 90 degrees in the specified direction without changing the position of the robot\n" +
            "    RIGHT    => rotate the robot 90 degrees in the specified direction without changing the position of the robot\n" +
            "    REPORT   => announce the X,Y and F of the robot\n")
    );
    console.log(
        chalk.italic.cyan.bgCyanBright("Use 'Ctrl + c' for exit "),
    );
    console.log(
        chalk.italic.cyan("Enter Commands: "),
    )
};

const run = async () => {
    // show script introduction
    init();
};

let command;
let position = [0,0];
let direction ='';
let com = '';

const move = (moves, positions, directions) => {
    if (moves !== 0 ) {
        switch (directions) {
            case 'NORTH':
                if (position[1] === 4) {
                    console.log(
                        chalk.red.bold(`This is ${directions} part of the table`)
                    )
                } else {
                    position = [position[0], position[1] + 1];
                }
                break;
            case 'EAST':
                if (positions[0] === 0) {
                    console.log(chalk.red.bold('This is EAST part of the table'))
                } else {
                    position = [positions[0] - 1, positions[1]];
                }
                break;
            case 'SOUTH':
                if (positions[1] === 0) {
                    console.log(
                        chalk.red.bold('This is SOUTH part of the table')
                    )
                } else {
                    position = [positions[0], positions[1] - 1];
                }
                break;
            case 'WEST':
                if (positions[0] === 4) {
                    console.log(
                        chalk.red.bold('This is WEST part of the table')
                    )
                } else {
                    position = [positions[0] + 1, positions[1]];
                }
                break;
        }
    }
    direction = directions;
};

const right = (dir) => {
    if (dir === 'NORTH') {
        dir = 'EAST';
    } else if (dir === 'EAST') {
        dir = 'SOUTH';
    } else if (dir === 'SOUTH') {
        dir = 'WEST';
    } else if(dir === 'WEST') {
        dir = 'NORTH';
    }
    return dir;
};

const left = (dir) => {
    if (dir === 'NORTH') {
        dir = 'WEST';
    } else if (dir === 'WEST') {
        dir = 'SOUTH';
    } else if (dir === 'SOUTH') {
        dir = 'EAST';
    } else if(dir === 'EAST') {
        dir = 'NORTH';
    }
    return dir;
};

const checkInput = (input) => {
    if (input.indexOf(',') > -1) {
        let commandList = input.split(' ');
        command = commandList[1].split(',')
    } else {
        if (command) {
            com = input.toString().trim().toUpperCase();
        } else {
            console.log(
                chalk.red('The fist command should be "PLACE <0..4>,<0..4>,<NORTH,SOUTH,WEST,EAST>')
            )
        }
    }

    if (input.indexOf(',') > -1) {
        direction = command[2].toString().trim().toUpperCase();
        position = [parseInt(command[0].trim()), parseInt(command[1].trim())];
        move(0, position, direction)
    } else if (com) {
        switch (input.toString().trim().toUpperCase()) {
            case 'MOVE':
                move(1, position, direction);
                break;
            case 'LEFT':
                direction = left(direction);
                move(0, position, direction);
                break;
            case 'RIGHT':
                direction = right(direction);
                move(0, position, direction);
                break;
            case 'REPORT':
                console.log(
                    chalk.black.bgGreenBright([position[0], position[1], direction].join(','))
                );
                break;
            default:
                console.log(
                    chalk.red(`${input} is not a valid command!`)
                );
                break;
        }
    }
};

run();
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
    let chunk;
    // A loop to make sure we read all available data.
    while ((chunk = process.stdin.read()) !== null) {
        checkInput(chunk);
    }
});

process.stdin.on('end', () => {
    process.stdout.write('end');
});
