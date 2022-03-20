export class Vec2 {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Add the value of another vec2 to this vec2.
     * this = this + other
     * @param {Vec2} otherVec the other vector
     * @returns {Vec2}
     */
    add(otherVec) {
        this.x += otherVec.x;
        this.y += otherVec.y;
        return this;
    }

    /**
     * Subtract the value of another vec2 from this vec2.
     * this = this - other
     * @param {Vec2} otherVec the other vector
     * @returns {Vec2}
     */
    sub(otherVec) {
        this.x -= otherVec.x;
        this.y -= otherVec.y;
        return this;
    }

    /**
     * Multiple the value of another vector with this vec2.
     * this = this * other
     * @param {Vec2} otherVec the other vector
     * @returns {Vec2}
     */
    mul(otherVec) {
        this.x *= otherVec.x;
        this.y *= otherVec.y;
        return this;
    }

    /**
     * Divide the value of this vector by another vector.
     * this = this / other
     * @param {Vec2} otherVec the other vector
     * @returns {Vec2}
     */
    div(otherVec) {
        this.x /= otherVec.x;
        this.y /= otherVec.y;
        return this;
    }

    /**
     * Calculate the euclidian distance between this and another vec2.
     * @param {Vec2} otherVec the other vector
     * @returns {number}
     */
    dist(otherVec) {
        return Math.hypot(otherVec.x - this.x, otherVec.y - this.y);
    }

    /**
     * Calculate the squared euclidian distance between this and
     * another vec2.
     * @param {Vec2} otherVec the other vector
     * @returns {number}
     */
    sqdist(otherVec) {
        const x = otherVec.x - this.x;
        const y = otherVec.y - this.y;
        return x * x + y * y;
    }

    /**
     * Calculate the length of this vec2.
     * @returns {number}
     */
    length() {
        return Math.hypot(this.x, this.y);
    }

    /**
     * Calculate the squared length of this vec2.
     * @returns {number}
     */
    sqlength() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * Normalize the vector.
     * @returns {Vec2}
     */
    normalize() {
        const len = this.sqlength();
        if(len > 0) {
            len = 1 / Math.sqrt(len);
        }
        this.x = this.x * len;
        this.y = this.y * len;
        return this;
    }

    /**
     * Set the components of the vec2 to zero
     * @returns {Vec2}
     */
    zero() {
        this.x = 0;
        this.y = 0;
        return this;
    }
}