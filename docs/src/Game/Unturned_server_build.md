---
hide: false
order: 0
---

# Unturned服务器的搭建

### 前言

基于Steam版本进行搭建，对于文件你可以都用记事本或者vscode打开，由于是搬运之前的帖子，所以下面都用记事本了，懒得改~

### 创建本地服务器

① 首先先下载Unturned Dedicated Server，在软件工具一列，你需要手动勾选后才能看到

![image](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/2954941-20240303011031915-1475389249.png)![image](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/2954941-20240303011017913-2087122424.png)

② 下载好后，右键，管理，浏览本地文件，这时候你会打开一个U3DS文件夹

③ 下拉，找到Unturned.exe，右键，创建快捷方式

④ 右键刚刚创建的快捷方式，点击属性，在目标后输入一个空格，然后复制：-batchmode -nographics +Secureserver/服务器名字

其中，服务器名字可以自己随便起，比如：-batchmode -nographics +Secureserver/umr，最后点击应用，确定

![image](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/2954941-20240303011128312-300652968.png)

⑤ 双击快捷方式，等待命令行最下面出现Loading level:100%即可执行：`save`，然后`shutdown`

##### 特殊情况：

在第五步下，有可能会出现下面的情景：

![image](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/2954941-20240303011707723-1669697600.png)

① 先输入：`shutdown`关闭服务器

