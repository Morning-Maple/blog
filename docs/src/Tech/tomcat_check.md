---
hide: false
order: 0
---

# Tomcat访问项目404快速排查

## 前言

一晚上404的苦楚经验记录，主要都是粗心导致的，希望对后续排查有用！

## 必要

项目在本地是正常能跑的，接口都能正常ping通+有返回值

## 排查步骤

### 用`curl`确认是否正常ping通

用下面的命令先检查，是否是后端`Tomcat`的问题（一般出现在前端访问API出现404时用，分锅）

```SHELL
# 确认tomcat正常
curl -v curl -v http://127.0.0.1:8080/
# 或者（用下面这个，输出好几行就是正常运行）
ps -ef | grep tomcat

# 端口测试
curl -v curl -v http://127.0.0.1:8080/项目在webapp下的文件夹名字/接口
```

如果`Tomcat`都挂了，那我问你，还不速速去启动！

### Tomcat版本

确认你本地正常跑的`Tomcat`版本和你服务器的`Tomcat`版本一致！！！特别是在你把`wae`包部署到tomcat下的`webapp`时，
如果在日志看到如下输出，立即替换你服务器的`Tomcat`版本再说

（意思就是要部署的web应用需要的Servlet版本为5.0或6.0【一般`Tomcat10`及以上】，但是当前Tomcat的Servlet版本不足。
如Tomcat 9.0.112最高只支持4.0，自然无法启动项目）：
```LOG
WARNING [main] org.apache.tomcat.util.descriptor.web.WebXml.setVersion Unknown version string [5.0]. Default version will be used.
WARNING [main] org.apache.tomcat.util.descriptor.web.WebXml.setVersion Unknown version string [6.0]. Default version will be used. 
```

参考的文章：[解决SpringBoot项目用Maven打成war包后Tomcat部署报错404](https://arshe.cn/blog/troubleshooting-the-404-not-found-error-when-deploying-a-maven-packaged-war-file-of-a-springboot-application-to-apache-tomcat)

### 没有使用正确的配置文件

打包构建前，看好你那`application.yml`文件，如果你是按环境配置不同的数据库啥的东西，一定记得切换！
```yaml
spring:
  profiles:
    # 这里换激活的配置文件！！！！
    active: dev # 别用这该死的 dev 部署到生产了！
```

### 项目根本没跑起来

检查服务器`Tomcat`的运行日志，看看项目是否正常运作！

注意！很重要的一点，排查前，请先把你项目里面 **日志输出格式改为DEBUG级别** ，再部署到服务器进行排查！！！

你可以在`Tomcat`下的`logs`文件夹中找到一个叫做：`catalina.out`的文件，用下面的指令看看内容（别忘了你要处于`logs`文件夹下）：
```LOG
# 输出最后200行的内容，如果有别的
tail -n 200 catalina.out

显示所有包含 ERROR 或 Exception 的行，并显示行号
grep -n -i "error\|exception" catalina.out
```

如此来确认你的项目是否正常被部署+正常运行（你可以在项目启动类加一点`print`，以确保真的正常启动了）

### Mysql数据库配置`url`问题

这个是最坑的，找了半天才反应过来，也是自己经验不足导致的吧哎

```YAML
# 这个url是可行的
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/数据库名字?serverTimezone=GMT%2B8&characterEncodig=utf8mb4&useSSL=false

# 这个是不行的
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/数据库名字?useSSL=false&serverTimezone=Asia/Shanghai&characterEncoding=utf8
```

问题出现在：`serverTimezone`，使用`Asia/Shanghai`是不行的，得`GMT%2B8`....
