<template>
  <Header />
  <div class="container">

    <!-- Title -->
    <div class="gameContainer" v-bind:style="{visibility: !menuToggle ? 'visible' : 'hidden'}">
      <h1 class="ticTacToeTitle"> Tic Tac Toe Game </h1>

      <!-- Back Menu Button -->
      <router-link to="/Tic-Tac-Toe"><button @click="resetScoreFn"> Back to Menu </button> </router-link>

      <!-- Reset Score Button -->
      <button @click="resetScoreFn"> Reset Score </button>

      <!-- Score Board -->
      <div class="scoreBoard">
        <table>
          <thead>
            <tr>
              <th class="player1Box">{{ player1Name }} <font-awesome-icon class="editIcon" icon="pen-to-square" @click="changeNameFn('player1')" /> </th>
              <th class="player2Box">{{ mode == 'vsComputer' ? "Computer" : player2Name }} <font-awesome-icon icon="pen-to-square" v-show="mode == 'vsPlayer'" @click="changeNameFn('player2')" /> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ playerScore }}</td>
              <td>{{ computerScore }} </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!--Popup content-->
      <teleport to="#daimos">
        <playAgainPopup v-show="playAgainDisplay" />
      </teleport>

      <!-- Play again button -->
      <button @click="playAgainFn"> Reset Round </button>

      <!-- Turn Identifier -->

      <h2 :class="{'turnID': true, 'visible': mode === 'vsPlayer' && !gameOver}"> {{ player1Turn ? player1Name : player2Name }}'s Turn</h2>

      <!-- Board Creation -->
      <div class="boardContainer">
        <ticBox v-for="(box, index) in board" :key="index" :char="box" @click="handleTurn(index)" />
      </div>

    </div>

  </div>
</template>

<script>
  import Header from '../Header.vue'
  import ticBox from './ticBox.vue'
  import playAgainPopup from './Tic-tac-toe-Popups/playAgainPopup.vue'
  import { useTicTacToeStore } from '../../store/tictactoe.js'
  import { mapState, mapActions } from 'pinia'


  export default {
    name: 'Tic-tac-toe-Game',
    components: {
      Header,
      ticBox,
      playAgainPopup
    },
    computed: {
      ...mapState(useTicTacToeStore, {
        board: 'board',
        player1Turn: 'player1Turn',
        player1Name: 'player1Name',
        player2Name: 'player2Name',
        gameOver: 'gameOver',
        playerScore: 'playerScore',
        computerScore: 'computerScore',
        roundWinner: 'roundWinner',
        draw: 'draw',
        menuToggle: 'menuToggle',
        mode: 'mode',
        playAgainDisplay: 'playAgainDisplay'
      }),

    },
    methods: {
      ...mapActions(useTicTacToeStore, [
        'createBoard',
        'computerTurn',
        'playAgainFn',
        'resetScoreFn',
        'checkWinner',
        'handleTurn',
        'toggleMenuFn',
        'declareWinner',
        'playAgainToggle',
        'changeNameFn']),

      turnVisibility() {
        return this.mode === 'vsComputer' && !this.gameOver ? true : false
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    margin-top: 25px;
    height: calc(100vh - 25px);
    text-align: center;
    background-color: hsl(0, 0%, 7%);
  }

  .boardContainer {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    justify-content: center;
    margin-top: 30px;
  }

  .ticTacToeTitle {
    color: white;
    padding: 10px;
  }

  .turnID {
    color: #00aaff;
    visibility: hidden;
    height: 30px;
    display: block;
  }

    .turnID.visible {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.3s ease, visibility 0s linear 0s;
    }

  .player1Box {
    background-color: #3a3a3a;
    color: white;
  }

  .player2Box {
    background-color: #3a3a3a;
    color: white;
  }

  button {
    font-size: 1em;
    color: #00aaff;
    background-color: black;
    border: 1px solid #00aaff;
    padding: 5px;
    margin: 10px;
    cursor: pointer;
  }

    button:hover {
      color: black;
      background-color: #00aaff;
    }

  .scoreBoard {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 20px;
    border-radius: 10px;
  }

    .scoreBoard th {
      width: 150px;
      border: 5px solid #00aaff;
      padding: 5px;
    }

    .scoreBoard td {
      border: 1px solid #00aaff;
      font-size: 2em;
      padding-top: 5px;
    }

  .editIcon {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .boardContainer {
      grid-template-columns: 80px 80px 80px;
    }
  }
</style>
