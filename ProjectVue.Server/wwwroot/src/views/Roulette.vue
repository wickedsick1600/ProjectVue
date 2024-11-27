<template>
  <Header />
  <div class="container">
    <h1> RBL Game</h1>
    <h1> Balance: PHP {{ rouletteStore.userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</h1>

    <!-- Board area -->
    <div class="rouletteBoard">
      <div class="twoDiv">
        <div class="oneHalf">
          <h3 @click="rouletteStore.placeBet('1 - 18')"> 1 - 18 </h3>
        </div>
        <div class="twoHalf">
          <h3 @click="rouletteStore.placeBet('19 - 36')"> 19 - 36</h3>
        </div>
      </div>
      <div class="indiNum">
        <indiBox @click="rouletteStore.placeBet(i)" v-for="i in rouletteStore.createBoard" :key="i" :nums="i" :class="rouletteStore.win == i ? 'currNum' : ''" />
      </div>
      <div class="threeDiv">
        <div class="oneThird">
          <h3 @click="rouletteStore.placeBet('1 - 12')"> 1 - 12 </h3>
        </div>
        <div class="twoThird">
          <h3 @click="rouletteStore.placeBet('13 - 24')"> 13 - 24</h3>
        </div>
        <div class="threeThird">
          <h3 @click="rouletteStore.placeBet('25 - 36')"> 25 - 36</h3>
        </div>
      </div>
    </div>

    <!-- button -->
    <div>
      <button class="rollBtn" @click="rollFn"> Roll </button>
    </div>
    <audio ref="audioPlayer" :src="audioSrc"></audio>
    <!--bet selections-->
    <div class="betTable">
      <table>
        <thead>
          <tr>
            <th>Bets</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="userChoice in rouletteStore.userChoices" :key="userChoice.bet">
            <td> {{ userChoice.bet }} </td>
            <td>PHP {{ userChoice.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import indiBox from '../components/RouletteComponents/indiBox.vue'
  import { useRouletteStore } from '../store/roulette.js'
  import audio from '../assets/slotSound.mp3'

  export default {
    name: 'Roulette',
    data() {
      return {
        rouletteStore: useRouletteStore(),
        audioSrc: audio
      }
    },
    components: {
      Header,
      indiBox
    },
    computed: {
    },
    methods: {
      rollFn() {
        this.$refs.audioPlayer.play()
        this.rouletteStore.rollFn()
      }
    }
  }
</script>

<style scoped>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .container {
    height: calc(100vh - 25px); /* Adjust according to your header's height */
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: lightblue; /* Replace with your desired color */
  }

  .rouletteBoard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: scroll;
  }

    .rouletteBoard::-webkit-scrollbar {
      display: none;
    }

  .indiNum {
    flex: 2;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 0;
  }

  .twoDiv, .threeDiv {
    display: flex;
    flex-direction: row;
  }

  .oneHalf, .twoHalf {
    border: 1px solid black;
    width: 240px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
  }

  .oneHalf, .twoThird {
    background-color: black;
    color: white;
  }

  .twoHalf, .oneThird, .threeThird {
    background-color: red;
  }

  .oneThird, .twoThird, .threeThird {
    border: 1px solid black;
    margin: 5px;
    width: 160px;
    text-align: center;
    cursor: pointer;
  }

  .rollBtn {
    cursor: pointer;
  }

  .currNum {
    background-color: green !important;
    color: white;
  }

  .betTable td, th {
    border: 1px solid black;
    padding: 20px;
    text-align: center;
    margin: 5px;
  }

  @media (max-width: 600px) {
    .indiNum, .twoDiv, .threeDiv {
      width: 100%;
    }
  }
</style>
