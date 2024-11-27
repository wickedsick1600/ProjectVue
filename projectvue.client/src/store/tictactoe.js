import { defineStore } from 'pinia'

export const useTicTacToeStore = defineStore('tictactoe', {
  state: () => ({
    board: Array.from({ length: 9 }, () => ''),
    player1Turn: true,
    player1Name: 'Player 1',
    player2Name: 'Player 2',
    gameOver: false,
    playerScore: 0,
    computerScore: 0,
    roundWinner: '',
    draw: false,
    mode: 'vsComputer',
    free: [],
    playAgainDisplay: false,
  }),
  actions: {
    createBoard() {
      return this.board
    },
    switchMode(modeSelected) {
      this.mode = modeSelected
    },
    handleTurn(box) {
      if (this.gameOver) return;

      const freeSlot = this.board[box] !== 'o' && this.board[box] !== 'x'

      //Player turn handler
      if (this.player1Turn && freeSlot) {
        this.board[box] = 'o'
        this.checkWinner()
        if (this.gameOver) return;

        this.player1Turn = false

        if (this.mode == 'vsComputer') {
          setTimeout(this.computerTurn, 1000)
        }
        return;
      }

      //Player 2 turn handler
      if (!this.player1Turn && freeSlot && this.mode == 'vsPlayer') {
        this.board[box] = 'x'
        this.checkWinner()
        if (this.gameOver) return;

        this.player1Turn = true

        return;
      }
    },
    handlePlayer2Turn() {
      console.log('player2')
    },
    computerTurn() {
      if (this.gameOver) return;

      this.checkWinner()

      const min = 0
      const max = this.free.length - 1

      const random = Math.floor(Math.random() * (max - min + 1) + min)
      this.board[this.free[random]] = 'x'
      this.player1Turn = true

      this.checkWinner()
    },
    playAgainFn() {
      this.board = Array.from({ length: 9 }, (value) => value = '')
      this.gameOver = false;
      this.player1Turn = true;
      this.draw = false
      this.playAgainDisplay = false;
    },
    resetScoreFn() {
      this.playerScore = 0;
      this.computerScore = 0;
      this.draw = false


      this.playAgainFn()
    },
    checkWinner() {

      //Check for Winner
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

      for (const [a, b, c] of winningCombinations) {
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          this.gameOver = true;
          this.playAgainToggle();
          const winner = this.board[a] === 'o' ? this.player1Name : this.mode == 'vsComputer' ? "Computer" : this.player2Name
          if (winner == this.player1Name) {
            this.playerScore++
          } else {
            this.computerScore++
          }
          this.roundWinner = winner
          return;
        }
      }
      //Check for draw
      this.free = []
      this.board.forEach((value, index) => {
        if (value == '') {
          this.free.push(index)
        }
      })
      if (this.free.length == 0 && this.gameOver == false) {
        this.draw = true
        this.gameOver = true
        this.playAgainToggle();
      }
    },
    declareWinner() {
      if (this.draw) { return "This round was a draw!" }
      return `${this.roundWinner} won this round!`
      
    },
    playAgainToggle() {
      this.playAgainDisplay = !this.playAgainDisplay
    },
    changeNameFn(player) {
      if (player == 'player1') {
        const newName = window.prompt('Pick a new name')

        if (newName.length > 14) {
          return alert('Maximum of 14 Characters only')
        }

        this.player1Name = newName
      }

      if (player == 'player2') {
        const newName = window.prompt('Pick a new name')

        if (newName.length > 14) {
          return alert('Maximum of 14 Characters only ')
        }

        this.player2Name = newName
      }
    }
  },
  getters: {

  }
})
