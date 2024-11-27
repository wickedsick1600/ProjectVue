<template>
  <div v-bind:class="nums % 2 == 0 ? 'black' : 'red'">
    <h2 class="indiNum"> {{ nums }} </h2>
  </div>
</template>

<script>
  export default {
    name: 'indiBox',
    props: ['nums']
  }
</script>

<style scoped>
  .black, .red {
    display: flex;
    width: 50px;
    height: 50px;
    margin: 5px;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .black {
    background-color: black;
    color: white;
  }

  .red {
    background-color: red;
  }

  .indiNum {
    margin: 0;
  }
</style>
