class Element {
    constructor(selector) {
        this.htmlElement = document.getElementById(selector);
    }
}

export class Ball extends Element {
    constructor(ballId) {
        super(ballId);

        Object.defineProperty(this, 'x', {
            get: function() {
                return Number(this.htmlElement.getAttribute('cx'));
            },
            set: function(value) {
                this.htmlElement.setAttribute('cx', value);
            }
        });
        Object.defineProperty(this, 'y', {
            get: function() {
                return Number(this.htmlElement.getAttribute('cy'));
            },
            set: function(value) {
                this.htmlElement.setAttribute('cy', value);
            }
        });

        this.radius = Number(this.htmlElement.getAttribute('r'));
        this.directionX = 1;
        this.directionY = 1;
    }
}

export class Player extends Element {
    constructor(playerId) {
        super(playerId);
    }
}

export class Field extends Element {
    constructor(fieldId) {
        super(fieldId);

        this.leftBound = Number(this.htmlElement.getAttribute('x'));
        this.topBound = Number(this.htmlElement.getAttribute('y'));
        this.rightBound =
            Number(this.htmlElement.getAttribute('width')) +
            Number(this.htmlElement.getAttribute('x'));
        this.bottomBound =
            Number(this.htmlElement.getAttribute('height')) +
            Number(this.htmlElement.getAttribute('y'));
    }
}
