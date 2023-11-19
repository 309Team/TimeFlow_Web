<template>
    <div>
        <el-button @click="submit" type="primary">登录</el-button>

        <h1>TESTVIEW</h1>
    </div>
</template>
  
<script>

import { GetDayEvent } from '../api/timeline.js'
export default {
    data() {
        return {

        }
    },
    methods: {
        submit() {
            GetDayEvent('2023-10-21').then(({ data }) => {
                console.log(data)
            })


        }
    }
}
</script>
  