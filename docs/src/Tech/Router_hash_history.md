---
hide: false
order: 0
---

# Vue3路由中的#

## 前言

有些时候为了路由的美观，我们需要去除掉路由中的`#`，也就是从`createWebHashHistory()`模式转向`createWebHistory()`；

我们只需要修改`Nginx`的配置文件和项目下`vueRouter`的创建即可。

## 前提须知

Vue3项目，使用`vueRouter`作为路由管理，打包构建后部署在`nginx/html/maple`下，其中`maple`是我们自己的项目名！

外网是通过：`http://服务器外网IP/maple` 来访问我们这个`maple`项目的！

## 配置Vue项目

一般来说，路由的创建在项目的`router`下的`index.ts`中：
```ts
const router = createRouter({
  // history: createWebHashHistory(),   // 这里是使用 HashHistory 的写法
  history: createWebHistory('/maple/'), //  这里的 maple 指代的是我们的项目名，也就是前提提到的
  routes,
})
```

## Nginx配置

打开Nginx的配置文件，一般是`nginx/conf/nginx.conf`下：

参考下述改法即可：
```text
server
    {
        listen 80;
        server_name localhost;
        
        # 这里是配置的重点
        location ^~ /maple/ {
          root /www/server/nginx/html;
          index index.html;
          
          # 使用斐HashHistory模式需要配置
          try_files $uri $uri/ /maple/index.html;
        }
        
        location / {
          return 301 /maple/;
        }
        
        location /api/ {
          proxy_pass http://127.0.0.1:8080/maple/;
          proxy_set_header Host $http_host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

## 知识拓展

* Hash 模式：兼容性卫士

Hash 模式利用 URL 中的 片段标识符（即 # 号及其后面的部分）来实现路由。


不发起服务器请求：当 # 之后的部分发生变化时（例如从 #/home 变为 #/about），浏览器不会向服务器重新发送请求，只会修改 URL 的哈希部分。

监听哈希变化：前端路由库（如 Vue Router）会监听 hashchange 事件。

动态渲染：根据哈希值（如 #/about）匹配预设的路由规则，并在浏览器中动态渲染对应的页面组件，实现无刷新跳转。

** 示例与特点

URL 示例：http://example.com/#/dashboard

本质：无论 URL 中的哈希路径如何变化，浏览器实际请求的始终是 http://example.com/ 这个页面。

优势：兼容性极佳（可支持到 IE9），无需任何服务器端特殊配置。

缺点：URL 中始终包含 #，美观度稍差，在语义上不像一个“真实”的路径。

* History 模式：优雅的实践者

History 模式基于 HTML5 的 History API（pushState、replaceState），允许前端直接操作浏览器的会话历史栈，从而生成更简洁的 URL。

操作历史记录：前端通过 History API 添加或修改历史记录条目，改变 URL 而不刷新页面。

拦截浏览器请求：当用户直接访问一个 History 模式下的路径（如刷新页面或直接输入 `http://example.com/about` ）时，这个请求会真实地发送到服务器。

服务器配合：因此，服务器必须被配置为：对于所有不匹配静态资源文件的路径请求，都返回同一个 index.html（即你的 SPA 入口文件）。前端应用加载后，路由库便能根据完整的 URL 路径（如 /about）来渲染对应的组件。

** 示例与特点

URL 示例：http://example.com/dashboard/reports

本质：URL 与服务器路径在形式上一致，更符合直觉。

优势：URL 干净、美观，对搜索引擎（SEO）更友好，用户体验更佳。

缺点：需要服务器端额外配置，且对低版本浏览器兼容性较弱。