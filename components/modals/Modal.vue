<template>
  <Teleport to="body">
    <div v-if="show" class="modal-mask" @click.self="onClose">
      <div class="modal-container">
        <button class="modal-close" @click="onClose">×</button>
        <slot :data="data" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean,
  data: Object
})
const emit = defineEmits(['close'])
const onClose = () => emit('close')
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 1000;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.modal-container {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  padding: 32px 24px 24px 24px;
  max-width: 90vw;
  min-width: 320px;
  max-height: 90vh;
  position: relative;
  animation: modal-fade-in 0.25s;
}

@keyframes modal-fade-in {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media(min-width:760px) {
  .modal-close {
    display: none;
  }
}
@media(max-width:759px) {

    .modal-close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: none;
      font-size: 2rem;
      color: #888;
      cursor: pointer;
      transition: color 0.2s;
      z-index: 1;
    }
}
.modal-close:hover {
  color: #222;
}

</style>
