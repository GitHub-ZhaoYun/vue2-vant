<template>
	<div class="container">
		<div class="class01" @click="showpicker6 = true">{{defaults}}</div>
        <van-popup v-model="showpicker6"
                   position="bottom"
                   custom-style="height: 20%;">
            <changWeely
                :weekType="weekType"
                :defaultsVal="defaults"
                :weekYear="weekYear"
                @onConfirm="onConfirm2"
                @onCancel="onCancel" />
        </van-popup>

    </div>
</template>

<script>
import changWeely from './changWeely'
	export default {
        name: "bindDepartment",
        components:{
            changWeely
        },
		data() {
			return {
                showpicker6: false,
                // weekType: 'time',
                // defaults: '2023-07-04',
                weekType: 'week',
                weekYear: '2023',
                defaults: '27',
			}
		},
		methods:{
            onConfirm2(date){
                console.log(date);
                this.showpicker6 = false;
            },
            onCancel(){

            }
		}
	}
</script>

<style scoped lang="scss">
.container{
    .class01{
        width: 2rem;
        height: 200px;
        border: 1px solid #ccc;
    }
}
</style>
