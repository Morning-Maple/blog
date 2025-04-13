---
hide: false
order: 0
---

# 设计模式与设计原则

## 引言 <Badge type="warning" text="此内容还并不完善，请留意" />

野路子开发了一年多了，一直想找机会补一下设计模式与设计原则相关的内容，这次结合AI例子来帮助快速的理解一下！

当然，开始之前，由于设计到继承和接口，以及抽象的内容，应当先快速复习一轮这些内容：

* **抽象**：只要有一个抽象方法，就是抽象类，什么是抽象？你可以理解为模板（有些可能只声明方法，没有实现，有些可能会有方法的实现）！

* **类与类的继承**：子类不需要实现父类的方法，除非父类方法是抽象的，那么就只需要实现抽象的方法就行，其他的可以不实现（如果要实现那就是重写），如果你不想实现父类中的抽象方法，那你子类也是必须是抽象类！

  反正最后谁不是不是抽象类，谁就要把它继承的抽象类的所有抽象方法都实现（比如有一个抽象A，抽象B继承了抽象A，C实现了抽象B，那么C就要把B的抽象方法，A的抽象方法全部实现）

* **接口实现**：一个类实现接口时，必须要实现这个接口的所有抽象方法，理论上接口内全是抽象方法，也就是接口的方法全部要实现！

* **抽象类继承**：子类必须实现抽象类中的所有抽象方法，但可以继承抽象类中已经实现的方法（也就是说你可以直接调用这些，或者自己重写）。

* **接口**：接口中的方法默认是抽象的，但可以有默认方法，子类可以选择性地覆盖默认方法。

## 设计原则

例子看不明白是正常的，简单过一遍，设计模式内都会体现这些原则的！

1. 单一职责原则（SRP：Single Responsibility Principle）
2. 里氏置换原则（LSP：Liskov Substitution Principle）
3. 依赖倒置原则（DIP：Dipendence Inversion Principle）
4. 接口隔离原则（ISP：Interface Segregation Principle）
5. 开放闭合原则（OCP：Open Close Principle）

### 单一职责原则SRP

一个类只负责一项功能，明确一个职责。

例如，我现在有一个需求，用户能够实现登录，管理自己的信息，进行购买，查看自己的背包，好友，聊天等功能，就可以这样拆分：

```java
// 用户身份验证
class UserAuthService {
    String login(String username, String password);
    void logout(String userId);
    String register(String username, String password, String email);
    boolean validateToken(String token);
}

// 用户信息管理
class UserProfileService {
    String getUserInfo(String userId);
    String updateUserInfo(String userId, String newData);
}

// 用户购买管理
class UserPurchaseService {
    String purchaseItem(String userId, String itemId);
    String getOrderHistory(String userId);
}

// 用户好友管理
class UserFriendService {
    String addFriend(String userId, String friendId);
    String removeFriend(String userId, String friendId);
    String getFriendList(String userId);
}

// 用户聊天管理
class UserChatService {
    String sendMessage(String userId, String recipientId, String message);
    String getMessages(String userId, String conversationId);
}
```



### 里氏置换原则LSP

子类替换其基类对象，并且功能可以正常运行（简单说就是，子类有父类的所有内容，并且子类自身可能会有比父类更多的内容，因此用到父类的地方，换成子类是一定没问题的，因为子类拥有父类的全部内容）

例如，现在有一个 `Bird`鸟类，代表所有鸟类，而 `Sparrow`麻雀类继承 `Bird`，并扩展了 `fly()` 方法，但是`Sparrow`麻雀类是的确拥有父类`Bird`鸟类的`eat()` 方法，因此用到`Bird`鸟类的地方可以换成`Sparrow`麻雀类：

```java
// 父类：鸟
class Bird {
    void eat();
}

// 子类：麻雀（可以飞）
class Sparrow extends Bird {
    void fly();  // 拓展新功能，但不会破坏父类的行为
}

```

