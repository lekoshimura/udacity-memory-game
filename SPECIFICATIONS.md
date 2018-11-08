# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)
* [Game Behavior](#game-behavior)
* [Interface Design](#interface-design)
* [Documentation](#documentation)

## Instructions

The starter project has some HTML and CSS styling to display a static version of
the Memory Game project. You'll need to convert this project from a static 
project to an interactive one. This will require modifying the HTML and CSS 
files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Game Behavior

| CRITERIA | MEETS SPECIFICATIONS | 
| - | - |
| Memory Game Logic | The game randomly shuffles the cards. A user wins once all cards have successfully been matched. | 
| Congratulations Popup | When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was. | 
| Restart Button | A restart button allows the player to reset the game board, the timer, and the star rating. |
| Star Rating | The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. After a few more moves, it should change to a even lower star rating (down to 1). The number of moves needed to change the rating is up to you, but it should happen at some point. | 
| Timer | When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops. | 
| Move Counter | Game displays the current number of moves a user has made. | 

## Interface Design

| CRITERIA | MEETS SPECIFICATIONS | 
| - | - |
| Styling | Application uses CSS to style components for the game. |
| Usability | All application components are usable across modern desktop, tablet, and phone browsers. |

## Documentation

| CRITERIA | MEETS SPECIFICATIONS | 
| - | - |
| README | A `README` file is included detailing the game and all dependencies.|
| Comments | Comments are present and effectively explain longer code procedure when necessary. | 
| Code Quality | Code is formatted with consistent, logical, and easy-to-read formatting as described in the [Udacity JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html). |

---

## Suggestions to Make Your Project Stand Out!

* Add CSS animations when cards are clicked, unsuccessfully matched, and successfully matched.
* Add unique functionality beyond the minimum requirements (Implement a leaderboard, store game state using local storage, etc.)
* Implement additional optimizations that improve the performance and user experience of the game (keyboard shortcuts for gameplay, etc).