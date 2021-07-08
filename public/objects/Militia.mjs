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
            image: 'objects/units/Militia.png',
            //是否击毁时结束游戏
            base: false,
            //基地技能
            baseSkill: function () {
            }
        },
        //战斗
        battle: {
            //最大生命值
            health: 5,
            //最大能量值
            power: 0,
            //攻击
            attack: {
                //攻击力
                atk: 2 + level,
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
        cost: 1,
        //刷兵间隔 毫秒
        interval: 4000
    }
}