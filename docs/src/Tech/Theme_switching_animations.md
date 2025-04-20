---
hide: false
order: 0
---

# element plus官网的明暗主题切换动画

## 前言

一般的网站都会提供一个深浅主题切换的功能，对我来说我是偏向深色主题的用户，但是浅色主题也是需要提供给用户的；

这里使用的是element plus的UI框架，里面提供了暗黑模式相关的CSS：[Element Plus | 暗黑模式](https://element-plus.org/zh-CN/guide/dark-mode.html)

通过文档可以了解，直接在html上添加一个`dark`类就能实现暗黑模式，也就是说我们只需要写一个触发器，当使用这个触发器的时候，就往html上加`dark`类即可。

## (VueUse)没有动画，直接切换

如果只需要实现主题的切换，直接使用`VueUse`插件就能解决，上面element plus的文档链接内也有提供，或者直接进插件官网看：[useDark](https://vueuse.nodejs.cn/core/useDark/)

一个完整的例子，你也可以参考官方的例子（其实官方就是把`isDark`封装罢了，官方源码：[源码](https://github.com/vueuse/vueuse/blob/main/packages/core/useDark/demo.vue)）

```vue
<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core'

  const isDark = useDark()
  const toggleDark = useToggle(isDark)
</script>

<template>
  <!-- 只需要调用函数toggleDark即可实现切换明暗模式 -->
  <el-button @click="toggleDark">
    切换模式
  </el-button>
</template>
```

## 需要动画过渡

兄弟兄弟，你这样切换太生硬了，有没有像element plus的那种动画过渡？

有的兄弟有的，搜罗了网上的资料来看，自己对着来简单搓了一个组件，效果基本上和element plus的大差不差了：

```vue
<script setup lang="ts">
// 注意，ref之类的，我用了自动导入，所以不用自己import，没自动导入的记得手动加一下
import { Moon, Sunny } from '@element-plus/icons-vue'   // 这里是引入两个图标来替换掉el-switch的按钮样式，非必须

const darkTheme = ref(localStorage.getItem('maple.theme') ?? 'light')   // 这里是用于获取用户上一次主题设置，如何没有就默认设置为light
function checkThemeMode() {
  // 防止意外更改后导致本地theme记录与实际不同步，因此每次加载此组件的时候先检查一下状态来保证el-switch的状态正确
  if (document.documentElement.classList.contains('dark') && darkTheme.value === 'light') {
    localStorage.setItem('maple.theme', 'dark')
  }
}

function changeTransition(e: MouseEvent) {
  // 停止默认动作是为了解决同步开关过渡样式在变化时图标变化与动画不同步的问题，否则会出现切换组件已经切换完成了，但是动画还没播放，会有割裂感
  e.preventDefault()
  // 获取到 transition API 实例
  const isDark = !darkTheme.value
  const transition = document.startViewTransition(() => {
    document.documentElement.classList.toggle('dark')   // 这里给html加dark的类，会检查是否有dark类，有就去掉，没有就加上
    localStorage.setItem('maple.theme', isDark ? 'dark' : 'light')  // 然后把主题状态存到本地
  })

  // 动画部分
  // 在 transition.ready 的 Promise 完成后，执行自定义动画
  transition.ready.then(() => {
    // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
    const { clientX, clientY } = e

    // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
    const radius = Math.hypot(
      Math.max(clientX, innerWidth - clientX),
      Math.max(clientY, innerHeight - clientY),
    )
    const clipPath = [
      `circle(0% at ${clientX}px ${clientY}px)`,
      `circle(${radius}px at ${clientX}px ${clientY}px)`,
    ]
    const isDarkTime = document.documentElement.classList.contains('dark')
    // 自定义动画
    document.documentElement.animate(
      {
        // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
        clipPath: isDarkTime ? clipPath.reverse() : clipPath,
      },
      {
        duration: 500,
        // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
        pseudoElement: isDarkTime
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}

checkThemeMode()    // 首次初始化执行一次检查，你也可以用onMounted来做
</script>

<template>
  <el-switch
    :model-value="darkTheme"
    :active-action-icon="Moon"
    :inactive-action-icon="Sunny"
    class="switch"
    @click="changeTransition"
  />
</template>

<style scoped>

</style>
```

