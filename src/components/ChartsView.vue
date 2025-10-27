<template>
  <div class="charts-container">
    <!-- 排行榜类型选择 -->
    <div class="chart-type-selector">
      <h2>排行榜</h2>
      <div class="chart-tabs">
        <button 
          v-for="tab in chartTabs" 
          :key="tab.id"
          :class="{ active: activeTab === tab.id }"
          @click="switchTab(tab.id)"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- 数据源选择 -->
    <div class="source-selector" v-if="activeTab">
      <label>数据源:</label>
      <div class="source-buttons">
        <button 
          v-for="source in availableSources" 
          :key="source"
          :class="{ active: selectedSources.includes(source) }"
          @click="toggleSource(source)"
        >
          {{ getSourceName(source) }}
        </button>
      </div>
    </div>

    <!-- 筛选和排序控制 -->
    <div class="filter-controls" v-if="activeTab">
      <div class="filter-group">
        <label>排序方式:</label>
        <select v-model="sortBy" @change="applyFilters">
          <option value="rank">按排名</option>
          <option value="score">按评分</option>
          <option value="popularity">按热度</option>
          <option value="release_date">按发布日期</option>
          <option value="title">按标题</option>
        </select>
        <select v-model="sortOrder" @change="applyFilters">
          <option value="asc">升序</option>
          <option value="desc">降序</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>类型筛选:</label>
        <div class="filter-tags">
          <span 
            v-for="genre in availableGenres" 
            :key="genre"
            :class="{ active: selectedGenres.includes(genre) }"
            @click="toggleGenre(genre)"
            class="filter-tag"
          >
            {{ genre }}
          </span>
        </div>
      </div>
      
      <div class="filter-group">
        <label>年份筛选:</label>
        <input 
          type="number" 
          v-model="selectedYear" 
          placeholder="年份"
          @input="applyFilters"
          class="year-input"
        />
      </div>
      
      <div class="filter-group">
        <button @click="clearFilters" class="clear-btn">清除筛选</button>
      </div>
    </div>

    <!-- 排行榜内容 -->
    <div class="charts-content" v-if="chartsData.length > 0">
      <div class="chart-grid">
        <div 
          v-for="(item, index) in chartsData" 
          :key="item.id || index"
          class="chart-item"
        >
          <div class="rank-badge">#{{ item.rank }}</div>
          <div class="item-content">
            <div class="thumbnail" v-if="item.thumbnail_url">
              <img :src="item.thumbnail_url" :alt="item.title" />
            </div>
            <div class="item-info">
              <h3 class="title">{{ item.title }}</h3>
              <p class="meta" v-if="item.artists">
                {{ item.artists.join(', ') }}
              </p>
              <p class="meta" v-if="item.popularity">
                热度: {{ item.popularity }}
              </p>
              <div class="source-tag">{{ getSourceName(item.source) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div class="loading" v-if="loading">
      <div class="spinner"></div>
      <p>正在加载排行榜数据...</p>
    </div>

    <!-- 错误状态 -->
    <div class="error" v-if="error">
      <p>{{ error }}</p>
      <button @click="loadCharts">重试</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartsView',
  data() {
    return {
      activeTab: 'music',
      selectedSources: [],
      chartsData: [],
      loading: false,
      error: null,
      
      // 筛选和排序状态
      sortBy: 'rank',
      sortOrder: 'desc',
      selectedGenres: [],
      selectedYear: '',
      
      chartTabs: [
        { id: 'music', name: '音乐榜' },
        { id: 'movie', name: '电影榜' },
        { id: 'tv', name: '电视剧榜' },
        { id: 'anime', name: '动漫榜' },
        { id: 'documentary', name: '纪录片榜' },
        { id: 'variety', name: '综艺榜' }
      ],
      sourceMapping: {
        spotify: 'Spotify',
        netease: '网易云音乐',
        qq_music: 'QQ音乐',
        apple_music: 'Apple Music',
        tmdb: 'TMDB',
        douban: '豆瓣',
        imdb: 'IMDb',
        maoyan: '猫眼',
        mydramalist: 'MyDramaList',
        viki: 'Viki',
        tvmaze: 'TVmaze',
        trakt: 'Trakt',
        bangumi: 'Bangumi'
      },
        trakt: 'Trakt'
      },
      genreMapping: {
        music: ['流行', '摇滚', '电子', '民谣', '说唱', '古典', '爵士'],
        movie: ['动作', '喜剧', '剧情', '科幻', '恐怖', '爱情', '动画', '悬疑'],
        tv: ['剧情', '喜剧', '爱情', '悬疑', '科幻', '历史', '犯罪', '奇幻'],
        anime: ['冒险', '奇幻', '科幻', '喜剧', '剧情', '动作', '悬疑', '恋爱'],
        documentary: ['自然', '历史', '科学', '社会', '文化', '人物'],
        variety: ['真人秀', '脱口秀', '选秀', '访谈', '游戏']
      }
    }
  },
  computed: {
    availableSources() {
      const sourceMapping = {
        music: ['spotify', 'netease', 'qq_music', 'apple_music'],
        movie: ['tmdb', 'douban', 'imdb', 'maoyan'],
        tv: ['tmdb', 'douban', 'mydramalist', 'viki', 'tvmaze', 'trakt'],
        anime: ['tmdb', 'douban', 'mydramalist', 'bangumi'],
        documentary: ['tmdb', 'douban'],
        variety: ['douban']
      }
      return sourceMapping[this.activeTab] || []
    },
    availableGenres() {
      return this.genreMapping[this.activeTab] || []
    }
  },
  mounted() {
    this.loadCharts()
  },
  methods: {
    switchTab(tabId) {
      this.activeTab = tabId
      this.selectedSources = this.availableSources.slice(0, 2) // 默认选择前两个数据源
      this.loadCharts()
    },
    
    toggleSource(source) {
      const index = this.selectedSources.indexOf(source)
      if (index > -1) {
        this.selectedSources.splice(index, 1)
      } else {
        this.selectedSources.push(source)
      }
      this.loadCharts()
    },
    
    getSourceName(source) {
      return this.sourceMapping[source] || source
    },
    
    toggleGenre(genre) {
      const index = this.selectedGenres.indexOf(genre)
      if (index > -1) {
        this.selectedGenres.splice(index, 1)
      } else {
        this.selectedGenres.push(genre)
      }
      this.applyFilters()
    },
    
    clearFilters() {
      this.selectedGenres = []
      this.selectedYear = ''
      this.sortBy = 'rank'
      this.sortOrder = 'desc'
      this.loadCharts()
    },
    
    applyFilters() {
      // 防抖处理，避免频繁请求
      clearTimeout(this.filterTimeout)
      this.filterTimeout = setTimeout(() => {
        this.loadCharts()
      }, 300)
    },
    
    async loadCharts() {
      this.loading = true
      this.error = null
      
      try {
        const params = new URLSearchParams({
          chart_type: this.activeTab,
          limit: 50
        })
        
        if (this.selectedSources.length > 0) {
          this.selectedSources.forEach(source => {
            params.append('sources', source)
          })
        }
        
        // 添加筛选和排序参数
        params.append('sort_by', this.sortBy)
        params.append('sort_order', this.sortOrder)
        
        if (this.selectedGenres.length > 0) {
          params.append('genres', this.selectedGenres.join(','))
        }
        
        if (this.selectedYear) {
          params.append('year', this.selectedYear)
        }
        
        const response = await fetch(`http://localhost:6280/api/charts?${params}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        this.chartsData = data
        
      } catch (err) {
        this.error = `加载排行榜数据失败: ${err.message}`
        console.error('加载排行榜数据失败:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.charts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.chart-type-selector {
  margin-bottom: 30px;
}

.chart-type-selector h2 {
  margin-bottom: 15px;
  color: #333;
}

.chart-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.chart-tabs button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.chart-tabs button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.source-selector {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.source-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.source-buttons button {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background: #f8f9fa;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.source-buttons button.active {
  background: #28a745;
  color: white;
  border-color: #28a745;
}

/* 筛选和排序控制样式 */
.filter-controls {
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.filter-group label {
  font-weight: 600;
  color: #495057;
  min-width: 80px;
}

.filter-group select,
.filter-group input {
  padding: 6px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background: white;
}

.filter-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tag {
  padding: 4px 12px;
  border: 1px solid #dee2e6;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.filter-tag.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.year-input {
  width: 100px;
}

.clear-btn {
  padding: 6px 12px;
  border: 1px solid #dc3545;
  background: white;
  color: #dc3545;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.clear-btn:hover {
  background: #dc3545;
  color: white;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.chart-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  background: white;
  position: relative;
  transition: transform 0.2s;
}

.chart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.rank-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff6b6b;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
  font-size: 14px;
}

.item-content {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
}

.title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.meta {
  margin: 4px 0;
  font-size: 14px;
  color: #666;
}

.source-tag {
  display: inline-block;
  padding: 2px 8px;
  background: #e9ecef;
  border-radius: 10px;
  font-size: 12px;
  color: #495057;
  margin-top: 8px;
}

.loading, .error {
  text-align: center;
  padding: 40px;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error button {
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .chart-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-tabs {
    flex-direction: column;
  }
  
  .source-selector {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>