但是反过来是不行的，换个说法就是，鸟都会吃吃喝喝，但是鸟不一定都会飞，父类中定义的内容是所有子类都有的，但是反之不一定。



### 依赖倒置原则DIP

这个我自己也不怎么留意，换句话就是，你的功能实现不应该依赖具体的类，而是依赖对应的接口

例如下面这个就不对，`Car`类直接调用了具体类`PetrolEngine`，理论上是不合适的，违反DIP的；

当你的`Car`类想要更多样的发动机，你就需要实现更多的发动机；

然后某个发动机类内的一些方法需要改动（比如之前是先点火，汽车通电，汽车启动，现在改为先通电，再点火，汽车启动），但是调用这个类的一些Car（老车子只能先点火，汽车通电，汽车启动）是不适合这种方法的改动的，这样一来要改的代码就很多了：

```java
// 燃油发动机
class PetrolEngine {
    void start();
}

// 依赖具体类 PetrolEngine，违反 DIP！
class Car {
    private PetrolEngine engine;

    Car() {
        this.engine = new PetrolEngine(); // 直接依赖具体类
    }

    void start() {
        engine.start();
    }
}

```

改成下面这个样子就会好很多，当你要改发动机逻辑的时候，可以直接新增一个新的发动机类实现发动机接口就行，这样后面需要改动的车就可以直接用新的类，而老车依旧使用老类：

```java
// 依赖抽象接口，而不是具体实现
interface Engine {
    void start();
}

// 燃油发动机
class PetrolEngine implements Engine {
    void start();
}

// 电动发动机
class ElectricEngine implements Engine {
    void start();
}

// 现在 Car 只依赖 Engine 接口，不管是什么类型的引擎
class Car {
    private Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }

    void start() {
        engine.start();
    }
}

```



### 接口隔离原则ISP

不强迫类实现不需要的方法，大的接口应该拆分多个小接口（例如载具接口有一个`fly()`方法，但是汽车类继承后也要被强制实现此方法，飞车是吧你小子）

例如：

```java
// 违反 ISP：接口太大，不同类型的车辆被迫实现无关的方法
interface Vehicle {
    void drive();
    void refuel();   // 所有车辆都必须实现？但电动车不需要！
    void recharge(); // 所有车辆都必须实现？但燃油车不需要！
    void fly();      // 所有车辆都必须实现？但普通汽车不能飞！
}

// 轿车（不需要 fly，但被迫实现）
class Car implements Vehicle {
    void drive();
    void refuel();
    void recharge() { throw new UnsupportedOperationException("燃油车不能充电！"); }
    void fly() { throw new UnsupportedOperationException("汽车不能飞！"); }
}

// 电动车（不需要 refuel，但被迫实现）
class ElectricCar implements Vehicle {
    void drive();
    void refuel() { throw new UnsupportedOperationException("电动车不能加油！"); }
    void recharge();
    void fly() { throw new UnsupportedOperationException("电动车不能飞！"); }
}

```

所以，为了避免这种情况，我们需要：

```java
// 基础接口：所有车辆都能驾驶
interface Drivable {
    void drive();
}

// 燃油车接口
interface FuelVehicle {
    void refuel();
}

// 充电车接口
interface ElectricVehicle {
    void recharge();
}

// 飞行接口
interface Flyable {
    void fly();
}

// 轿车（燃油车）
class Car implements Drivable, FuelVehicle {
    void drive();
    void refuel();
}

// 电动车（不需要 refuel）
class ElectricCar implements Drivable, ElectricVehicle {
    void drive();
    void recharge();
}

// 飞机（不需要 drive）
class Airplane implements Flyable, FuelVehicle {
    void fly();
    void refuel();
}

```



### 开放闭合原则OCP

换句话就是增加新的东西时不应该通过修改原有代码来实现（通常以接口和抽象类来解决），这个很好理解，不需要例子吧？！
