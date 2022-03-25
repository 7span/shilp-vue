<template>
  <div>
    <s-layout v-bind="$attrs">
      <template #left>
        <s-nav v-bind="$attrs" class="sidebar__nav flex__fluid p-3">
          <s-nav-item label="Home"></s-nav-item>
          <s-nav-item label="Orders"></s-nav-item>
          <s-nav-item label="Customers"></s-nav-item>
          <s-nav-item label="Agents"></s-nav-item
        ></s-nav>
      </template>

      <template #default>
        <h2>Main Content</h2>
      </template>
    </s-layout>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
