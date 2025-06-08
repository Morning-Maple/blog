---
hide: false
order: 0
---

# Vue3组件通讯

## 前言
开发中，我通常会把一些页面的控制面板单独抽出来成为一个组件，最常见的就是在一个页面中，调用`Element Plus`的`Dialog`对话框组件；

因为你需要给这个`Dialog`对话框组件传递一个布尔值，以此来控制他的显隐，但是同时对话框关闭的时候，需要通知父组件更新这个控制的布尔值；

用简单的话来说就是：
* 父组件传递了一个true变量给子组件，子组件获得了这个变量，并且传递给`Dialog`对话框组件，以此来显示它
* `Dialog`对话框是可以自主关闭的（比如点击对话框以外的地方就可以关闭），此时子组件内虽然关闭了，但是父组件却无法获知；
* 子组件中，对话框的状态是`false`，但是父组件不知道，因此父组件认为对话框的状态还是`true`，这就导致了组件间对同一个变量的状态认知不一致。
* 所以，对于同一个参数，我们需要：Ⅰ.父组件能通过这个参数控制子组件；Ⅱ.子组件内，这个参数的变化需要通知父组件更新，

基于以上几点，需要了解一下Vue3的组件通讯方式。

在Vue3中，我了解到的组件通讯分为三种：
1. 父子组件通讯（prop+emits）
2. 兄弟组件通讯（mitt）
3. 非父子组件通讯（pinia/vuex）

还有一种是跨级组件通讯（provide/inject），这个我没怎么用过，就不考虑这玩意了。

目前用的较多是1和3，这里写的比较基础的（我实实在在用过），更难更复杂的还是找一下Vue3的文档看吧。

## 父子组件通讯（prop+emits）
我最常用的一种，因为很多情况下，我只是把一整个vue页面的内容解耦开来，比如原本页面有一个展示和控制的功能，那么我会把展示的内容保留在这个vue页面，然后把控制部分的内容抽取成一个新的组件！

你可以理解为，子组件就是一个类，props是这个类的参数，emit则是这个类的函数，我们直接上例子看看：
::: details 子组件user_define.vue
```vue
// 子组件user_define.vue
<script setup lang="ts">
  // 这里定义了子组件可以获取什么样的参数，带?的表示非必要参数
  const props = withDefaults(defineProps<{
    needShow: boolean,
    strLength?: number,
    strLengthMax?: number,
  }>(), {
    needShow: false,
    strLengthMax: 10,
  })
  // 如果你的props不需要默认值，你可以参考下面这个更简单的写法
  /**
  const props = defineProps<{
    needShow: boolean,
    strLength?: number,
    timeShow?: number,
  }
  **/
  // 事件注册，父组件可以监听这些事件
  const emit = defineEmits<{
    (e: 'update:needShow', value: boolean): void
    (e: 'change:inputStrLength', value: number): void
  }>()

  const showFormVisible = computed({
    // 逻辑是先通知父组件更新，再让子组件由于父组件的更新而更新传递的props值，从而更新子组件的值
    get: () => props.needShow,
    set: (val) => emit('update:needShow', val),
  })

  const inputText = ref('')
  // 监听 inputText 内容变化，实时反馈长度给父组件
  watch(() => inputText.value.length, (newVal) => {
    emit('change:inputStrLength', newVal)
  })
</script>

<template>
  <el-dialog v-model="showFormVisible">
    <el-input v-model="inputText" placeholder="请输入内容" :maxLength="strLengthMax" />
  </el-dialog>
</template>
```
:::

::: details 父组件
```vue
// 父组件
<script setup lang="ts">
  const show = ref(false)
  const strLength = ref(0)
</script>

<template>
  <div>
    <user_define v-model:needShow="show" @change:inputStrLength="(val) => strLength = val" />
    <el-button @click="show = true">显示</el-button>
  </div>
</template>
```
:::

让我们来简单看看这个例子：
1. 父组件控制子组件的对话框显示（父 → 子）
   * 父组件点击了按钮，修改了show，并且把这个改变通过needShow告知了子组件；
   * 子组件监听了needShow，并通过computed的`showFormVisible`下的get，把值给到了`el-dialog`组件，让对话框显示。
2. 子组件关闭对话框，通知父组件更新状态（父 ↔ 子）
   * 子组件关闭对话框（`el-dialog`组件关闭时，会把传递的v-model的值设为`false`），`showFormVisible`的值被更新为`false`，调用其computed的set函数，注意，此时`showFormVisible`的值依旧没有被改变，为`true`，因为变化给set函数截住了；
   * `showFormVisible`的set函数被调用后，会用`emit('update:needShow', val)`通知父组件更新`needShow`的状态为`false`；
   * 父组件的`needShow`被更新为`false`（这时候父组件才知道对话框被关掉了），重新传递了新的值给子组件，此时，子组件通过`props.needShow`来更新`showFormVisible`的值（通过get函数）。
3. 子组件内有内容，需要告知父组件（子 → 父）
   * 子组件的`el-input`需要实时反馈输入的文本长度，这里我们用watch来监听`inputText`
   * `inputText`的内容更新了，就会触发watch去执行`emit('change:inputStrLength', newVal)`，把新变化值通知父组件
   * 父组件监听`inputStrLength`，用val接收传递的值，接收后，把值保存在`strLength`中

## 非父子组件通讯（pinia/vuex）
这个我也用的很多，主要是用于全局状态同一管理的，换个说法就是，你把内容单独抽出来用一个对象进行保存，这个对象是public的，谁都能访问和修改，修改后所有调用的人都会知道，
如果调用的地方是响应式的，那么修改后的值会触发调用的自动更新。

举个我常写的例子：
::: details Pinia
```ts
// user.ts
const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    interface Food {
      id: number
      mark_time: string
    }

    const test1 = ref(localStorage.getItem('test1') || '')
    const default_test = 123

    function sayHello(str: string) {
      console.log(str)
    }

    return {
      test1,
      default_test,
      sayHello,
    }
  },
)

export default useUserStore
```
:::

在你需要的地方调用就行
::: details 调用
```vue
<script setup lang="ts">
  import { useUserStore } from '@/store/user.ts'
  
  const userStore = useUserStore()
  
  userStore.sayHello('hello')
  
  const testFunc = (id: number) => {
    userStore.test1 = id.toString()
  }
</script>

<template>
  <div>
    <p>{{ userStore.default_test }}</p>
    <p>{{ userStore.test1 }}</p>
  </div>
</template>
```
:::

## QA
1. 实际上`v-model:needShow`干了两件事（`:needShow=‘xxx’`：传递参数；`@update:needShow='val => xxx = val'`：监听参数变化）
2. 如果你用`change`，那么你得写成为`@change:needShow='val => xxx = val'`和`:needShow='xxx'`，而不能直接用`v-model:needShow`，具体可以看 父子组件通讯（prop+emits） 下的例子
