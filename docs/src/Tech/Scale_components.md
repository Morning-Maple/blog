---
hide: false
order: 0
---

# Vue3缩放组件

## 前言

最近在搓游戏活动日历，参考了甘特图的设计，同时本人上班儿的地儿有个画流程图的平台，感觉挺适合的，结合了Element Plus简单封装了一下。

组件支持缩放和滚动到指定位置，滚动相关由右下角的一个固钉按钮触发，记得有缩放时，滚动的距离要乘上缩放值，不然滚动的距离会不正常！

## 注意事项

1. 需要留意的是，缩放功能是通过scale实现的，因此请不要把position属性为fixed和sticky的内容放到里面，否则缩放后，会导致定位失效！
2. 由于是基于 Element Plus 进行的二次封装，你需要自行安装 Element Plus 的库！
3. 我这里的ref、onMounted、watch等Vue3的API是全局导入的，如果你没有全局导入请自行在代码前`import`进去，例如：

```ts
import { onMounted, ref } from 'vue'
 ```

## 使用例子

```vue

<script lang="ts" setup>
  const topSave = ref(0)
  const leftSave = ref(0)

  function scrollHandler({top, left}) {
    topSave.value = top
    leftSave.value = left
  }

  const scrollScale = ref(1)
</script>

<template>
  <MapleScroll
    :scrollTop="128"
    isShowButton
    callAfterInit
    :buttonBottom="60"
    :buttonRight="16"
    :viewMinWidth="1000"
    @scroll-change="scrollHandler"
    @zoom-scale="({scale}) => { scrollScale = scale }"
  >
    <你的组件 />
  </MapleScroll>
</template>
```

## API

| 属性名           | 说明                                   | 类型      | 默认值   |
|---------------|--------------------------------------|---------|-------|
| scrollTop     | 点击固钉后要滚动的top距离                       | number  | 0     |
| scrollLeft    | 点击固钉后要滚动的left距离                      | number  | 0     |
| isShowButton  | 是否展示固钉                               | boolean | false |
| buttonBottom  | 固钉离底部的距离                             | number  | 64    |
| buttonRight   | 固钉离右侧的距离                             | number  | 16    |
| callAfterInit | 初始化完毕立即执行一次固钉的函数（也就是初始化后立即滚动到指定位置一次） | boolean | false |
| viewMinWidth  | 页面最小宽度（在与其他组件联动需要撑开视窗的时候可以通过设置这个来撑开） | number  | —     |
| minZoom       | 最小缩放倍率                               | number  | 0.4   |
| maxZoom       | 最大缩放倍率                               | number  | 2     |
| stepZoom      | 缩放步长                                 | number  | 0.1   |

## Events

| 事件名           | 说明              | 类型       | 详细参数                                  |
|---------------|-----------------|----------|---------------------------------------|
| scroll-change | 滚动的距离（left和top） | Function | ({left: number; top: number}) => void |
| zoom-scale    | 页面缩放的倍率         | Function | ({scale: number}) => void             |

## Slots

| 插槽名     | 说明      |
|---------|---------|
| default | 自定义展示内容 |

## 源代码

::: details 查看源代码

