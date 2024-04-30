#!  /usr/bin/env node
import inquirer from 'inquirer';
const characterHealth = {
    Skeleton: 50,
    Zombie: 70,
    Warrior: 100,
    Assassin: 80
};
async function startGame() {
    console.log('Welcome to the Adventure Game!');
    const { character } = await inquirer.prompt({
        type: 'list',
        name: 'character',
        message: 'Choose your character:',
        choices: ['Skeleton', 'Zombie', 'Warrior', 'Assassin']
    });
    console.log(`You have chosen ${character}`);
    let enemy;
    if (character === 'Skeleton')
        enemy = 'Zombie';
    else if (character === 'Zombie')
        enemy = 'Skeleton';
    else if (character === 'Warrior')
        enemy = 'Assassin';
    else
        enemy = 'Warrior';
    console.log(`You are facing a ${enemy}`);
    let playerHealth = characterHealth[enemy];
    let enemyHealth = characterHealth[enemy];
    while (playerHealth > 0 && enemyHealth > 0) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: ['Fight', 'Run']
        });
        if (action === 'Fight') {
            const playerAttack = Math.floor(Math.random() * 20) + 10; // Random damage between 10 and 30
            console.log(`You attack the ${enemy} for ${playerAttack} damage!`);
            enemyHealth -= playerAttack;
        }
        else {
            console.log('You try to run away!');
            const escapeChance = Math.random();
            if (escapeChance > 0.5) {
                console.log('You successfully escaped!');
                return;
            }
            else {
                console.log('You failed to escape!');
            }
        }
        const enemyAttack = Math.floor(Math.random() * 15) + 10; // Random damage between 10 and 25
        console.log(`The ${enemy} attacks you for ${enemyAttack} damage!`);
        playerHealth -= enemyAttack;
        console.log(`Your health: ${playerHealth}`);
        console.log(`Enemy health: ${enemyHealth}`);
    }
    if (playerHealth <= 0) {
        console.log('Game over! You have been defeated.');
    }
    else {
        console.log('Congratulations! You have defeated the enemy.');
    }
}
startGame();
