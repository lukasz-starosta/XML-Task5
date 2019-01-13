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

        Object.defineProperty(this, 'y', {
            get: function() {
                return Number(this.htmlElement.getAttribute('y'));
            },
            set: function(value) {
                this.htmlElement.setAttribute('y', value);
            }
        });

        this.height = Number(this.htmlElement.getAttribute('height'));
        this.width = Number(this.htmlElement.getAttribute('width'));
    }
}

export class Field extends Element {
    constructor(fieldId) {
        super(fieldId);
        this.width = Number(this.htmlElement.getAttribute('width'));
        this.height = Number(this.htmlElement.getAttribute('height'));

        this.leftBound = Number(this.htmlElement.getAttribute('x'));
        this.topBound = Number(this.htmlElement.getAttribute('y'));
        this.rightBound =
            this.width + Number(this.htmlElement.getAttribute('x'));
        this.bottomBound =
            this.height + Number(this.htmlElement.getAttribute('y'));
    }
}

export class Score extends Element {
    constructor(scoreId) {
        super(scoreId);
    }

    addPoint() {
        this.htmlElement.innerHTML = Number(this.htmlElement.innerHTML) + 1;
    }
}
