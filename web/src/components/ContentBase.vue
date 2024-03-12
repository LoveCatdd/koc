<template>
    <div class="card">
        <div class="card-body center-">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContentBase',
    components: {

    }
}
</script>

<style scoped>
.center- {
    display: flex;
    justify-content: center;
    align-content: center;

    padding: 20px;
    margin: 20px;
}
</style>