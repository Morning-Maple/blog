---
hide: false
order: 0
---

# Linux（CentOS Stream 9）部署jenkins

## 前言

快速记录一轮安装步骤，后续再用能有参考，本次采用OracleJDK的21.0.8版本，用的**rpm**包进行的安装~

## JAVA的安装

### 版本下载

#### 版本差异

* OpenJDK：[Archived OpenJDK GA Releases](https://jdk.java.net/archive/)
  * 使用OpenJDK版本需要额外安装一个字体插件**`fontconfig`**
  * 一般来说只提供tar.gz包，环境变量什么的需要自己配置
* OracleJDK：[Java Downloads | Oracle 中国](https://www.oracle.com/cn/java/technologies/downloads/)
  * 除了不能商用，基本上OpenJDK有的它都有

嫌麻烦就Oracle！

OpenJDK直接找对应的Linux版本，下载就行，是一个tar.gz包，类似于压缩包安装；

OracleJDK则直接下**`x64 RPM Package`**就行，类似于一键安装的包；

### 安装

下好`x64 RPM Package`的包体，传到服务器任意目录（本次传到了`/usr/`下），然后连接进去，cd到`/usr/`目录下，敲以下命令开始安装：

```bash
sudo rpm -ivh jdk-21_linux-x64_bin.rpm
```

安装完毕后，分别输入以下内容验证，只要有输出，就是对的：

```bash
java -version
javac -version
```

安装位置可以用下面命令查询：

```bash
which java
```

一般来说都在：**`/usr/bin/java`**

## Jenkins安装

手册地址：[Linux的](https://www.jenkins.io/doc/book/installing/linux/)

**注意：用的是LTS版本，不要看错了**

在手册中找到你的Linux版本，我们用的是`CentOS Stream 9`版本，直接到最下面找`Red Hat Enterprise Linux and derivatives`，按下面的步骤走即可：

```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
sudo yum upgrade
# Add required dependencies for the jenkins package（在安装jenkins前把需要的依赖都装好）
sudo yum install fontconfig java-21-openjdk

sudo yum install jenkins
sudo systemctl daemon-reload
```

快速解析一下：

```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
```

①把 Jenkins 的官方 YUM 仓库配置文件下载到`/etc/yum.repos.d/jenkins.repo`目录下，这里就包含了Jenkins的LTS的rpm包（rpm一键安装）

```bash
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
```

②密钥导入，验完整性的，正常做就行，过期了去上面手册找新的

```bash
sudo yum upgrade
```

③【非必需】更新系统中所有的软件包到最新的

```bash
sudo yum install fontconfig java-21-openjdk
```

④【openjdk必须】需要安装界面字体渲染的依赖插件

```bash
sudo yum install jenkins
```

⑤从步骤①的仓库安装Jenkins，途中需要`y`确认

```bash
sudo systemctl daemon-reload
```

⑥reload服务

至此，如果没有特殊问题，就是成功安装了，你也可以用下面的命令看看有没有返回正常的信息（这时候还没运行，状态是`dead`的）

```bash
sudo systemctl status jenkins
```

## 运行和配置

### 指令集

#### 开机自启动

```bash
sudo systemctl enable jenkins

sudo systemctl enable --now jenkins  # 启用并立刻启动Jenkins
```

#### 启动

```bash
sudo systemctl start jenkins
```

#### 状态检查

```bash
sudo systemctl status jenkins
```

### sysyemctl status交互指令

#### 常用

| 按键         | 作用                                    |
| ------------ | --------------------------------------- |
| `q`          | **立即退出**（最常用）                  |
| `空格`       | 向下翻页                                |
| `b`          | 向上翻页                                |
| `/` + 关键词 | 搜索（如 `/active` 可以用于快速定位状态 |

#### 进阶搜索

| 操作        | 效果                                                         |
| ----------- | ------------------------------------------------------------ |
| `/active`   | 跳转到下一个包含 "active" 的位置（区分大小写）               |
| `?active`   | 反向搜索（向上查找）                                         |
| `n`         | 跳转到**下一个**匹配项                                       |
| `N`         | 跳转到**上一个**匹配项                                       |
| `/\\<port`  | 搜索以 "port" 开头的词（`\\<` 表示词首锚定）                 |
| /正则表达式 | /20[0-9]{2}-[0-9]{2}-[0-9]{2}  # 搜索日期格式（如 2025-07-29） |

### 启动

使用

```bash
sudo systemctl start jenkins
```

启动Jenkins，然后使用状态检查

```bash
sudo systemctl status jenkins
```

去检查Jenkins的状态。

如果你进入了**`systemctl status`**命令的**交互式输出界面**，并且看到了**`Active: active（running）`**，那么说明Jenkins已经完全启动力！

### 配置

接下来要找到Jenkins的端口来访问图形化界面了：

1. 输入

   ```bash
   sudo systemctl status jenkins
   ```

   来查看状态，一般可以在最上方的Jnekins.service下的CGroup中看到httpPort=8080（一般都是在8080），当然你也可以用上面的搜索指令快速查询~

2. 除此，你还需要记住访问密码，一会要用，一般密码会输出在日志中，在log：**`This may also be found at`**的上一条，先复制好（如果你找不到，就先退出日志的命令模式，然后输入：

   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```

   以此来打印你的密码）

3. 进去你的服务器管理网站，在防火墙中把8080端口开放，然后用你服务器的外网访问地址+8080来访问，即：**服务器外网地址:8080**

4. 访问成功后，把密码输入进去，就会跳转到装插件的页面了

5. 直接选择**`安装建议的插件`**，他就会自己开始装插件了（后面可以在网页端进行卸载）

   **注意：如果安装过程中无法连接到Jenkins服务器了，多试几次（SSH，SFTP都试试），实在连不上就直接重启就行**

6. 当所有插件都装好后，会让你创建第一个管理员用户，按要求填写即可，你也可以以admin账户继续

7. 配置实例地址，默认就行，如此，就部署完成啦！