② 配置Token，进入下面的网址：[Steam 游戏服务器帐户管理](https://steamcommunity.com/dev/managegameservers)，并且进行登录

③ 在最下面，你会看到一个：`创建一个新的游戏服务器账户`，在基础游戏的APP ID上输入：304930，备忘录可以随意，接着点击创建即可。

④ 成功后，你会看到一个登录令牌，复制他，进入到U3DS->Server->你的服务器名字->Config.json，以记事本打开，里面找到Login_Token，把登录令牌复制到它的双引号里面，保存并关闭即可解决。

#### 服务器配置：

① 关闭服务器后，进入到U3DS->Server->你的服务器名字->Server->Commands.dat，用记事本打开，复制下面内容并且进行修改放入文件中并且进行保存（中括号不用加，关于Loadout内的内容，实测下来有些就是不生效，暂时无解），重点关注==端口==：

```markdown
Name [服务器名称]
password [服务器密码]
Map [服务器地图]
Maxplayers 8 [最大玩家数量]
Mode [服务器难度 Easy/Normal/hard]
PVE [是否启用PVP PVP/PVE]
Cheats [作弊是否开启 ON/OFF]
Port [端口]
Perspective both [first/仅限第一人称 third/仅限第三人称 both/任意 vehicle/载具第三人称，其他第一人称]
Loadout [出生自带物品 ID，需要前面加个255，若有多个，请用 / 分割]
Welcome [欢迎语]
```

配置示例（这里配置了一包军粮和一瓶矿泉水，都是原版的，可以直接套）：

```markdown
Name MORNING
password 123
Map Russia
Maxplayers 8
Mode hard
PVE
Cheats OFF
Port 25565
Perspective both
Loadout 255/81/14
Welcome 咕咕咕
```

② 如此一来就配置好了，只需要点击上面设置的快捷方式，即可开启服务器了，如果你需要联机，继续往下看

### 隧道的创建：

采用樱花映射进行，Unturned不同Minecraft，他需要占用两个端口，因此需要两条隧道

#### 隧道1：

① 隧道区域随便选，区域的隧道实例越少，用的人越少，玩的时候越不容易卡顿和掉线（实在受不了就花10r买一个月VIP）

② 选`UDP`隧道

③ 本地IP填`127.0.0.1`

④ 本地端口：填上面配置文件中写的端口号，这里我们假设是12345

⑤ 远程端口：自己随便写一个，符合要求就行，这里我们假设是30123

![image](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/2954941-20240303012038902-706673561.png)

#### 隧道2：

①②③步骤同隧道一，④和⑤步骤需要进行修改：

④ 本地端口：隧道1的本地端口号+1，如果按照隧道1的假设，那么这里就填12346

⑤ 远程端口：隧道1的远程端口号+1，照隧道1的假设，那么这里就填30124

#### 注意事项

有时候端口1的远程端口号可用，隧道2的不可用，自己找俩个能用的分配一下就OK了，小问题

### 添加MOD内容（地图/模组）：

* 如果配置不生效，请把同等级的`WorkershopDownloadConfig.json~`删掉，别删错了！！

① 进入Steam->Unturned->创意工坊，找到你要加的mod，记住左上角url后面的数字

② 进入到下面的路径：U3DS->Server->你的服务器名字->Server，用记事本打开`WorkershopDownloadConfig.json`

③ 找到配置：File_IDs，在[]内添加你要的mod，比如：[23232,3021548]，多个mod之间需要加英文逗号区分开

④ 如果你加的是地图，** >请不要忘了在你的Map中修改对应的名字 <**和在File_IDs内添加对应的asset资源mod！

#### 举个栗子：

① 我要玩中国南方，先去steam创意工坊找到相关内容，进去，记住URL后面的数字ID

![image](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/2954941-20240303013116739-1451022495.png)

② 别忘记了它有相对于的asset包mod，同样点进去，获取他们URL后面的数字ID

![image](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/2954941-20240303013134360-1393473227.png)

③ 最后，前往U3DS->Server->你的服务器名字->Server，用记事本打开WorkershopDownloadConfig.json，填入他们即可

![image](https://cdn.jsdmirror.com/gh/Morning-Maple/blog_img/2025_01/2954941-20240303012806684-644567591.png)

④ 重新启动你的服务器，等待资源文件下载，好了就会启动了，就酱！

### 修改服务器参数：

死亡不掉落，载具加快刷新，别急，统统有~

配置路径：

新：`U3DS->Server->你的服务器名字->Server->Config.txt`

旧：`U3DS->Server->你的服务器名字->Server->Config.json`

#### 新版服务器参数（txt）
* 由于版本迭代，文件不再用json格式，而改用txt来作为配置了，

* 注意，如果配置不生效，请把同等级下的`Config.txt~`删掉，别删错了！！

这里给到完整的参数翻译，可以自行参考，有一些不准确的纯靠字段翻译推测，大部分已验证过是可用的：

```text
// > Unturned Server Configuration File
// > 
// > Lines beginning with // are comments.
// > Comments beginning with > are auto-generated.
// > Any comments you write (without >) will be preserved.
// > 
// > Settings without a value use the default for the mode (easy/normal/hard).
// > For example, this setting would use the default:
// > 
// > Setting
// > 
// > Whereas this setting is overridden with value four:
// > 
// > Setting 4
// > 
// ================
// > Unturned 服务器配置文件
// > 
// > 以 // 开头的行是注释。
// > 以 > 开头的注释是自动生成的。
// > 您编写的任何注释（不带 >）都将被保留。
// > 
// > 没有值的设置将使用模式（简单/普通/困难）的默认值。
// > 例如，以下设置将使用默认值：
// > 
// > Setting 4
// > 
// > 而以下设置将被值 4 覆盖：
// > 
// > Setting 4
// > 
Version 1

// 所有的修改直接在相关字段后面加值就行，例如：
// Icon
// 如果你想设置Icon的值，就这样写：
// Icon https://www.baidu.com
// 不要删掉前面的字段！！！
// ================2026.5.28================
// 文档所有的翻译按照以下顺序排布，AI翻译+人工校验：
// 
// 英文注释
// 中文注释【这里是个人备注，非英文翻译内容】
// 字段
// 
// 对于过长行的翻译，中英文翻译之间将加入16个=来作为隔离
// ================
// 
// 对于有多个难度的配置，则按服务器难度，也就是Commands.dat中配置的难度，来选取默认值，或者自己赋值来覆盖

// 服务器在大厅中的配置
Browser
{
	// > URL of a 64x64 image shown in the upper-left of the server lobby menu.
	// 显示在服务器大厅菜单左上角的 64x64 像素图像的 URL。
	Icon

	// > URL of a 32x32 image shown in the server list.
	// 显示在服务器列表中的 32x32 像素图像的 URL。
	Thumbnail

	// > Short description underneath the server name in the server lobby menu.
	// 服务器大厅菜单中服务器名称下方的简短描述。
	Desc_Hint

	// > Long description in the lower-right of the server lobby menu.
	// 服务器大厅菜单右下角的详细描述。
	Desc_Full

	// > Short description underneath the server name in the server list.
	// 服务器列表中服务器名称下方的简短描述。
	Desc_Server_List

	// > Documentation: https://docs.smartlydressedgames.com/en/stable/servers/game-server-login-tokens.html
	// > To generate a new token visit: https://steamcommunity.com/dev/managegameservers
	// 文档：https://docs.smartlydressedgames.com/en/stable/servers/game-server-login-tokens.html
	// 要生成新的令牌，请访问：https://steamcommunity.com/dev/managegameservers
	Login_Token

	// > IP address, DNS name, or a web address (to perform GET request) to advertise.
	// > 
	// > Servers not using Fake IP can specify just a DNS entry. This way if server's IP changes clients can rejoin.
	// > For example, if you own the "example.com" domain you could add an A record "myunturnedserver" pointing at
	// > your game server IP and set that record here "myunturnedserver.example.com".
	// > 
	// > Servers using Fake IP are assigned random ports at startup, but can implement a web API endpoint to return
	// > the IP and port. Clients perform a GET request if this string starts with http:// or https://. The returned
	// > text can be an IP address or DNS name with optional query port override. (e.g., "127.0.0.1:27015")
	// > 
	// > Documentation: https://docs.smartlydressedgames.com/en/stable/servers/bookmark-host.html
	// ================
	// 用于发布服务器信息的 IP 地址、DNS 名称或网址（用于执行 GET 请求）。
	//
	// 未使用 Fake IP 的服务器可以仅指定 DNS 条目。这样，即使服务器的 IP 地址发生变化，客户端也可以重新加入。
	// 例如，如果您拥有“example.com”域名，您可以添加一条 A 记录“myunturnedserver”，指向
	// 您的游戏服务器 IP 地址，并将该记录在此处设置为“myunturnedserver.example.com”。
	// 
	// 使用 Fake IP 的服务器在启动时会被分配随机端口，但可以实现一个 Web API 端点来返回
	// IP 地址和端口。如果该字符串以 http:// 或 https:// 开头，客户端将执行 GET 请求。返回的
	// 文本可以是 IP 地址或 DNS 名称，并可选择覆盖查询端口。（例如，“127.0.0.1:27015”）
	// 
	// > 文档：https://docs.smartlydressedgames.com/en/stable/servers/bookmark-host.html
	BookmarkHost

	// > If true, the server lobby warns that in-game ping may be higher than shown.
	// > Default: False
	// 设为true时，服务器大厅会警告游戏内延迟可能高于显示值。
	// 默认值：False
	Is_Using_Anycast_Proxy

	// > How the server is monetized (if at all).
	// > Options: Unspecified, Any, None, NonGameplay, Monetized
	// > Default: Unspecified
	// 服务器的盈利方式（如有）。
	// 可选：Unspecified（未指定）, Any（任意）, None（无）, NonGameplay（非游戏内）, Monetized（已盈利）
	// 默认值：未指定
	Monetization

	// > Buttons shown in the server lobby menu. For example:
	// > ` Links
	// > ` [
	// > `     {
	// > `         Message Visit our website!
	// > `         URL https://smartlydressedgames.com/
	// > `     }
	// > ` ]
	// ================
	// 服务器大厅菜单中显示的按钮，例如：
	// 链接
	// [
	//		{
	//			Message Visit our website!
	//			URL https://smartlydressedgames.com/
	//		}
	// ]
	Links
}

// 服务器配置
Server
{
	// > Whether to enable Valve Anti-Cheat.
	// > Default: True
	// 是否启用 Valve 反作弊系统。
	// 默认值：True
	VAC_Secure

	// > Whether to enable BattlEye Anti-Cheat.
	// > Default: True
	// 是否启用 BattlEye 反作弊系统。
	// 默认值：True
	BattlEye_Secure

	// > Players with a ping higher than this are kicked.
	// > Default: 750
	// 延迟高于此值的玩家将被踢出服务器。【单位是毫秒，1000毫秒=1秒】
	// 默认值：750
	Max_Ping_Milliseconds

	// > Players in the pre-join queue we haven't heard from in this past number of seconds are kicked.
	// > Default: 15
	// 预加入队列中超过此秒数未响应的玩家将被踢出服务器。【单位是秒】
	// 默认值：15
	Timeout_Queue_Seconds

	// > Players in the server we haven't heard from in this past number of seconds are kicked.
	// > Default: 30
	// 服务器中超过此秒数未响应的玩家将被踢出服务器。【单位是秒】
	// 30
	Timeout_Game_Seconds

	// > Default: 0
	// 默认值：0【按字段翻译是，每秒最大数据包数，这里默认为0应该是无限制，不确定】
	Max_Packets_Per_Second

	// > If ready-to-connect messages are received more than twice from the same client in less than this many
	// > seconds they will be kicked.
	// > Default: 40
	// 如果在小于此值的秒数内，从同一客户端收到超过两次的准备连接消息，
	// 连接将被断开。
	// 默认值：40【单位秒】
	Join_Rate_Limit_Window_Seconds

	// > If bad packets (that *may* be legitimate) are received more than threshold times within this many seconds
	// > of each other, reject the calling connection.
	// > Default: 2.5
	// 如果在小于此值的秒数内，收到超过阈值次数的恶意数据包（*可能*是合法的），
	// 则拒绝当前连接。
	// 默认值：2.5【单位秒】
	Bad_Packet_Rate_Limit_Window_Seconds

	// > If more than this many bad packets (that *may* be legitimate) are received within window seconds of each
	// > other, reject the calling connection.
	// > Default: 10
	// 如果在小于此值的窗口秒数内，收到超过此数量的恶意数据包（*可能*是合法的），
	// 则拒绝当前连接。
	// 默认值：10【单位秒】
	Bad_Packet_Rate_Limit_Threshold

	// > If a rate-limited method is called this many times within cooldown window the client will be kicked.
	// > For example a value of 1 means the client will be kicked the first time they call the method off-cooldown. (not recommended)
	// > Default: 10
	// 如果在冷却时间内调用限速方法的次数超过此阈值，客户端将被踢出。
	// 例如，值为 1 表示客户端在冷却时间结束后首次调用该方法时将被踢出。（不推荐）
	// 默认值：10
	Rate_Limit_Kick_Threshold

	// > Only applicable when Fake IP is off. When a client is connecting, if their connection would push the number
	// > of simultaneous connections from the same IP address past this number, they are prevented from joining.
	// > 
	// > May be useful to prevent against fake join requests coming from a single source IP. (public issue #5001)
	// > 
	// > Defaults to a high value because some regions will have many more clients with the same IPv4 address than
	// > others. For example, due to Carrier-grade NAT (CGNAT).
	// > Default: 64
	// ================
	// 仅在 Fake IP 关闭时适用。当客户端连接时，如果其连接会使
	// 来自同一 IP 地址的并发连接数超过此阈值，则阻止其加入。
	// 
	// 可用于防止来自单个源 IP 的虚假加入请求。（公开问题 #5001）
	// 
	// 默认值较高，因为某些地区使用相同 IPv4 地址的客户端数量会比其他地区多得多。
	// 例如，由于运营商级 NAT (CGNAT)。
	// 默认值：64
	Max_Clients_With_Same_IP_Address

	// > Whether rejections for Max_Clients_With_Same_IP_Address should log to command output. Useful for checking
	// > if the limit is appropriate.
	// > Default: True
	// 是否将 Max_Clients_With_Same_IP_Address 的拒绝记录到命令输出。用于检查
	// 此限制是否合适
	// 默认值：True
	Max_Clients_With_Same_IP_Address_Log_Warnings

	// > Ordinarily the server should be receiving multiple input packets per second from a client. If more than this
	// > amount of time passes between input packets we flag the client as potentially using a lag switch, and modify
	// > their stats (e.g. reduce player damage) for a corresponding duration.
	// 通常情况下，服务器应该每秒从客户端接收多个输入数据包。如果输入数据包之间的时间间隔超过此值
	// 我们会将该客户端标记为可能使用了延迟开关，并修改
	// 其属性（例如，降低玩家伤害）一段时间。
	// 默认值：3【单位秒】
	// > Default: 3
	Fake_Lag_Threshold_Seconds

	// > Whether fake lag detection should log to command output. False positives are relatively likely when client
	// > framerate hitches (e.g. loading dense region), so this is best used for tuning threshold rather than bans.
	// > Default: False
	// 是否将虚假延迟检测记录到命令输出。当客户端出现
	// 帧率波动（例如，加载密集区域）时，误报的可能性相对较高，因此最好将其用于调整阈值，而不是用于封禁。
	// 默认值：False
	Fake_Lag_Log_Warnings

	// > PvP damage multiplier while under fake lag penalty.
	// > Default: 0.1
	// 模拟延迟惩罚下的 PvP 伤害倍率。
	// 默认值：0.1
	Fake_Lag_Damage_Penalty_Multiplier

	// > Should we kick players after detecting spammed calls to askInput?
	// > Default: False
	// 检测到玩家滥用 askInput 后​​是否应踢出玩家？
	// 默认值：False
	Enable_Kick_Input_Spam

	// > Should we kick players if they do not submit inputs for a long time?
	// > Default: False
	// 如果玩家长时间未提交输入，是否应踢出玩家？【挂机？】
	// 默认值：False
	Enable_Kick_Input_Timeout

	// > Should the server automatically shutdown at a configured time?
	// > Default: False
	// 服务器是否应在设定的时间自动关闭？
	// 默认值：False
	Enable_Scheduled_Shutdown

	// > When the server should shutdown if Enable_Scheduled_Shutdown is true.
	// > Default: 1:30 am
	// 如果 Enable_Scheduled_Shutdown 为 true，则服务器应何时关闭。
	// 默认值：1:30 am【凌晨一点半】
	Scheduled_Shutdown_Time

	// > Broadcast "shutting down for scheduled maintenance" warnings at these intervals.
	// > Format is a list of hours:minutes:seconds, for example to warn only 5 seconds before:
	// > ` Scheduled_Shutdown_Warnings
	// > ` [
	// > `     00:00:05
	// > ` ]
	// > Default starts at 30 minutes and counts down.
	// ================
	// 按以下时间间隔广播“计划维护即将关闭”警告。
	// 格式为小时:分钟:秒，例如，仅提前 5 秒发出警告：
	// Scheduled_Shutdown_Warnings
	// [
	//		00:00:05
	// ]
	// 默认从 30 分钟开始倒计时。【[00:30:00]】
	Scheduled_Shutdown_Warnings

	// > Should the server automatically shutdown when a new version is detected?
	// > Default: False
	// 检测到新版本时服务器是否应自动关闭？
	// 默认值：False
	Enable_Update_Shutdown

	// > If Enable_Update_Shutdown is true, we check for updates to this branch of the game.
	// > (Unfortunately the server does not have a way to automatically determine the current beta branch.)
	// > Default: public
	// 如果Enable_Update_Shutdown为 true，我们会检查此游戏分支的更新。
	// （遗憾的是，服务器无法自动确定当前的测试分支。）
	// 默认值：public
	Update_Steam_Beta_Name

	// > Broadcast "shutting down for update" warnings at these intervals.
	// > Refer to Scheduled_Shutdown_Warnings for an explanation of the format.
	// > Default starts at 3 minutes and counts down.
	// 按以下时间间隔广播“正在关闭以进行更新”警告。
	// 有关格式说明，请参阅 Scheduled_Shutdown_Warnings。
	// 默认值从 3 分钟开始倒计时。
	Update_Shutdown_Warnings

	// > Should vanilla text chat messages always use rich text?
	// > Servers with plugins may want to enable because IMGUI does not fade out rich text.
	// > Kept because plugins might be setting this directly, but it no longer does anything.
	// > Default: False
	// 是否应始终使用富文本聊天消息？
	// 使用插件的服务器可能需要启用此选项，因为 IMGUI 不会淡出富文本。
	// 保留此选项是因为插件可能直接设置了它，但它现在不再起作用。
	// 默认值：False
	Chat_Always_Use_Rich_Text

	// > Should the EconInfo.json hash be checked by the server?
	// > Default: True
	// 服务器是否应该检查 EconInfo.json 的哈希值？
	// 默认值：True
	Validate_EconInfo_Hash

	// > Documentation: https://docs.smartlydressedgames.com/en/stable/servers/fake-ip.html
	// > Default: False
	// 文档：https://docs.smartlydressedgames.com/en/stable/servers/fake-ip.html
	// 默认值：False【设置是否使用Fake ip的】
	Use_FakeIP

	// > If greater than zero, vehicles with XZ position outside this threshold are saved in the center of the map.
	// > By default, vehicles outside ±40 km are teleported into the map.
	// > Intended to help with physics issues caused by vehicles far out in space. (public issue #4465)
	// > Default: 40000
	// 如果大于零，则 XZ 位置超出此阈值的车辆将被保存在地图中心。
	// 默认情况下，超出 ±40 公里范围的车辆将被传送到地图中。
	// 旨在帮助解决车辆在遥远太空中造成的物理问题。（公开问题 #4465）
	// 默认值：40000【单位看着是米】
	Reset_Vehicles_Outside_Horizontal_Distance
}

// Unity事件配置
UnityEvents
{
	// > Should ServerTextChatMessenger be allowed to broadcast?
	// > Default: False
	// 是否允许 ServerTextChatMessenger 进行广播？
	// 默认值：False
	Allow_Server_Messages

	// > Should ServerTextChatMessenger be allowed to execute commands?
	// > Default: False
	// 是否允许 ServerTextChatMessenger 执行命令？
	// 默认值：False
	Allow_Server_Commands

	// > Should ClientTextChatMessenger be allowed to broadcast?
	// > Default: False
	// 是否允许 ClientTextChatMessenger 进行广播？
	// 默认值：False
	Allow_Client_Messages

	// > Should ClientTextChatMessenger be allowed to execute commands?
	// > Default: False
	// 是否允许 ClientTextChatMessenger 执行命令？
	// 默认值：False
	Allow_Client_Commands
}

// 道具配置
Items
{
	// > Percentage [0 to 1] of item spawns to use.
	// > For example, if set to 0.2 and level has 100 item spawns, max 20 items will spawn at a time.
	// > Easy: 0.35    Normal: 0.35    Hard: 0.15
	// 物品生成百分比 [0 到 1]。
	// 例如，如果设置为 0.2，且关卡有 100 个物品生成点，则每次最多生成 20 个物品。
	// 简单：0.35 普通：0.35 困难：0.15
	Spawn_Chance

	// > How long (in seconds) before an item dropped by a player is despawned.
	// > Default: 600
	// 玩家掉落物品消失前的等待时间（以秒为单位）。
	// 默认值：600
	Despawn_Dropped_Time

	// > How long (in seconds) before a spawned item is despawned.
	// > (For example, an item nobody wants to pick up.)
	// > Default: 900
	// 已生成的物品消失前的等待时间（以秒为单位）。
	// （例如，无人想要拾取的物品。）
	// 默认值：900
	Despawn_Natural_Time

	// > When less than the target amount of items are dropped (determined by Spawn_Chance), a new
	// > item is spawned approximately this often (in seconds).
	// > Easy: 50    Normal: 100    Hard: 150
	// 当掉落物品的数量少于目标数量（由生成几率决定）时，新的物品
	// 将以大约此频率（以秒为单位）生成。
	// 简单：50 普通：100 困难：150
	Respawn_Time

	// > Percentage [0 to 1] probability of item spawning at max quality.
	// > Easy: 0.1    Normal: 0.1    Hard: 0.01
	// 物品以最高品质生成的概率（百分比 [0 到 1]）。
	// 简单：0.1 普通：0.1 困难：0.01
	Quality_Full_Chance

	// > When an item spawns without max quality, the random quality is scaled by this factor.
	// > For example, 0.5 halves the initial quality.
	// > Default: 1
	// 当物品生成时品质并非最高时，其随机品质会乘以该系数。
	// 例如，0.5 表示初始品质减半。
	// 默认值：1
	Quality_Multiplier

	// > Percentage [0 to 1] probability of gun spawning with full ammo.
	// > Easy: 0.1    Normal: 0.05    Hard: 0.025
	// 枪械生成时弹药满格的概率（百分比 [0 到 1]）。
	// 简单：0.1 普通：0.05 困难：0.025
	Gun_Bullets_Full_Chance

	// > When a gun spawns without full ammo, the random amount is scaled by this factor.
	// > Easy: 1    Normal: 0.25    Hard: 0.1
	// 当枪械生成时弹药未满时，其随机子弹数量会乘以该系数。
	// 简单：1 普通：0.25 困难：0.1
	Gun_Bullets_Multiplier

	// > Percentage [0 to 1] probability of magazines spawning with full ammo.
	// > Easy: 0.1    Normal: 0.05    Hard: 0.025
	// 弹匣满弹率（0 到 1）
	// 简单：0.1 普通：0.05 困难：0.025
	Magazine_Bullets_Full_Chance

	// > When a magazine spawns without full ammo, the random amount is scaled by this factor.
	// > Easy: 1    Normal: 0.5    Hard: 0.25
	// 当弹匣未满弹时，其随机弹药量将乘以该系数。
	// 简单：1 普通：0.5 困难：0.25
	Magazine_Bullets_Multiplier

	// > Percentage [0 to 1] probability of non-magazines spawning with full amount.
	// > (E.g., ammo boxes.)
	// > Easy: 0.1    Normal: 0.05    Hard: 0.025
	// 非弹匣物品满弹率（0 到 1）
	// （例如，弹药箱。）
	// 简单：0.1 普通：0.05 困难：0.025
	Crate_Bullets_Full_Chance

	// > When a non-magazine spawns without full amount, the random amount is scaled by this factor.
	// > (E.g., ammo boxes.)
	// > Easy: 1    Normal: 1    Hard: 0.75
	// 当非弹匣物品生成时，如果数量不足，则随机生成的子弹数量会按此系数缩放。
	// （例如，弹药箱。）
	// 简单：1 普通：1 困难：0.75
	Crate_Bullets_Multiplier

	// > Original option for disabling item quality. If false, items spawn at 100% quality and
	// > their quality doesn't decrease. For backwards compatibility, the newer per-item-type
	// > durability options are ignored if this is off.
	// > Easy: False    Normal: True    Hard: True
	// 禁用物品品质的原始选项。如果设置为 false，物品将以 100% 品质生成，并且
	// 其品质不会下降。为了向后兼容，如果此选项关闭，则会忽略较新的每种物品类型的
	// 耐久度选项。
	// 简单：false 普通：true 困难：true
	Has_Durability

	// > Food-specific replacement for Has_Durability. If true, food spawns at 100% quality.
	// > Easy: True    Normal: False    Hard: False
	// 食物专用的“耐久度”选项。如果设置为 true，食物将以 100% 品质生成。
	// 简单：True 普通：False 困难：False
	Food_Spawns_At_Full_Quality

	// > Water-specific replacement for Has_Durability. If true, water spawns at 100% quality.
	// > Easy: True    Normal: False    Hard: False
	// 水的专属属性，替代“耐久度”属性。如果为真，则水的生成品质为100%。
	// 简单：True 普通：False 困难：False
	Water_Spawns_At_Full_Quality

	// > Clothing-specific replacement for Has_Durability. If true, clothing spawns at 100% quality.
	// > Easy: True    Normal: False    Hard: False
	// 服装的专属属性，替代“耐久度”属性。如果为真，则服装的生成品质为100%。
	// 简单：True 普通：False 困难：False
	Clothing_Spawns_At_Full_Quality

	// > Weapon-specific replacement for Has_Durability. If true, weapons spawns at 100% quality.
	// > Easy: True    Normal: False    Hard: False
	// 武器的专属属性，替代“耐久度”属性。如果为真，则武器的生成品质为100%。
	// 简单：True 普通：False 困难：False
	Weapons_Spawn_At_Full_Quality

	// > Fallback used when spawning an item that doesn't fit into one of the other quality/durability settings.
	// > If true, items spawn at 100% quality.
	// > Easy: True    Normal: False    Hard: False
	// 当生成的物品不符合其他品质/耐久度设置时使用的备用属性。
	// 如果为true，物品生成时品质为 100%。
	// 简单：True 普通：False 困难：False
	Default_Spawns_At_Full_Quality

	// > Clothing-specific replacement for Has_Durability. If false, clothing quality
	// > doesn't decrease when damaged.
	// > Easy: False    Normal: True    Hard: True
	// 服装专属属性，替换 Has_Durability。如果为false，服装品质
	// 不会因损坏而降低。
	// 简单：False 普通：True 困难：True
	Clothing_Has_Durability

	// > Melee and gun replacement for Has_Durability. If false, weapons quality
	// > doesn't decrease when used.
	// > Easy: False    Normal: True    Hard: True
	// 近战武器和枪械专属属性，替换 Has_Durability。如果为false，武器品质
	// 不会因使用而降低。
	// 简单：False 普通：True 困难：True
	Weapons_Have_Durability
}

// 载具配置
Vehicles
{
	// > Seconds vehicle can be neglected before it begins taking damage.
	// > Default: 604800
	// 载具被忽视超过一定秒数后开始受到伤害。【闲置7天的车辆，也就是没玩家坐过的，七天后开始掉血】
	// 默认值：604800【7天】
	Decay_Time

	// > After vehicle has been neglected for more than Decay_Time seconds it will begin taking this much damage per second.
	// > Default: 0.1
	// 载具被忽视超过 Decay_Time 秒后，将开始每秒受到此数值的伤害。【闲置的车辆每秒掉血配置】
	// 默认值：0.1
	Decay_Damage_Per_Second

	// > Percentage [0 to 1] probability of spawning with a battery.
	// > Easy: 1    Normal: 0.8    Hard: 0.25
	// 载具生成时带有电池的概率（百分比 [0 到 1]）。
	// 简单：1 普通：0.8 困难：0.25
	Has_Battery_Chance

	// > Percentage [0 to 1] minimum initial charge if spawning with a battery.
	// > Easy: 0.8    Normal: 0.5    Hard: 0.1
	// 载具生成时带有电池的最低初始电量（百分比 [0 到 1]）。
	// 简单：0.8 普通：0.5 困难：0.1
	Min_Battery_Charge

	// > Percentage [0 to 1] maximum initial charge if spawning with a battery.
	// > Easy: 1    Normal: 0.75    Hard: 0.3
	// 载具生成时带有电池的最大初始电量（百分比 [0 到 1]）。
	// 简单：1 普通：0.75 困难：0.3
	Max_Battery_Charge

	// > Percentage [0 to 1] probability of spawning with a tire per-wheel.
	// > Easy: 1    Normal: 0.85    Hard: 0.7
	// 每个车轮生成时带有轮胎的概率（百分比 [0 到 1]）。
	// 简单：1 普通：0.85 困难：0.7
	Has_Tire_Chance

	// > How long (in seconds) after vehicle explodes or gets stuck underwater before it despawns.
	// > Default: 300
	// 车辆爆炸或被困水下后消失前的等待时间（秒）。【残骸消失时间】
	// 默认值：300
	Respawn_Time

	// > How long (in seconds) a locked vehicle can sit empty in the safezone before it is
	// > automatically unlocked.
	// > Default: 3600
	// 车辆在安全区空置一段时间后等待（秒）
	// 自动解锁。
	// 默认值：3600
	Unlocked_After_Seconds_In_Safezone

	// > Scales the amount of damage taken by vehicles.
	// > For example, 0.5 halves the amount of damage dealt to vehicles.
	// > Default: 1
	// 调整车辆受到的伤害量。
	// 例如，0.5 表示车辆受到的伤害减半。
	// 默认值：1
	Armor_Multiplier

	// > Scales damage to the vehicle when an attached barricade obstructions an explosion.
	// > For example, 0.5 halves the explosion damage when blocked by a barricade.
	// > Default: 1
	// 当附加路障阻挡爆炸时，车辆受到的伤害倍率。
	// 例如，0.5 表示路障阻挡爆炸时，爆炸伤害减半。
	// 默认值：1
	Child_Explosion_Armor_Multiplier

	// > Scales the amount of damage taken by vehicles from non-"Heavy Weapon" guns.
	// > For example, 2.0 doubles the amount of damage dealt to vehicles by non-"Heavy Weapon" guns.
	// > Default: 1
	// 表示车辆受到非“重型武器”武器伤害的倍率。
	// 例如，2.0 表示车辆受到非“重型武器”武器伤害的倍率翻倍。
	// 默认值：1
	Gun_Lowcal_Damage_Multiplier

	// > Scales the amount of damage taken by vehicles from "Heavy Weapon" guns.
	// > For example, 2.0 doubles the amount of damage dealt to vehicles by "Heavy Weapon" guns.
	// > Default: 1
	// 表示车辆受到“重型武器”武器伤害的倍率。
	// 例如，2.0 表示车辆受到“重型武器”武器伤害的倍率。
	// 默认值：1
	Gun_Highcal_Damage_Multiplier

	// > Scales the amount of damage taken by vehicles from melee weapons and fists.
	// > For example, 2.0 doubles the amount of damage dealt to vehicles by melee.
	// > Default: 1
	// 调整载具受到近战武器和拳头伤害的数值。
	// 例如，2.0 会使载具受到的近战伤害翻倍。
	// 默认值：1
	Melee_Damage_Multiplier

	// > Scales the amount of HP restored by melee items like the Blowtorch.
	// > For example, 2.0 doubles the amount of health restored by melee items.
	// > Default: 1
	// 调整近战物品（例如喷灯）恢复的生命值数值。
	// 例如，2.0 会使近战物品恢复的生命值翻倍。
	// 默认值：1
	Melee_Repair_Multiplier

	// > Maximum number of naturally-spawned vehicles on "Tiny" size levels.
	// > Default: 4
	// “微型”地图中自然生成的载具数量上限。
	// 默认值：4
	Max_Instances_Tiny

	// > Maximum number of naturally-spawned vehicles on "Small" size levels.
	// > Default: 8
	// “小型”地图中自然生成的载具数量上限。
	// 默认值：8
	Max_Instances_Small

	// > Maximum number of naturally-spawned vehicles on "Medium" size levels.
	// > Default: 16
	// “中等/基础”地图中自然生成的载具数量上限。
	// 默认值：16
	Max_Instances_Medium

	// > Maximum number of naturally-spawned vehicles on "Large" size levels.
	// > Default: 32
	// “大型”地图中自然生成的载具数量上限。
	// 默认值：32
	Max_Instances_Large

	// > Maximum number of naturally-spawned vehicles on "Insane" size levels.
	// > Default: 64
	// “疯狂/巨大型”地图中自然生成的载具数量上限。
	// 默认值：64
	Max_Instances_Insane

	// > Vehicles are considered "natural" if they were spawned by the level as opposed to players or vendors.
	// > If less than this many natural vehicles exist in the level, more will be spawned. The minimum of this or
	// > Max_Instances is used. (I.e., if this value is higher than max instances the max instances value is used
	// > instead.)
	// > Default: 16
	// 如果车辆是由关卡生成的，而不是由玩家或商人生成的，则被视为“自然生成的”。
	// 如果关卡中自然生成的车辆数量少于此值，则会生成更多车辆。取此值和
	// Max_Instances 中的较小值。 （即，如果此值大于最大实例数，则使用最大实例数的值
	// 代替。）
	// 默认值：16【人话，在地图载具上限内，载具少于这个数，就把载具数量增加到这个设定的数；比如上限32，但是游戏内只有8辆自然生成的载具，则立即生成多8辆载具】
	Min_Natural_Vehicles
}

// 僵尸配置
Zombies
{
	// > Percentage [0 to 1] of zombie spawns to use.
	// > For example, if set to 0.2 and an area has 100 zombie spawns, max 20 zombies will spawn at a time.
	// > Easy: 0.2    Normal: 0.25    Hard: 0.3
	// 僵尸生成概率 [0 到 1]。
	// 例如，如果设置为 0.2，且某个区域有 100 个僵尸生成点，则每次最多生成 20 个僵尸。
	// 简单：0.2 普通：0.25 困难：0.3
	Spawn_Chance

	// > Percentage [0 to 1] chance of zombie dropping an item except when dropping more than one item.
	// > Easy: 0.55    Normal: 0.5    Hard: 0.3
	// 僵尸掉落物品的几率 [0 到 1]，不包含掉落多个物品的情况。
	// 简单：0.55 普通：0.5 困难：0.3
	Loot_Chance

	// > Percentage [0 to 1] chance of zombie spawning as a crawler.
	// > Easy: 0    Normal: 0.15    Hard: 0.125
	// 僵尸作为爬行者生成的几率 [0 到 1]。【趴地的】
	// 简单：0 普通：0.15 困难：0.125
	Crawler_Chance

	// > Percentage [0 to 1] chance of zombie spawning as a sprinter.
	// > Easy: 0    Normal: 0.15    Hard: 0.175
	// 僵尸作为冲刺者生成的几率 [0 到 1]。【狗】
	// 简单：0 普通：0.15 困难：0.175
	Sprinter_Chance

	// > Percentage [0 to 1] chance of zombie spawning as a flanker.
	// > Easy: 0    Normal: 0.025    Hard: 0.05
	// 僵尸作为侧翼攻击者生成的概率（0 到 1）。【隐身怪】
	// 简单：0 普通：0.025 困难：0.05
	Flanker_Chance

	// > Percentage [0 to 1] chance of zombie spawning as a burner.
	// > Easy: 0    Normal: 0.025    Hard: 0.05
	// 僵尸作为燃烧者生成的概率（0 到 1）。【着火的怪】
	// 简单：0 普通：0.025 困难：0.05
	Burner_Chance

	// > Percentage [0 to 1] chance of zombie spawning as an acid spitter.
	// > Easy: 0    Normal: 0.025    Hard: 0.05
	// 僵尸作为酸液喷射者生成的概率（0 到 1）。【口水怪】
	// 简单：0 普通：0.025 困难：0.05
	Acid_Chance

	// > Percentage [0 to 1] chance of zombie spawning as an electric boss.
	// > Default: 0
	// 僵尸作为电击首领生成的概率（0 到 1）。【放电BOSS】
	// 默认值：0
	Boss_Electric_Chance

	// > Percentage [0 to 1] chance of zombie spawning as a ground-pounding boss.
	// > Default: 0
	// 僵尸生成为地面重击Boss的概率（[0 到 1]）。【地震BOSS】
	// 默认值：0
	Boss_Wind_Chance

	// > Percentage [0 to 1] chance of zombie spawning as a fire-breathing boss.
	// > Default: 0
	// 僵尸生成为喷火Boss的概率（[0 到 1]）。【喷火BOSS】
	// 默认值：0
	Boss_Fire_Chance

	// > Percentage [0 to 1] chance of zombie spawning as a ghost.
	// > Default: 0
	// 僵尸生成为幽灵的概率（[0 到 1]）。【？这我真没见过，隐身BOSS？隐身怪应该是侧翼攻击者】
	// 默认值：0
	Spirit_Chance

	// > Percentage [0 to 1] chance of zombie spawning as a Dying Light Volatile (crossover).
	// > Default: 0
	// 僵尸生成为《消逝的光芒》联动怪物（Volatile）的概率（[0 到 1]）。【红的，不知道啥玩意】
	// 默认值：0
	DL_Red_Volatile_Chance

	// > Percentage [0 to 1] chance of zombie spawning as a Dying Light Volatile (crossover).
	// > Default: 0
	// 僵尸生成为《消逝的光芒》联动怪物（Volatile）的概率（[0 到 1]）。【蓝的，不知道啥玩意】
	// 默认值：0
	DL_Blue_Volatile_Chance

	// > Percentage [0 to 1] chance of zombie spawning as the Elver final boss.
	// > Default: 0
	// 僵尸作为 地图Elver 最终首领出现的概率（0 到 1 ）
	// 默认值：0
	Boss_Elver_Stomper_Chance

	// > Percentage [0 to 1] chance of zombie spawning as the Kuwait final boss.
	// > Default: 0
	// 僵尸作为 地图Kuwait 最终首领出现的概率（0 到 1 ）
	// 默认值：0
	Boss_Kuwait_Chance

	// > How long (in seconds) before a dead zombie respawns by default.
	// > Default: 360
	// 默认情况下，死亡僵尸的重生间隔时间（秒）。
	// 默认值：360
	Respawn_Day_Time

	// > How long (in seconds) before a dead zombie respawns during a full moon.
	// > Default: 30
	// 满月时，死亡僵尸的重生间隔时间（秒）
	// 默认值：30
	Respawn_Night_Time

	// > How long (in seconds) before a dead zombie respawns during a horde beacon.
	// > Default: 0
	// 尸潮信标期间，死亡僵尸的重生间隔时间（秒）
	// 默认值：0
	Respawn_Beacon_Time

	// > Minimum seconds between boss zombie spawns for players doing quests.
	// > Players were abusing the spawns to farm boss tier loot.
	// > Default: 600
	// 玩家进行任务时，首领僵尸重生的最小间隔秒数
	// 玩家滥用重生机制来刷首领级战利品【应该是防止玩家用任务机制刷首领掉落物】
	// 默认值：600
	Quest_Boss_Respawn_Interval

	// > Scales the amount of damage dealt by zombies.
	// > For example, 2.0 doubles the amount of damage from zombie attacks.
	// > Easy: 0.75    Normal: 1    Hard: 1.5
	// 调整僵尸造成的伤害量。
	// 例如，2.0 会使僵尸攻击造成的伤害翻倍。
	// 简单：0.75 普通：1 困难：1.5
	Damage_Multiplier

	// > Scales the amount of damage taken by zombies.
	// > For example, 0.5 halves the amount of damage dealt to zombies.
	// > Easy: 1.25    Normal: 1    Hard: 0.75
	// 调整僵尸受到的伤害量。
	// 例如，0.5 会使对僵尸造成的伤害减半。
	// 简单：1.25 普通：1 困难：0.75
	Armor_Multiplier

	// > Scales the amount of damage taken by zombies when attacked from behind.
	// > Only certain weapons quality for this modifier.
	// > Default: 1.25
	// 调整僵尸受到背后攻击时受到的伤害量。
	// 此属性仅适用于特定品质的武器。【一般是近战武器被刺伤害倍率】
	// 默认值：1.25
	Backstab_Multiplier

	// > Weapon damage multiplier against body, arms, legs. Useful for headshot-only mode.
	// > Default: 1
	// 对身体、手臂和腿部的武器伤害倍率。适用于爆头模式。
	// 默认值：1
	NonHeadshot_Armor_Multiplier

	// > Scales amount of XP gained for killing a zombie during a horde beacon.
	// > Default: 1
	// 调整在尸潮信标期间击杀僵尸获得的经验值。
	// 默认值：1
	Beacon_Experience_Multiplier

	// > Scales amount of XP gained for killing a zombie during the full moon.
	// > Default: 2
	// 调整在满月期间击杀僵尸获得的经验值。
	// 默认值：2
	Full_Moon_Experience_Multiplier

	// > Minimum number of loot drops from non-mega non-boss zombies.
	// > Loot_Chance applies if the rolled number of drops between [min, max] is one.
	// > Default: 1
	// 非巨型非首领僵尸掉落的最低战利品数量。
	// 如果掉落数量介于 [min, max] 之间且为 1，则应用掉落几率【人话，要在这个区间才生效，最大值在下面配置】
	// 默认值：1
	Min_Drops

	// > Maximum number of loot drops from non-mega non-boss zombies.
	// > Default: 1
	// 非巨型非首领僵尸掉落的最大战利品数量。【小怪：普通，着火、口水、趴地、狗、隐身】
	// 默认值：1
	Max_Drops

	// > Minimum number of loot drops from non-boss mega zombies.
	// > Loot_Chance applies if the rolled number of drops between [min, max] is one.
	// > Default: 5
	// 非首领巨型僵尸掉落的最小战利品数量。【大只佬僵尸：地震、火焰、隐身、雷电、丢石头的】
	// 如果掉落数量介于 [最小值，最大值] 之间且为 1，则触发掉落几率。【人话，要在这个区间才生效，最大值在下面配置】
	// 默认值：5
	Min_Mega_Drops

	// > Maximum number of loot drops from non-boss mega zombies.
	// > Default: 5
	// 非首领巨型僵尸掉落的最大战利品数量。
	// 默认值：5
	Max_Mega_Drops

	// > Minimum number of loot drops from boss zombies.
	// > Loot_Chance applies if the rolled number of drops between [min, max] is one.
	// > Default: 8
	// 首领僵尸掉落的最小战利品数量。
	// 如果掉落数量介于 [最小值，最大值] 之间且为 1，则触发掉落几率。【人话，要在这个区间才生效，最大值在下面配置】
	// 默认值：8
	Min_Boss_Drops

	// > Maximum number of loot drops from boss zombies.
	// > Default: 10
	// 首领僵尸掉落的最大战利品数量。
	// 默认值：10
	Max_Boss_Drops

	// > If true, all zombies are a bit slower, making it easier to escape them.
	// > Easy: True    Normal: False    Hard: False
	// 如果为true，所有僵尸的移动速度都会略微降低，更容易逃脱。
	// 简单：true 普通：false 困难：false
	Slow_Movement

	// > If false, nothing can stun zombies, making combat harder.
	// > Easy: True    Normal: True    Hard: False
	// 如果为假，僵尸无法被击晕，战斗难度会增加。【打头会定身僵尸】
	// 简单：true 普通：true 困难：false
	Can_Stun

	// > If true, only certain weapons and attacks can stun zombie (e.g., backstabs).
	// > Not applicable if Can_Stun is false.
	// > Easy: False    Normal: False    Hard: True
	// 如果为true，只有特定的武器和攻击才能击晕僵尸（例如，背刺）。
	// 如果 Can_Stun 为false，则此选项为无关项。
	// 简单：true 普通：false 困难：false
	Only_Critical_Stuns

	// > If true, attacking a zombie uses the weapon's PvP damage values rather than zombie-specific damage.
	// > Easy: False    Normal: False    Hard: True
	// 如果为true，玩家攻击僵尸时将使用武器的 PvP 伤害值，而不是玩家对僵尸特有的伤害值。【人话，pvp伤害值比对僵尸特有伤害值要低，也就是降低你对僵尸的输出】
	// 简单：false 普通：false 困难：true
	Weapons_Use_Player_Damage

	// > If true, zombies will attack barricades obstructing their movement.
	// > Default: True
	// 如果为tue，僵尸会攻击阻碍其移动的路障。
	// 默认值：true
	Can_Target_Barricades

	// > If true, zombies will attack structures obstructing their movement.
	// > Default: True
	// 如果为true，僵尸会攻击阻碍其移动的建筑物。
	// 默认值：true
	Can_Target_Structures

	// > If true, zombies will attack vehicles obstructing their movement.
	// > Default: True
	// 如果为true，僵尸会攻击阻碍其移动的载具。
	// 默认值：true
	Can_Target_Vehicles

	// > If true, zombies will attack level objects (e.g., fences) obstructing their movement.
	// > Default: True
	// 如果为true，僵尸会攻击阻碍其移动的关卡物体（例如栅栏）。
	// 默认值：true
	Can_Target_Objects

	// > If greater than zero, maximum number of items a horde beacon can drop.
	// > Useful to clamp the number of drops when a large number of players participate.
	// > Default: 0
	// 如果大于零，则为尸潮信标可掉落物品的最大数量。
	// 用于在大量玩家参与时限制掉落物品的数量。
	// 默认值：0
	Beacon_Max_Rewards

	// > If greater than zero, maximum player count for horde beacon loot scaling.
	// > Useful to clamp the number of drops when a large number of players participate.
	// > Default: 0
	// 如果大于零，则为尸潮信标掉落物品数量缩放的最大玩家人数。【看着应该是控制参与人数，大于零则参与尸潮的人数少于这个值，那么就不掉落奖励？】
	// 用于在大量玩家参与时限制掉落物品的数量。
	// 默认值：0
	Beacon_Max_Participants

	// > Scales total number of horde beacon loot drops, applied before Beacon_Max_Rewards.
	// > Default: 1
	// 调整部落信标掉落物品的总数，在 Beacon_Max_Rewards 之前应用。
	// 默认值：1
	Beacon_Rewards_Multiplier
}

// 动物配置
Animals
{
	// > How long (in seconds) before a dead animal respawns.
	// > Default: 180
	// 死亡动物的重生间隔时间（秒）。
	// 默认值：180
	Respawn_Time

	// > Scales the amount of damage dealt by animals.
	// > For example, 2.0 doubles the amount of damage from animal attacks.
	// > Easy: 0.75    Normal: 1    Hard: 1.5
	// 调整动物造成的伤害量。【攻击性动物对玩家造成的伤害量】
	// 例如，2.0 会使动物攻击造成的伤害翻倍。
	// 简单：0.75 普通：1 困难：1.5
	Damage_Multiplier

	// > Scales the amount of damage taken by animals.
	// > For example, 0.5 halves the amount of damage dealt to animals.
	// > Easy: 1.25    Normal: 1    Hard: 0.75
	// 调整动物受到的伤害量。
	// 例如，0.5 会使动物受到的伤害减半。
	// 简单：1.25 普通：1 困难：0.75
	Armor_Multiplier

	// > Maximum number of animals on "Tiny" size levels.
	// > Default: 4
	// “微型”地图下的最大动物数量。
	// 默认值：4
	Max_Instances_Tiny

	// > Maximum number of animals on "Small" size levels.
	// > Default: 8
	// “小型”地图下的最大动物数量。
	// 默认值：8
	Max_Instances_Small

	// > Maximum number of animals on "Medium" size levels.
	// > Default: 16
	// “中型”地图下的最大动物数量。
	// 默认值：16
	Max_Instances_Medium

	// > Maximum number of animals on "Large" size levels.
	// > Default: 32
	// “大型”地图下的最大动物数量。
	// 默认值：32
	Max_Instances_Large

	// > Maximum number of animals on "Insane" size levels.
	// > Default: 64
	// “/疯狂的/巨大型”地图下的最大动物数量。
	// 默认值：64
	Max_Instances_Insane

	// > If true, attacking an animal uses the weapon's PvP damage values rather than animal-specific damage.
	// > Easy: False    Normal: False    Hard: True
	// 如果为true，攻击动物时将使用武器的 PvP 伤害值，而不是动物特有的伤害值。【为true则对动物伤害更低】
	// 简单：false 普通：false 困难：true
	Weapons_Use_Player_Damage
}

// 路障配置（陷阱之类的？）
Barricades
{
	// > How long (in seconds) since the barricade owner/group last played before the barricade won't be saved.
	// > If the server is offline for more than half the Decay_Time, all decay timers are reset.
	// > Default: 604800
	// 路障所有者/组上次登录后，路障状态将不再保存的时间间隔（以秒为单位）。【路障拥有者/组，超过7天不登陆，路障自动消失/不受保护/失去拥有者？】
	// 如果服务器离线时间超过 Decay_Time 的一半，所有衰减计时器将被重置。【服务器关闭超过3.5天，会重新计算这个统计的时间？】
	// 默认值：604800【7天】
	Decay_Time

	// > Scales the amount of damage taken by "Armor Tier: Low" barricades.
	// > For example, 0.5 halves the amount of damage dealt to barricades.
	// > Default: 1
	// 调整“低级护甲”路障受到的伤害量。
	// 例如，0.5 会使路障受到的伤害减半。
	// 默认值：1
	Armor_Lowtier_Multiplier

	// > Scales the amount of damage taken by "Armor Tier: High" barricades.
	// > For example, 0.5 halves the amount of damage dealt to barricades.
	// > Default: 0.5
	// 调整“高级护甲”路障受到的伤害量。
	// 例如，0.5 会使路障受到的伤害减半。
	// 默认值：0.5
	Armor_Hightier_Multiplier

	// > Scales the amount of damage taken by barricades from non-"Heavy Weapon" guns.
	// > For example, 2.0 doubles the amount of damage dealt to barricades by non-"Heavy Weapon" guns.
	// > Default: 1
	// 调整非重型武器对路障造成的伤害。
	// 例如，2.0 会使非重型武器对路障造成的伤害翻倍。
	// 默认值：1
	Gun_Lowcal_Damage_Multiplier

	// > Scales the amount of damage taken by barricades from "Heavy Weapon" guns.
	// > For example, 2.0 doubles the amount of damage dealt to barricades by "Heavy Weapon" guns.
	// > Default: 1
	// 调整重型武器对路障造成的伤害。
	// 例如，2.0 会使重型武器对路障造成的伤害翻倍。
	// 默认值：1
	Gun_Highcal_Damage_Multiplier

	// > Scales the amount of damage taken by barricades from melee weapons and fists.
	// > For example, 2.0 doubles the amount of damage dealt to barricades by melee.
	// > Default: 1
	// 调整近战武器和拳头对路障造成的伤害。
	// 例如，2.0 会使近战武器对路障造成的伤害翻倍。
	// 默认值：1
	Melee_Damage_Multiplier

	// > Scales the amount of HP restored by melee items like the Blowtorch.
	// > For example, 2.0 doubles the amount of health restored by melee items.
	// > Default: 1
	// 调整近战物品（例如喷灯）恢复的生命值数量。
	// 例如，2.0 会使近战物品恢复的生命值数量翻倍。
	// 默认值：1
	Melee_Repair_Multiplier

	// > Should players be allowed to build on their vehicles?
	// > Default: True
	// 是否允许玩家在载具上建造物品？
	// 默认值：true
	Allow_Item_Placement_On_Vehicle

	// > Should players be allowed to build traps (e.g. barbed wire) on their vehicles?
	// > Default: True
	// 是否允许玩家在载具上建造陷阱（例如铁丝网）？
	// 默认值：true
	Allow_Trap_Placement_On_Vehicle

	// > Furthest away from colliders a player can build an item onto their vehicle.
	// > Default: 64
	// 玩家可以在载具上建造物品的最远距离。
	// 默认值：64
	Max_Item_Distance_From_Hull

	// > Furthest away from colliders a player can build a trap (e.g. barbed wire) onto their vehicle.
	// > Default: 16
	// 玩家可以在载具上建造陷阱（例如铁丝网）的最远距离。
	// 默认值：16
	Max_Trap_Distance_From_Hull
}

// 建筑配置
Structures
{
	// > How long (in seconds) since the structure owner/group last played before the structure won't be saved.
	// > If the server is offline for more than half the Decay_Time, all decay timers are reset.
	// > Default: 604800
	// 建筑所有者/组上次登录后，建筑状态将不再保存的时间间隔（以秒为单位）。【建筑拥有者/组，超过7天不登陆，建筑自动消失/不受保护/失去拥有者？】
	// 如果服务器离线时间超过 Decay_Time 的一半，所有衰减计时器将被重置。【服务器关闭超过3.5天，会重新计算这个统计的时间？】
	// 默认值：604800【7天】
	Decay_Time

	// > Scales the amount of damage taken by "Armor Tier: Low" structures.
	// > For example, 0.5 halves the amount of damage dealt to structures.
	// > Default: 1
	// 调整“低级护甲”建筑受到的伤害量。
	// 例如，0.5 会使建筑受到的伤害减半。
	// 默认值：1
	Armor_Lowtier_Multiplier

	// > Scales the amount of damage taken by "Armor Tier: High" structures.
	// > For example, 0.5 halves the amount of damage dealt to structures.
	// > Default: 0.5
	// 调整“高级护甲”建筑受到的伤害量。
	// 例如，0.5 会使建筑受到的伤害减半。
	// 默认值：0.5
	Armor_Hightier_Multiplier

	// > Scales the amount of damage taken by structures from non-"Heavy Weapon" guns.
	// > For example, 2.0 doubles the amount of damage dealt to structures by non-"Heavy Weapon" guns.
	// > Default: 1
	// 调整建筑受到的非“重型武器”武器伤害量。
	// 例如，2.0 会使非“重型武器”枪械对建筑物造成的伤害翻倍。
	// 默认值：1
	Gun_Lowcal_Damage_Multiplier

	// > Scales the amount of damage taken by structures from "Heavy Weapon" guns.
	// > For example, 2.0 doubles the amount of damage dealt to structures by "Heavy Weapon" guns.
	// > Default: 1
	// 调整建筑受到的“重型武器”武器伤害量。
	// 例如，2.0 会使“重型武器”枪械对建筑物造成的伤害翻倍。
	// 默认值：1
	Gun_Highcal_Damage_Multiplier

	// > Scales the amount of damage taken by structures from melee weapons and fists.
	// > For example, 2.0 doubles the amount of damage dealt to structures by melee.
	// > Default: 1
	// 调整建筑受到近战武器和拳头伤害的数值。
	// 例如，2.0 会使近战武器对建筑物造成的伤害翻倍。
	// 默认值：1
	Melee_Damage_Multiplier

	// > Scales the amount of HP restored by melee items like the Blowtorch.
	// > For example, 2.0 doubles the amount of health restored by melee items.
	// > Default: 1
	// 调整近战物品（例如喷灯）恢复的生命值数值。
	// 例如，2.0 会使近战物品恢复的生命值翻倍。
	// 默认值：1
	Melee_Repair_Multiplier
}

// 玩家配置
Players
{
	// > Amount of health players spawn with. [0 to 100]
	// > Default: 100
	// 玩家初始生命值。[0 到 100]
	// 默认值：100
	Health_Default

	// > Player must have more than this amount of food to begin regenerating health.
	// > Default: 90
	// 玩家必须拥有超过此值的饱食度才能开始恢复生命值。
	// 默认值：90
	Health_Regen_Min_Food

	// > Player must have more than this amount of water to begin regenerating health.
	// > Default: 90
	// 玩家必须拥有超过此值的水分才能开始恢复生命值。
	// 默认值：90
	Health_Regen_Min_Water

	// > How quickly players health regenerates with sufficient food and water.
	// > Lower values regenerate health faster, higher values regenerate health slower.
	// > Default: 60
	// 玩家在拥有充足食物和水的情况下恢复生命值的速度。
	// 数值越低，恢复速度越快；数值越高，恢复速度越慢。
	// 默认值：60
	Health_Regen_Ticks

	// > Amount of food players spawn with. [0 to 100]
	// > Easy: 100    Normal: 100    Hard: 85
	// 玩家初始食物量。[0 到 100]
	// 简单：100 普通：100 困难：85
	Food_Default

	// > How quickly players food meter depletes.
	// > Lower values burn food faster, higher values burn food slower.
	// > Easy: 350    Normal: 300    Hard: 250
	// 玩家食物消耗的速度。
	// 数值越低，食物消耗速度越快；数值越高，食物消耗速度越慢。
	// 简单：350 普通：300 困难：250
	Food_Use_Ticks

	// > How quickly players starve to death.
	// > Lower values kill the player faster, higher values kill the player slower.
	// > Default: 15
	// 玩家饿死的速度。
	// 数值越低，玩家饿死的速度越快；数值越高，玩家饿死的速度越慢。
	// 默认值：15
	Food_Damage_Ticks

	// > Amount of water players spawn with. [0 to 100]
	// > Easy: 100    Normal: 100    Hard: 85
	// 玩家出生时拥有的水量。[0 到 100]
	// 简单：100 普通：100 困难：85
	Water_Default

	// > How quickly players water meter depletes.
	// > Lower values lose water faster, higher values lose water slower.
	// > Easy: 320    Normal: 270    Hard: 220
	// 玩家水量消耗的速度。
	// 数值越低，水量消耗的速度越快；数值越高，水量消耗的速度越慢。
	// 简单：320 普通：270 困难：220
	Water_Use_Ticks

	// > How quickly players dehydrate to death.
	// > Lower values kill the player faster, higher values kill the player slower.
	// > Default: 20
	// 玩家脱水死亡的速度。
	// 数值越低，玩家脱水死亡的速度越快；数值越高，玩家脱水死亡的速度越慢。
	// 默认值：20
	Water_Damage_Ticks

	// > Amount of immunity players spawn with. [0 to 100]
	// > Default: 100
	// 玩家初始免疫力数值。[0 到 100]
	// 默认值：100
	Virus_Default

	// > When immunity is below this amount it will gradually begin depleting.
	// > Default: 50
	// 当免疫力低于此值时，免疫力会逐渐下降。
	// 默认值：50
	Virus_Infect

	// > How quickly players immunity depletes when below Virus_Infect.
	// > Lower values deplete faster, higher values deplete slower.
	// > Default: 125
	// 当玩家免疫力低于 Virus_Infect 值时，免疫力下降的速度。
	// 数值越低，下降速度越快；数值越高，下降速度越慢。
	// 默认值：125
	Virus_Use_Ticks

	// > How quickly players die at zero immunity.
	// > Lower values kill the player faster, higher values kill the player slower.
	// > Default: 25
	// 当免疫力为零时，玩家死亡的速度。
	// 数值越低，死亡速度越快；数值越高，死亡速度越慢。
	// 默认值：25
	Virus_Damage_Ticks

	// > How quickly broken legs heal automatically.
	// > Depends on Can_Fix_Legs.
	// > Lower values heal faster, higher values heal slower.
	// > Default: 750
	// 断腿自动愈合的速度。
	// 取决于 Can_Fix_Legs 属性。
	// 数值越低，愈合速度越快；数值越高，愈合速度越慢。
	// 默认值：750
	Leg_Regen_Ticks

	// > How frequently players lose health while bleeding.
	// > Lower values kill the player faster, higher values kill the player slower.
	// > Default: 10
	// 玩家流血时生命值下降的频率。
	// 数值越低，玩家死亡速度越快；数值越高，玩家死亡速度越慢。
	// 默认值：10
	Bleed_Damage_Ticks

	// > How quickly bleeding heals automatically.
	// > Depends on Can_Stop_Bleeding.
	// > Lower values heal faster, higher values heal slower.
	// > Default: 750
	// 流血自动恢复的速度。
	// 取决于 Can_Stop_Bleeding 属性。
	// 数值越低，恢复速度越快；数值越高，恢复速度越慢。
	// 默认值：750
	Bleed_Regen_Ticks

	// > Scales the amount of damage taken by players.
	// > For example, 0.5 halves the amount of damage dealt to players.
	// > Default: 1
	// 调整玩家受到的伤害量。
	// 例如，0.5 表示玩家受到的伤害减半。
	// 默认值：1
	Armor_Multiplier

	// > Scales the amount of XP gained from all activities.
	// > Easy: 1.5    Normal: 1    Hard: 1.5
	// 调整所有行为获得的经验值倍率。
	// 简单：1.5 普通：1 困难：1.5
	Experience_Multiplier

	// > Scales the radius within zombies and animals will detect the player.
	// > Easy: 0.5    Normal: 1    Hard: 1.25
	// 调整僵尸和动物探测到玩家的半径。
	// 简单：0.5 普通：1 困难：1.25
	Detect_Radius_Multiplier

	// > How close an attack is to a player to be considered aggressive.
	// > For example, when a bullet passes within this distance of a player the shooter is
	// > considered the aggressor.
	// > Default: 8
	// 攻击与玩家的距离，以判断攻击是否具有攻击性。
	// 例如，当子弹在玩家附近经过时，射击者
	// 被视为攻击者。
	// 默认值：8
	Ray_Aggressor_Distance

	// > Percentage [0 to 1] of skill levels to retain when killed by another player.
	// > Default: 1
	// 被其他玩家击杀时保留的技能等级百分比 [0 到 1]【1为不失去】。
	// 默认值：1
	Lose_Skills_PvP

	// > Percentage [0 to 1] of skill levels to retain when killed by the environment (e.g., zombies).
	// > Default: 1
	// 被环境因素（例如僵尸）击杀时保留的技能等级百分比 [0 到 1]【1为不失去】。
	// 默认值：1
	Lose_Skills_PvE

	// > Number of skill levels to remove when killed by another player.
	// > Easy: 0    Normal: 1    Hard: 2
	// 被其他玩家击杀时移除的技能等级数。
	// 简单：0 普通：1 困难：2
	Lose_Skill_Levels_PvP

	// > Number of skill levels to remove when killed by the environment (e.g., zombies).
	// > Easy: 0    Normal: 1    Hard: 2
	// 被环境因素（例如僵尸）击杀时移除的技能等级数。
	// 简单：0 普通：1 困难：2
	Lose_Skill_Levels_PvE

	// > Percentage [0 to 1] of XP to retain when killed by another player.
	// > Default: 0.5
	// 被其他玩家击杀时保留的经验值百分比 [0 到 1]【1为不失去】。
	// 默认值：0.5
	Lose_Experience_PvP

	// > Percentage [0 to 1] of XP to retain when killed by the environment (e.g., zombies).
	// > Default: 0.5
	// 被环境因素（例如僵尸）击杀时保留的经验值百分比 [0 到 1]【1为不失去】。
	// 默认值：0.5
	Lose_Experience_PvE

	// > Scales XP cost to purchase/upgrade skills.
	// > Default: 1
	// 调整购买/升级技能所需的经验值倍率。
	// 默认值：1
	Skill_Cost_Multiplier

	// > Percentage [0 to 1] chance to lose each inventory item when killed by another player.
	// > Depends on Lose_Clothes_PvP because losing storage will drop contained items.
	// > Default: 1
	// 被其他玩家击杀时，每件物品丢失的概率（0 到 1）【1为必定掉落】。
	// 取决于 Lose_Clothes_PvP，因为丢失存储空间会掉落其中的物品。
	// 默认值：1
	Lose_Items_PvP

	// > Percentage [0 to 1] chance to lose each inventory item when killed by the environment (e.g., zombies).
	// > Depends on Lose_Clothes_PvE because losing storage will drop contained items.
	// > Default: 1
	// 被环境（例如僵尸）击杀时，每件物品丢失的概率（0 到 1）【1为必定掉落】。
	// 取决于 Lose_Clothes_PvE，因为丢失存储空间会掉落其中的物品。
	// 默认值：1
	Lose_Items_PvE

	// > If true, drop all clothing items when killed by another player.
	// > Default: True
	// 如果为true，则被其他玩家击杀时掉落所有衣物。
	// 默认值：true
	Lose_Clothes_PvP

	// > If true, drop all clothing items when killed by the environment (e.g., zombies).
	// > Default: True
	// 如果为true，则被环境（例如僵尸）击杀时掉落所有衣物。
	// 默认值：true
	Lose_Clothes_PvE

	// > If true, drop primary and secondary weapon when killed by another player.
	// > Default: True
	// 如果为true，则被其他玩家击杀时掉落主武器和副武器。
	// 默认值：true
	Lose_Weapons_PvP

	// > If true, drop primary and secondary weapon when killed by the environment (e.g., zombies).
	// > Default: True
	// 如果为true，则被环境因素（例如僵尸）击杀时掉落主武器和副武器。
	// 默认值：true
	Lose_Weapons_PvE

	// > If false, players have no health loss from falling long distances.
	// > Default: True
	// 如果为false，玩家从高空摔落不会掉血。
	// 默认值：true
	Can_Hurt_Legs

	// > If false, players cannot break their leg when falling long distances.
	// > Easy: False    Normal: True    Hard: True
	// 如果为 false，玩家从高处坠落不会摔断腿。
	// 简单：False 普通：True 困难：True
	Can_Break_Legs

	// > If false, broken legs cannot automatically heal themselves after Leg_Regen_Ticks.
	// > Easy: True    Normal: True    Hard: False
	// 如果为 false，断腿不会在 Leg_Regen_Ticks 后自动恢复。
	// 简单：True 普通：True 困难：False
	Can_Fix_Legs

	// > If false, damage cannot cause players to bleed.
	// > Easy: False    Normal: True    Hard: True
	// 如果为 false，伤害不会使玩家流血。
	// 简单：False 普通：True 困难：True
	Can_Start_Bleeding

	// > If false, bleeding cannot automatically heal itself after Bleed_Regen_Ticks.
	// > Easy: True    Normal: True    Hard: False
	// 如果为 false，流血不会在 Bleed_Regen_Ticks 后自动恢复。
	// 简单：True 普通：True 困难：False
	Can_Stop_Bleeding

	// > Should all skills default to max level?
	// > Default: False
	// 所有技能是否默认为最高等级？
	// 默认值：False
	Spawn_With_Max_Skills

	// > Should cardio, diving, exercise, and parkour default to max level?
	// > Default: False
	// 有氧运动、潜水、锻炼和跑酷技能是否默认达到最高等级？
	// 默认值：False
	Spawn_With_Stamina_Skills

	// > If true, skills related to player's skillset/speciality are half cost.
	// > Default: True
	// 如果为true，则与玩家技能组/专长相关的技能消耗减半。
	// 默认值：True
	Skillset_Reduces_Skill_Cost

	// > If true, skills related to player's skillset/speciality cannot lose levels on death.
	// > Default: True
	// 如果为真，则与玩家技能组/专长相关的技能不会因死亡而降低等级。
	// 默认值：True
	Skillset_Prevents_Skill_Loss

	// > If true, prevent levels from modifying skill starting levels, costs, and max levels.
	// > Default: False
	// 如果为真，则防止等级影响技能的初始等级、消耗和最高等级。
	// 默认值：False
	Prevent_Level_Skill_Overrides

	// > Should guns with Instakill Headshots (snipers) bypass armor?
	// > Easy: False    Normal: False    Hard: True
	// 是否应该让拥有爆头秒杀效果的枪械（狙击枪）无视护甲？
	// 简单：false 普通：false 困难：true
	Allow_Instakill_Headshots

	// > Should each character slot have separate savedata?
	// > Default: False
	// 每个角色栏位是否应该拥有独立的存档？
	// 默认值：False
	Allow_Per_Character_Saves

	// > If true, players will be kicked if their skin color is too similar to one of the level's terrain colors.
	// > Default: True
	// 如果为true，当玩家的肤色与关卡地形颜色过于相似时，该玩家将被踢出游戏。
	// 默认值：True
	Enable_Terrain_Color_Kick
}

// 对象配置（这里我理解是调整相关的倍率，比如相同时间下，倍率越小等待时间越短？）
Objects
{
	// > Scales how long before interactables like fridges automatically close.
	// > Default: 1
	// 调整可交互物品（例如冰箱）自动关闭前的等待时间的倍率。
	// 默认值：1
	Binary_State_Reset_Multiplier

	// > Scales how long before sources of fuel in the world are automatically partially refilled.
	// > Default: 1
	// 调整世界中燃料源自动部分补充前的等待时间的倍率。
	// 默认值：1
	Fuel_Reset_Multiplier

	// > Scales how long before sources of water in the world are automatically partially refilled.
	// > Default: 1
	// 调整世界中水源自动部分补充前的等待时间的倍率。
	// 默认值：1
	Water_Reset_Multiplier

	// > Scales how long before trees, rocks, and bushes in the world grow back.
	// > Default: 1
	// 调整世界中树木、岩石和灌木重新生长前的等待时间的倍率。
	默认值：1
	Resource_Reset_Multiplier

	// > Scales number of items dropped by resources like trees and rocks.
	// > Default: 1
	// 调整树木和岩石等资源掉落物品的数量的倍率。
	// 默认值：1
	Resource_Drops_Multiplier

	// > Scales how long before destructible objects (e.g., fences) automatically repair.
	// > Default: 1
	// 调整可破坏物体（例如栅栏）自动修复前的等待时间的倍率。
	// 默认值：1
	Rubble_Reset_Multiplier

	// > Should holiday-specific objects be able to drop special items?
	// > For example, whether christmas presents contain guns.
	// > Default: True
	// 节日专属物品是否应该掉落特殊物品？
	// 例如，圣诞礼物中是否包含枪支。
	// 默认值：True
	Allow_Holiday_Drops

	// > Should barricades placed on tree stumps prevent the tree from growing back
	// > while the server is running?
	// > Default: True
	// 放置在树桩上的路障是否应该阻止树木再生？
	// 当服务器运行时
	// 默认值：True
	Items_Obstruct_Tree_Respawns
}

// 事件配置
Events
{
	// > Minimum number of in-game days between legacy rain events.
	// > Only applicable for backwards compatibility with levels using the legacy weather features.
	// > Default: 2.3
	// 两次旧版降雨事件之间的最小游戏内天数。
	// 仅适用于向后兼容使用旧版天气功能的关卡。
	// 默认值：2.3【单位是游戏内的天】
	Rain_Frequency_Min

	// > Maximum number of in-game days between legacy rain events.
	// > Only applicable for backwards compatibility with levels using the legacy weather features.
	// > Default: 5.6
	// 两次旧版降雨事件之间的最大游戏内天数。
	// 仅适用于向后兼容使用旧版天气功能的关卡。
	// 默认值：5.6【单位是游戏内的天】
	Rain_Frequency_Max

	// > Minimum number of in-game days a legacy rain event lasts. Zero turns off legacy rain.
	// > Only applicable for backwards compatibility with levels using the legacy weather features.
	// > Default: 0.05
	// 一次旧版降雨事件持续的最短游戏内天数。设置为零则关闭旧版降雨。
	// 仅适用于向后兼容使用旧版天气功能的关卡。
	// 默认值：0.05【单位是游戏内的天】
	Rain_Duration_Min

	// > Maximum number of in-game days a legacy rain event lasts. Zero turns off legacy rain.
	// > Only applicable for backwards compatibility with levels using the legacy weather features.
	// > Default: 0.15
	// 一次旧版降雨事件持续的最长游戏内天数。设置为零则关闭旧版降雨。
	// 仅适用于向后兼容使用旧版天气功能的关卡。
	// 默认值：0.15【单位是游戏内的天】
	Rain_Duration_Max

	// > Minimum number of in-game days between legacy snow events.
	// > Only applicable for backwards compatibility with levels using the legacy weather features.
	// > Default: 1.3
	// 两次降雪事件之间的最小游戏内天数。
	// 仅适用于向后兼容使用旧版天气功能的关卡。
	// 默认值：1.3【单位是游戏内的天】
	Snow_Frequency_Min

	// > Maximum number of in-game days between legacy snow events.
	// > Only applicable for backwards compatibility with levels using the legacy weather features.
	// > Default: 4.6
	// 两次降雪事件之间的最大游戏内天数。
	// 仅适用于向后兼容使用旧版天气功能的关卡。
	// 默认值：4.6【单位是游戏内的天】
	Snow_Frequency_Max

	// > Minimum number of in-game days a legacy snow event lasts. Zero turns off legacy snow.
	// > Only applicable for backwards compatibility with levels using the legacy weather features.
	// > Default: 0.2
	// 一次降雪事件持续的最短游戏内天数。设置为零则关闭降雪功能。
	// 仅适用于向后兼容使用旧版天气功能的关卡。
	// 默认值：0.2【单位是游戏内的天】
	Snow_Duration_Min

	// > Maximum number of in-game days a legacy snow event lasts. Zero turns off legacy snow.
	// > Only applicable for backwards compatibility with levels using the legacy weather features.
	// > Default: 0.5
	// 一次降雪事件持续的最长游戏内天数。设置为零则关闭降雪功能。
	// 仅适用于向后兼容使用旧版天气功能的关卡。
	// 默认值：0.5【单位是游戏内的天】
	Snow_Duration_Max

	// > Scales number of in-game days between weather events. (Levels using the newer weather
	// > features can have multiple weather types with different frequencies.) If this was
	// > accidentally set to a high value you can use the "/weather 0" command to reschedule
	// > the next weather event.
	// > 
	// > Lower values cause more frequent weather, higher values cause less frequent weather.
	// > (Misnomer, sorry!)
	// > Default: 1
	// ================
	// 调整两次天气事件之间的游戏内天数。（使用较新天气功能的关卡
	// 可以有多种不同频率的天气类型。）如果此值
	// 不小心设置得太高，可以使用“/weather 0”命令重新安排
	// 下一次天气事件。
	// 
	// 值越低，天气事件发生频率越高；值越高，天气事件发生频率越低。
	// （名称有误，抱歉！）【hyw？】
	// 默认值：1
	Weather_Frequency_Multiplier

	// > Scales number of in-game days a weather event lasts. (Levels using the newer weather
	// > features can have multiple weather types with different durations.)
	// > Zero turns off weather entirely.
	// > Default: 1
	// 调整天气事件持续的游戏内天数。（使用较新天气功能的关卡
	// 可以有多种不同持续时间的天气类型。）
	// 零表示完全关闭天气。
	// 默认值：1
	Weather_Duration_Multiplier

	// > Minimum number of in-game days between airdrops. Depends on Use_Airdrops.
	// > Default: 0.8
	// 空投之间的最小游戏内天数。依赖于 Use_Airdrops 的设置。
	// 默认值：0.8【单位是游戏内的天】
	Airdrop_Frequency_Min

	// > Maximum number of in-game days between airdrops. Depends on Use_Airdrops.
	// > Default: 6.5
	// 空投间隔的最长时间（以游戏内天数表示）。依赖于 Use_Airdrops 的设置。
	// 默认值：6.5【单位是游戏内的天】
	Airdrop_Frequency_Max

	// > How fast (in meters per second) the airdrop plane flies across the level.
	// > Lower values give players more time to react and chase the airplane.
	// > Default: 128
	// 空投飞机飞越地图的速度（以米/秒为单位）。
	// 较低的值可以让玩家有更多时间反应并追击飞机。
	// 默认值：128
	Airdrop_Speed

	// > Amount of upward force applied to the carepackage, resisting gravity.
	// > Higher values require players to wait longer for the carepackage.
	// > (This isn't intuitive, sorry!)
	// > Default: 9.5
	// 空投箱向上受到的力，用于抵抗重力。
	// 较高的值意味着玩家需要等待更长时间才能获得空投箱。
	// （抱歉，这可能不太直观！）
	// 默认值：9.5
	Airdrop_Force

	// > Minimum number of teams needed to start an arena match.
	// > Default: 2
	// 开始竞技场比赛所需的最小队伍数量。
	// 默认值：2
	Arena_Min_Players

	// > Base damage per second while standing outside the arena field.
	// > Default: 9
	// 玩家在竞技场外受到的基础伤害（每秒）。
	// 默认值：9
	Arena_Compactor_Damage

	// > Accumulating additional damage per second while standing outside the arena field.
	// > Default: 1
	// 站在竞技场外时每秒累积的额外伤害。
	// 默认值：1
	Arena_Compactor_Extra_Damage_Per_Second

	// > How long (in seconds) between match ready and teleporting players into the arena.
	// > Default: 5
	// 从比赛准备就绪到玩家被传送进竞技场之间的时间（以秒为单位）。
	// 默认值：5
	Arena_Clear_Timer

	// > How long (in seconds) after a winner is announced to wait before restarting.
	// > Default: 10
	// 宣布获胜者后，等待多久（以秒为单位）才会重新开始比赛。
	// 默认值：10
	Arena_Finale_Timer

	// > How long (in seconds) to wait in intermission before starting the next match.
	// > Default: 15
	// 中场休息时间（以秒为单位）到开始下一场比赛之间的等待时间。
	// 默认值：15
	Arena_Restart_Timer

	// > How long (in seconds) before first arena circle starts shrinking.
	// > Default: 1
	// 第一个竞技场圆圈开始缩小前的等待时间（以秒为单位）。
	// 默认值：1
	Arena_Compactor_Delay_Timer

	// > How long (in seconds) after arena circle finishes shrinking to start shrinking again.
	// > Default: 5
	// 竞技场圆圈完全缩小后，再次开始缩小的延迟时间（以秒为单位）。
	// 默认值：5
	Arena_Compactor_Pause_Timer

	// > Should airplanes fly over the level dropping carepackages?
	// > Default: True
	// 是否允许飞机飞越关卡并投放空投补给？
	// 默认值：True
	Use_Airdrops

	// > If true, arena selects multiple smaller circles within the initial circle.
	// > Otherwise, arena cricle shrinks toward its initial center.
	// > Default: True
	// 如果为 true，竞技场会在初始圆圈内选择多个更小的圆圈。
	// 否则，竞技场圆圈会向其初始中心缩小。
	// 默认值：True
	Arena_Use_Compactor_Pause

	// > How quickly (in meters per second) the arena radius shrinks on "Tiny" size levels.
	// > Default: 0.5
	// 在“微小”尺寸级别下，竞技场半径缩小的速度（以米/秒为单位）。
	// 默认值：0.5
	Arena_Compactor_Speed_Tiny

	// > How quickly (in meters per second) the arena radius shrinks on "Small" size levels.
	// > Default: 1.5
	// 在“小型”尺寸级别下，竞技场半径缩小的速度（以米/秒为单位）。
	// 默认值：1.5
	Arena_Compactor_Speed_Small

	// > How quickly (in meters per second) the arena radius shrinks on "Medium" size levels.
	// > Default: 3
	// 在“中等”尺寸级别下，竞技场半径缩小的速度（以米/秒为单位）。
	// 默认值：3
	Arena_Compactor_Speed_Medium

	// > How quickly (in meters per second) the arena radius shrinks on "Large" size levels.
	// > Default: 4.5
	// 在“大型”尺寸级别下，竞技场半径缩小的速度（以米/秒为单位）。
	// 默认值：4.5
	Arena_Compactor_Speed_Large

	// > How quickly (in meters per second) the arena radius shrinks on "Insane" size levels.
	// > Default: 6
	// 在“疯狂/巨大”尺寸级别下，竞技场半径缩小的速度（以米/秒为单位）。
	// 默认值：6
	Arena_Compactor_Speed_Insane

	// > Percentage [0 to 1] of arena circle radius retained when selecting next smaller circle.
	// > Depends on Arena_Use_Compactor_Pause.
	// > Default: 0.5
	// 选择下一个更小的圆圈时，保留的竞技场圆圈半径百分比 [0 到 1]。
	// 依赖于 Arena_Use_Compactor_Pause。
	// 默认值：0.5
	Arena_Compactor_Shrink_Factor
}

// 游戏玩法配置
Gameplay
{
	// > Blueprints requiring a repair skill level higher than this cannot be crafted.
	// > Restricts players from repairing higher-tier items.
	// > Default: 3
	// 需要高于此等级的维修技能才能制作的蓝图。
	// 限制玩家维修更高等级的物品。
	// 默认值：3
	Repair_Level_Max

	// > Should a hit confirmation be shown when players deal damage?
	// > Easy: True    Normal: True    Hard: False
	// 玩家造成伤害时是否应显示命中确认？
	// 简单：true 普通：true 困难：false
	Hitmarkers

	// > Should a crosshair be visible while holding a gun?
	// > Easy: True    Normal: True    Hard: False
	// 持枪时是否应显示准星？
	// 简单：true 普通：true 困难：false
	Crosshair

	// > Should bullets be affected by gravity and travel time?
	// > Easy: False    Normal: True    Hard: True
	// 子弹是否应受重力和飞行时间的影响？
	// 简单：false 普通：true 困难：true
	Ballistics

	// > Should the player have permanent access to a "paper" map of the level even when they
	// > don't have the associated in-game item?
	// > Easy: True    Normal: False    Hard: False
	// 是否也应永久访问关卡的“纸质”地图
	// 即使玩家没有相应的游戏内物品?
	// 简单：true 普通：false 困难：false
	Chart

	// > Should the player have permanent access to a GPS map of the level even when they
	// > don't have the associated in-game item?
	// > Default: False
	// 是否也应永久访问关卡的GPS地图
	// 即使玩家没有相应的游戏内物品?
	// 默认值：false
	Satellite

	// > Should the player have permanent access to their compass heading HUD even when they
	// > don't have the associated in-game item?
	// > Default: False
	// 是否也应该始终访问其指南针方向 HUD
	// 即使玩家没有相应的游戏内物品?
	// 默认值：false
	Compass

	// > Should group members and similar info be visible on the in-game map?
	// > Easy: True    Normal: True    Hard: False
	// 是否应该在游戏内地图上显示组队成员和类似信息？
	// 简单：true 普通：true 困难：false
	Group_Map

	// > Should group member names be visible through walls?
	// > Default: True
	// 组队成员名称是否应该穿墙显示？
	// 默认值：True
	Group_HUD

	// > Should group connections be shown on player list?
	// > Default: True
	// 组队连接是否应该显示在玩家列表中？
	// 默认值：True
	Group_Player_List

	// > Should Steam clans/groups be enables as in-game groups?
	// > Default: True
	// 是否应该将 Steam 战队/群组启用为游戏内群组？
	// 默认值：True
	Allow_Static_Groups

	// > Should players be allowed to create in-game groups and invite members of the server?
	// > Default: True
	// 是否应该允许玩家创建游戏内群组并邀请服务器成员？
	// 默认值：True
	Allow_Dynamic_Groups

	// > If true, allow automatically creating an in-game group for members of your Steam lobby.
	// > Requires Allow_Dynamic_Groups to be enabled as well.
	// > Default: True
	// 如果为 true，则允许自动为 Steam 大厅成员创建游戏内群组。
	// 需要同时启用 Allow_Dynamic_Groups。
	// 默认值：True
	Allow_Lobby_Groups

	// > Should the third-person camera extend out to the side?
	// > If false, the third-person camera is centered over your character.
	// > Default: True
	// 第三人称视角是否应向两侧扩展？
	// 如果为 false，则第三人称视角将以角色为中心。
	// 默认值：True
	Allow_Shoulder_Camera

	// > Should players be allowed to kill themselves from the pause menu?
	// > Default: True
	// 是否允许玩家在暂停菜单中自杀？
	// 默认值：True
	Can_Suicide

	// > Is friendly-fire within groups allowed?
	// > Default: False
	// 是否允许组队内友军伤害？
	// 默认值：false
	Friendly_Fire

	// > Are sentry guns and beds allowed on vehicles?
	// > Default: False
	// 是否允许在载具上放置哨戒炮和床？
	// 默认值：false
	Bypass_Buildable_Mobility

	// > If true, buildables can be placed in "no building" zones.
	// > Default: False
	// 如果为 true，则可建造物品可以放置在“禁止建造”区域。
	// 默认值：false
	Bypass_No_Building_Zones

	// > If true, buildables can be placed in safezones.
	// > Default: False
	// 如果为 true，则可建造物品可以放置在安全区域。
	// 默认值：false
	Bypass_Building_In_Safezones

	// > Should holiday (Halloween and Christmas) content like NPC outfits and decorations be loaded?
	// > Default: True
	// 是否加载节日（万圣节和圣诞节）内容，例如 NPC 服装和装饰？
	// 默认值：True
	Allow_Holidays

	// > Can "freeform" barricades be placed in the world?
	// > Default: True
	// 是否可以在世界中放置“自由形状”的路障？
	// 默认值：True
	Allow_Freeform_Buildables

	// > Can "freeform" barricades be placed on vehicles?
	// > Default: True
	// 是否可以在载具上放置“自由形状”的路障？
	// 默认值：True
	Allow_Freeform_Buildables_On_Vehicles

	// > If true, aim flinches away from center when damaged.
	// > Default: True
	// 如果为true，则在受到伤害时，瞄准点会偏离中心。
	// 默认值：True
	Enable_Damage_Flinch

	// > If true, camera will shake near explosions. Can also be toned down client-side in Options menu.
	// > Default: True
	// 如果为true，则在爆炸附近镜头会抖动。也可以在客户端的“选项”菜单中降低抖动程度。
	// 默认值：True
	Enable_Explosion_Camera_Shake

	// > If true, crafting blueprints can require nearby workstations.
	// > If false, only the backwards-compatibility "Heat Source" vanilla crafting tag can be required. This
	// > functions identically to the cooking-skill-also-requires-heat behavior from before.
	// > Default: True
	// 如果为 true，则制作蓝图可能需要附近的工坊。
	// 如果为 false，则仅需要向后兼容的“Heat Source”原版合成标签。【需要在热源附件合成】
	// 此功能与之前的烹饪技能也需要热源的行为完全相同。
	// 默认值：True
	Enable_Workstation_Requirements

	// > If true, client-side options like damage flinch, explosion camera shake, viewmodel bob are ignored.
	// > Default: False
	// 如果为 true，则忽略客户端选项，例如伤害硬直、爆炸镜头抖动、模型晃动。
	// 默认值：false
	Disable_Motion_Sickness_Options

	// > If true, minimum foliage density of "Low" is enforced.
	// > Default: False
	// 如果为 true，则强制使用“低”最低植被密度。
	// 默认值：false
	Disable_Foliage_Off

	// > If true, hide viewmodel while aiming a dual-render scope and show a 2D overlay instead.
	// > Useful for backwards compatibility with modded scopes that have a small enough
	// > dual-render surface to zoom-*out* when aiming in.
	// > Default: False
	// 如果为 true，则在使用双渲染瞄准镜瞄准时隐藏模型，并显示 2D 叠加层。
	// 用于向后兼容那些具有足够小双渲染表面的改装瞄准镜
	// 以便在瞄准时进行*缩小*缩放。
	// 默认值：False
	Use_2D_Scope_Overlay

	// > If true, a challenge must be completed before catching a fish.
	// > Only applicable for supported maps and fishing rods. (I.e., not older custom maps.)
	// > Default: True
	// 如果为 true，则必须完成挑战才能钓鱼。
	// 仅适用于支持的地图和钓竿。（即，不适用于旧的自定义地图。）
	// 默认值：True
	Enable_Fishing_Catch_Challenge

	// > How long (in seconds) before a player can leave the server through the pause menu.
	// > Default: 10
	// 玩家通过暂停菜单离开服务器前等待的时间（以秒为单位）。
	// 默认值：10
	Timer_Exit

	// > How long (in seconds) after death before a player can respawn.
	// > Default: 10
	// 玩家死亡后等待的时间（以秒为单位）。
	// 默认值：10
	Timer_Respawn

	// > How long (in seconds) after death before a player can respawn at their bed.
	// > Default: 30
	// 玩家死亡后等待的时间（以秒为单位）才能在床上重生。
	// 默认值：30
	Timer_Home

	// > How long (in seconds) after a player requests to leave an in-game "dynamic" group
	// > before they are actually removed. Gives group members time to take cover.
	// > Default: 30
	// 玩家请求离开游戏内“动态”群组后，等待多长时间（以秒为单位）才会真正被移除。
	// 给群组成员时间寻找掩护。
	// 默认值：30
	Timer_Leave_Group

	// > Maximum number of players invitable to an in-game "dynamic" group.
	// > Depends on Allow_Dynamic_Groups.
	// > Default: 0
	// 可邀请加入游戏内“动态”群组的最大玩家数量。
	// 依赖于 Allow_Dynamic_Groups。
	// 默认值：0【0应该是无限】
	Max_Group_Members

	// > Scales velocity added to players by explosion knock-back.
	// > Default: 1
	// 调整爆炸击退对玩家速度的影响倍率。
	// 默认值：1
	Explosion_Launch_Speed_Multiplier

	// > Scales midair input change in player direction.
	// > Default: 1
	// 调整空中方向输入变化的幅度倍率。
	// 默认值：1
	AirStrafing_Acceleration_Multiplier

	// > Scales midair decrease in speed while faster than max walk speed.
	// > Default: 1
	// 调整高于最大行走速度时空中速度下降的幅度倍率。
	// 默认值：1
	AirStrafing_Deceleration_Multiplier

	// > Scales magnitude of recoil while using first-person perspective.
	// > Default: 1
	// 调整第一人称视角下的后坐力幅度倍率。
	// 默认值：1
	FirstPerson_RecoilMultiplier

	// > Scales magnitude of recoil while aiming in first-person perspective.
	// > Default: 1
	// 调整第一人称视角下瞄准时的后坐力幅度倍率。
	// 默认值：1
	FirstPerson_AimingRecoilMultiplier

	// > Scales magnitude of recoil inversely with zoom level while aiming in first-person perspective.
	// > Easy: 0.25    Normal: 0    Hard: 0
	// 调整第一人称视角下瞄准时的后坐力幅度倍率，后坐力幅度与缩放级别成反比。
	// 简单：0.25 普通：0 困难：0
	FirstPerson_AimingZoomRecoilReduction

	// > Scales magnitude of recoil while using third-person perspective.
	// > Easy: 1    Normal: 2    Hard: 2
	// 调整第三人称视角下的后坐力大小。
	// 简单：1 普通：2 困难：2
	ThirdPerson_RecoilMultiplier

	// > Scales magnitude of bullet inaccuracy while using third-person perspective.
	// > Easy: 1    Normal: 2    Hard: 2
	// 调整第三人称视角下的子弹精度误差。
	// 简单：1 普通：2 困难：2
	ThirdPerson_SpreadMultiplier

	// > [0 to 1] Scales how much the first-person move up and down while jumping/landing.
	// > Default: 1
	//  [0 到 1] 调整第一人称视角跳跃/落地时的上下移动幅度。
	// 默认值：1
	Viewmodel_AimingJumpLandMultiplier

	// > [0 to 1] Scales how much the first-person arms move while ADS.
	// > Easy: 0.2    Normal: 0.5    Hard: 1
	//  [0 到 1] 调整第一人称视角瞄准时手臂的移动幅度。
	// 简单：0.2 普通：0.5 困难：1
	Viewmodel_AimingMisalignmentMultiplier

	// > Shortest amount of time before a fish takes the bait.
	// > Easy: 35    Normal: 48    Hard: 48
	// 鱼儿上钩的最短时间。【单位应该是秒】
	// 简单：35 普通：48 困难：48
	Min_Fishing_Bite_Interval

	// > Longest amount of time before a fish takes the bait.
	// > Easy: 48    Normal: 60    Hard: 60
	// 鱼儿上钩的最长时间。【单位应该是秒】
	// 简单：48 普通：60 困难：60
	Max_Fishing_Bite_Interval

	// > Multiplier for fishing bite interval when casting strength bar is full.
	// > Default: 0.3
	// 抛竿力量条全满时，鱼儿上钩间隔的倍率。
	// 默认值：0.3
	Fishing_MaxStrength_Bite_Interval_Multiplier
}
```

#### 旧版服务器参数（json）

留意你的服务器难度，因为不同难度下他们都有个各自的配置，别一会儿难度是hard，改了easy的配置，那hard下肯定不会生效呐...

部分地图修改了默认设置后，在加入服务器前会在服务器信息中展示出来，但是有些不会，不过没关系，只要修改了就会生效~

下面是部分参数的解释说明：

```
{
  "Browser": {//浏览参数设置
    "Icon": "",//服务器列表页图标，建议图片大小64x64
    "Thumbnail": "",//服务器详情页图标，建议图片大小64x64
    "Desc_Hint": "",//服务器详情页内，服务器名字下方的文字介绍
    "Desc_Full": "",//服务器详情页内，地图下方的文字介绍
    "Desc_Server_List": "",//服务器列表页，服务器名字下方的文字介绍
    "Login_Token": "",//服务器密钥
  },
  "Server": {//服务器参数设置
    "VAC_Secure": true,//启动VAC
    "BattlEye_Secure": true,//启动战眼（BattlEye）
    "Max_Ping_Milliseconds": 750,//加入服务器的最大Ping上限
    "Timeout_Queue_Seconds": 15.0,//排队时断线重连时间
    "Timeout_Game_Seconds": 30.0,//服务器内断线重连时间
    "Max_Packets_Per_Second": 50.0,//单IP每秒最大数据包量
    "Enable_Kick_Input_Spam": false,//踢出输入垃圾邮件
    "Enable_Kick_Input_Timeout": false,//踢出输入超时
    "Validate_EconInfo_Hash": true,//验证EconInfo哈希
    "Validate_MasterBundle_Hashes": true,//验证主捆绑哈希
  },
  "UnityEvents": {//Unity事件参数设置
    "Allow_Server_Messages": false,//允许服务器消息
    "Allow_Server_Commands": false,//允许使用服务器命令
    "Allow_Client_Messages": false,//允许客户端消息
    "Allow_Client_Commands": false//允许使用客户端命令
  },
  "Hard": {//困难难度
    "Items": {//物品参数设置
      "Spawn_Chance": 0.2, //刷新几率，增大则增加物资数量
      "Despawn_Dropped_Time": 600.0,//刷新物资最小时间（秒为单位）
      "Despawn_Natural_Time": 900.0,//刷新物资最大时间（秒为单位）
      "Respawn_Time": 60.0,//物资刷新时间（分钟为单位）
      "Quality_Full_Chance": 0.01,//直接刷新满品质物资概率
      "Quality_Multiplier": 0.5,//原始物资品质倍数
      "Gun_Bullets_Full_Chance": 0.001,//直接刷新满子弹武器的概率
      "Gun_Bullets_Multiplier": 0.1,//原始武器子弹量倍数
      "Magazine_Bullets_Full_Chance": 0.025,//直接刷新满弹匣的概率
      "Magazine_Bullets_Multiplier": 0.25,//原始弹匣量倍数
      "Crate_Bullets_Full_Chance": 0.025,//直接刷新满弹药盒的概率
      "Crate_Bullets_Multiplier": 0.75,//原始弹药盒弹药量倍数
      "Has_Durability": true,//物资是否存在耐久
    },
    "Vehicles": {//载具参数设置
      "Has_Battery_Chance": 0.25,//载具有电池的概率
      "Min_Battery_Charge": 0.1,//最小电池电量概率
      "Max_Battery_Charge": 0.3,//最大电池电量概率
      "Has_Tire_Chance": 0.7,//载具有轮胎概率
      "Respawn_Time": 3000.0,//载具刷新时间（分钟为单位）
      "Unlocked_After_Seconds_In_Safezone": 600.0,//车辆在地图刷新位置自动解锁时间（秒为单位）
      "Armor_Multiplier": 0.1,//原始载具护甲倍数（数值越小护甲越高）
      "Child_Explosion_Armor_Multiplier": 1.0,//承担部分爆炸伤害的护甲倍数
      "Gun_Lowcal_Damage_Multiplier": 0.1,//小口径枪械伤害倍数
      "Gun_Highcal_Damage_Multiplier": 1.0,//大口径枪械伤害倍数
      "Melee_Damage_Multiplier": 0.5,//近战伤害倍数
      "Max_Instances_Tiny": 4,//迷你地图最大车辆数量
      "Max_Instances_Small": 8,//小型地图最大车辆数量
      "Max_Instances_Medium": 16,//中型地图最大车辆数量
      "Max_Instances_Large": 32,//大型地图最大车辆数量
      "Max_Instances_Insane": 64//巨型地图最大车辆数量
    },
    "Zombies": {//僵尸参数设置
      "Spawn_Chance": 0.3,//僵尸刷新概率
      "Loot_Chance": 0.3,//普通僵尸生成概率
      "Crawler_Chance": 0.125,//爬行僵尸生成概率
      "Sprinter_Chance": 0.175,//疾跑僵尸生成概率
      "Flanker_Chance": 0.05,//隐身僵尸生成概率
      "Burner_Chance": 0.05,//燃烧僵尸生成概率
      "Acid_Chance": 0.05,//酸液僵尸生成概率
      "Boss_Electric_Chance": 0.0,//闪电BOSS生成概率
      "Boss_Wind_Chance": 0.0,//疾风BOSS生成概率
      "Boss_Fire_Chance": 0.0,//火焰BOSS生成概率
      "Spirit_Chance": 0.0,//防弹疾跑僵尸生成概率
      "DL_Red_Volatile_Chance": 0.0,//死亡之夜变红概率
      "DL_Blue_Volatile_Chance": 0.0,//死亡之夜变蓝概率
      "Boss_Elver_Stomper_Chance": 0.0,//Elver地图践踏者BOSS生成概率
      "Respawn_Day_Time": 250.0,//白天僵尸刷新时间
      "Respawn_Night_Time": 20.0,//黑夜僵尸刷新时间
      "Respawn_Beacon_Time": 0.0,//尸潮生成僵尸时间间隔
      "Quest_Boss_Respawn_Interval": 600.0,//任务BOSS重生时间间隔
      "Damage_Multiplier": 1.5,//僵尸伤害倍数（越低伤害越高）
      "Armor_Multiplier": 0.75,//僵尸护甲倍数（越低护甲越高）
      "Backstab_Multiplier": 1.25,//背刺僵尸伤害倍数
      "NonHeadshot_Armor_Multiplier": 1.0,//没爆头时僵尸的护甲倍数
      "Beacon_Experience_Multiplier": 1.0,//尸潮生成器存在时获得的经验倍数
      "Full_Moon_Experience_Multiplier": 2.0,//满月时获得的经验倍数
      "Min_Drops": 1,//僵尸最小掉落物品数量
      "Max_Drops": 1,//僵尸最大掉落物品数量
      "Min_Mega_Drops": 5,//最小巨型掉落物品数量
      "Max_Mega_Drops": 5,//最大巨型掉落物品数量
      "Min_Boss_Drops": 8,//最小BOSS掉落物品数量
      "Max_Boss_Drops": 10,//最大BOSS掉落物品数量
      "Slow_Movement": false,//慢速移动
      "Can_Stun": true,//僵尸被击晕
      "Only_Critical_Stuns": true,//只有近战才能击晕僵尸
      "Weapons_Use_Player_Damage": true,//武器伤害使用玩家伤害
      "Can_Target_Barricades": true,//可破坏可放置物品
      "Can_Target_Structures": true,//可破坏建筑
      "Can_Target_Vehicles": true,//可破坏载具
      "Beacon_Max_Rewards": 0,//尸潮掉落奖励物资的最大数量
      "Beacon_Max_Participants": 0,//尸潮奖励参与战斗的最大人数
      "Beacon_Rewards_Multiplier": 1.0,//尸潮奖励物品的数量倍数
    },
    "Animals": {//动物参数设置
      "Respawn_Time": 180.0,//动物刷新时间
      "Damage_Multiplier": 1.5,//动物伤害倍数
      "Armor_Multiplier": 0.75,//动物护甲倍数
      "Max_Instances_Tiny": 4,//迷你地图最大动物数量
      "Max_Instances_Small": 8,//小型地图最大动物数量
      "Max_Instances_Medium": 16,//中型地图最大动物数量
      "Max_Instances_Large": 32,//大型地图最大动物数量
      "Max_Instances_Insane": 64,//巨型地图最大动物数量
      "Weapons_Use_Player_Damage": true,//武器伤害使用玩家伤害
    },
    "Barricades": {//可放置建筑物参数设置
      "Decay_Time": 604800,//存在时间
      "Armor_Lowtier_Multiplier": 1.5,//木制建筑护甲倍数（数值越低护甲越高）
      "Armor_Hightier_Multiplier": 1.0,//铁制建筑护甲倍数（数值越低护甲越高）
      "Gun_Lowcal_Damage_Multiplier": 1.0,//小口径枪械伤害倍数（数值越低护甲越高）
      "Gun_Highcal_Damage_Multiplier": 1.0,//大口径枪械伤害倍数（数值越低护甲越高）
      "Melee_Damage_Multiplier": 1.0,//近战伤害倍数（数值越低护甲越高）
      "Allow_Item_Placement_On_Vehicle": true,//在载具上放置物品
      "Allow_Trap_Placement_On_Vehicle": true,//在载具上放置陷阱
      "Max_Item_Distance_From_Hull": 64.0,//物品与载具外壳的最大距离
      "Max_Trap_Distance_From_Hull": 16.0,//陷阱与载具外壳的最大距离
    },
    "Structures": {//房屋结构建筑物参数设置
      "Decay_Time": 604800,//存在时间
      "Armor_Lowtier_Multiplier": 1.5,//木制建筑护甲倍数（数值越低护甲越高）
      "Armor_Hightier_Multiplier": 0.5,//铁制建筑护甲倍数（数值越低护甲越高）
      "Gun_Lowcal_Damage_Multiplier": 0.1,//小口径枪械伤害倍数（数值越低护甲越高）
      "Gun_Highcal_Damage_Multiplier": 1.0,//大口径枪械伤害倍数（数值越低护甲越高）
      "Melee_Damage_Multiplier": 0.1,//近战伤害倍数（数值越低护甲越高）
    },
    "Players": {//玩家参数设置
      "Health_Regen_Min_Food": 80,//回血要求最低饥饿值
      "Health_Regen_Min_Water": 90,//回血要求最低口渴值
      "Health_Regen_Ticks": 120,//血量恢复周期
      "Food_Use_Ticks": 150,//每消耗一点饥饿值周期（12 ticks约1秒）
      "Food_Damage_Ticks": 36,//吃食物所需周期（12 ticks约1秒）
      "Water_Use_Ticks": 100,//每消耗一点口渴值周期（12 ticks约1秒）
      "Water_Damage_Ticks": 24,//喝水所需周期（12 ticks约1秒）
      "Virus_Infect": 60,//感染严重值（到此数值会持续降低感染值）（12 ticks约1秒）
      "Virus_Use_Ticks": 24,//每消耗一点感染值所需周期（12 ticks约1秒）
      "Virus_Damage_Ticks": 12,//感染值为0时受到伤害的周期（12 ticks约1秒）
      "Leg_Regen_Ticks": 1440,//骨折恢复周期（12 ticks约1秒）
      "Bleed_Damage_Ticks": 6,//流血伤害周期（12 ticks约1秒）
      "Bleed_Regen_Ticks": 240,//流血恢复周期（12 ticks约1秒）
      "Armor_Multiplier": 1.0,//玩家护甲倍数
      "Experience_Multiplier": 1.0,//玩家经验倍数
      "Detect_Radius_Multiplier": 1.0,//玩家视野半径
      "Ray_Aggressor_Distance": 8.0,//射程距离
      "Lose_Skills_PvP": 1.0,//PVP死亡丢失技能百分比（1为不丢失）
      "Lose_Skills_PvE": 1.0,//PVE死亡丢失技能百分比（1为不丢失）
      "Lose_Items_PvP": 0.0,//PVP死亡丢失物品百分比（0为不丢失）
      "Lose_Items_PvE": 0.0,//PVE死亡丢失物品百分比（0为不丢失）
      "Lose_Clothes_PvP": false,//PVP死亡丢失衣服
      "Lose_Clothes_PvE": false,//PVE死亡丢失衣服
      "Lose_Weapons_PvP": true,//PVP死亡丢失武器
      "Lose_Weapons_PvE": true,//PVE死亡丢失武器
      "Can_Hurt_Legs": true,//摔落伤害
      "Can_Break_Legs": true,//骨折
      "Can_Fix_Legs": true,//治疗骨折
      "Can_Start_Bleeding": true,//流血
      "Can_Stop_Bleeding": true,//止血
      "Spawn_With_Max_Skills": false,//出生时全技能满级
      "Spawn_With_Stamina_Skills": false,//出生时满级稳定性技能
      "Allow_Instakill_Headshots": false,//爆头秒杀
      "Allow_Per_Character_Saves": true,//基于角色存档
    },
    "Objects": {//物体参数设置
      "Binary_State_Reset_Multiplier": 1.0,//是非状态重置时间倍数
      "Fuel_Reset_Multiplier": 1.0,//燃油刷新倍数
      "Water_Reset_Multiplier": 1.0,//蓄水刷新倍数
      "Resource_Reset_Multiplier": 1.0,//资源处刷新倍数（树木一类资源）
      "Resource_Drops_Multiplier": 1.0,//资源处掉落倍数（树木一类资源）
      "Rubble_Reset_Multiplier": 1.0,//碎石堆刷新倍数
      "Allow_Holiday_Drops": true,//允许节日掉落
      "Items_Obstruct_Tree_Respawns": true,//物品阻碍树生长
    },
    "Events": {//事件参数设置
      "Rain_Frequency_Min": 2.3,//降雨最低频率
      "Rain_Frequency_Max": 5.6,//降雨最高频率
      "Rain_Duration_Min": 0.05,//降雨最短持续时间
      "Rain_Duration_Max": 0.15,//降雨最长持续时间
      "Snow_Frequency_Min": 1.3,//降雪最低频率
      "Snow_Frequency_Max": 4.6,//降雪最高频率
      "Snow_Duration_Min": 0.2,//降雪最短持续时间
      "Snow_Duration_Max": 0.5,//降雪最长持续时间
      "Airdrop_Frequency_Min": 0.8,//空投最低频率
      "Airdrop_Frequency_Max": 6.5,//空投最高频率
      "Airdrop_Speed": 128.0,//空投速度
      "Airdrop_Force": 9.5,//空投降落速度
      "Arena_Min_Players": 2,//大逃杀最少玩家数
      "Arena_Compactor_Damage": 10,//毒圈伤害
      "Arena_Clear_Timer": 5,//大逃杀清扫时间（秒）
      "Arena_Finale_Timer": 10,//大逃杀结束时间（秒）
      "Arena_Restart_Timer": 15,//大逃杀重新开始时间（秒）
      "Arena_Compactor_Delay_Timer": 1,//毒圈延迟
      "Arena_Compactor_Pause_Timer": 5,//毒圈停留时间
      "Use_Airdrops": true,//启用空投
      "Arena_Use_Compactor_Pause": true,//开启大逃杀毒圈
      "Arena_Compactor_Speed_Tiny": 0.5,//毒圈第一圈速度
      "Arena_Compactor_Speed_Small": 1.5,//毒圈第二圈速度
      "Arena_Compactor_Speed_Medium": 3.0,//毒圈第三圈速度
      "Arena_Compactor_Speed_Large": 4.5,//毒圈第四圈速度
      "Arena_Compactor_Speed_Insane": 6.0,//毒圈第五圈速度
      "Arena_Compactor_Shrink_Factor": 0.5,//毒圈收缩倍数
    },
    "Gameplay": {//游戏参数设置
      "Repair_Level_Max": 5,//最大维修等级
      "Hitmarkers": true,//命中显示红色标记
      "Crosshair": true,//十字线瞄准
      "Ballistics": true,//弹道
      "Chart": false,//自带纸质地图
      "Satellite": false,//自带GPS
      "Compass": false,//自带罗盘
      "Group_Map": true,//地图显示组员位置
      "Group_HUD": true,//组员名字显示
      "Group_Player_List": true,//组员列表
      "Allow_Static_Groups": true,//静态组
      "Allow_Dynamic_Groups": true,//动态组
      "Allow_Shoulder_Camera": true,//第三人称
      "Can_Suicide": true,//允许自杀
      "Friendly_Fire": false,//友军伤害
      "Bypass_Buildable_Mobility": false,//在载具上放置哨兵枪和床
      "Timer_Exit": 10,//退出等待时间
      "Timer_Respawn": 10,//重生多次等待时间
      "Timer_Home": 30,//死亡回床等待时间
      "Timer_Leave_Group": 30,//离开组等待时间
      "Max_Group_Members": 0,//小组人数上线（0为不限制）
    }
  }
}

```

### 常见BUG：
`遇到了新的bug会补到下面，你遇到了新的bug请把问题与解决方案一并附上，只有问题的不会被采纳，除非我也遇到了awa`

**Q：** 服务器成功创建了，但是连接一直失败，提示`Workshop`连接失败

**A：** 给服务器挂个加速器，什么加速器都行，只要挂完加速器后，你的服务器所在的电脑能成功访问Steam的创意工坊就算成功

**Q：** 服务器和客户端在同一个机器上，客户端闪退后，steam内显示游戏正在运行中

**A：** 我玩中国南方地图的时候经常（maybe电脑太垃圾了），这个解决的方法只能是关掉服务器，然后开客户端，再开服务器来解决，比较无解....
