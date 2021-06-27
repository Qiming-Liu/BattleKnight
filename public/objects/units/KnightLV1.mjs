export default {
    "description": {
        "name": "基础骑士(等级LV1)",
        "intro": "带护甲的基础单位, 攻击力较低",
        "parent": "knight",
        "type": "unit",
        "icon": "objects/units/KnightLV1.png",
        "image": "objects/units/KnightLV1.png"
    },
    "battle": {
        "health": 10,
        "power": 0,
        "attack": {
            "atk": 2,
            "interval": 1000,
            "range": 100,
            "splash": 0,
            "projectile": "shake",
            "speed": 0
        },
        "armor": {
            "reduce": 1,
            "shield": 0
        }
    },
    "skills": [],
    "move": {
        "speed": 50,
        "height": 0
    },
    //花费
    "cost": 2,
    //刷兵间隔 毫秒
    "interval": 2000
}