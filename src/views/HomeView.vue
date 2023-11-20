<template>
  <div>
    <addDialog :addDialogVisible.sync="addDialogVisible"></addDialog>
    <add-event-dialog></add-event-dialog>
    <el-button @click="open">添加事项</el-button>
  </div>
</template>

<script>
export default {
  components: {
    addDialog: () => import("@/components/AddEventDialog.vue")
  },
  data() {
    return {
      addDialogVisible: false
    }
  },
  methods: {
    open() {
      this.addDialogVisible = true
    }
  }
}
</script>


<style></style>