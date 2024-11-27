<template>
  <div class="boxContainer">
    {{ char }}
  </div>
</template>

<script>
  export default {
    name: 'ticBox',
    props: ['char']
  }
</script>

<style scoped>
  .boxContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #00aaff;
    color: #00aaff;
    width: 100px;
    height: 100px;
    cursor: pointer;
    font-size: 2.5em;
  }

  @media (max-width: 600px) {
    .boxContainer {
      width: 80px;
      height: 80px;
      gap: 0;
      margin: 0;
      padding: 0;
    }
  }
</style>
