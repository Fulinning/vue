<template>
  <div id="resume">
    <header>
      <Topbar></Topbar>
    </header>
    <main>
      <ResumeEditer></ResumeEditer>
      <ResumePreview></ResumePreview>
    </main>
  </div>
</template>

<script>
import '../assets/normalize.css'
import Topbar from './Topbar'
import ResumeEditer from './ResumeEditer'
import ResumePreview from './ResumePreview'

export default {
  name: 'Resume',
  components: {
    Topbar,ResumeEditer,ResumePreview
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/color';
  #resume {
    header {
      height: 10vh;
      background: $gray-three;
    }
    main {
      box-sizing: border-box;
      padding: 2vh 0;
      height: 90vh;
      display: flex;
    }
    background: $gray-one;
    height: 100vh;
  }
</style>