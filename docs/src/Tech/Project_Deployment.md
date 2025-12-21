---
hide: false
order: 0
---

# 在服务器上部署Spring boot+Vue项目（java+mysql+redis+nginx+tomcat）

## 更新说明

23.9.13：完成整篇文章编写

25.12.22：发布（有些东西可能已经过时，请辩论地看待！）

## 开始前说明

环境配置中，直接下载还未填坑，基本安装均为上传自己的包进行解压再配置环境，如果你需要直接下载，搜索引擎直接找就行，几个linux指令的事儿，并且有些会给你配置好环境，只能说，懒狗yum直接下载，定制就传包解压配置部署。

祝部署顺利！

## 服务器环境

阿里云云服务器ESC（系统是Cenos7）

## 工具

`你也可以用你自己的工具或者直接使用阿里云提供的工具，当然也可以用宝塔（听说宝塔很行）`

- XShell 7家庭/学校免费版【远程SSH】：[家庭/学校免费 - NetSarang Website (xshell.com)](https://www.xshell.com/zh/free-for-home-school/)

  `你也可以直接使用XShell 7提供的Xftp工具进行文件传递，下载和安装的时候选上Xftp选项即可，这取决于您`

- flashFXP【文件传输】：

- navicat【远程mysql数据库】：

## 开放安全组

`你可以在之后用到的时候再进行端口开放`

确定你需要的端口，如果已经默认开放了就不用管

- 默认开放：22，80，3306

## 环境配置

### 准备工作：

首先确定你项目要用到的所有依赖的版本，我这里以JDK17.0.5，mysql8.0.20，redis3.0.5，tomcat9.0.71举例

使用XShell链接到你的服务器（连接前你需要对你的服务器密码进行修改，修改后要重启服务器）

`用户名通常为root，密码是我们修改后的密码，主机是你服务器的外网IP地址`

按要求填写后，你就能连接进你的云服务器：

![image-20230612131535450.png](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612131535450.png)

### 通用步骤：

下面是一些通用步骤，你可以通过这些步骤去排除服务器是否有预装软件，为了避免他们的影响，你可以考虑是否将它们移除，以下用JAVA来举例，步骤是通用的。

#### 检查服务器有无预装JDK/java：

```shell
rpm -qa | grep jdk
```

如果没有，那么在你输入后，什么都不会发生：

![image-20230612132156005](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612132156005.png)

如果有，那么需要进行删除：

![image-20230612132312900](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612132312900.png)

删除的命令如下：

```shell
rpm -e --nodepjs 需要删除的文件名
```

例如删除上文的`java-1.8.0-openjdk-1.8.0.65-3.b17.el7.x86_64`你可以这么写：

```shell
rpm -e --nodepjs java-1.8.0-openjdk-1.8.0.65-3.b17.el7.x86_64
```

#### 检查是否有装JAVA（同上）：

```shell
java -version
```

如果没有则会提示：`-bash: java: command not found`

有则进行删除，步骤同上！

### 安装JAVA：

我提供了两种方式进行JDK的安装，一种是直接使用yum进行安装（此举不需要你写配置文件，但是你不能指定JAVA安装的路径，他会默认安装到usr/lib/jvm内），另一种是先把安装包下载到本地，再送入服务器指定文件夹下，使用命令进行安装（通过这种方法你需要为JAVA设置全局环境变量），你可以自由选择：

可选命令：

```shell
sudo yum update
```

此举是以超级管理员身份更新服务器中全部的软件包和依赖（如果你安装出现命令版本过低等问题，可以考虑此命令）

#### 方案一：直接下载

任意地方执行下面的代码即可↓

首先查看java的全部版本，找到你想要的版本：

```shell
yum list java*
```

![image-20230612195121612](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612195121612.png)

选择你要的版本（我是JDK17，所以我选择：`java-17-openjdk.x86_64`）

进行安装：

```shell
yum -y install java-17-openjdk.x86_64
```

执行命令，查看是否安装成功：

```shell
java -version
```

如果成功，你会看到下面的代码：

![img](https://img.alicdn.com/tfs/TB1YEopIQL0gK0jSZFAXXcA9pXa-452-54.png)

#### 方案二：本地上传后安装

- 为了方便管理，我选择把JDK放入到/usr/local/java下，但是此时按理说是没有这个文件夹的，因此我们需要创建一个这样的文件夹：

```shell
mkdir /usr/local/java
```

然后进入到我们新创建的java文件夹内：

```shell
cd /usr/local/java
```

此时你可以看到你的控制台是这样的：

![image-20230612193153885](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612193153885.png)

- 首先找到你项目需要的JDK包，我这里以17的为例子，你需要上官网找到你用的JDK包（openJDK和Oracle JDK都可以），下载他们的linux版本，我这里提供了oracle JDK17的下载地址：[Java Archive Downloads - Java SE 17 (oracle.com)](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)

  你需要下载的是这个版本的，同时也要注意你想买使用的是哪一个版本（我看的时候已经到17.0.7了，我项目用的是17.0.5，所以我下的也是17.0.5）：![image-20230612201437805](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612201437805.png)

  下载好后，使用XShell7自带的Xftp或者flashFXP进行文件的传输（后者的链接服务器方式和XShell链接服务器的步骤相同）：

<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612202822768.png" alt="image-20230612202822768" style="zoom:80%;" />

- 现在在你的控制台内输入下面代码，进入到目标文件夹内，查看文件是否已经存在，如果一切顺利，你会看到下面的内容：

```shell
cd usr/local/java
ls
```

![image-20230612203046897](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612203046897.png)

接着开始解压（我这里是以`.tar.gz`为后缀，其他后缀请自行查找解压命令）：

```shell
tar -xzvf jdk-17.0.5_linux-x64_bin.tar.gz
```

使用`ls`查看是否解压成功，如果成功，`ls`后你可以看到下面的内容：

![image-20230612203750410](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612203750410.png)

- 配置你的环境变量，使用如下命令进行：

```shell
vim /etc/profile
```

这里是使用vim编辑器进行编写（我不会用啊？自己学！），来到文件的最下面，按键盘上的i，进入到输入模式（按了后你可以看到左下角出现了——insert——，此时就进入了输入模式），把下面的四行代码复制进去文件中（记得另起一行再粘贴），然后按下键盘上的ESC推出输入模式（此时左下角的——insert——消失了，说明你已经退出了输入模式），接着再输入`:wq`进行保存，然后更新配置文件让其生效：

![image-20230612205649405](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612205649405.png)

需要复制进去的代码（注意此处的`jdk-17.0.5`你可以替换为你安装JDK后出现的文件夹名字）：

```shell
JAVA_HOME=/usr/local/java/jdk-17.0.5
CLASSPATH=%JAVA_HOME%/lib:%JAVA_HOME%/jre/lib
PATH=$PATH:$JAVA_HOME/bin:$JAVA_HOME/jre/bin
export PATH CLASSPATH JAVA_HOME
```

点击ESC退出输入模式，输入下面代码进行保存：

```shell
:wq
```

更新配置文件让其生效：

```shell
source /etc/profile
```

- 最后进行测试，看是否成功安装，如果成功，你输入下面代码可以看到如下内容：

```shell
java -version
```

![image-20230612210145743](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612210145743.png)

不放心你可以进行下面代码继续进行测试，如果没有报错，那么就是成功的：

```shell
java
```

```shell
javac
```

### 安装MySQL：

有了服务器，那肯定少不了数据库，咱们还是提供两种方案进行mysql的安装，同样是yum和本地上传后安装（本地上传安装路径我选用usr/local/mysql）

我选用的是MySQL8.0.20版本

当然你也可以使用以下命令，检查服务器是否有预装的数据库，对其进行处理：

检查（通常会有两种常见的数据库，你可以分别进行检查）：

```shell
rpm -qa | grep mariadb
rpm -qa | grep mysql
```

删除：

```shell
rpm -e 查询到的名称 --nodeps
```

以上是推荐做法，你也可以跳过不做。

#### 方案一：直接下载

pass（后续补）

#### 方案二：本地上传后安装

- mysql包下载网站：[MySQL :: Download MySQL Community Server (Archived Versions)](https://downloads.mysql.com/archives/community/)

<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612231326584.png" alt="image-20230612231326584" style="zoom:80%;" />

选择版本`8.0.20`，选择系统`Linux - Generic`，点击Download进行下载，并且上传到路径`usr/local/mysql`，当然，这个文件夹咱们也要先创建：

```shell
mkdir /usr/local/mysql
```

<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612232745778.png" alt="image-20230612232745778" style="zoom:80%;" />

使用下面代码检查是否传输成功，如果成功，输入`ls`后能看到文件，否则为空：

```shell
cd /usr/local/mysql
ls
```

![image-20230612231842417](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230612231842417.png)

- 解压并且进入（`mysql-8.0.20-linux-glibc2.12-x86_64`为解压后的文件夹名称）：

```shell
tar -xvf mysql-8.0.20-linux-glibc2.12-x86_64.tar.xz
cd mysql-8.0.20-linux-glibc2.12-x86_64
```

创建data文件夹用于存储数据：

```shell
mkdir data
```

如果成功进行，输入ls你可以看到下面的文件：

```shell
ls
```

![image-20230613110042044](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613110042044.png)

- 为了后续方便操作，建议为解压完毕后的文件夹重命名，首先先返回我们的mysql文件夹内，如果此时你是按照文档进行的，你可以照搬下面的命令：

```shell
cd ..
mv mysql-8.0.20-linux-glibc2.12-x86_64 mysql-8.0.20
ls
```

如果你不知道你在哪儿，你也可以执行下面的命令进行重命名：

```shell
cd /usr/local/mysql
mv mysql-8.0.20-linux-glibc2.12-x86_64 mysql-8.0.20
ls
```

同样可以实现效果！！！

成功的话你可以看到：

![image-20230613111045052](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613111045052.png)

- 这时候我们重新进到重命名后的文件夹内：

```shell
cd mysql-8.0.20
```

创建用户组和用户：

```shell
groupadd mysql
useradd -g mysql mysql
```

修改目录权限/授予用户权限：

```shell
ll
chown -R mysql.mysql /usr/local/mysql/mysql-8.0.20
ll
```

如果成功，你可以看到下面的执行效果：

![image-20230613111639202](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613111639202.png)

- 接着进入到bin文件夹内，初始化数据库，并且记录咱们的初始密码（红线画起来的那部分）：

```shell
cd bin
./mysqld --user=mysql --basedir=/usr/local/mysql/mysql-8.0.20 --datadir=/usr/local/mysql/mysql-8.0.20/data/ --initialize
```

![image-20230613112145291](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613112145291.png)

- 修改配置文件：

```shell
vim /etc/my.cnf
```

进入到里面后，有可能是一片空白，也有可能是已经存在了内容，有内容你就注释掉就行了，然后把下面的东西复制粘贴进去，保存并退出（上面已经教过基础的vim使用了，之后不再复述）：

```ini
[mysqld]
    basedir = /usr/local/mysql/mysql-8.0.20
    datadir = /usr/local/mysql/mysql-8.0.20/data
    socket = /usr/local/mysql/mysql-8.0.20/mysql.sock
    character-set-server=utf8
    port = 3306
   sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
 [client]
   socket = /usr/local/mysql/mysql-8.0.20/mysql.sock
   default-character-set=utf8
```

![image-20230613114108759](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613114108759.png)

- 创建服务和授权，并且检查是否生效：

```shell
cp -a /usr/local/mysql/mysql-8.0.20/support-files/mysql.server /etc/init.d/mysqld
chmod +x /etc/rc.d/init.d/mysqld
chkconfig --add mysqld
chkconfig  --list mysqld
```

![image-20230613114936244](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613114936244.png)

- 配置全局环境变量：

```shell
vim /etc/profile
```

在最下面添加如下内容（老规矩依旧使用vim编辑器）：

```c
export PATH=$PATH:/usr/local/mysql/mysql-8.0.20/bin:/usr/local/mysql/mysql-8.0.20/lib
```

![image-20230613115431365](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613115431365.png)

更新配置使其立即生效：

```shell
source /etc/profile
```

- 启动MySQL服务，并且查看其状态（输入第二条命令后，你需要按Ctrl+C来退出那个状态，才能恢复到图片所示的状态【出现光标】）：

```shell
service mysql start
service mysql status
```

![image-20230613120006441](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613120006441.png)

- 最后我们要修改咱们的数据库密码为自己的密码，你可以重新打开一个窗口，或者继续此窗口进行：

```shell
mysql -uroot -p
```

![image-20230613120445463](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613120445463.png)

此处需要键入咱们上面保存的密码，直接复制粘贴就行（注意，他是不显示的，你粘贴后直接回车即可），如果成功，你可以看到如下页面：

![image-20230613120601708](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613120601708.png)

然后进行修改密码，密码自填：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你自己的密码';
```

![image-20230613120755454](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613120755454.png)

- 设置远程链接：

```sql
use mysql;
update user set host='%' where user='root' limit 1;
flush privileges;
```

![image-20230613121044743](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613121044743.png)

- 进行远程链接测试（这里我使用了Navicat进行数据库的远程链接）：

<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613121556674.png" alt="image-20230613121556674" style="zoom:50%;" />

至此，你已经完成了在服务器上部署MySQL。

### 安装Redis：

老规矩，也提供两种方案。。。

#### 依赖：

- 无论使用哪种方案，你都要安装GCC编译器

```shell
cd /
yum install gcc-c++
y #出现提示后
```

![image-20230613133629128](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613133629128.png)

#### 方案一：直接下载

pass（后续补）

#### 方案二：本地上传后安装

- 官方下载途径：[Redis官方下载途径](https://download.redis.io/releases/?_gl=1*18yoxf2*_ga*MTUyNjUwNTY4LjE2ODY2MzA2ODU.*_ga_8BKGRQKRPV*MTY4NjYzMDY4NS4xLjEuMTY4NjYzMTgxNC40OC4wLjA.)

  选择你项目的要用到的Redis安装包，进行下载（此处以redis-3.0.5.tar.gz为例）

- 创建一个文件夹：

```shell
mkdir /usr/local/redis
```

把下载好的压缩包放过去：

<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613125734557.png" alt="image-20230613125734557" style="zoom:80%;" />

解压：

```shell
tar -xvf redis-3.0.5.tar.gz
```

![image-20230613125949480](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613125949480.png)

- 进入解压后的文件夹内，执行编译

```shell
cd /usr/local/redis/redis-3.0.5
make
```

![image-20230613134553816](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613134553816.png)

安装（此处指定了安装路径，之前的`/usr/local/redis/redis-3.0.5`是安装目录，而这里的`/usr/local/redis-3.0.5`是Redis的命令目录，你也可考虑把他们放在一起→`/usr/local/redis/`，没有什么关系）：

```shell
make install PREFIX=/usr/local/redis-3.0.5
```

![image-20230613135014073](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613135014073.png)

- 配置Redis，从编译后的文件中复制配置文件到我们安装的Redis配置中：

  ```shell
  cd /usr/local/redis-3.0.5/bin/
  mkdir conf
  cp /usr/local/redis/redis-3.0.5/redis.conf /usr/local/redis-3.0.5/bin/conf/
  cd conf/
  ll
  ```

  ![image-20230613135504250](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613135504250.png)

- 测试连接，进入到bin，使用配置文件运行Redis：

  ```shell
  cd /usr/local/redis-3.0.5/bin/
  ./redis-server conf/redis.conf
  ```

  ![image-20230613140208934](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613140208934.png)

  此时新建一个窗口，执行下面命令进行测试，先进入到Redis的命令目录，启动客户端连接服务器：并指定端口6379，出现图片所示内容即算成功：

  ```shell
  cd /usr/local/redis-3.0.5/bin/
  ./redis-cli -p  6379
  ping
  ```

  ![image-20230613140419273](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613140419273.png)

  停止Redis服务，并且断开连接，这时返回第一个窗口（开启Redis的那个窗口），检查Redis是否已经退出（贴心的byebye）：

  ```shell
  shutdown
  exit
  ```

  ![image-20230613140647544](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613140647544.png)

  ![image-20230613140853620](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613140853620.png)

- 配置Redis为后台启动（vim操作），找到`daemonize no`改为`daemonize yes`，保存退出即可：

  ```shell
  vim /usr/local/redis-3.0.5/bin/conf/redis.conf
  ```

  ![image-20230613142121476](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613142121476.png)

  再次进行测试：

  ```shell
  cd /usr/local/redis-3.0.5/bin/
  ./redis-server conf/redis.conf
  ```

  ![image-20230613142442349](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613142442349.png)

  发现不再出现Redis的经典图标，检查Redis服务进程：

  ```shell
  ps -ef | grep redis
  ```

  ![image-20230613142614308](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613142614308.png)

  成功！再测试连接：

  ```shell
  cd /usr/local/redis-3.0.5/bin/
  ./redis-cli -p 6379
  ```

  ![image-20230613143136601](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613143136601.png)

- 关闭Redis服务

  - 方法一：

    连接上去使用`shutdwon`后再`exit`退出

    ```shell
    cd /usr/local/redis-3.0.5/bin/
    ./redis-cli -p 6379
    shutdown
    exit
    ```

  - 方法二：

    直接杀掉进程

    ```shell
    pkill redis
    ```

- 检查Redis是否已经关闭：

  ```shell
  pkill redis
  ps -ef | grep redis
  ```

  ![image-20230613143623772](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613143623772.png)

至此，你已经完成了Redis的安装和启用！！！

### 安装Tomcat：

#### 方案一：直接下载

pass（后续补）

#### 方案二：本地上传后安装

- 官方下载途径：[Apache Tomcat® - Welcome!](https://tomcat.apache.org/)

  调查好你用的版本，去下载linux系统下的安装包！下面是一个通用的找版本教程（教程采用9.0.71，下面部署教程采用10.1.8）：

  <img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613152118330.png" alt="image-20230613152118330" style="zoom:80%;" />

  <img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613152250101.png" alt="image-20230613152250101" style="zoom:80%;" />

  <img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613152227085.png" alt="image-20230613152227085" style="zoom:80%;" />

  ![image-20230613152322689](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613152322689.png)

  <img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613152423798.png" alt="image-20230613152423798" style="zoom:80%;" />

- 新建tomcat文件夹，把包上传进去：

  ```shell
  mkdir /usr/local/tomcat
  cd /usr/local/tomcat
  ```

  <img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613152759382.png" alt="image-20230613152759382" style="zoom:80%;" />

  输入ls确认是否上传成功：

  ```shell
  ls
  ```

  ![image-20230613152903122](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613152903122.png)

- 解压，查看解压情况：

  ```shell
  tar -zxvf apache-tomcat-9.0.71.tar.gz
  ls
  ```

  ![image-20230613160458815](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613160458815.png)

- 进入到目录的bin下，运行Tomcat

  ```shell
  cd apache-tomcat-9.0.71/bin
  ./startup.sh
  ```

  ![image-20230613162344225](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613162344225.png)

  查看进程：

  ```shell
  ps -ef | grep tomcat
  ```

  ![image-20230613162509251](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613162509251.png)

  公网测试链接：

  找到你的服务器公网IP，加上端口号，进浏览器测试（如果访问被拒，请前去安全组开放8080端口），如果成功，你可以看到那个经典的页面：

  ```
  你的服务器公网IP地址:8080
  ```

  ![image-20230613162800400](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613162800400.png)

- 关闭tomcat，你同样要先进入到tomcat的bin文件夹下，才能执行下面的命令关闭服务器，关闭后你可以查看进程确定是否成功：

  ```shell
  ./shutdown.sh
  ps -ef | grep tomcat
  ```

  ![image-20230613163250684](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613163250684.png)

至此，你已经完成了服务器上部署Tomcat的所有操作！

### 安装Nginx：

Nginx我们提供两套安装方法，您可以自由选择。。。

#### 依赖：

无论你选择哪一套，前两个依赖你都要进行下载，之后的依赖你可以选择添加，但是建议你都装上

- gcc-c++：请移步Redis依赖一栏查看步骤。

- pcre：为nginx解析http中正则表达式提供依赖

  ```shell
  yum install -y pcre pcre-devel
  ```

- zlib：为nginx压缩数据提供依赖

  ```shell
  yum install -y zlib zlib-devel
  ```

- openssl：加密数据传输链路，在数据传输时起安全保护校验作用

  ```shell
  yum install -y openssl openssl-devel
  ```

#### 方案一：直接下载

pass（后续补）

#### 方案二：本地上传后安装

- 创建文件夹存放nginx的包：

```shell
mkdir /usr/local/nginx
```

- 官网下载Linux系统最新版本的nginx包：[nginx: download](https://nginx.org/en/download.html)
  - Mainline version：Mainline 是 Nginx 目前主力在做的版本，可以说是开发版
  - Stable version：最新稳定版，生产环境上建议使用的版本
  - Legacy versions：遗留的老版本的稳定版

我们选择Stable version的linux版本进行下载！

<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613190541209.png" alt="image-20230613190541209" style="zoom:80%;" />

下完后，上传到服务器！<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613190656296.png" alt="image-20230613190656296" style="zoom:80%;" />

查看上传是否成功：

```shell
cd /usr/local/nginx
ls
```

![image-20230613190844305](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613190844305.png)

- 解压安装，查看安装是否成功：

  ```shell
  tar -zxvf nginx-1.24.0.tar.gz
  ls
  ```

  ![image-20230613191101977](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613191101977.png)

- 进入到解压后的文件夹内，配置文件，编译安装（这里我们就不像Redis那样指定其他路径了，我们直接也存在nginx内）：

  ```shell
  cd /usr/local/nginx/nginx-1.24.0
  ./configure --prefix=/usr/local/nginx
  make
  make install
  ```

- 配置Nginx文件，你可以修改listen（监听端口号，如果端口冲突请修改这个，**同时记得去服务器安全组中开放你修改后的端口号**），server_name（目标请求地址，你可以就这样，也可以填自己公网IP），我这里两者都不修改：

  ```shell
  vim /usr/local/nginx/nginx-1.24.0/conf/nginx.conf
  ```

  <img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613193028256.png" alt="image-20230613193028256" style="zoom:80%;" />

- 运行nginx，先进入sbin文件夹内再执行运行命令，检查是否已经启动：

  ```shell
  cd  /usr/local/nginx/sbin
  ./nginx
  ps -ef | grep nginx
  ```

  ![image-20230613193825476](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613193825476.png)

  连接你服务器公网IP，测试是否成功，如果出现图片中的内容，即为成功部署！：

  ```shell
  服务器公网IP地址:端口号	###如果你端口号（listen）没有修改，那么默认时80端口，80端口不需要手动加':端口号'，直接输入服务器公网IP地址访问即可
  ```

  <img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230613194053460.png" alt="image-20230613194053460" style="zoom:80%;" />

- 关闭nginx，先进入sbin文件夹内才能执行下面的命令：

  ```shell
  ./nginx -s stop		###非正常退出，相当于杀进程
  ./nginx -s quit		###正常退出
  ./nginx -s reload	###重新加载配置文件，即加载上面的Makefile
  ```

至此，Nginx的在服务器上的部署已经全部完成！！

#### 附加（SSL模块）

如果你的项目需要使用到SSL数字证书，你还需要安装SSL模块：

①进入到到nginx目录下：

```shell
cd /usr/local/nginx
```

然后查看你的版本号：

```shell
/usr/local/nginx/sbin/nginx -V
```

记住V是大写，查看configure arguments:后边有没有值，如果有，就复制下来。

②配置SSL模块：

在nginx目录下，输入：

```shell
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --原来有的模块（如果有的话）
```

③如果有报错（没有就跳过），例如：

![2096758-20220107091106228-208312620.png](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/2096758-20220107091106228-208312620.png)

那就按照报错提醒去找问题，例子这里就要去下载OpenSSL库：

```shell
yum -y install openssl openssl-devel
```

④如果②没有问题，那么配置运行完毕后，运行make（切记不要输入make install，此举会覆盖安装，我们只需要增量安装），等待运行完毕，接着↓

- 小心行事就先备份（如果你完全安装上面步骤，可以不用改变地址）：

  ```shell
  cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak
  ```

- 大胆行事直接开始安装：

  首先先暂停nginx服务

  ```shell
  ./usr/local/nginx/sbin/nginx -s stop
  ```

  开始安装（切记我们此时在nginx目录下）

  ```shell
  cp ./objs/nginx /usr/local/nginx/sbin/
  ```

  查看是否成功

  ```shell
  /usr/local/nginx/sbin/nginx -V
  ```

  如果成功，你会看到：`configure arguments: --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module`

自此，SSL模块安装完毕，你可以重新启动你的nginx愉快的丸耍了！awa

## 项目部署

### 技术栈：

前端：fantastic-admin框架（VUE3 + Vite + Pinia + Element plus）

后端：Spring boot + Mybatis Plus + Redis + MySQL

### 服务器配置：

服务器上主要配置两个，一个是nginx的配置，一个是Tomcat的配置，并且开放相应的防火墙端口即可

#### 域名和SSL数字证书：

我们假设服务器ip地址为`192.168.1.1`，同时为了正式一点，我为我的网站添加了域名和SSL数字证书保护。

切记，如果你服务器在大陆，你解析域名到服务器上必须要备案（不想麻烦就找个香港的服务器）

##### 域名

这里我们假设一个域名为morning.top，我们的项目部署在二级域名test.morning.top下

##### SSL数字证书

你可以在此（阿里云）申请一个免费的数字证书：[数字证书管理服务管理控制台 - SSL 证书 (aliyun.com)](https://yundun.console.aliyun.com/?p=cas&domainName=morningmaple.top&from=DOMAIN#/certExtend/free/cn-hangzhou)

阿里一年可以免费获取20个证书，填写你的部署的域名（免费的只能填一个，花钱的可以使用通配符[例如：`*.morning.top`]绑定主域名下所有的域名），我们选择项目部署的域名test.morning.top，填写信息后，等他审批完毕，然后点击下载（选择nginx类型的）：

<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230913000141037.png" alt="image-20230913000141037" style="zoom:50%;" />

<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230913000223640.png" alt="image-20230913000223640" style="zoom:50%;" />

<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230913000357956.png" alt="image-20230913000357956" style="zoom:50%;" />

下载完毕后，你会得到一个压缩包，本地解压，里面有两个文件，一个是key结尾的，一个是pem结尾的，为了偷懒，我们他们重命名为ssl.key，ssl.pem，然后在nginx目录下，创建一个新的文件夹cert，并且把这两个文件放入文件夹下即可。

### 前端项目部署：

不教项目打包，默认vue项目打包好后，所有内容会被打包生成在dist文件夹下！！！我们把这个文件夹下的内容放到一个新的文件夹下，自己起名字，我这里取price，如此前端就已经准备好了。

我们把项目部署在nginx下，在nginx下，你可以看到一个文件夹叫做html，进入里面：

```shell
cd /usr/local/nginx/html
```

然后直接把price这个文件夹部署到html下，至此，前端项目打包完毕。

### 后端项目部署：

后端我们采用war包的形式，并且使用maven来进行，打war包前要做到三点：

​	①pom排除自带的tomcat，并且引入servelt-api依赖，设置打包方式为war

<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230912234127477.png" alt="image-20230912234127477" style="zoom:50%;" />

```xml
<!--打包时候排除自带的tomcat-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
</dependency>
```

​	②前后端不做跨域处理（如果你做了也没关系，在下面配置nginx的时候不配置代理就行`这是一个坑，后续想起来就填`）

​	③启动类（什么什么Application的，位置在src/main/java/包名）要继承SpringBootServletInitializer，为了能让tomcat在war包下找到启动的入口：

```java
//你之前的启动类：
public class ABCApplication {

    public static void main(String[] args) {
        System.out.println("------starting！！！------");
        SpringApplication.run(ABCApplication.class, args);
        System.out.println("------success start------");
    }
}

//要修改成这样：
public class ABCApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        System.out.println("------starting！！！------");
        SpringApplication.run(ABCApplication.class, args);
        System.out.println("------success start------");
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder applicationBuilder) {
        return applicationBuilder.sources(ABCApplication.class);
    }
}
```

检查完上面三点后，你就可以使用maven进行打包（在maven生命周期下先点击clean，再点击package，或者使用maven命令[IDEA下右键你的项目名（通常是最外层的那个），点击`Open Terminal at the Current Maven Module Path`后，再在控制台输入`maven clean package`，无论哪种，最后结果都一样）

<img src="https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/all/image-20230912233544317.png" alt="image-20230912233544317" style="zoom:50%;" />

最后你会获取到一个war包（一个叫：项目名字-XXXXXX-XXX.war，这个才是我们要的，别搞错；另一个是：项目名字-XXXXXX-XXX.war.origin），把war包放到tomcat目录（你看到有个bin的文件夹就是tomcat目录下了，如果你按照上面的步骤，路径就是/usr/local/tomcat/apache-tomcat-10.1.8/）下的webapps下，不需要做其他处理。

至此，后端项目打包完成。

### 配置nginx：

==注意，非常推荐你的tomcat版本和idea自带的版本一致，以避免玄学问题或是其他兼容性问题！！！==

※为了精简，我们统一把==`/usr/local/nginx`==作为nginx的目录，下面提及nginx目录都是这个路径

在nginx目录下，进入conf文件夹，打开nginx.conf文件（你可以使用vim进行编辑，或者你有类似于FlashFXP的文件传输软件可以直接以其他格式打开也可以）

①是采用SSL证书的配置（你需要配置SSL模块，上面有），②是不采用的配置

①如果你配置了SSL证书，你的nginx需要这样写：

首先找到http下的server块，把他修改成这样（注意####在复制的时候去掉）：

```
server {
    listen 443 ssl;
    server_name  test.morning.top（写你证书绑定的域名）;
    ssl_certificate /usr/local/nginx/cert/ssl.pem;		####你的pem文件存放地点
    ssl_certificate_key /usr/local/nginx/cert/ssl.key;	####你的key文件存放地点

	#下面是老套路，直接套用就行
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

	#这里的意思是，当你访问服务器的时候（也就是：https://test.morning.top/），会使用什么资源
	#我这里配置的是使用html文件下，price的资源（也就是我们前端的资源）
    location / {
        root   html/price;
        index  index.html;
    }

	#这里配置后端请求的路径（也就是https://test.morning.top/api/），前端发送请求都会带有一个标识，也就是我们这里的api
	#nginx会识别并且拦截他，然后代理到我们tomcat服务（也就是后端）的端口上（tomcat默认端口为8000）
    location /api/ {
    	#前四个直接复制粘贴，套路
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #这里是指定代理到哪里去，我们写上路径+我们的项目名字即可
        #proxy_pass  https://服务器ip地址:tomcat的端口号/项目地址/;
        proxy_pass  https://test.morning.top:8000/priceManage/;
    }

	#下面是默认配置，不管
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

然后，你需要再加多一个server块，加在上面的server下面，用于把请求去http的请求重定向至https中去：

```
server {
        listen 80;
        server_name test.morning.top;	####你的SSL绑定的域名
        rewrite ^(.*)$ https://$host$1;
    }
```

然后重启nginx即可完成配置！

※坑：如果你是国内的服务器，你必须先域名备案，否则无法重定向至https，会显示服务器拒绝连接

==让我们来捋一遍流程：==

==首先你输入域名，默认会访问的是==`http://你的域名/`==，（端口80和443都是隐藏的，实际上它是==`http://你的域名/:80`==，或者是==`https://你的域名:443/`==），然后nginx会把你重定向至443，也就是我们的==`https://你的域名/`==，这样，当你访问域名的时候，你就会被重定向至==`https://你的域名/`

==后端请求中，你的请求格式是这样的：==`https://你的域名/api/A`==，记住，此时你是在当前端口（80/443）发送的请求，他会默认寻找==`https://你的域名/api/`==下的接口A，但是我们后端实际上在==`https://你的域名:8000/你的项目名字`==下，因此，你需要把host后带着api的请求统统代理到8000的端口上，这样你才能访问到后端的资源。==

②我不要SSL，直接IP或者域名访问！

那你就这样写，和SSL配置大差不差（如果你配置了ssl，重启nginx发现报错，大致意思是说不支持ssl，那么就是你的nginx没有安装SSL模块，上面自己安装去）：

```
server {
    listen 80;
    server_name  test.morning.top（域名/IP地址/localhost）;

	#这里的意思是，当你访问服务器的时候（也就是：http://test.morning.top/），会使用什么资源
	#我这里配置的是使用html文件下，price的资源（也就是我们前端的资源）
    location / {
        root   html/price;
        index  index.html;
    }

	#这里配置后端请求的路径（也就是https://test.morning.top/api/），前端发送请求都会带有一个标识，也就是我们这里的api
	#nginx会识别并且拦截他，然后代理到我们tomcat服务（也就是后端）的端口上（tomcat默认端口为8000）
    location /api/ {
    	#前四个直接复制粘贴，套路
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #这里是指定代理到哪里去，我们写上路径+我们的项目名字即可
        #proxy_pass  http://服务器ip地址:tomcat的端口号/项目地址/;
        proxy_pass  http://test.morning.top:8000/priceManage/;
    }

	#下面是默认配置，不管
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

至此，nginx的部署已经完毕！

### 配置tomcat（改端口用）

==如果你不需要改端口，默认使用8000端口，那么你没必要看下面的东西，你的服务器理论上已经部署完毕==

※老规矩，我们把tomcat有bin文件夹称呼为你的tomcat目录（其实就是tomcat目录），如果你按上面做的话，根目录是：

```
/usr/local/tomcat/apache-tomcat-10.1.8/
```

进入根目录，找到conf文件夹，点进去，找到server.xml文件，编辑：

在68行上下，你可以看到一段这样的代码，你只需要改动8000，即可改动tomcat的端口号，改动后需要重启tomcat服务：

```xml
<Connector port="8000" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443"
               maxParameterCount="1000"
               />
```

## 后记

记录写于23年9月13日，发布到Blog的时候已经是25.12.22了，途中迭代了很多东西，比如springboot都全面拥抱3代了（文章写的的时候还是用的sp2.jpg），IDEA啥的也更加智能了，待有时间可以再缝缝补补一些吧~