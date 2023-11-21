<template>
    <el-table :data="tableDataTe" border height="200" style="width: 50%;">
        <el-table-column prop="startTime" label="开始时间" value-format="HH:mm:ss" width="100">
        </el-table-column>
        <el-table-column prop="overTime" label="结束时间" width="100">
        </el-table-column>
        <el-table-column prop="name" label="事项" width="120">
        </el-table-column>
        <el-table-column prop="text" label="备注" width="180">
        </el-table-column>
        <el-table-column label="操作">
            <el-button size="mini" type="primary" @click="updateTeDialogVisible = true" round>修改</el-button>
        </el-table-column>
    </el-table>
</template>
<script>
import { GetTe } from '@/api/event';
export default {
    name: 'tabsTE',
    data() {
        return {
            tableDataTe: {
                name: '',
                startTime: '',
                overTime: '',
                text: '',
            }
        };
    },
    mounted() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        let data = year + '-' + month + '-' + day;
        GetTe(data).then(({ data }) => {
            this.tableDataTe = data.data;
        })
    }
}
</script>