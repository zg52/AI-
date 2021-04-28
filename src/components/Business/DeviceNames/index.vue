<!--
 * @Author: your name
 * @Date: 2021-02-22 16:11:32
 * @LastEditTime: 2021-02-24 11:39:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editw
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\components\Business\DeviceNames\index.vue
-->
<template>
  <div>
     <el-form :model="deviceForm" :inline="true" ref="deviceFormRule">
     <el-form-item label="选择设备名称" prop="deviceIds" :rules="{ required: true,message: '请选择设备名称', trigger: 'change' }">
        <el-select v-model="deviceForm.deviceIds" @change="changeDeviceNames" placeholder="请选择" multiple filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDeviceNames } from '@/utils/business'

export default {
  name: 'DeviceNames',
  data() {
    return {
      getDeviceNames: [],
      deviceForm: {
        deviceIds: null
      },
    }
  },
  methods: {
    ops() {
      alert(0)
    },
    changeDeviceNames() {
      this.$emit('getDeviceIds', this.deviceForm.deviceIds)
    }
  },
  created() {
    getDeviceNames().then((res) => {
       this.getDeviceNames = res
    })
  },
  mounted() {
  },
}
</script>

