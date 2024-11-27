import { createRouter, createWebHistory } from 'vue-router'


import Home from './Home.vue'
import QuoteGenerator from './QuoteGenerator.vue'
import Movies from './Movies.vue'
import Roulette from './Roulette.vue'
import TicTacToe from './Tic-tac-toe.vue'
import TicTacToeGame from '../components/Tic-tac-toeComponents/Tic-tac-toe-Game.vue'
import TicTacToeMenu from '../components/Tic-tac-toeComponents/Tic-tac-toe-Menu.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/QuoteGenerator',
    name: 'QuoteGenerator',
    component: QuoteGenerator
  },
  {
    path: '/Movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/Roulette',
    name: 'Roulette',
    component: Roulette
  },
  {
    path: '/Tic-Tac-Toe',
    name: 'TicTacToe',
    component: TicTacToe,
    children: [
      {
        path: '',
        name: 'TicTacToeMenu',
        component: TicTacToeMenu
      },
      {
        path: 'Game',
        name: 'TicTacToeGame',
        component: TicTacToeGame

      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
