# VabHub-Frontend

VabHub 前端界面，基于现代 Web 技术构建的用户界面。

## 🚀 快速开始

### 安装依赖
```bash
npm install
# 或使用 yarn
yarn install
```

### 开发模式
```bash
npm run dev
# 或使用 yarn
yarn dev
```

### 构建生产版本
```bash
npm run build
# 或使用 yarn
yarn build
```

### 预览构建结果
```bash
npm run preview
```

## 📁 项目结构

```
VabHub-Frontend/
├── public/                 # 静态资源
│   ├── favicon.ico
│   └── index.html
├── src/                    # 源代码
│   ├── assets/            # 资源文件
│   ├── components/        # 可复用组件
│   ├── views/            # 页面组件
│   ├── router/           # 路由配置
│   ├── store/            # 状态管理
│   ├── api/              # API 接口
│   ├── utils/            # 工具函数
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── package.json          # 项目配置
├── vite.config.js        # Vite 配置
└── README.md
```

## 🔧 技术栈

### 核心框架
- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **TypeScript** - JavaScript 的超集

### UI 组件库
- **Element Plus** - Vue 3 组件库
- **Tailwind CSS** - 实用优先的 CSS 框架

### 状态管理
- **Pinia** - Vue 官方状态管理库

### 路由
- **Vue Router** - Vue.js 官方路由

### 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化

## 📊 功能特性

### 用户界面
- 响应式设计，支持移动端
- 暗色/亮色主题切换
- 国际化支持
- 无障碍访问

### 媒体管理
- 媒体库浏览
- 搜索和筛选
- 批量操作
- 实时预览

### 系统管理
- 用户管理
- 插件管理
- 系统设置
- 日志查看

## 🔌 API 集成

### 后端 API 配置
```javascript
// src/api/config.js
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8090'
```

### 请求拦截器
```javascript
// src/api/interceptor.js
import axios from 'axios'

// 添加认证 token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## 🚀 部署

### Docker 部署
```bash
cd ../VabHub-Deploy
docker-compose up -d
```

### 静态文件部署
```bash
# 构建静态文件
npm run build

# 部署到 Nginx
cp -r dist/* /usr/share/nginx/html/
```

### 环境变量配置
创建 `.env` 文件：
```env
VITE_API_BASE_URL=http://localhost:8090
VITE_APP_TITLE=VabHub
VITE_APP_VERSION=1.0.0
```

## 🔗 相关仓库

- [VabHub-Core](https://github.com/vabhub/vabhub-core) - 后端核心服务
- [VabHub-Plugins](https://github.com/vabhub/vabhub-plugins) - 插件系统
- [VabHub-Deploy](https://github.com/vabhub/vabhub-deploy) - 部署配置
- [VabHub-Resources](https://github.com/vabhub/vabhub-resources) - 资源文件

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发环境设置
```bash
# 1. Fork 仓库
# 2. 克隆到本地
git clone https://github.com/your-username/vabhub-frontend.git

# 3. 安装依赖
npm install

# 4. 创建开发分支
git checkout -b feature/your-feature

# 5. 启动开发服务器
npm run dev

# 6. 提交更改
git commit -m "feat: add your feature"

# 7. 推送到远程
git push origin feature/your-feature

# 8. 创建 Pull Request
```

### 代码规范
- 使用 ESLint 和 Prettier 进行代码格式化
- 遵循 Vue 3 组合式 API 最佳实践
- 编写 TypeScript 类型定义
- 添加组件文档

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 📞 支持

- 文档: [VabHub Wiki](https://github.com/vabhub/vabhub-wiki)
- 问题: [GitHub Issues](https://github.com/vabhub/vabhub-frontend/issues)
- 讨论: [GitHub Discussions](https://github.com/vabhub/vabhub-frontend/discussions)