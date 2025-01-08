# Minecraft服务器的搭建

## 前言

本教程采用MCDR框架进行服务器的管理，可兼容多数服务器并且监听服务器事件，同时解决mod和插件共存问题（说的就是你Fabric）

教程使用Windows系统，1.20.2的Fabric服务端，包含mod安装，插件安装。

安装时候如果说一直下一步即可，会默认装在C盘，你可与自行更换安装位置。

==Forge和原版均可参照教程进行搭建。==

目前只提供Fabric教程

## 创建一个Minecraft服务器

### ①安装JDK（JAVA）

[Java Downloads | Oracle 中国](https://www.oracle.com/cn/java/technologies/downloads/#jdk21-windows)

在提供的页面按需选择你的JDK版本即可，这里我们是1.20.2，需要JDK17，下载完双击打开傻瓜式下一步即可：

![image-20231103175434612](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103175434612.png)

完成后，打开cmd，输入java -version，出现下面字样即为成功

![image-20231103181124544](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103181124544.png)

### ②下载服务器核心（按需）

==注意，如果无法安装，你应当先安装相应版本的原版服务端核心，再进行Fabric或者Forge的安装，切记把你的核心放在一个文件夹内，而不是在桌面==

Fabric：[安装Fabric](https://fabricmc.net/use/installer/)

原版：[我的世界中文Wiki](https://zh.minecraft.wiki/)

进入维基百科，搜索你要开服的版本，点进去，然后在右侧点击服务端下载即可

![image-20231103174626065](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103174626065.png)

Forge（注意，只是提供下载路径，教程用的是Fabric）：[安装Forge](https://files.minecraftforge.net/net/minecraftforge/forge/)

![image-20231103174931219](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103174931219.png)

### ③运行

双击下载好的核心，等待运行，之后会闪退，然后你核心所在的文件夹会出现下面的文件（文件不齐也没关系，我这里是大全后的文件，首次你肯定是少文件的！==另外第一次下载的核心会叫server，而不是minecraft_server，为了后续不出问题，你可以跟着改==）

![image-20231103180026495](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103180026495.png)

然后打开eula.txt，把里面的值改为true，保存，再次运行服务器核心

![image-20231103180100762](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103180100762.png)

运行后会有这个页面，当你看到出现`type 'help'`，即为开服成功，接下来输入（在右下角有个很长的白条输入框种输入）`stop`停止服务器

![image-20231103175624874](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103175624874.png)

当然你也可以打开MC，选择多人游戏，直接连接/添加服务器，输入127.0.0.1，如果能进去，说明也是成功的，同理记得输入`stop`关闭服务器

### ④配置服务器：

关闭服务器后，在server文件夹下，找到server.properties文件，修改里面的配置，你需要重点留意下面几点：

配置中文大全：[Minecraft 服务器server.properties属性文件](https://www.bilibili.com/read/cv7149916/)

1. server-port，服务器端口，默认25565，这是你服务器开放的端口号
2. online-mode，服务器正版验证，看你个人需求true或者false
3. enforce-secure-profile，聊天公钥，如果服务器不能聊天，请把这个改为false
4. enable-rcon，RCON的启用，为了装插件，我们需要设置为true
5. rcon.port，RCON端口，默认是25575，默认就行
6. rcon.password，RCON密码，你随便弄一个，记住就行

## 配置MCDR

### MCDR文档：

[快速上手 — MCDReforged 2.11.0 文档](https://mcdreforged.readthedocs.io/zh-cn/latest/quick_start.html)

### ①安装Python：

[Python下载](https://www.python.org/downloads/windows/)

本教程使用的是MCDR2.0的版本，需要Python3.8以上的版本，按要求挑一个3.8以上的版本即可，教程选择了3.11.0的版本

![image-20231103180847269.png](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103180847269.png)

下载完毕后，双击，一直下一步即可傻瓜安装

安装完成后，打开cmd，输入python，出现下面字样即为成功：

![image-20231103181209584](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103181209584.png)

### ②安装MCDR

==安装部分照搬文档内容，通常python安装的包会在C盘，请留意C盘空间，如果需要要换位置请自行解决==

**当然，首先你需要在任意地方打开cmd，然后输入python，再进行下面的内容：**

MCDR 已于 pypi 中发布，因此你可以通过 `pip` 命令来安装 MCDR：

Windows

```
pip install mcdreforged
```

Linux

对于国内用户，你可以在 pip 指令的末尾添加 `-i https://pypi.tuna.tsinghua.edu.cn/simple` 后缀来使用清华 pypi 镜像来加速 MCDR 的下载安装：

Windows

```shell
pip install mcdreforged -i https://pypi.tuna.tsinghua.edu.cn/simple
```

Linux

**不要** 直接下载 MCDR 的源代码并从中启动 MCDR，除非你是一个知道你自己在做什么的 MCDR 开发者

在使用 pip 安装 MCDR 后，你可以用以下指令来验证安装是否成功：

```shell
mcdreforged
```

### ③配置MCDR环境

创建一个文件夹，我这里命名为MCDR，进入，然后按着shift+右键，选择`在此处打开powershell窗口`或者`在此处打开命令窗口`，输入以下命令：

```shell
mcdreforged init
```

运行完成后，可以看到文件夹出现了如下内容：

![image-20231103181932629](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103181932629.png)

然后打开config.yml文件，配置MCDR：

1. language，改为zh_cn

2. handler，按你服务端核心类型进行修改

3. encoding和decoding，如果不是utf8，则改为utf8即可

4. rcon配置如下：

   ```yaml
   rcon:
   	enable: true
   	address: 127.0.0.1
   	port: 25575
   	password: # 前面配置MC服务器设置的密码
   ```

接着把之前运行服务端核心生成的全部文件，拖入到这里的server文件夹（MCDR是我们刚刚创建的文件夹）

![image-20231103182131810](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103182131810.png)

接着回退到MCDR的文件夹中，选用下面两种方式进行启动：

- 脚本启动

  新建一个文本文档，在里面写入：

  ```shell
  @echo off & python -m mcdreforged & pause
  ```

  保存，然后重命名后缀为bat即可，双击即可运行脚本

  ![image-20231103224658384](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103224658384.png)

- 命令行启动

  在MCDR文件夹下，按住shift+右键，选择`在此处打开powershell窗口`或者`在此处打开命令窗口`，输入以下命令即可启动：

  ```shell
  mcdreforged
  ```

## 装插件

MCDR插件仓库：[点我](https://github.com/MCDReforged/PluginCatalogue/blob/catalogue/readme-zh_cn.md)

### 装

里面包含了可以使用的插件，这里我们以`Beep`插件为例子

![image-20231103232024349](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103232024349.png)

点进去后，查看插件依赖和包依赖

![image-20231103232100511](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103232100511.png)

确定自己的版本和包的依赖需求正确，以及包依赖都安装了，如果你包依赖不知道装没装，请使用下面的命令进行测试和安装：

首先你需要在任意地方打开cmd，然后输入下面的代码：

```python
# 检查包是否存在，其中packer为包名字
pip show package

# 其中packer为包名字，version为包依赖需求，有些包需要指定依赖版本，如果无指定，可以直接使用第二行的来安装最新的
pip install package==version	# 第一行
pip install package				# 第二行
```

选择最新的插件进行下载：

![image-20231103232702401](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103232702401.png)

然后放到MCDR文件夹下的plygins即可，接着重启服务器（如果你服务器在运行，可以在服务端输入`!!MCDR r pls`进行热重载）

![image-20231103232833054](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103232833054.png)

### 用

如果你不会用，老规矩，我们回到这里，点开仓库标签页

![image-20231103233017049](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103233017049.png)

这样我们就可以看到它如何使用了：

![image-20231103233050210](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103233050210.png)

## 插件权限

有些插件是有权限的，例如：Quick Backup Multi

![image-20231103233256804](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103233256804.png)

我们进入到他的仓库插件页，滑到最下面，可以看到：

![image-20231103233345701](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103233345701.png)

这里标明了这个插件可以给哪些权限等级的人使用，关于权限等级，你可以在同MCDR的`config.yml`文件夹下找到名为`permission.yml`文件，打开它

![image-20231103233542189](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103233542189.png)

同时这里提供一份MCDR文档的说明，自行阅读匹配：

![image-20231103233721560](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/image-20231103233721560.png)