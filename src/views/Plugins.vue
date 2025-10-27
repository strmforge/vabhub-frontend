<template>
  <div class="plugins-page">
    <div class="page-header">
      <h1>插件管理</h1>
      <el-button type="primary" @click="refreshPlugins">刷新插件</el-button>
    </div>
    
    <div class="plugins-content">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="已安装" name="installed">
          <plugin-list :status="'installed'" />
        </el-tab-pane>
        <el-tab-pane label="可用插件" name="available">
          <plugin-list :status="'available'" />
        </el-tab-pane>
        <el-tab-pane label="插件市场" name="market">
          <plugin-market />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import PluginList from '@/components/PluginList.vue'
import PluginMarket from '@/components/PluginMarket.vue'

const activeTab = ref('installed')

const refreshPlugins = async () => {
  try {
    ElMessage.success('刷新插件列表...')
    // TODO: 调用后端API刷新插件
  } catch (error) {
    ElMessage.error('刷新失败: ' + error.message)
  }
}
</script>

<style scoped>
.plugins-page {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.plugins-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}
</style>