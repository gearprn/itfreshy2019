<template>
    <footer>
        <div class="footer-copyright text-left pl-3 py-3 bg-dark">
            © 2019 Faculty of Information Technology, @KMITL. All right reserved.
        </div>
    </footer>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
export default {
    name: 'FooterCard',
}
</script>

<style lang="scss" scoped>
.bg-dark {
    color: rgba(255,255,255,.5);
    background-color: #343a40!important;
}
</style>

