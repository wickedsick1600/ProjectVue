<template>
  <div class="cardCont" @mouseenter="getDetails(movie.imdbID)">
    <div class="movieDetailsCont">
      <div class="details">
        <h3>{{ movie.Title }}</h3>
        <img v-if="movie.Poster != 'N/A'" :src="movie.Poster" alt="Movie Poster" />
        <img v-else src="" />
        <h4>Year: {{ movie.Year }}</h4>
        <h4>Type: {{ movie.Type }}</h4>
      </div>
      <div class="moviePlotCont" hidden>
        <h4>{{ movieDetails.Plot }}</h4> <br />
        <h4>Genre: {{ movieDetails.Genre }}</h4><br />
        <h4>IMDB Rating: {{ movieDetails.imdbRating }}</h4>
        <h5><a :href="goTo(movieDetails.Title)"> LINK </a></h5>
      </div>
    </div>
  </div>
</template>


<script>
  import { useMovieStore } from '../../store/movie.js'

  export default {
    name: 'movieCard',
    props: ['movie'],
    methods: {
      getDetails(movieId) {
        this.MovieStore.getDetails(movieId)
      },
      goTo(title) {
        return `https://cinego.tv/search?keyword=${encodeURIComponent(title)}`
      }
    },
    computed: {
      movieDetails() {
        return this.MovieStore.movieDetails
      }
    },
    created() {
      this.MovieStore = useMovieStore()
    }
  }
</script>


<style scoped>
  .cardCont {
    text-align: center;
    align-items: center;
    color: white;
    background-color: black;
    border-radius: 25px;
    padding: 10px;
    transition: all 0.3s ease;
    width: 300px;
    height: 300px;
    cursor: pointer;
  }

  img {
    max-width: 150px;
    max-height: 150px;
  }

  .movieDetailsCont {
    width: 100%;
    height: 100%;
  }

  .moviePlotCont {
    padding: 20px;
    height: 100%;
  }

  .details {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

    .details > * {
      margin-bottom: 10px;
    }

      .details > *:last-child {
        margin-bottom: 0;
      }

  .movieDetailsCont:hover .details {
    display: none;
  }

  .movieDetailsCont .details {
    display: block;
  }

  .movieDetailsCont .moviePlotCont {
    display: none;
  }

  .movieDetailsCont:hover .moviePlotCont {
    display: block;
  }
</style>
