<script>
  export let day;
  export let list;
  export let placeholder = "Category";
</script>

<select bind:value={day}>
  {#each list as object}
      {#if placeholder}
          <option hidden>{placeholder}</option>
      {/if}
      <option value={object}>{object.title}</option>
  {/each}
</select>