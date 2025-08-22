 
1. Game Start
As a user
I want to be able to start the Simon Says game by clicking a "Start" button
So that I can begin playing the game

2. Gameplay Mechanics
As a player
I want the game to show me a sequence of colored buttons
So that I can memorize and repeat the pattern in the correct order

3. Increasing Difficulty
As a player
I want the game to get progressively faster as I go to higher levels
So that it becomes more challenging over time

4. Score Tracking
As a player
I want the game to show my current level and keep track of my high score
So that I can monitor my progress and improve over time

5. Strict Mode
As a competitive player
I want an option to enable "Strict Mode"
So that if I make a mistake, the game restarts immediately

6. Pattern Replay (on mistake)
As a casual player
I want the game to replay the sequence if I make a mistake (when Strict Mode is off)
So that I can try again and learn the pattern

7. Button Feedback
As a player
I want visual and sound feedback when I click a color
So that I get immediate confirmation of my actions

8. Restart Game
As a user
I want the ability to restart the game at any time
So that I can try again from level 1 whenever I want

9. Status Messages
As a user
I want to see status messages (e.g. game over, replaying, wrong move)
So that I understand what's happening during the game

10. Accessibility and Usability
As a user
I want the buttons to be visually distinct and responsive
So that I can easily follow the game even on different screen sizes


sudo code: 

1. intialaiztion:

DEFINE colorOptions = ["red", "blue", "green", "yellow"]
INITIALIZE gamePattern = []
INITIALIZE userPattern = []
INITIALIZE level = 0
INITIALIZE gameStarted = false

2. start game:

ON "Start" button click:
    IF game has not started:
        RESET gamePattern, userPattern, level
        CALL nextSequence()
        SET gameStarted = true

3. game sequence: 

INCREMENT level by 1
DISPLAY "Level" on screen

SELECT random color from colorOptions
APPEND selected color to gamePattern

ANIMATE selected color (flash, sound, etc.)
CLEAR userPattern

4. user interaction: 

ON user click on color button:
    GET clickedColor
    APPEND clickedColor to userPattern

    ANIMATE clickedColor (press effect, sound)

    CALL checkAnswer(index of last clicked color)

5. check awnser: 

IF userPattern[currentIndex] == gamePattern[currentIndex]:
    IF userPattern length == gamePattern length:
        WAIT for a second
        CALL nextSequence()
ELSE:
    PLAY "wrong" sound
    DISPLAY "Game Over"
    FLASH screen red
    RESET game

6. Reset game: 

RESET level to 0
RESET gamePattern and userPattern
SET gameStarted = false
DISPLAY "Press Start to Begin"




