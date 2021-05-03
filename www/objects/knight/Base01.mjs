export default {
    "description": {
        "name": "骑士基地",
        "intro": "最重要的建筑, 被击毁就会游戏失败",
        "parent": "knight",
        "type": "building",
        "icon": "objects/knight/Base01.png",
        "image": "objects/knight/Base01.png"
    },
    "battle": {
        "health": 100,
        "power": 0,
        "attack": {
            "atk": 1,
            "interval": 1,
            "range": 200,
            "splash": 0,
            "projectile": null,
            "speed": 0
        },
        "armor": {
            "reduce": 0,
            "shield": 0
        }
    },
    "skills": [],
    "move": {
        "speed": 0,
        "acceleration": 0,
        "height": 0
        //
    },
    "cost": {
        "gold": 0,
        "point": 0,
        "interval": 5
    }
}