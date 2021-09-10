<template>
    <div class="card">
        <p class="name">Loading...</p>
    </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  font-family: sans-serif;
  overflow: hidden;
  color: white;
  border: 15px solid;
  box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.5) inset;
  background: rgba(0, 0, 0, 0.25);
  background-image: repeating-linear-gradient(45deg, transparent 1px 60px, rgba(255, 255, 255, 0.15) 60px 61px), repeating-linear-gradient(-45deg, transparent 1px 60px, rgba(255, 255, 255, 0.15) 60px 61px);
  border-image: url("../assets/border.png") 30;
  border-image-outset: 0px;
  background-clip: content-box;
}

.card > .name {
  margin: 0px;
  padding: 5px;
  text-align: center;
  background-image: linear-gradient(rgba(255, 255, 255, 0.25), transparent);
}
</style>