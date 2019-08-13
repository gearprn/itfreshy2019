<template>
  <b-container fluid class="qrcode">
    <b-container>
        <b-row style="justify-content: center;" class="m-3">
            <img center alt="Center image" :src="qrcode">
            <!-- <button @click="update()">hit</button> -->
        </b-row>
    </b-container>
  </b-container>
</template>

<script>
import QRcode from "qrcode";
import { getters, mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { db } from '../main'

export default {
    name: "qrcode",
    components: {},
    data () {
        return {
        qrcode: "132",
        }
    },
    methods: {
        update() {
            var docRef = db.collection("users").doc("0hZEMhFZgMguQz7wMhbs")
            docRef.onSnapshot(doc => {
                // console.log(doc.data().qrCode.counter)
                QRcode.toDataURL(doc.data().qrCode.encoded)
                .then(url => {
                    // console.log(url);
                    this.qrcode = url;
                })
                .catch(err => {
                    // console.log(err);
                });
            });
        },
    },
    mounted() {
        this.update()
    }
};
</script>

<style lang="scss">
</style>