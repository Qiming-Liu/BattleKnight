export default {
    "description": {
        "name": "野人",
        "intro": "最基础的单位",
        "parent": "knight",
        "type": "unit",
        "icon": "objects/knight/Savage.png",
        "image": "objects/knight/Savage.png"
    },
    "battle": {
        "health": 10,
        "power": 0,
        "attack": {
            "atk": 3,
            "interval": 1000,
            "range": 70,
            "splash": 0,
            "projectile": "shake",
            "speed": 0
        },
        "armor": {
            "reduce": 0,
            "shield": 0
        }
    },
    "skills": [],
    "move": {
        "speed": 200,
        "height": 0
    },
    "cost": {
        "gold": 0,
        "point": 0,
        "interval": 1000
    }
}