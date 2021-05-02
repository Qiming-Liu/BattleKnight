export default {
    "description": {
        "name": "基础骑士(等级LV1)",
        "intro": "带护甲的基础单位, 攻击力较低",
        "parent": "knight",
        "type": "unit",
        "icon": "objects/knight/KnightLV1.png",
        "image": "objects/knight/KnightLV1.png"
    },
    "battle": {
        "health": 10,
        "power": 0,
        "attack": {
            "atk": 100,
            "interval": 1000,
            "range": 60,
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
    "cost": {
        "gold": 0,
        "point": 0,
        "interval": 10000
    }
}