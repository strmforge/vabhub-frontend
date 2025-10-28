<template>
  <div class="search-component">
    <!-- 搜索栏 -->
    <v-card class="search-bar" elevation="2">
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="searchQuery"
              placeholder="搜索电影、电视剧、动漫、音乐..."
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details
              @input="handleSearchInput"
              @keyup.enter="performSearch"
              @focus="showSuggestions = true"
              @blur="handleBlur"
              ref="searchInput"
            ></v-text-field>
          </v-col>
          
          <v-col cols="12" md="3">
            <v-select
              v-model="selectedType"
              :items="searchTypes"
              label="搜索类型"
              dense
              outlined
            ></v-select>
          </v-col>
          
          <v-col cols="12" md="3">
            <v-btn 
              color="primary" 
              @click="performSearch" 
              :loading="searching"
              block
            >
              搜索
              <v-icon right>mdi-send</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        
        <!-- 搜索源选择 -->
        <v-expand-transition>
          <div v-if="showAdvanced" class="advanced-options">
            <v-row>
              <v-col cols="12">
                <v-chip-group
                  v-model="selectedSources"
                  multiple
                  column
                >
                  <v-chip
                    v-for="source in availableSources"
                    :key="source.value"
                    :value="source.value"
                    filter
                    outlined
                  >
                    {{ source.text }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-card-text>
    </v-card>

    <!-- 搜索建议 -->
    <v-expand-transition>
      <v-card v-if="showSuggestions && suggestions.length > 0" class="suggestions-card" elevation="2">
        <v-list dense>
          <v-list-item
            v-for="suggestion in suggestions"
            :key="suggestion"
            @click="selectSuggestion(suggestion)"
            class="suggestion-item"
          >
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ suggestion }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-expand-transition>

    <!-- 搜索结果 -->
    <div v-if="searchResults.length > 0" class="search-results">
      <v-card class="results-header" elevation="1">
        <v-card-text>
          <v-row align="center">
            <v-col>
              <h3>搜索结果 ({{ totalResults }} 个)</h3>
              <span class="search-info">搜索词: "{{ lastQuery }}" | 类型: {{ selectedType }}</span>
            </v-col>
            <v-col cols="auto">
              <v-btn text @click="clearResults">
                <v-icon left>mdi-close</v-icon>
                清空结果
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- 结果分类 -->
      <v-tabs v-model="activeTab" class="results-tabs">
        <v-tab value="all">全部</v-tab>
        <v-tab value="movie">电影</v-tab>
        <v-tab value="tv">电视剧</v-tab>
        <v-tab value="anime">动漫</v-tab>
        <v-tab value="music">音乐</v-tab>
      </v-tabs>

      <!-- 结果内容 -->
      <v-window v-model="activeTab" class="results-content">
        <v-window-item value="all">
          <SearchResultsGrid :results="filteredResults" @item-click="handleItemClick" />
        </v-window-item>
        
        <v-window-item value="movie">
          <SearchResultsGrid :results="movieResults" @item-click="handleItemClick" />
        </v-window-item>
        
        <v-window-item value="tv">
          <SearchResultsGrid :results="tvResults" @item-click="handleItemClick" />
        </v-window-item>
        
        <v-window-item value="anime">
          <SearchResultsGrid :results="animeResults" @item-click="handleItemClick" />
        </v-window-item>
        
        <v-window-item value="music">
          <MusicResultsGrid :results="musicResults" @item-click="handleMusicClick" />
        </v-window-item>
      </v-window>
    </div>

    <!-- 搜索历史 -->
    <v-card v-if="searchHistory.length > 0 && !searchResults.length" class="history-card" elevation="1">
      <v-card-title>
        <v-icon left>mdi-history</v-icon>
        搜索历史
        <v-spacer></v-spacer>
        <v-btn text small @click="clearHistory">清空历史</v-btn>
      </v-card-title>
      <v-card-text>
        <v-chip-group>
          <v-chip
            v-for="history in searchHistory"
            :key="history.query"
            @click="selectHistory(history)"
            outlined
            class="history-chip"
          >
            {{ history.query }}
            <v-icon right small>mdi-replay</v-icon>
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>

    <!-- 空状态 -->
    <v-card v-if="!searchResults.length && !searchHistory.length" class="empty-state" elevation="0">
      <v-card-text class="text-center">
        <v-icon size="64" color="grey lighten-1">mdi-magnify</v-icon>
        <h3 class="mt-4">开始搜索</h3>
        <p class="grey--text">输入关键词搜索电影、电视剧、动漫或音乐</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { ref, computed, watch, nextTick } from 'vue'
import { useSearchApi } from '../composables/useSearchApi'
import SearchResultsGrid from './SearchResultsGrid.vue'
import MusicResultsGrid from './MusicResultsGrid.vue'

