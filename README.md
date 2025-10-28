# VabHub-Frontend

VabHub-Frontend 是 VabHub 媒体管理系统的现代化前端界面，基于 Vue 3 和 TypeScript 构建，提供直观的用户体验和丰富的功能。

## 🎉 最新版本: 1.3.0

**VabHub-Frontend 1.3.0** 是一个重大版本更新，带来了全新的现代化界面和性能优化。

### 🚀 1.3.0 版本亮点
- **Vue 3 + TypeScript**: 现代化前端架构
- **响应式设计**: 完美适配移动端和桌面端
- **性能优化**: 代码分割、组件懒加载、虚拟滚动
- **主题系统**: 亮色/暗色主题切换

## 🎨 界面特性

### 📊 专业仪表盘
- **实时监控组件**: CPU、内存、磁盘、网络实时监控
- **下载器管理界面**: 多下载器支持状态显示
- **媒体服务器集成**: Plex、Jellyfin、Emby深度集成
- **可拖拽布局**: 响应式拖拽布局系统

### 🔍 智能搜索界面
- **高级搜索面板**: 多种搜索选项和过滤器
- **搜索结果展示**: 智能排序和分类显示
- **搜索历史**: 保存和管理搜索记录
- **实时搜索建议**: 输入时实时显示搜索建议

### ⚙️ 系统设置
- **插件管理**: 插件安装、配置和状态管理
- **下载器配置**: 多下载器连接和配置
- **媒体库设置**: 媒体库路径和扫描设置
- **用户偏好**: 个性化设置和主题选择

## 🔧 技术栈

### 前端技术
- **框架**: Vue 3 Composition API + TypeScript
- **状态管理**: Pinia
- **UI组件**: Element Plus
- **路由**: Vue Router
- **图表**: ApexCharts
- **构建工具**: Vite

### 性能指标
| 指标 | 1.2.0 | 1.3.0 | 提升 |
|------|-------|-------|------|
| 首屏加载 | 3.5s | 1.8s | 49% |
| 包体积 | 2.1MB | 1.2MB | 43% |
| 交互响应 | 150ms | 80ms | 47% |
| 内存占用 | 180MB | 120MB | 33% |

## 🚀 快速开始

### 开发环境
```bash
# 1. 克隆仓库
git clone https://github.com/vabhub/vabhub-frontend.git
cd vabhub-frontend

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 访问界面
# http://localhost:3000
```

### 生产构建
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
VabHub-Frontend/
├── src/
│   ├── components/     # 可复用组件
│   │   ├── common/     # 通用组件
│   │   ├── dashboard/  # 仪表盘组件
│   │   └── plugins/   # 插件组件
│   ├── views/         # 页面组件
│   │   ├── Dashboard.vue
│   │   ├── Search.vue
│   │   └── Settings.vue
│   ├── stores/        # 状态管理
│   ├── router/        # 路由配置
│   ├── utils/         # 工具函数
│   └── assets/        # 静态资源
├── public/            # 公共资源
├── package.json       # 项目配置
└── vite.config.ts    # 构建配置
```

## 🎨 设计系统

### 主题系统
- **亮色主题**: 适合白天使用
- **暗色主题**: 适合夜间使用
- **自定义主题**: 支持品牌颜色定制

### 响应式设计
- **移动端**: 完美适配手机设备
- **平板端**: 优化平板使用体验
- **桌面端**: 充分利用大屏幕空间

### 交互设计
- **实时反馈**: 操作即时反馈
- **动画效果**: 流畅的过渡动画
- **加载状态**: 清晰的加载指示

## 🔗 相关仓库

- **后端服务**: [vabhub-core](https://github.com/vabhub/vabhub-core)
- **部署配置**: [vabhub-deploy](https://github.com/vabhub/vabhub-deploy)
- **插件系统**: [vabhub-plugins](https://github.com/vabhub/vabhub-plugins)

## 🤝 贡献指南

欢迎参与 VabHub-Frontend 项目的开发！

### 开发流程
1. Fork 仓库
2. 创建功能分支
3. 提交代码更改
4. 创建 Pull Request

### 代码规范
- 使用 TypeScript 类型检查
- 遵循 ESLint + Prettier 规范
- 编写组件文档
- 添加单元测试

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 📞 支持与交流

- **文档**: [VabHub Wiki](https://github.com/vabhub/vabhub-wiki)
- **问题**: [GitHub Issues](https://github.com/vabhub/vabhub-frontend/issues)
- **讨论**: [GitHub Discussions](https://github.com/vabhub/vabhub-frontend/discussions)

---

**VabHub Frontend Team**  
*现代化媒体管理界面*  
2025年10月28日