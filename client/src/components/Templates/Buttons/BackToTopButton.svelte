<script>
    let showOnViewHeight = 250;
    let isHidden = true;
  
    function goTop() {
      document.documentElement.scrollIntoView();
    }
  
    function scrollContainer() {
      return document.documentElement;
    }
  
    function handleOnScroll() {
      if (!scrollContainer()) {
        return null;
      }
  
      if (scrollContainer().scrollTop > showOnViewHeight) {
        isHidden = false;
      } else {
        isHidden = true;
      }
    }
</script>

<svelte:window on:scroll={handleOnScroll} />
  
<button class="back-to-top" on:click={goTop} class:isHidden>Back to top</button>
  
<style>
  .back-to-top {
    opacity: 1;
    transition: opacity 0.5s, visibility 0.5s;
    position: fixed;
    z-index: 99;
    right: 20px;
    user-select: none;
    bottom: 20px;
    color: white;
    background-color: black;
    width: 10%;
  }

  .back-to-top.isHidden {
    opacity: 0;
    visibility: hidden;
  }
</style>

  