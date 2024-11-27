<template>
  <header class="header">
    <nav class="nav">
      <div class="logo">
        <router-link to="/" class="router-link">MyApp</router-link>
      </div>
      <ul class="links" :class="{ 'active': isActive }">
        <li><router-link to="/" class="router-link" active-class="active-link">Home</router-link></li>
        <li><router-link to="/QuoteGenerator" class="router-link" active-class="active-link">Quote Generator</router-link></li>
        <li><router-link to="/Movies" class="router-link" active-class="active-link">Cinema</router-link></li>
        <li><router-link to="/Tic-Tac-Toe" class="router-link" active-class="active-link">Tic-tac-toe</router-link></li>
        <li><router-link to="/Roulette" class="router-link" active-class="active-link">Roulette Game</router-link></li>
      </ul>
      <div class="menu-icon" @click="toggleMenu" aria-label="Menu" role="button" tabindex="0">☰</div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        isActive: false
      };
    },
    methods: {
      toggleMenu() {
        this.isActive = !this.isActive;
      }
    }
  };
</script>

<style scoped>
  .header {
    background-color: #333;
    color: white;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .links {
    display: flex;
    align-items: center;
    list-style: none;
  }

  .router-link {
    text-decoration: none;
    color: white;
    padding: 14px 20px;
    transition: color 0.3s ease;
  }

    .router-link:visited {
      color: white;
    }

    .router-link:hover {
      color: dodgerblue;
    }

  .active-link {
    color: dodgerblue;
  }

  .menu-icon {
    display: none;
    font-size: 24px;
    cursor: pointer;
    color: white;
  }

  /* Media query for small screens */
  @media (max-width: 600px) {
    .links {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 30px;
      right: 0px;
      background-color: #333;
      width: 100%;
      gap: 5px;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

      .links.active {
        display: flex;
      }

    .menu-icon {
      display: block;
    }

    .router-link {
      padding: 10px;
    }
  }
</style>
