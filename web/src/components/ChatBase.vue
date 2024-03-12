<template>
  <div class="font-color-">
    <div class="flex-">
      <div class="margin-"></div> 
      <div 
            class="chat-input">
            <input v-model="content" 
            type="text" 
            @keydown.enter="post" 
            class="form-control " 
            aria-describedby="addon-wrapping" 
        />
        <button @click="post" type="submit" class="btn btn-success ">
          <i class="bi bi-send">

          </i></button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref} from 'vue';
export default {
  name: 'ChatBase',
  components: { 
  }, 
  setup(props, context) {
    let content = ref('');
    
    const post = () =>{
      context.emit('post',content.value);
      content.value = '';
    }

    return {
      content,
      post,
    }
  }
}
</script>

<style scoped>

.font-color- {
  color: #ffffff;
  font-size: 20px;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px 5px 0px 5px;

  height: auto;
  width: 90%;

  position: absolute;
  top: 550px;
  margin: 10px;
}

input {
  
  margin-right: 10px;
}

.margin- {

  position: absolute;
  top: 540px;
  height: 1px;
  width: 100%;
  border: 1px solid #dcdbdb ;

}

.flex- {
  display: flex;
  flex-direction: column;
}
</style>