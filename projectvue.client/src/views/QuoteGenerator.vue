<template>
  <Header />
  <!--Quote Generator-->
  <div class="container">
    <h1 class="genTitle"> Quote Generator Page</h1>
    <button class="genBtn" @click="generateFn"> Click for a quote</button>
    <div class="generateCard" v-if="author">
      <h3> Tags: {{ tags }}</h3><br />
      <h3 v-if="quote"> "{{ quote }}"</h3><br />
      <h3 style="text-align: right"> - {{ author }} </h3>
      <button class="genBtn" @click="addToFave"> Add to Favorite</button>
    </div>

    <div class="favoritesListContainer">
      <div class="favoritesList">
        <newFave v-for="(item, index) in favorites" :favorite="item" :key="index" @deleteFave="deleteFave" />

      </div>
    </div>


  </div>

</template>

<script>
  import axios from 'axios'
  import Header from '../components/Header.vue'
  import newFave from '../components/QuoteGeneratorComponents/newFave.vue'
  import { useQuoteStore } from '../store/quote.js'

  export default {
    name: 'QuoteGenerator',
    data() {
      return {
      }
    },
    components: {
      Header,
      newFave
    },
    methods: {
      generateFn() {
        this.QuoteStore.generateFn()
      },
      addToFave() {
        this.QuoteStore.addToFave()
      },
      deleteFave(data) {
        this.QuoteStore.deleteFave(data)
      }
    },
    computed: {
      favorites() {
        return this.QuoteStore.favorites
      },
      author() {
        return this.QuoteStore.author
      },
      tags() {
        return this.QuoteStore.tags
      },
      quote() {
        return this.QuoteStore.quote
      },
    },
    created() {
      this.QuoteStore = useQuoteStore()
    }
  }
</script>

<style scoped>

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    background-position: center;
    width: 100%;
    height: calc(100vh - 25px);
    margin-top: 25px;
    background-image: url('../assets/quoteBG.png');
    background-color: white;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .genTitle {
    font-family: 'Georgia', serif;
    font-size: 2.25em;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    text-align: center;
    margin-top: 20px;
  }

  .generateCard {
    font-size: 1em;
    width: 100%;
    max-width: 500px;
    height: auto;
    background-color: rgba(33, 94, 209, 0.7);
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 25px;
    border: 1px solid black;
    padding: 20px;
  }

  button:hover {
    background-color: black;
    color: white;
  }

  .genBtn {
    background: linear-gradient(45deg, rgba(70, 130, 180, 1), rgba(30, 144, 255, 1));
    color: white;
    padding: 15px 30px;
    margin: 10px;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    font-size: 0.8em;
    text-transform: uppercase;
    font-weight: bold;
    border: solid 1px black;
  }

    .genBtn:hover {
      background: linear-gradient(45deg, rgba(70, 130, 180, 1), rgba(30, 144, 255, 1));
      transform: scale(1.05);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .genBtn:active {
      transform: scale(0.95);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

  .favoritesList {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    align-items: center;
    padding: 20px;
    scroll-behavior: smooth;
  }

    .favoritesList::-webkit-scrollbar {
      height: 10px;
    }

    .favoritesList::-webkit-scrollbar-track {
      background: #f0f0f0;
      border-radius: 8px;
    }

    .favoritesList::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 8px;
    }

      .favoritesList::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

  .favoritesListContainer {
    width: 100%;
    margin: 20px;
  }

  @media only screen and (max-width: 600px) {
    * {
      font-size: 0.9em;
    }

    .container {
      height: calc(100vh - 32px);
      margin-top: 32px;
      overflow: hidden;
    }

    .favoritesList::-webkit-scrollbar {
      display: none;
    }

    .generateCard {
      font-size: 1em;
      width: 95%;
      max-width: 500px;
      height: auto;
      padding: 20px;
      border-radius: 25px;
    }
  }
</style>
