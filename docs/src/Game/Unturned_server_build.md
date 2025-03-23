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
Loadout [出生自带物品 ID，若有多个，请用 / 分割]
Welcome [欢迎语]
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

### 添加MOD内容：

① 进入Steam->Unturned->创意工坊，找到你要加的mod，记住左上角url后面的数字

② 进入到下面的路径：U3DS->Server->你的服务器名字->Server，用记事本打开WorkershopDownloadConfig.json

③ 找到配置：File_IDs，在[]内添加你要的mod，比如：[23232,3021548]，多个mod之间需要加英文逗号区分开

④ 如果你加的是地图，请不要忘了在你的Map中修改对应的名字和在File_IDs内添加对应的asset资源mod！

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

留意你的服务器难度，因为不同难度下他们都有个各自的配置，别一会儿难度是hard，改了easy的配置，那hard下肯定不会生效呐...

部分地图修改了默认设置后，在加入服务器前会在服务器信息中展示出来，但是有些不会，不过没关系，只要修改了就会生效~

配置路径：`U3DS->Server->你的服务器名字->Server->Config.json`

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
