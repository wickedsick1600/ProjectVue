import { defineStore } from 'pinia'

export const useRouletteStore = defineStore('roulette', {
  state: () => ({
    nums: Array.from({ length: 36 }, (_, i) => i + 1),
    userChoices: [{ bet: 25, amount: 25 }],
    win: 0,
    userBalance: 10000,
  }),
  actions: {
    rollFn() {
      for (let i = 0; i < 18; i++) {
        setTimeout(() => {
          const min = 1
          const max = 36
          const random = Math.floor(Math.random() * (max - min + 1)) + min
          this.win = random

        }, i * 250)
        console.log(i * 250)
      }
      setTimeout(() => this.declareWinner(), 4500)
    },
    placeBet(userSelection) {

      let betAmt = parseInt(prompt(`How much do you want to wager on ${userSelection}?`), 10)

      if (isNaN(betAmt)) {
        return alert('Please enter a valid number')
      }

      const enoughBalance = this.userBalance >= betAmt
      const minBet = betAmt >= 20

      if (enoughBalance && minBet) {
        const existingBet = this.userChoices.find(bets => bets.bet === userSelection)

        if (!existingBet) {
          this.userChoices.push({ bet: userSelection, amount: betAmt })
        } else {
          existingBet.amount += betAmt
        }
        this.userBalance -= betAmt
      } else {
        if (!enoughBalance) return alert("Not enough balance")
        if (!minBet) return alert("Minimum bet is 20")
      }
    },
    declareWinner() {
      let winnings = 0;

      // Define the range conditions with their respective multipliers
      const ranges = [
        { bet: '1 - 18', min: 1, max: 18, multiplier: 2 },
        { bet: '19 - 36', min: 19, max: 36, multiplier: 2 },
        { bet: '1 - 12', min: 1, max: 12, multiplier: 3 },
        { bet: '13 - 24', min: 13, max: 24, multiplier: 3 },
        { bet: '25 - 36', min: 25, max: 36, multiplier: 3 },
      ]

      // Loop through all bets
      this.userChoices.forEach(bet => {

        if (bet.bet == this.win) {
          winnings += bet.amount * 36
        }

        ranges.forEach(range => {
          if (bet.bet == range.bet && this.win >= range.min && this.win <= range.max) {
            winnings += bet.amount * range.multiplier
          }
        })
      })

      if (winnings > 0) {
        alert(`You Won PHP ${winnings}!`);
      }
      this.userBalance += winnings;
      this.userChoices = [];
    },
  },
  getters: {
    createBoard() {
      return this.nums
    }
  }
})
