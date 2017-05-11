'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

var doubleCheck = function (_HTMLElement) {
    _inherits(doubleCheck, _HTMLElement);

    function doubleCheck() {
        _classCallCheck(this, doubleCheck);

        var _this = _possibleConstructorReturn(this, (doubleCheck.__proto__ || Object.getPrototypeOf(doubleCheck)).call(this));

        _this.message = '';
        _this.nextUrl = '';
        _this.toRemove = NodeSelector;
        _this.appendTo = NodeSelector;
        _this.proceed = String;
        return _this;
    }

    _createClass(doubleCheck, [{
        key: 'attachedCallback',
        value: function attachedCallback() {
            this.innerHTML = '\n            <style>#dc-wrapper{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);z-index:9999}#dc-wrapper #dc-modal{max-width:80%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#eee;padding:1rem 1rem}#dc-wrapper #dc-modal #dc-modal-inner{min-height:150px;display:flex;flex-flow:row wrap;align-items:center}#dc-wrapper #dc-modal #dc-modal-inner .dc-warning-message{line-height:1.2;flex-basis:100%;text-rendering:optimizeLegibility}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-proceed{background:0 0;font-size:1.2rem;color:#006004;padding:10px 15px;margin:.5rem .5rem;border:1px solid #006004;line-height:1;transition:.2s all ease-in-out}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-proceed:hover{transform:scale(1.1);text-decoration:none}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-cancel{background:0 0;font-size:1.2rem;color:#680800;padding:10px 15px;margin:.5rem .5rem;border:1px solid #680800;line-height:1;transition:.2s all ease-in-out;margin-left:auto}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-cancel:hover{transform:scale(1.1);text-decoration:none}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-close{position:absolute;top:0;right:0;padding:.5rem;font-size:1.5rem;line-height:1;color:#333;transition:.5s all ease-in-out}#dc-wrapper #dc-modal #dc-modal-inner .dc-button-close:hover{transform:scale(1.3);text-decoration:none}</style>\n            <div id="dc-wrapper">\n                <div id="dc-modal">\n                    <div id="dc-modal-inner">\n                        <h4 class="dc-warning-message">' + this.message + '</h4>                        \n                        <a class="dc-button-cancel" href="#">Cancel</a>\n                        <a class="dc-button-proceed" href="' + this.nextUrl + '" data-continue="">Continue</a>\n                        <a class="dc-button-close" href="#">&#10006;</a>\n                    </div>\n                </div>\n            </div>\n        ';
            // const parent = this.getElementById('dc-wrapper').parentNode;
            var btnCancel = this.querySelector('.dc-button-cancel');
            var btnClose = this.querySelector('.dc-button-close');
            var btnProceed = this.querySelector('.dc-button-proceed');
            function templateHTML(that) {
                var parentEl = that.parentNode;
                var parentParentEl = parentEl.parentNode;
                var parentx3 = parentParentEl.parentNode;
                console.log(parentx3.parentNode);
                parentx3.parentNode.parentNode.removeChild(parentx3.parentNode);
            }
            btnCancel.addEventListener('click', function () {
                templateHTML(this);
            });
            btnClose.addEventListener('click', function () {
                templateHTML(this);
            });
            btnProceed.addEventListener('click', function () {
                this.setAttribute('data-continue', 'true');
            });
        }
    }, {
        key: 'properties',
        set: function set(obj) {
            this.message = obj.message;
            this.nextUrl = obj.nextUrl;
            this.attachTo = obj.appendTo;
            this.proceed = obj.proceed;
        }
    }]);

    return doubleCheck;
}(HTMLElement);

var Modal = document.registerElement('dc-modal', doubleCheck);
var myModal = new Modal();
myModal.properties = {
    message: 'Do you want to delete your account?',
    nextUrl: '/profile/delete',
    proceed: 'true'
};

var btnDanger = document.getElementsByClassName('btn-danger');
console.log(btnDanger);
for (var i = 0; i < btnDanger.length; i++) {
    btnDanger[i].addEventListener('click', function (e) {
        e.preventDefault();
        document.body.appendChild(myModal);
        var proceed = document.querySelector('.dc-button-proceed');
    });
}