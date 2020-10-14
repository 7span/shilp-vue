<template>
  <div id="app" class="p-7">
    <div class="w-7">
      <s-media ratio="1x1" :readonly="false" v-model="media"></s-media>
      {{ value }}
      <s-field>
        <s-select v-model="value" :options="options"></s-select>
      </s-field>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      media: null,
      value: null,
      options: [
        {
          value: "",
          label: "All",
        },
        {
          value: "hi",
          label: "Hi",
        },
      ],
    };
  },
};
</script>
