export default
{
  //描述
  "description": {
    //名字
    "name": "民兵",
    //介绍文字
    "intro": "最基础的单位",
    //种族
    "parent": "human",
    //头像
    "icon": "units/human/a01.png",
    //图像
    "image": "units/human/a01.png"
  },
  //战斗
  "battle": {
    //最大生命值
    "health": 10,
    //最大能量值
    "power": 0,
    //攻击
    "attack": {
      //攻击力
      "atk": 3,
      //攻击间隔 秒
      "interval": 1,
      //攻击范围
      "range": {
        //最小攻击范围
        "min": 0,
        //最大攻击范围
        "max": 50,
        //溅射范围
        "splash": 0
      },
      //投掷物图像
      "throw": null,
      //弹道速度 0表示立即
      "speed": 0
    },
    //护甲 最少也要受到1点伤害
    "armor": {
      //每次受到伤害会减少的数值
      "reduce": 0,
      //圣盾数量
      "shield": 0
    }
  },
  //技能列表 列表[0]与能量值相关, 其他技能不能与能量值相关
  "skills": [],
  //移动
  "move": {
    //移动速度
    "speed": 100,
    //距离地面的高度
    "height": 0
    //
  },
  //花费
  "cost": {
    //金币
    "gold": 0,
    //科技点
    "point": 0,
    //生产间隔
    "interval": 5
  }
}