```vue
// MapleScroll.vue

<script setup lang="ts">
  import { ElScrollbar, type ScrollbarInstance } from 'element-plus'

  const props = withDefaults(defineProps<{
    /** 指定点击固钉后要滚动的Top，不填默认为0 */
    scrollTop?: number,
    /** 指定点击固钉后要滚动的Left，不填默认为0 */
    scrollLeft?: number,
    /** 是否展示固钉 */
    isShowButton?: boolean,
    /** 固钉离底部的距离 */
    buttonBottom?: number,
    /** 固钉离右侧的距离 */
    buttonRight?: number,
    /** 是否需要初始化完毕后立即执行一次固钉的函数 */
    callAfterInit?: boolean
    /** 是否需要设置最小宽度，不设置默认为100% */
    viewMinWidth?: number
    /** 最小缩放值 */
    minZoom?: number
    /** 最大缩放值 */
    maxZoom?: number
    /** 缩放步长 */
    stepZoom?: number
  }>(), {
    scrollTop: 0,
    scrollLeft: 0,
    isShowButton: false,
    buttonBottom: 64,
    buttonRight: 16,
    callAfterInit: false,
    viewMinWidth: undefined,
    minZoom: 0.4,
    maxZoom: 2,
    stepZoom: 0.1,
  })

  const emit = defineEmits<{
    (e: 'scroll-change', payload: {left: number; top: number}): void
    (e: 'zoom-scale', payload: {scale: number}): void
  }>()

  const scrollbarRef = ref<ScrollbarInstance | null>(null)

  function returnTimeLine() {
    const wrapEl = scrollbarRef.value?.wrapRef  // 保护
    if (wrapEl) {
      // 开始滚动前先加入平滑滚动相关的内容
      wrapEl.classList.add('smooth-scroll')
      scrollbarRef.value!.scrollTo(props.scrollTop! * scale.value, props.scrollLeft! * scale.value)  // 执行平滑滚动
      // 移除平滑滚动相关的内容
      setTimeout(() => {
        wrapEl.classList.remove('smooth-scroll')
      }, 400)
    }
  }

  function onScroll() {
    const wrapEl = scrollbarRef.value?.wrapRef as HTMLElement
    if (wrapEl) {
      emit('scroll-change', {
        left: wrapEl.scrollLeft,
        top: wrapEl.scrollTop,
      })
    }
  }

  const scale = ref<number>(Number(localStorage.getItem('maple.scale') ?? 1))
  watch(scale, (newVal, oldVal) => {
    localStorage.setItem('maple.scale', String(newVal))
    ZoomTransformFunc(oldVal)
    emit('zoom-scale', {scale: scale.value})
  })

  // 鼠标的位置
  let startX = 0
  let startY = 0
  // 当前滚轮的位置
  let scrollStartLeft = 0
  let scrollStartTop = 0

  /**
   * 计算缩放值
   * @param val 当前的缩放值
   * @param min 最小缩放值
   * @param max 最大缩放值
   */
  function clamp(val: number, min: number, max: number) {
    return parseFloat(Math.max(min, Math.min(max, val)).toFixed(1)) // 只保留一位小数
  }

  const draggingCursor = ref(false) // 是否让指针变成手（像是在拖动东西）

  onMounted(() => {
    // 初始化后，立即把缩放值传递给父组件
    emit('zoom-scale', {scale: scale.value})

    const wrapEl = scrollbarRef.value?.wrapRef as HTMLElement
    // 禁用原始右键和中键行为，重新定义右键和中键的功能
    wrapEl.addEventListener('contextmenu', e => e.preventDefault())
    wrapEl.addEventListener('mousedown', e => {
      if (e.button === 1 || e.button === 2) {
        draggingCursor.value = true // 开始拖动时，需要变成手的样式

        startX = e.clientX
        startY = e.clientY
        scrollStartLeft = wrapEl.scrollLeft
        scrollStartTop = wrapEl.scrollTop
        e.preventDefault()
      }
    })
    document.addEventListener('mouseup', () => {
      if (draggingCursor.value) {
        draggingCursor.value = false // 停止拖动时，变回去默认样式
      }
    })
    document.addEventListener('mousemove', e => {
      if (draggingCursor.value) {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        wrapEl.scrollLeft = scrollStartLeft - dx
        wrapEl.scrollTop = scrollStartTop - dy
      }
    })

    // Alt + 滚轮缩放事件处理
    wrapEl.addEventListener('wheel', e => {
      if (e.altKey) {
        e.preventDefault()

        const delta = -e.deltaY > 0 ? props.stepZoom : -props.stepZoom
        // 更新 scale
        scale.value = clamp(scale.value + delta, props.minZoom, props.maxZoom)
      }
    }, {passive: false})

    if (props.callAfterInit) {
      nextTick(() => {
        returnTimeLine()
      })
    }
  })

  const contentRef = ref<HTMLElement | null>(null)

  /**
   * 过渡动画（会让整个缩放看起来在中心进行变化的）
   * @param old_val 旧缩放值
   */
  function ZoomTransformFunc(old_val: number) {
    const wrapEl = scrollbarRef.value?.wrapRef as HTMLElement
    const contentEl = contentRef.value
    if (!contentEl) return

    const wrapRect = wrapEl.getBoundingClientRect()

    // 当前视口中心点在容器坐标系下的位置
    const centerX = wrapEl.scrollLeft + wrapRect.width / 2
    const centerY = wrapEl.scrollTop + wrapRect.height / 2

    // 以当前 scale 计算中心点在缩放内容中的位置
    const offsetX = centerX / old_val
    const offsetY = centerY / old_val

    nextTick(() => {
      // 缩放后，重新设置 scroll 使得 offsetX/Y 在新 scale 下仍然位于容器中心
      wrapEl.scrollLeft = offsetX * scale.value - wrapRect.width / 2
      wrapEl.scrollTop = offsetY * scale.value - wrapRect.height / 2
    })
  }
</script>

<template>
  <el-scrollbar
    ref="scrollbarRef"
    class="w-full h-full overflow-hidden"
    @scroll="onScroll"
    :wrap-class="['!h-full', draggingCursor ? 'cursor-move' : 'cursor-default']"
    view-class="relative"
    :view-style="{minWidth: viewMinWidth ? `${(viewMinWidth * scale).toFixed(1)}px` : '100%'}"
  >
    <div
      ref="contentRef"
      class="transform origin-top-left"
      :style="{
      transform: `scale(${scale})`,
      width: 'fit-content',
      height: 'fit-content',
    }"
    >
      <slot />
    </div>
    <div class="fixed right-2 top-1/2 z-50 -translate-y-1/2 bg-white dark:bg-gray-800 px-0 py-2 rounded shadow">
      <ElSlider
        v-model="scale"
        vertical
        :min="props.minZoom"
        :max="props.maxZoom"
        :step="props.stepZoom"
        height="200px"
        show-tooltip
        show-stops
      />
    </div>
    <el-backtop :bottom="buttonBottom" :right="buttonRight" :visibility-height="0" @click="returnTimeLine">
      <div style="
                width: 100%;
                height: 100%;
                line-height: 40px;
                color: #1989fa;
                text-align: center;
                background-color: var(--el-bg-color-overlay);
                border-radius: 100%;
                box-shadow: var(--el-box-shadow-lighter);"
      >
        📍
      </div>
    </el-backtop>
  </el-scrollbar>
</template>

<style scoped>
  /* 确保 scrollbar 包裹容器不会自动撑高 */
  :deep(.el-scrollbar__view) {
    width: 100%;
    height: 100%;
  }
</style>

```

:::

