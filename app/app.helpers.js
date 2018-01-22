Number.prototype.padLeft = function (size, char) {
    char = char || '0';
    var text = this.toString();
    while (text.length < size) {
        text = `${char}${text}`;
    }
    return text;
}

Date.prototype.formatDate = function () {
    var d = this.getDate();
    var m = this.getMonth() + 1;
    var y = this.getFullYear();

    return [d.padLeft(2), m.padLeft(2), y.toString()].join('/');
};

Date.prototype.formatTime = function () {
    var h = this.getHours();
    var m = this.getMinutes();
    var s = this.getSeconds();
    var a;

    if (h > 12) {
        a = 'pm';
        h -= 12;
    } else {
        a = 'am';
    }

    return [h.padLeft(2), m.padLeft(2), s.padLeft(2)].join(':') + a;
};

Date.prototype.format = function () {
    return `${this.formatDate()} ${this.formatTime()}`
};