export default {
  name: 'SearchComponent',
  components: {
    SearchResultsGrid,
    MusicResultsGrid
  },
  setup() {
    const {
      searchResults,
      searchHistory,
      suggestions,
      searching,
      totalResults,
      lastQuery,
      performSearch,
      getSuggestions,
      getSearchHistory,
      clearSearchHistory
    } = useSearchApi()

    // 响应式数据
    const searchQuery = ref('')
    const selectedType = ref('all')
    const selectedSources = ref([])
    const showSuggestions = ref(false)
    const showAdvanced = ref(false)
    const activeTab = ref('all')
    const searchInput = ref(null)

    // 搜索类型选项
    const searchTypes = [
      { text: '全部', value: 'all' },
      { text: '电影', value: 'movie' },
      { text: '电视剧', value: 'tv' },
      { text: '动漫', value: 'anime' },
      { text: '音乐', value: 'music' }
    ]

    // 搜索源选项
    const availableSources = computed(() => {
      const baseSources = [
        { text: '本地媒体库', value: 'local' },
        { text: 'TMDB', value: 'tmdb' },
        { text: '豆瓣', value: 'douban' }
      ]
      
      if (selectedType.value === 'music' || selectedType.value === 'all') {
        baseSources.push(
          { text: 'QQ音乐', value: 'qq_music' },
          { text: '网易云音乐', value: 'netease' },
          { text: 'Spotify', value: 'spotify' },
          { text: 'Apple Music', value: 'apple_music' }
        )
      }
      
      return baseSources
    })

    // 计算属性
    const filteredResults = computed(() => {
      return searchResults.value
    })

    const movieResults = computed(() => {
      return searchResults.value.filter(item => item.type === 'movie')
    })

    const tvResults = computed(() => {
      return searchResults.value.filter(item => item.type === 'tv')
    })

    const animeResults = computed(() => {
      return searchResults.value.filter(item => item.type === 'anime')
    })

    const musicResults = computed(() => {
      return searchResults.value.filter(item => item.type === 'music')
    })

    // 方法
    const handleSearchInput = async () => {
      if (searchQuery.value.length >= 2) {
        await getSuggestions(searchQuery.value)
        showSuggestions.value = true
      } else {
        showSuggestions.value = false
      }
    }

    const handleBlur = () => {
      setTimeout(() => {
        showSuggestions.value = false
      }, 200)
    }

    const selectSuggestion = (suggestion) => {
      searchQuery.value = suggestion
      showSuggestions.value = false
      performSearchAction()
    }

    const selectHistory = (history) => {
      searchQuery.value = history.query
      selectedType.value = history.type
      performSearchAction()
    }

    const performSearchAction = async () => {
      if (!searchQuery.value.trim()) return
      
      await performSearch({
        query: searchQuery.value,
        type: selectedType.value,
        sources: selectedSources.value
      })
      
      showSuggestions.value = false
    }

    const clearResults = () => {
      searchResults.value = []
      searchQuery.value = ''
    }

    const clearHistory = async () => {
      await clearSearchHistory()
    }

    const handleItemClick = (item) => {
      console.log('Item clicked:', item)
      // 处理媒体项点击事件
      // 可以打开详情页面或执行下载操作
    }

    const handleMusicClick = (music) => {
      console.log('Music clicked:', music)
      // 处理音乐项点击事件
      // 可以播放音乐或添加到播放列表
    }

    // 监听搜索类型变化
    watch(selectedType, (newType) => {
      // 根据类型自动选择默认搜索源
      if (newType === 'music') {
        selectedSources.value = ['local', 'qq_music', 'netease']
      } else if (newType === 'all') {
        selectedSources.value = ['local', 'tmdb', 'qq_music']
      } else {
        selectedSources.value = ['local', 'tmdb', 'douban']
      }
    })

    // 初始化
    const init = async () => {
      await getSearchHistory()
    }

    init()

    return {
      searchQuery,
      selectedType,
      selectedSources,
      showSuggestions,
      showAdvanced,
      activeTab,
      searchInput,
      searchTypes,
      availableSources,
      searchResults,
      searchHistory,
      suggestions,
      searching,
      totalResults,
      lastQuery,
      filteredResults,
      movieResults,
      tvResults,
      animeResults,
      musicResults,
      handleSearchInput,
      handleBlur,
      selectSuggestion,
      selectHistory,
      performSearch: performSearchAction,
      clearResults,
      clearHistory,
      handleItemClick,
      handleMusicClick
    }
  }
}
</script>

<style scoped>
.search-component {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
}

.advanced-options {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.suggestions-card {
  position: absolute;
  width: calc(100% - 40px);
  max-width: 600px;
  z-index: 1000;
  margin-top: 4px;
}

.suggestion-item {
  cursor: pointer;
}

.suggestion-item:hover {
  background-color: #f5f5f5;
}

.results-header {
  margin-bottom: 16px;
}

.search-info {
  color: #666;
  font-size: 0.875rem;
}

.results-tabs {
  margin-bottom: 16px;
}

.results-content {
  min-height: 400px;
}

.history-card {
  margin-top: 20px;
}

.history-chip {
  cursor: pointer;
}

.history-chip:hover {
  background-color: #e3f2fd;
}

.empty-state {
  margin-top: 60px;
  text-align: center;
  color: #9e9e9e;
}

@media (max-width: 960px) {
  .search-component {
    padding: 10px;
  }
  
  .suggestions-card {
    width: calc(100% - 20px);
  }
}
</style>