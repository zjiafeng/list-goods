<template>
<div>
    <div class="mengban">
        <img src="../assets/loading.gif" alt="" >
    </div>
</div>
</template>

<script>
export default {
    name:'loadings',
}
</script>

<style scoped>
.mengban{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(25, 25, 25, 0.5);
    z-index: 2000;
}
img{
    width: 50px;
    height: 50px;
    position: absolute;
    left: 0;
    top:0;
    bottom: 0;
    right: 0;
    margin: auto;
}
</style>
