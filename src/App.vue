<template>
  <div id="app">
    <div class="w-7">
      <s-media ratio="1x1" :readonly="false" v-model="media"></s-media>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      media: null
    }
  },
};
</script>
