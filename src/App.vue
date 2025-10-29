<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            <span class="brand-icon">🎬</span>
            <span class="brand-text">VabHub</span>
          </router-link>
        </div>
        
        <div class="nav-menu">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/discover" class="nav-link">发现</router-link>
          <router-link to="/search" class="nav-link">搜索</router-link>
          <router-link to="/library" class="nav-link">媒体库</router-link>
          <router-link to="/settings" class="nav-link">设置</router-link>
        </div>
        
        <div class="nav-actions">
          <button class="nav-btn" @click="toggleTheme">
            {{ isDarkMode ? '🌙' : '☀️' }}
          </button>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 VabHub. 基于MoviePilot架构优化的媒体管理系统</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const isDarkMode = ref(false)

    // 切换主题
    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value
      document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
      localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    }

    // 初始化主题
    const initTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'light'
      isDarkMode.value = savedTheme === 'dark'
      document.documentElement.setAttribute('data-theme', savedTheme)
    }

    onMounted(() => {
      initTheme()
    })

    return {
      isDarkMode,
      toggleTheme
    }
  }
}
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --accent-color: #e74c3c;
  --text-primary: #2c3e50;
  --text-secondary: #7f8c8d;
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --border-color: #e1e5e9;
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  --radius: 8px;
}

[data-theme="dark"] {
  --primary-color: #3498db;
  --secondary-color: #34495e;
  --accent-color: #e74c3c;
  --text-primary: #ecf0f1;
  --text-secondary: #bdc3c7;
  --bg-primary: #2c3e50;
  --bg-secondary: #34495e;
  --border-color: #4a6278;
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: background-color 0.3s, color 0.3s;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.navbar {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: bold;
  font-size: 1.5rem;
}

.brand-icon {
  font-size: 2rem;
  margin-right: 10px;
}

.brand-text {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  padding: 8px 16px;
  border-radius: var(--radius);
  transition: all 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
  background: var(--bg-secondary);
}

.nav-actions {
  display: flex;
  gap: 10px;
}

.nav-btn {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 8px 12px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: var(--bg-secondary);
  border-color: var(--primary-color);
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  padding: 0;
}

/* 页脚样式 */
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 20px 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  color: var(--text-secondary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 15px;
    height: 56px;
  }
  
  .brand-text {
    display: none;
  }
  
  .nav-menu {
    gap: 15px;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
  
  .main-content {
    padding: 0 10px;
  }
}

/* 通用组件样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: none;
  border-radius: var(--radius);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--border-color);
}

.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background: #fee;
  border: 1px solid #fcc;
  border-radius: var(--radius);
  padding: 15px;
  color: #c33;
  margin: 20px 0;
}

.success-message {
  background: #efe;
  border: 1px solid #cfc;
  border-radius: var(--radius);
  padding: 15px;
  color: #3c3;
  margin: 20px 0;
}

/* 工具类 */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

.p-1 { padding: 0.5rem; }
.p-2 { padding: 1rem; }
.p-3 { padding: 1.5rem; }
.p-4 { padding: 2rem; }

.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

.grid {
  display: grid;
  gap: 1rem;
}

.grid-cols-1 { grid-template-columns: 1fr; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}
</style>