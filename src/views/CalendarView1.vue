<template>
  <div class="calender" style="padding: 0 0; border: 0;">
    <el-calendar v-model="value">
      <component-with-slot>
        <template v-slot:dateCell="slotProps">
          <div @click="viewEvent(slotProps.data)">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(2).join("-") }}
              <br>
              <!-- 时段事项标签 -->
              <el-tag class="tags" v-model="monthTimeEvent" v-if="monthTimeEvent[data.day] && monthTimeEvent[data.day] > 0">
                {{ monthTimeEvent[data.day] }}
              </el-tag>

              <!-- 标签事项标签 -->
              <el-tag class="tags" type="warning" v-model="monthLabelEvent" v-if="monthLabelEvent[data.day] && monthLabelEvent[data.day] > 0">
                {{ monthLabelEvent[data.day] }}
              </el-tag>

              <!-- 时刻事项标签 -->
              <el-tag class="tags" type="danger" v-model="monthMomentEvent" v-if="monthMomentEvent[data.day] && monthMomentEvent[data.day] > 0">
                {{ monthMomentEvent[data.day] }}
              </el-tag>
            </p>
          </div>
        </template>
      </component-with-slot>
    </el-calendar>
    <addDialog :addDialogVisible.sync="addDialogVisible" :parentDate="value"></addDialog>
    <el-drawer :title="drawerTitle" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>
  
<script>
import { GetMonthLabelEvent, GetMonthMomentEvent } from "../api/calendar";
import { formatDate, formatDateMonth } from "../utils/dateFormat"
export default {

  mounted() {
    this.getMonthLabelEvent()
    this.getMonthMomentEvent()

  },
  data() {
    return {
      drawer: false,
      drawerTitle: "",
      addDialogVisible: false,
      value: new Date(),
      monthLabelEvent: {},
      monthMomentEvent: {},
      monthTimeEvent: {}
    }
  },
  components: {
    addDialog: () => import("@/components/AddEventDialog.vue"),
  },
  watch: {
    value(newValue, oldValue) {
      this.newValue = formatDate(newValue)
      if (formatDateMonth(newValue) != formatDateMonth(oldValue)) {
        this.getMonthLabelEvent(formatDate(newValue))
        this.getMonthMomentEvent(formatDateMonth(newValue))
      }
    }
  },
  methods: {
    viewEvent() {
      let chooseDate = formatDate(this.value)
      if (!this.monthLabelEvent[chooseDate] && !this.monthMomentEvent[chooseDate] && !this.monthTimeEvent[chooseDate]) {
        console.log(this.value);
        this.addDialogVisible = true
      } else {
        this.drawerTitle = chooseDate
        this.drawer = true
      }
    },

    getMonthLabelEvent() {
      let date = formatDate(this.value)
      console.log(date);
      GetMonthLabelEvent(date).then(({ data }) => {
        if (data.code !== 0 && data.code !== 4) {
          this.$message({
            showClose: false,
            message: '获取标签事项信息失败',
            type: 'error'
          })
        } else {
          this.monthLabelEvent = data.data
          //console.log(data.data);
        }
      })
        .catch((err) => {
          console.log(err)
        })
    },

    getMonthMomentEvent() {
      let date = formatDate(this.value)
      //console.log(date);
      GetMonthMomentEvent(date).then(({ data }) => {
        if (data.code !== 0 && data.code !== 4) {
          this.$message({
            showClose: false,
            message: '获取时刻事项信息失败',
            type: 'error'
          })
        } else {
          this.monthMomentEvent = data.data
          //console.log(data.data);
        }
      })
        .catch((err) => {
          console.log(err)
        })
    }

  }
}


</script>

<style scoped>
.container {
  /* height: 100vh; */
  /* flex: auto; */
  /* margin: 0; */
  padding: 0;
  border: 0;
  margin-left: 0px;
  width: auto;
  height: 100%;
}

.tags {
  margin: 5px;
}
</style>