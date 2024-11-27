<template>

  <div class="popUpContainer">
    <div class="popUpContent">
      <div>
        <h2 v-if="gameOver"> {{ declareWinner() }} </h2>
      </div>
      <h1> Play again?</h1>
      <div class="popupBtnsContainer">
        <button class="xBtn" @click="playAgainToggle"><font-awesome-icon icon="xmark" /></button>
        <button class="checkBtn" @click="playAgainFn"><font-awesome-icon icon="check" /></button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'pinia'
  import { useTicTacToeStore } from '../../../store/tictactoe.js'

  export default {
    name: 'playaAgainPopup',
    computed: {
      ...mapState(useTicTacToeStore, {
        gameOver: 'gameOver'
      })
    },
    methods: {
      ...mapActions(useTicTacToeStore, ['playAgainToggle','playAgainFn','declareWinner'])
    }
  }
</script>

<style scoped>
  .popUpContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }

  .popUpContent {
    font-family: 'Fondamento', cursive;
    padding: 20px;
    color:white;
    background: #000;
    border-radius: 10px;
    border: 1px solid #00aaff;
    display: inline-block;
    min-height: 150px;
    margin: 1rem;
    position: relative;
    min-width: 250px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    text-align: center;
  }

  .popupBtnsContainer {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 50%;
    padding: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
  }

    button:hover {
      transform: scale(1.2);
    }

  .xBtn {
    background-color: #ff4c4c;
    color: white;
    font-size: 24px;
  }

  .checkBtn {
    background-color: #4caf50;
    color: white;
    font-size: 24px;
    font-weight: bold;
  }

  </style>
