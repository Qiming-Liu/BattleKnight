export default class Panel {
    constructor(scene, x, y, width, height) {
        const COLOR_PRIMARY = 0x4e342e;
        const COLOR_LIGHT = 0x7b5e57;
        const COLOR_DARK = 0x260e04;

        let data = {
            name: 'Rex',
            skills: [
                {name: 'A'},
                {name: 'B'},
                {name: 'C'},
                {name: 'D'},
                {name: 'E'},
            ],
            items: [
                {name: 'A'},
                {name: 'B'},
                {name: 'C'},
                {name: 'D'},
                {name: 'E'},
                {name: 'F'},
                {name: 'G'},
                {name: 'H'},
                {name: 'I'},
                {name: 'J'},
                {name: 'K'},
                {name: 'L'},
                {name: 'M'},
            ],

        };

        let config = {
            x: x,
            y: y,
            width: width,
            height: height,
            scrollMode: 1,
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),
            panel: {
                child: createPanel(this, data),
                mask: {
                    padding: 1
                },
            },
            slider: {
                track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK).setDepth(1),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT).setDepth(1),
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                panel: 10,
            }
        }

        let scrollablePanel = scene.rexUI.add.scrollablePanel(config).layout();
        let panel = scrollablePanel.getElement('panel');
        let print = scene.add.text(0, 0, '');
        scene.rexUI.setChildrenInteractive(scrollablePanel, {
            targets: [
                panel.getByName('skills', true),
                panel.getByName('items', true)
            ]
        })
            .on('child.click', function (child) {
                let category = child.getParentSizer().name;
                print.text += `${category}:${child.text}\n`;
            });
    }
    //https://codepen.io/rexrainbow/pen/WNRLZxW?editors=0010
}