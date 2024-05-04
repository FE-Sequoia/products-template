<template>
  <div id ="outerdiv">
    <iframe src="https://cli.im/weixin" id ='inneriframe' scrolling="no"></iframe>
  </div>
</template>

<script>
	export default {

	}
</script>

<style scoped="scoped">
    #outerdiv
    {
      margin: 0 auto;
      width:1500px;
      height:600px;
      overflow:hidden;
      position:relative;
    }

    #inneriframe
    {
      position:absolute;
      top:-150px;
      left:0px;
      width:1300px;
      height:450px;
    }
</style>
