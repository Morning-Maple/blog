import DefaultTheme from "vitepress/theme";
import VPTeamMembers from 'vitepress/theme-without-fonts'
import VPTeamPage from 'vitepress/theme-without-fonts'
import VPTeamPageTitle from 'vitepress/theme-without-fonts'
import "./style/index.css"; //引入自定义的样式

import mediumZoom from "medium-zoom";
// @ts-ignore
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册团队页面组件
    app.component('VPTeamPage', VPTeamPage)
    app.component('VPTeamMembers', VPTeamMembers)
    app.component('VPTeamPageTitle', VPTeamPageTitle)
  },
  // ...DefaultTheme, //或者这样写也可
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  }
};
