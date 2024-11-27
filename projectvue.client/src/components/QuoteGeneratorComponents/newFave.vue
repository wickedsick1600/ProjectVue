<template>
  <div @click="deleteItem" class="favoriteCard">
    <h3> Tags: {{ favorite.tags }}</h3><br />
    <h3> "{{ favorite.quote }}"</h3><br />
    <h3 style="text-align: right; bottom: 0;"> - {{ favorite.author }} </h3>
  </div>
</template>
<script>
  export default {
    name: 'newFave',
    props: ['favorite'],
    methods: {
      deleteItem() {
        let response = confirm("Delete this quote?")

        if (response) {
          this.$emit('deleteFave', this.favorite)
        }

      }
    },
    emits:['deleteFave']
  }
</script>

<style scoped>
  .favoriteCard {
    flex: 0 0 auto;
    background-color: #e5cb36;
    font-size: 1em;
    width: 400px;
    height: auto;
    border-radius: 25px;
    border: 1px solid black;
    padding: 20px;
  }
  .favoriteCard:hover{
      cursor: pointer;
  }

  @media only screen and (max-width: 600px){
    .favoriteCard {
      font-size: 0.8em;
      max-width: 300px;
      height: auto;
      padding: 10px;
    }
  }
</style>
