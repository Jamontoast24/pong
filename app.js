//Define the canvas
let canvas 
let canvasContext

//Define the elements outside of the canvas
let playerScoreDisplay = document.querySelector('.playerScore')
let computerScoreDisplay = document.querySelector('.computerScore')
playerScoreDisplay.innerHTML = 'Player score : '
computerScoreDisplay.innerHTML = 'Computer score : '

let playerVictories = document.querySelector('.playerRounds')
let computerVictories = document.querySelector('.computerRounds')
let playerRoundScore = 0
let computerRoundScore = 0
playerVictories.innerHTML = 'The player has won : ' + playerRoundScore + ' rounds'
computerVictories.innerHTML = 'The computer has won : ' + computerRoundScore + ' rounds'

//define the ball
let ballX = 200
let ballY = 200
let radius = 10
let startAngle = 0
let endAngle = 2 * Math.PI
let counterClockwise = false

//define the net position
let netX = 400
let netY = 200
let netWidth = 8
let netHeight = 50
//define the player paddle
let paddleOneX = 0
let paddleoneY = 200
let paddleOneHeight = 200
let paddleOneWidth = 20
let playerPaddle

//Define the AI paddle
let paddleTwoX = 780
let paddleTwoY = 200
let paddleTwoHeight = 200
let paddleTwoWidth = 20
let computerPaddle

//define AI paddle speed
let paddlespeedY = 17

//define ballspeed
let ballSpeedX = 10
let ballSpeedY = 5

//Define the score variables
let playerScore = 0
let computerScore = 0

//Define the display of score counter
let displayPlayerScore = 'the player score is :'
let displayerComputerScore = 'the computer score is :'

//Function that loads the game window
window.onload = function () {

    //defines the canvas with the window load function
    canvas = document.getElementById('gameCanvas')
    canvasContext = canvas.getContext('2d')

    //runs the draw() function once every defined amount of time (ex: 1000ms)
    let framesPerSecond = 30
    setInterval(moveAndDraw,1000/framesPerSecond)

    canvas.addEventListener('mousemove', function(evt) {
        let mousePos = calcMousePos(evt)
        paddleoneY = mousePos.y - (paddleOneHeight/2)
    })

}

//Defines the movement of the ball
const movement = () => {

    //Change the location of ballX every time the draw() function is called, on the X axis
    // ballX = ballX + ballSpeedX
    // ballY = ballY + ballSpeedY
    let ballHitLeftY = ballY - (paddleoneY + paddleOneHeight/2)
    let ballHitRightY = ballY - (paddleTwoY + paddleTwoHeight/2)

    //tells the ball to hit the X axis of either paddle. When it reaches the paddle on the right it goes back to the first.
    if (ballX < 0) {
        
        if (ballY > paddleoneY && ballY < paddleoneY + paddleOneHeight) {
            ballSpeedX = -ballSpeedX
            ballSpeedY = ballHitLeftY * 0.30
        } else {
            resetBall()
            updateComputerScore()
        }
    
    }
    if (ballX >= canvas.width) {
        if (ballY > paddleTwoY && ballY < paddleTwoY + paddleTwoHeight) {
            ballSpeedX = -ballSpeedX
            ballSpeedY = ballHitRightY * 0.30
        } else {
            resetBall()
            updatePlayerScore()
        }
        
    }

    if (ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY
    } else if (ballY < 0) {
        ballSpeedY = -ballSpeedY
    }

}

//Makes the AI paddle move on up and down on it's Y axis
const aiPaddleMovement = () => {

    let paddleTwoYCenter
    paddleTwoYCenter = paddleTwoY + (paddleTwoHeight/2)

    if (paddleTwoYCenter < ballY - 15) {
        paddleTwoY = paddleTwoY + 6
    } else if (paddleTwoYCenter > ballY + 15) {
        paddleTwoY = paddleTwoY - 6
    } 
}

