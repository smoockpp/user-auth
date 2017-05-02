'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var doubleCheck = function () {
    function doubleCheck(message, target, nextUrl) {
        _classCallCheck(this, doubleCheck);

        this.message = message;
        this.target = target;
        this.nextUrl = nextUrl;
        this.toRemove = [];
    }

    _createClass(doubleCheck, [{
        key: 'htmlTemplate',
        value: function htmlTemplate() {
            var html = '\n            <div class="dc-wrapper">\n                <div class="dc-modal">\n                    <div class="dc-modal-inner">\n                        <h4 class="dc-warning-message">' + this.message + '</h4>                        \n                        <a class="dc-button-cancel" href="#">Cancel</a>\n                        <a class="dc-button-proceed" href="' + this.nextUrl + '">Continue</a>\n                        <a class="dc-button-close" href="#">&#10006;</a>\n                    </div>\n                </div>\n            </div>\n        ';
            return html;
        }
    }, {
        key: 'init',
        value: function init() {
            this.target.innerHTML += this.htmlTemplate();
            var that = this;
            var dcCancel = document.getElementsByClassName('dc-button-cancel');
            for (var i = 0; i < dcCancel.length; i++) {
                dcCancel[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    that.close();
                });
            }
            var dcClose = document.getElementsByClassName('dc-button-close');
            for (var _i = 0; _i < dcClose.length; _i++) {
                dcClose[_i].addEventListener('click', function (e) {
                    e.preventDefault();
                    that.close();
                });
            }
            var dcWrapper = document.getElementsByClassName('dc-wrapper');
            for (var _i2 = 0; _i2 < dcWrapper.length; _i2++) {
                this.toRemove.push(dcWrapper[_i2]);
            }

            console.log(this.toRemove);
        }
    }, {
        key: 'close',
        value: function close() {
            var that = this;
            for (dc in this.toRemove) {
                that.target.removeChild(this.toRemove[dc]);
            }
        }
    }]);

    return doubleCheck;
}();

var body = document.body;

var dc = new doubleCheck('Are you sure you want to delete your account?!', body, '/delete');