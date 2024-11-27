<template>
  <Header />
  <div class="menuContainer">
    <h1> PICK A MODE </h1>
    <router-link to="/Tic-Tac-Toe/Game"> <button class="menuBtn" @click="switchMode('vsComputer')"> Player vs Computer</button> </router-link>
    <router-link to="/Tic-Tac-Toe/Game"> <button class="menuBtn" @click="switchMode('vsPlayer')"> Player vs Player</button> </router-link>
  </div>
</template>

<script>
  import Header from '../Header.vue'
  import { useTicTacToeStore } from '../../store/tictactoe.js'
  import { mapState, mapActions } from 'pinia'

  export default {
    name: 'Tic-tac-toe-Menu',
    computed: {
      ...mapState(useTicTacToeStore, {
        mode: 'mode'
      })
    },
    methods: {
      ...mapActions(useTicTacToeStore, ['switchMode'])
    },
    components: {
      Header
    }
  }
</script>

<style scoped>
  .menuContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 25px;
    height: calc(100vh - 25px);
    text-align: center;
    background-color: hsl(0, 0%, 7%);
  }

  .menuBtn {
    font-size: 2em;
    color: #00aaff;
    background-color: black;
    border: 1px solid #00aaff;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
    min-width: 300px;
  }

  button:hover {
    color: black;
    background-color: #00aaff;
  }

  h1 {
    color: white;
    font-size: 2.5em;
  }
</style>
