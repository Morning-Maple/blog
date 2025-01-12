---
hide: false
order: 0
---

# Windows定时关机任务

### 目的

在一定时间后，让电脑自己关机

### 实现

点击 Win键+R 打开运行窗口，在输入框内输入下面的代码并执行：

```shell
shutdown -s -t 9000
```

其中```9000```为时间，单位为秒；此项代码会为计算机注册一个9000秒后关机的任务，当你成功运行后，右下角会有如下内容显示：

![image](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/2954941-20231212122832760-1809243735.png)

当然你也可以取消掉这个任务，同样唤起运行窗口，输入：

```shell
shutdown -a
```

完成后，右下角同样会有相应的提示：

![image](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/2954941-20231212122940354-134032229.png)