//A function() that calculates the mouse position
const calcMousePos = (evt) => {

    let rect = canvas.getBoundingClientRect()
    let root = document.documentElement
    let mouseX = evt.clientX - rect.left - root.scrollLeft
    let mouseY = evt.clientY - rect.top - root.scrollTop
    return {
        x: mouseX,
        y: mouseY
    }

}

const moveAndDraw = () => {
    ballX = ballX + ballSpeedX
    ballY = ballY + ballSpeedY
    draw()
    movement()
    aiPaddleMovement()
    resetScore()
}

//reset ball to initial spot
const resetBall = () => {
    ballSpeedX = 10
    ballSpeedY = 5
    ballX = 200
    ballY = 200
}

//Draw all items on screen. We can easily add more to this list thanks to our colorStuff() function
const draw = () => {

    //Game Window
    colorStuff(0,0,canvas.width,canvas.height,'black')

    //Player Paddle
    colorStuff(paddleOneX,paddleoneY,paddleOneWidth,paddleOneHeight, 'white')

    //A.I paddle
    colorStuff(paddleTwoX,paddleTwoY,paddleTwoWidth,paddleTwoHeight, 'white')

    //Ball being updated with the values we defined
    drawBall(ballX,ballY,radius,startAngle,endAngle,counterClockwise,'aqua')

    //Displays the score
    writeStuff(playerScore,200,200,'white')
    
    writeStuff(computerScore,600,200,'green')

    //Net
    colorNet(netX,0,netWidth,netHeight,'white')
    colorNet(netX,80,netWidth,netHeight,'white')
    colorNet(netX,160,netWidth,netHeight,'white')
    colorNet(netX,240,netWidth,netHeight,'white')
    colorNet(netX,320,netWidth,netHeight,'white')
    colorNet(netX,400,netWidth,netHeight,'white')
    colorNet(netX,480,netWidth,netHeight,'white')
    colorNet(netX,560,netWidth,netHeight,'white')


}

//This function is used to help define our items in the draw() function. It's especially usefull once we have a lot of items on screen
const colorStuff = (leftX,topY,width,height,drawColor) => {

    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX,topY,width,height)

}

//This function draws the ball
const drawBall = (leftX,topY,radius,startAngle,endAngle,counterClockwise,ballColor) => {

    canvasContext.fillStyle = ballColor
    canvasContext.beginPath()
    canvasContext.arc(leftX,topY,radius,startAngle,endAngle,counterClockwise)
    canvasContext.fill()

}

//This function writes and displays the current scores for each player
const writeStuff = (score, posX, posY, textColor) => {

    canvasContext.fillStyle = textColor
    canvasContext.fillText(score,posX,posY)

}

//This function colors the net
const colorNet = (leftX,topY,width,height,drawColor) => {

    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX,topY,width,height)

}

//Updates the player score
const updatePlayerScore = () => {

    playerScore++
    console.log('Player score: ' + playerScore)
    playerScoreDisplay.innerHTML = 'player score : ' + playerScore

}

//Updates the computer's score
const updateComputerScore = () => {

    computerScore++
    console.log('Computer score: ' + computerScore)
    computerScoreDisplay.innerHTML = 'Computer score: ' + computerScore

}

//Reset scores if one wins and also display how many rounds each has won
const resetScore = () => {

    if (playerScore == 5) {
        playerScore = 0
        playerScoreDisplay.innerHTML = playerScore
        computerScore = 0
        computerScoreDisplay.innerHTML = computerScore
        playerRoundScore++
        playerVictories.innerHTML = 'The player has won : ' + playerRoundScore + ' rounds'
        playerScoreDisplay.innerHTML = 'Player score : '
        computerScoreDisplay.innerHTML = 'Computer score : '

    } else if (computerScore == 5) {

        playerScore = 0
        playerScoreDisplay.innerHTML = playerScore
        computerScore = 0
        computerScoreDisplay.innerHTML = computerScore
        computerRoundScore++
        computerVictories.innerHTML = 'The computer has won : ' + computerRoundScore + ' rounds'
        computerScoreDisplay.innerHTML = 'Computer score : '
        playerScoreDisplay.innerHTML = 'Player score : '

    }
}