<template>
    <div class="container">
        <form v-on:submit.prevent="onSubmit">
            <button></button>
        </form>
    </div>
</template>

<script>
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'
import axios from 'axios'

export default {
    name: "registerCard",
    data () {
        return {
            isActive: false
        }
    },
    methods: {
        onSubmit() {
            console.log('click')
        }
    }
}
</script>

<style>

</style>
