import { defineStore } from 'pinia'
import axios from 'axios'


export const useQuoteStore = defineStore('quote-generator', {
  state: () => ({
    favorites: [],
    author: '',
    quote: '',
    tags: '',
    newFaveQuotes: ''
  }),
  actions: {
    async generateFn() {
      try {
        const response = await axios.get('https://quoteslate.vercel.app/api/quotes/random')
        this.author = response.data.author
        this.quote = response.data.quote
        const tagsData = response.data.tags

        this.tags = tagsData.map(tag => tag.trim().charAt(0).toUpperCase() + tag.trim().slice(1).toLowerCase()).join(', ')


      } catch (error) {
        console.log(error);
      }
    },
    addToFave() {
      const newFavorite = {
        author: this.author,
        quote: this.quote,
        tags: this.tags
      }
      const duplicate = this.favorites.find(item => item.quote === newFavorite.quote)
      if (duplicate) {
        alert('This quote is already in the favorites')
      } else {
        this.favorites.push(newFavorite)
      }
    },
    deleteFave(data) {
      this.favorites = this.favorites.filter(item => item !== data)
    }
  },
  getters: {

  }
})
