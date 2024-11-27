import { defineStore } from 'pinia';
import axios from 'axios';

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    moviesDiv: [],
    currPage: 1,
    mQuery: '',
    movieDetails: {},
    display: true,
    loading: false,
    pageLength: 0,
    detailsCache: {}
  }),
  actions: {
    async getList() {
      this.loading = true;
      this.moviesDiv = [];
      this.currPage = 1;
      try {
        const response = await axios.get('https://www.omdbapi.com/?apikey=1627e16a&s=' + (this.mQuery ? this.mQuery : 'avengers'));
        this.movies = Array.isArray(response.data.Search) ? response.data.Search : [];

        this.pageLength = this.movies.length > 0 ? Math.ceil(this.movies.length / 4) : 1

        this.switchPage(this.currPage)

        for (let movie of this.movies) {
          this.prefetchDetails(movie.imdbID);
        }

      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async prefetchDetails(movieId) {
      if (!this.detailsCache[movieId]) {
        try {
          const response = await axios.get('https://www.omdbapi.com/?apikey=1627e16a&i=' + movieId);
          this.detailsCache[movieId] = response.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getDetails(movieId) {
      if (this.detailsCache[movieId]) {

        this.movieDetails = this.detailsCache[movieId];
        this.display = false;
      } else {
        this.movieDetails = {};
        this.loading = true;
        try {
          const response = await axios.get('https://www.omdbapi.com/?apikey=1627e16a&i=' + movieId);
          this.movieDetails = response.data;
          this.detailsCache[movieId] = response.data;
          this.display = false;

        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }
      }
    },
    switchPage(pageNum) {
      const start = ((pageNum - 1) * 4)
      this.moviesDiv = this.movies.slice(start, start + 4)
      this.currPage = pageNum
    },
    nextPage() {
      if (this.pageLength > this.currPage) {
        this.currPage++
        this.switchPage(this.currPage)
      }
    },
    previousPage() {
      if (this.currPage > 1) {
        this.currPage--
        this.switchPage(this.currPage)
      }
    }
  },
  getters: {
    isLoading: (state) => state.loading,
  }
});
