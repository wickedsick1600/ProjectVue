<template>
  <Header />
  <div class="container">
    <div class="moviesTitle">
      <h1 class="cineTitle"> Cinema </h1>
      <input v-model="MovieStore.mQuery" @input="getList" placeholder="Search a Movie/Series" />
    </div>

    <!--pagination-->
    <div class="pagination" v-if="MovieStore.movies != 0">
      <h3 @click="previousPage"> < </h3>
      <h4 v-if="pageLength" v-for="page in pageLength" @click="switchPage(page)" :key="page" value="page" :class="{current: MovieStore.currPage === page}"> {{ page }} </h4>
      <h3 @click="nextPage"> > </h3>
    </div>

    <div class="cardCont">
      <movieCard v-for=" (item, index) in moviesDiv" :movie="item" :key="index"> </movieCard>
    </div>

  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import movieCard from '../components/MoviesComponents/movieCard.vue'
  import { useMovieStore } from '../store/movie.js'
  import axios from 'axios'

  export default {
    name: 'Movies',
    components: {
      Header,
      movieCard
    },
    methods: {
      getList() {
        this.MovieStore.getList()
      },
      switchPage(page) {
        this.MovieStore.switchPage(page)
      },
      nextPage() {
        this.MovieStore.nextPage()
      },
      previousPage() {
        this.MovieStore.previousPage()
      }
    },
    computed: {
      movies() {
        return this.MovieStore.movies
      },
      moviesDiv() {
        return this.MovieStore.moviesDiv
      },
      pageLength() {
        return this.MovieStore.pageLength
      }
    },
    created() {
      this.MovieStore = useMovieStore();
      this.MovieStore.getList()
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-position: center;
    width: 100%;
    margin-top: 25px;
    height: calc(100vh - 25px);
    background-image: url('../assets/moviesBG.png');
    background-color: white;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: auto;
  }

  .cineTitle {
    font-family: 'Georgia', serif;
    font-size: 2.25em;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    text-align: center;
    margin-top: 20px;
  }

  .cardCont {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 10px;
    padding: 20px;
  }

  .moviesTitle {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pagination {
    font-size: 1.2em;
    color: white;
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 20px;
    justify-content: center;
    cursor: pointer;
  }

    .pagination h3, h4 {
      padding: 8px 16px;
      margin: 0 4px;
      border: 1px solid #007bff;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
    }

      .pagination h3, h4:hover {
        background-color: #0056b3;
      }

      .pagination:hover h3, h4{
        background-color: #0056b3; /* Darker blue on hover */
      }

  .current {
    text-decoration: underline;
    color: black;
  }

  input {
    padding: 5px;
  }
</style>
