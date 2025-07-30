---
hide: false
order: 0
---

# Jenkins快速食用指南

记录一轮使用中遇到的问题和解决法子！

系统：Centos Stream9

## 前提

使用前你必须已经安装好Jenkins，并且处于admin或者自己创建的用户下，登录到Jenkins的网页端！

**重要：** Jenkins 是通过**原生系统包安装**（非标准 WAR 包方式），且使用了封装后的启动脚本。

如何判断？

先确认你的安装方式，如果是war包之类的安装，那么配置文件在下面，你可以尝试去访问他们：

```bash
sudo vim /etc/default/jenkins  # Debian/Ubuntu
# 或
sudo vim /etc/sysconfig/jenkins # RHEL/CentOS
```

如果能访问到，去网上找对应的教程就行，目前搜了一下比rpm安装的要多，应该都能搜到！

如果访问不到，使用下面的命令：

```bash
sudo systemctl cat jenkins | grep -i execstart
```

并且看到输出为：`xecStart=/usr/bin/jenkins`，则说明你 Jenkins 是通过**原生系统包安装**（非标准 WAR 包方式），且使用了封装后的启动脚本。

## 插件

如何装插件？

右上角⚙图标 > 插件管理 > `Installed plugins`

### 必装

| 名称    | 用途             |
| ------- | ---------------- |
| Chinese | 汉化包，懂得都懂 |



## QA

### 权限配置错误

原本Jenkins设置的是，只要登录了就能干任何事情，但是配置的时候可能换了安全策略组后没有及时把角色或者组的权限配置好，导致连`admin`用户也没了权限！

1. 找到`Jenkins`的配置文件，用vim打开进行编辑：

   ```bash
   sudo vim /var/lib/jenkins/config.xml
   ```

2. 找到 `<authorizationStrategy>` 部分，替换为下面的内容（允许所有用户拥有完全的控制权）：

   ```bash
   <authorizationStrategy class="hudson.security.AuthorizationStrategy$Unsecured"/>
   ```

3. 重启`Jenkins`服务器：

   ```bash
   sudo systemctl restart jenkins
   ```

   如此，重新用admin登录即可（admin的密码是一开始输出在日志里面的密码）

### 更换Jenkins端口

一般端口都是默认8080的，如果你需要更换端口后，别忘了给你的**服务器防火墙开放更换后的端口**！

1. 通过systemctl访问jenkins的配置文件

   ```bash
   sudo systemctl edit --full jenkins
   ```

2. 找到里面的端口文本**`Environment="JENKINS_PORT=8080"`**，改成你需要的即可，保存退出：

   需要注意，如果下面出现了HELP等文本信息，说明你处于**`nano`**编辑器，此时默认是编辑模式，修改完成后，你只需要**`ctrl + o`**，再按回车就可以保存了，最后再使用**`ctrl + x`**退出即可！

   如果你是**`vim`**编辑器，那就不再过多介绍了，不动就baidu。

3. 重载配置文件和Jenkins服务：

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart jenkins
   ```

4. 修改网页端的映射地址：

   你需要登录并进入到Jenkins的网页端，然后点击右上角⚙进入到系统管理页面，找到`系统配置`或者叫 `System`，在里面找到 `Jenkins Location` > `Jenkins URL` ，然后把里面的URL地址的端口好改为你更改后的端口号，保存即可！

### 限制Jenkins内存使用

1. 查看指定文件：

   ```bash
   sudo systemctl edit --full jenkins
   ```

2. 在 `[Service]` 部分下添加如下内容：

   ```bash
   Environment="JAVA_OPTS=-Xms256m -Xmx512m -XX:MaxRAMPercentage=50.0 -XX:+UseSerialGC"
   ```

   `-Xms256m -Xmx512m` ：控制使用内存的最大和最小值；

   `-XX:MaxRAMPercentage=50.0` ：内存使用量不超过总物理内存的50%；

   `-XX:+UseSerialGC` ：强制使用轻量级垃圾回收器以减少 GC 开销
