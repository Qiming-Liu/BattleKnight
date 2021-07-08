export default function (level) {
    return {
        //描述
        description: {
            //名字
            name: '民兵',
            //介绍文字
            intro: '最基础的单位',
            //类型 unit=单位 building=建筑
            type: 'unit',
            //图像
            image: 'objects/units/Savage.png',
            //是否击毁时结束游戏
            base: false,
            //基地技能
            baseSkill: function () {
                function 消灭场上所有单位() {
                    //代价 10%基地当前血量
                    let list1 = [];
                    list1.push({
                        id: window.scene[window.gameInfo.direction].base.id,
                        health: window.scene[window.gameInfo.direction].base.current.battle.health * 0.9
                    });
                    window.io.setHealth(list1);
                    //执行清场
                    let list2 = [];
                    for (let i = 0; i < window.scene.left.UnitsFactory.UnitsList.length; i++) {
                        list2.push(window.scene.left.UnitsFactory.UnitsList[i].getData());
                    }
                    for (let i = 0; i < window.scene.right.UnitsFactory.UnitsList.length; i++) {
                        list2.push(window.scene.right.UnitsFactory.UnitsList[i].getData());
                    }
                    window.io.letDie(list2);
                }
                消灭场上所有单位();

                function 将对方所有单位血量变为一半() {
                    //代价 无
                    //执行血量一半
                    let list = [];
                    if(window.gameInfo.direction === 'left'){
                        for (let i = 0; i < window.scene.right.UnitsFactory.UnitsList.length; i++) {
                            list.push({
                                id: window.scene.right.UnitsFactory.UnitsList[i].id,
                                health: window.scene.right.UnitsFactory.UnitsList[i].current.battle.health * 0.5
                            });
                        }
                    }
                    for (let i = 0; i < window.scene.left.UnitsFactory.UnitsList.length; i++) {
                        list.push({
                            id: window.scene.left.UnitsFactory.UnitsList[i].id,
                            health: window.scene.left.UnitsFactory.UnitsList[i].current.battle.health * 0.5
                        });
                    }
                    window.io.setHealth(list);
                }
                将对方所有单位血量变为一半();
            }
        },
        //战斗
        battle: {
            //最大生命值
            health: 10,
            //最大能量值
            power: 0,
            //攻击
            attack: {
                //攻击力
                atk: 3,
                //攻击间隔 毫秒
                interval: 1000,
                //攻击范围
                range: 100,
                //溅射范围
                splash: 0,
                //投掷物图像 shake=抖动
                projectile: 'shake',
                //弹道速度 0表示立即
                speed: 0
            },
            //护甲 最少也要受到1点伤害
            armor: {
                //每次受到伤害会减少的数值
                reduce: 0,
                //圣盾数量
                shield: 0
            }
        },
        //技能列表
        skills: [],
        //移动
        move: {
            //最大移动速度
            speed: 100,
            //距离地面的高度
            height: 0
        },
        //花费
        cost: 4,
        //刷兵间隔 毫秒
        interval: 5000
    }
}